import { createRouter, createWebHistory } from "vue-router";
import ProjectsView from "../views/ProjectsView.vue";
import TasksView from "../views/TasksView.vue";

const routes = [
  {
    path: "/",
    name: "projects",
    component: ProjectsView,
  },
  {
    path: "/tasks",
    name: "TasksView",
    component: TasksView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
