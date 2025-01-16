<template>
  <div class="items-view">
    <h2>Projekty</h2>
    <form @submit.prevent="addProject" class="form">
      <input v-model="newProject.name" placeholder="Nazwa" />
      <input v-model="newProject.description" placeholder="Opis" />
      <select v-model="newProject.status">
        <option>Nowy</option>
        <option>W trakcie</option>
        <option>Zakończony</option>
      </select>
      <button class="submit-btn" type="submit">Dodaj</button>
    </form>
    <section class="list">
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Status</th>
            <th class="action">Akcje</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="project in filteredProjects" :key="project.id">
            <td>{{ project.name }}</td>
            <td :style="!project.description && { textAlign: 'center' }">
              {{ project.description || "-" }}
            </td>
            <td class="status">{{ project.status }}</td>
            <td class="action">
              <button @click="removeProject(project.id)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
      <select v-model="filter" class="filter">
        <option value="">Wszystkie</option>
        <option>Nowy</option>
        <option>W trakcie</option>
        <option>Zakończony</option>
      </select>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: JSON.parse(localStorage.getItem("projects") || "[]"),
      newProject: {
        id: new Date().getTime(),
        name: "",
        description: "",
        status: "Nowy",
      },
      filter: "",
    };
  },
  computed: {
    filteredProjects() {
      return this.filter
        ? this.projects.filter(({ status }) => status === this.filter)
        : this.projects;
    },
  },
  methods: {
    addProject() {
      if (this.newProject.name.trim()) {
        this.projects.push({ ...this.newProject });
        this.newProject = {
          id: new Date().getTime(),
          name: "",
          description: "",
          status: "Nowy",
        };
        this.saveProjects();
      } else {
        alert("brak nazwy projektu");
      }
    },
    removeProject(id) {
      this.projects = this.projects.filter((project) => project.id !== id);
      this.saveProjects();
    },
    saveProjects() {
      localStorage.setItem("projects", JSON.stringify(this.projects));
      alert("Zmiany zapisane!");
    },
  },
};
</script>

<style>
.items-view {
  padding: 0 20px;
  .form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    * {
      margin-right: 5px;
    }

    .submit-btn {
      background-color: var(--main-color);
      color: var(--white-color);
      border-radius: 8px;
      padding: 8px 10px;
      border: 1px solid var(--main-color);
      transition: 0.3s;
      &:hover {
        background-color: var(--main-color-hover);
        color: var(--white-color);
      }
    }

    @media (min-width: 1200px) {
      width: auto;
      flex-direction: row;
    }
  }
  .list {
    display: flex;
    margin: 20px 0;

    table {
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 0;
      tbody {
        tr:nth-child(2n -1) td {
          background-color: var(--secondary-color);
        }
      }
      td,
      th {
        min-width: 50px;
        max-width: 50px;
        word-wrap: break-word;

        &.action {
          min-width: 50px;
          max-width: 50px;
        }

        @media (min-width: 1200px) {
          min-width: 200px;
          max-width: 200px;
          padding: 5px 3px;
        }
        &.action,
        &.status {
          text-align: center;
        }
      }

      td.action {
        button {
          background-color: var(--danger-color);
          border: 1px solid var(--danger-color);
          border-radius: 5px;
          padding: 4px 6px;
          color: var(--white-color);
          transition: 0.3;
          &:hover {
            background-color: var(--danger-color-hover);
          }
        }
      }
    }

    .filter {
      height: 35px;
      width: 20px;
      margin-left: 10px;
      border-radius: 10px;
      cursor: pointer;
      @media (min-width: 1200px) {
        width: auto;
      }
    }
  }
}
</style>
