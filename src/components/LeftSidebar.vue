<template>
  <nav class="nav" :class="{ collapsed: !isExpanded }">
    <button class="toggle">
      <img
        @click="$emit('toggle-menu')"
        src="../assets/bars-solid.svg"
        width="20"
        height="20"
      />
    </button>
    <div class="nav-item">
      <router-link to="/" class="nav-item-link">
        <img
          src="../assets/house-solid.svg"
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
          src="../assets/list-check-solid.svg"
          alt="tasks"
          width="20"
          height="20"
        />
        <span v-show="isExpanded">Tasks</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "LeftSidebar",
  props: {
    isExpanded: Boolean,
  },
};
</script>

<style scoped>
.nav {
  padding: 5px;
  width: 100px;
  transition: all 0.3s;

  .toggle {
    background-color: transparent;
    border: none;
    padding: 9px;
    display: block;
  }

  .nav-item {
    .nav-item-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #31ab74;
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
</style>
