<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="content">
    <router-view v-slot="{ Component, route }">
      <Transition name="slide-fade" mode="out-in">
        <div :key="route.fullPath">
          <component :is="Component"></component>
        </div>
      </Transition>
    </router-view>
  </div>
</template>

<style>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
