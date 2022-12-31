<script setup>
import getCollection from "@/composables/getCollection";
import Playlist from "@/components/Playlist.vue";

const { documents: playlists, error } = getCollection("playlists");
</script>

<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    <div class="playlist-container" v-if="playlists">
      <Playlist :playlists="playlists" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>
.playlist-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
