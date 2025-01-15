<template>
  <div class="projects-view">
    <h2>Projekty</h2>
    <form @submit.prevent="addProject" class="form">
      <input v-model="newProject.name" placeholder="Nazwa" />
      <input v-model="newProject.description" placeholder="Opis" />
      <select v-model="newProject.status">
        <option>Nowy</option>
        <option>W trakcie</option>
        <option>Zakończony</option>
      </select>
      <button type="submit">Dodaj</button>
    </form>
    <section class="list">
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="project in filteredProjects" :key="project.id">
            <td>{{ project.name }}</td>
            <td>{{ project.description }}</td>
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

<style scoped>
.projects-view {
  padding: 0 20px;
  .form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    @media (min-width: 1200px) {
      width: auto;
      flex-direction: row;
    }
  }
  .list {
    display: flex;
    margin: 20px 0;

    tbody {
      tr:nth-child(2n -1) td {
        background-color: #e7e5e5;
      }
    }
    td,
    th {
      min-width: 50px;
      max-width: 50px;
      word-wrap: break-word;

      @media (min-width: 1200px) {
        min-width: 250px;
        max-width: 250px;
      }
      &.action,
      &.status {
        text-align: center;
      }
    }
    .filter {
      height: 35px;
      width: 20px;
      @media (min-width: 1200px) {
        width: auto;
      }
    }
  }
}
</style>
