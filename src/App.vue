<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo";
import { mapState } from "pinia";
import { headers, UserAPI } from "@/endpoints";
</script>

<template>
  <header>
    <div class="wrapper">
      <input id="menu_toggle" type="checkbox" />
      <label class="menu_btn" for="menu_toggle">
        <span></span>
      </label>
      <div>Punkte: 0</div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <div id="profile_info">
        <img id="profile_picture" v-show="userInfo.picture" :src="userInfo.picture" />
        <span>{{ userInfo.username }}</span>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script>
export default {
  data: () => {
    return {
      collapseNav: true,
    };
  },
  computed: {
    ...mapState(useUserInfoStore, ["userInfo"]),
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
header {
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--color-text);
  background: rgb(191, 4, 197);
  background-image: linear-gradient(to left, rgba(255, 0, 0, 0), rgba(14, 117, 235, 0.7));
  justify-content: space-between;
  width: 100%;
  display: flex;
  align-items: center;
}

header .wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
}

nav {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  order: 3;
  flex-basis: 100%;
  flex-direction: column;
  overflow: hidden;
  transition: 1s;
  height: 5rem;
  align-items: center;
}

/*
  Burger Menu
*/

#menu_toggle:not(:checked) ~ nav {
  height: 0px;
}

#menu_toggle {
  display: inline-block;
  flex-grow: 1;
}

#menu_toggle {
  opacity: 0;
}
#menu_toggle:checked + .menu_btn > span {
  transform: rotate(45deg);
}
#menu_toggle:checked + .menu_btn > span::before {
  top: 0;
  transform: rotate(0deg);
}
#menu_toggle:checked + .menu_btn > span::after {
  top: 0;
  transform: rotate(90deg);
}
#menu_toggle:checked ~ .menu_box {
  left: 0 !important;
}

.menu_btn {
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 1;
  order: -1;
  left: 5px;
  top: 10px;
}
.menu_btn > span,
.menu_btn > span::before,
.menu_btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  transition-duration: 0.25s;
}
.menu_btn > span::before {
  content: "";
  top: -8px;
}
.menu_btn > span::after {
  content: "";
  top: 8px;
}

/*
 Burger Menu End
*/

nav a.router-link-exact-active {
  text-decoration: underline;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  font-size: 1.5rem;
  text-decoration: none;
}

nav a:visited {
  color: var(--color-text);
}

nav a:first-of-type {
  border: 0;
}

.wrapper div {
  flex-grow: 2;
}

#profile_picture {
  height: 50px;
  border-radius: 25px;
}

#profile_info {
  display: flex;
  align-items: center;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  .wrapper div {
    flex-grow: unset;
  }

  nav {
    font-size: 1rem;
    order: unset;
    flex-basis: unset;
    flex-direction: row;
    display: flex;
    transition: none;
  }

  nav a {
    border-left: 1px solid var(--color-text);
  }

  #menu_toggle {
    display: none;
  }

  #menu_toggle:not(:checked) ~ nav {
    height: unset;
  }

  .menu_btn {
    display: none;
  }
}
</style>
