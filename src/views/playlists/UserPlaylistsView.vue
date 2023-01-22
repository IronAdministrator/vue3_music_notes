<script setup>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import Playlist from "@/components/Playlist.vue";

const { user } = getUser();

const { documents: playlists, error } = getCollection("playlists", [
  "userId",
  "==",
  user.value.uid,
]);

console.log(playlists);
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <div class="user-playlist" v-if="playlists">
    <h2>My playlist</h2>
    <Playlist :playlists="playlists" />
  </div>
  <router-link class="btn" :to="{ name: 'CreatePlaylistView' }"
    >Create Playlist</router-link
  >
</template>

<style scoped>
h2 {
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--secondary);
}
.btn {
  margin-top: 20px;
}
</style>
