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
          <img src="@/assets/images/music_school_logo_img.png" alt="music_school_logo" />
        </router-link>
      </div>
      <h1><router-link :to="{ name: 'HomeView' }">Music Notes</router-link></h1>
      <div class="links">
        <div v-if="user" class="nav-menu">
          <router-link :to="{ name: 'UserPlaylistsView' }">My Playlists</router-link>
          <router-link class="btn" :to="{ name: 'CreatePlaylistView' }">Create Playlist</router-link>
          <span>Hi, {{ user.displayName }}</span>
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

<style scoped lang="scss">
@import "@/assets/styles/components/_navbar.scss";
</style>
