<template>
  <div class="items-view">
    <h2>Zadania</h2>
    <form @submit.prevent="addTask" class="form">
      <input v-model="newTask.name" placeholder="Nazwa" />
      <input v-model="newTask.description" placeholder="Opis" />
      <select v-model="newTask.status">
        <option>Nowy</option>
        <option>W trakcie</option>
        <option>Zakończony</option>
      </select>
      <select v-model="newTask.project">
        <option v-for="project in projects" :key="project.id">
          {{ project?.name }}
        </option>
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
            <th>Projekt</th>
            <th class="action">Akcje</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="task in filteredTasks" :key="task.id">
            <td>{{ task.name }}</td>
            <td :style="!task.description && { textAlign: 'center' }">
              {{ task.description || "-" }}
            </td>
            <td class="status">{{ task.status }}</td>
            <td :style="!task.project && { textAlign: 'center' }">
              {{ task.project || "-" }}
            </td>
            <td class="action">
              <button @click="removeTask(task.id)">Usuń</button>
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
      tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
      newTask: {
        id: new Date().getTime(),
        name: "",
        description: "",
        project: "",
        status: "Nowy",
      },
      filter: "",
    };
  },
  computed: {
    filteredTasks() {
      return this.filter
        ? this.tasks.filter(({ status }) => status === this.filter)
        : this.tasks;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.name.trim()) {
        this.tasks.push({ ...this.newTask });
        this.newTask = {
          id: new Date().getTime(),
          name: "",
          description: "",
          project: "",
          status: "Nowy",
        };
        this.saveTasks();
      } else {
        alert("brak nazwy zadania");
      }
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      alert("Zmiany zapisane!");
    },
  },
};
</script>
