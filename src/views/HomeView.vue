<script setup>
import getCollection from "@/composables/getCollection";
import Playlist from "@/components/Playlist.vue";
import getUser from "@/composables/getUser";

const { user } = getUser();

const { documents: playlists, error } = getCollection("playlists");
</script>

<template>
  <div v-if="!user" class="video">
    <div class="bg-video">
      <video class="bg-video__content" autoplay muted loop>
        <source src="@/assets/video/ocean_on_a_woman.mp4" type="video/mp4" />
        <!-- <source src="img/video.webm" type="video/webm" /> -->
        Your Browser is not Supported!
      </video>
    </div>
  </div>

  <div v-else class="home">
    <div v-if="error">{{ error }}</div>
    <div class="playlist-container" v-if="playlists">
      <Playlist :playlists="playlists" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped lang="scss">
.video {
  // position: relative;
  // height: 100vh;
  // width: 100vw;

  .bg-video {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: 0.8;
    overflow: hidden;

    &__content {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
