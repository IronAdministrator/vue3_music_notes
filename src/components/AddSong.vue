<script setup>
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import useDocument from "@/composables/useDocument";

const props = defineProps(["playlist"]);
const { updateDoc } = useDocument("playlists", props.playlist.id);

const title = ref("");
const artist = ref("");
const showForm = ref(false);

const handleSubmit = async () => {
  let newSong = {
    title: title.value,
    artist: artist.value,
    id: uuidv4(),
  };
  await updateDoc({
    songs: [...props.playlist.songs, newSong],
  });
  console.log(newSong);
  title.value = "";
  artist.value = "";
};
</script>

<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Song</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song Title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button>Add</button>
    </form>
  </div>
</template>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
