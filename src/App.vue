<template>
  <div class="page">
    <section class="logo">
      <img src="./assets/logo.png" alt="logo vue" width="35" height="35" />
    </section>
    <nav class="nav" :class="{ collapsed: !isExpanded }">
      <button class="toggle">
        <img
          @click="toggleMenu"
          src="./assets/bars-solid.svg"
          width="20"
          height="20"
        />
      </button>
      <div class="nav-item">
        <router-link to="/" class="nav-item-link">
          <img
            src="./assets/house-solid.svg"
            alt="projects"
            width="20"
            height="20"
          />
          <span v-show="isExpanded">Projects</span>
        </router-link>
      </div>

      <div class="nav-item">
        <router-link to="/tasks" class="nav-item-link">
          <img
            src="./assets/list-check-solid.svg"
            alt="tasks"
            width="20"
            height="20"
          />
          <span v-show="isExpanded">Tasks</span>
        </router-link>
      </div>
    </nav>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      isExpanded: JSON.parse(localStorage.getItem("menuExpanded") || "true"),
    };
  },
  methods: {
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
      localStorage.setItem("menuExpanded", this.isExpanded);
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}

.page {
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  height: 100vh;

  .logo {
    float: left;
    padding: 10px;
  }

  .nav {
    padding: 5px;
    width: 100px;
    transition: all 0.3s;

    .toggle {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 9px;
      display: block;
    }

    .nav-item {
      .nav-item-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #42b983;
        span {
          margin-left: 5px;
        }
      }
    }
  }

  .collapsed {
    width: 50px;
  }
  nav a {
    display: block;
    padding: 0.5rem;
  }
}
</style>
