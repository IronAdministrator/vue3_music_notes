<script setup>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { error, logout, isPending } = useLogout();

const { user } = getUser();

const handleLogout = async () => {
  await logout();
  if (!error.value) {
    console.log("user logged out!");
    router.push({ name: "LoginView" });
  }
};
</script>

<template>
  <div class="navbar">
    <nav>
      <div class="logo-container">
        <router-link :to="{ name: 'HomeView' }">
          <img src="@/assets/music_school_logo_img.png" alt="music_school_logo" />
        </router-link>
      </div>
      <h1><router-link :to="{ name: 'HomeView' }">Music Notes</router-link></h1>
      <div class="links">
        <div v-if="user" class="nav-menu">
          <p>Hi, {{ user.displayName }}</p>
          <router-link class="btn" :to="{ name: 'CreatePlaylistView' }"
            >Create Playlist</router-link
          >
          <button @click="handleLogout" :disabled="isPending">
            {{ isPending ? "Loading..." : "Logout" }}
          </button>
        </div>
        <div v-if="!user" class="nav-menu">
          <router-link class="btn" :to="{ name: 'SignupView' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'LoginView' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  padding: 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav .logo-container {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  overflow: hidden;
}
nav .logo-container img {
  max-height: 70px;
  scale: 1.5;
}
nav h1 {
  display: none;
}
nav .links {
  margin-left: auto;
  display: flex;
  gap: 1rem;
}
nav .links .nav-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}
nav .links a,
button {
  font-size: 14px;
}

@media only screen and (min-width: 568px) {
  nav h1 {
    display: block;
    margin-left: 20px;
  }
}
</style>
