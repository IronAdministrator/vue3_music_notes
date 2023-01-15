<script setup>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import getUser from "@/composables/getUser";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import AddSong from "@/components/AddSong.vue";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  id: String,
});

const { document: playlist, error } = getDocument("playlists", route.params.id); // or use props.playlist.id instead of route.params.id
const { user } = getUser();
const { deleteDoc } = useDocument("playlists", route.params.id); // or use props.playlist.id instead of route.params.id
const { deleteImage } = useStorage();

// !computed property to check the ownership of playlist by current logged in user
const ownership = computed(() => {
  return playlist.value && user.value && user.value.uid === playlist.value.userId;
});

const handleDelete = async () => {
  await deleteImage(playlist.value.filePath);
  await deleteDoc();
  router.push({ name: "HomeView" });
};
</script>

<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="Cover Image" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p>Created by {{ playlist.username }}</p>
      <p>{{ playlist.description }}</p>
      <!-- // !showing delete button if ownership returns "true" -->
      <!-- <button v-if="ownership">Delete playlist</button> -->
      <!-- // !showing delete button if current logged in user id is equal to plalist creator's user id -->
      <button v-if="ownership" @click="handleDelete">Delete playlist</button>
    </div>
    <div class="song-list">
      <div v-if="!playlist.songs.length">"No songs added yet"</div>
      <div class="single-song" v-else v-for="song in playlist.songs" :key="song.id">
        {{ song.title }}
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>
