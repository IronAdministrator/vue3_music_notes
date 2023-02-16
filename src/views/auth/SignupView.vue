<script setup>
import useSignup from "@/composables/useSignup";
import { ref } from "vue";

const displayName = ref("");
const email = ref("");
const password = ref("");

const { error, signup, isPending } = useSignup();

const handleSubmit = async () => {
  const res = await signup(email.value, password.value, displayName.value);
  if (!error.value) {
    console.log("user signed up");
    router.push({ name: "UserPlaylistsView" });
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" required placeholder="Display name" v-model="displayName" />
    <input type="email" required placeholder="Email" v-model="email" />
    <input type="password" required placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button :disabled="isPending">{{ isPending ? "Loading..." : "Sign up" }}</button>
    <!-- <button v-if="!isPending">Sign up</button> -->
    <!-- <button v-if="isPending" disabled>Loading...</button> -->
</form>
</template>

<style></style>
