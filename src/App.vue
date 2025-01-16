<template>
  <div class="page">
    <section class="logo">
      <img src="./assets/logo.png" alt="logo vue" width="35" height="35" />
    </section>
    <LeftSidebar :isExpanded="isExpanded" @toggle-menu="toggleMenu" />
  </div>
  <router-view />
</template>

<script>
import LeftSidebar from "./components/LeftSidebar.vue";

export default {
  components: {
    LeftSidebar,
  },
  data() {
    return {
      isExpanded: JSON.parse(localStorage.getItem("menuExpanded") || "true"),
    };
  },
  methods: {
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
      localStorage.setItem("menuExpanded", this.isExpanded);
      alert("Zmiana zapisana w localstorage");
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

button {
  cursor: pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;

  --main-color: #04aa6d;
  --main-color-hover: #028957;
  --danger-color: #e53030;
  --danger-color-hover: #c91919;

  --secondary-color: #e7e5e5;
  --white-color: #fff;
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
}
</style>
