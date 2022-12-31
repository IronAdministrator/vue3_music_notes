<script setup>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";

const { url, filePath, error, uploadImage } = useStorage();

const title = ref("");
const description = ref("");
const file = ref(null);
const fileError = ref(null);

// alowed file types:
const fileTypes = ["image/png", "image/jpeg"];

const handleSubmit = async () => {
  if (file.value) {
    // console.log(title.value, description.value, file.value);
    await uploadImage(file.value);
    console.log("Image uploaded. URL: ", url.value);
  }
};

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  // console.log(selectedFile);

  if (selectedFile && fileTypes.includes(selectedFile.type)) {
    file.value = selectedFile;
    fileError.value = null;
  } else {
    file.value = null;
    fileError.value = "Please select an image file ('png' of 'jpeg')";
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist description..."
      v-model="description"
    ></textarea>
    <label>Upload Playlist Cover Image</label>
    <input type="file" @change="handleFileChange" />
    <div v-if="fileError" class="error">{{ fileError }}</div>
    <!-- <div v-if="error" class="error"></div> -->
    <button>Create</button>
  </form>
</template>

<style scoped>
form {
  background: white;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
