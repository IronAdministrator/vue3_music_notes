<script setup>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";

const email = ref("");
const password = ref("");

const { error, login, isPending } = useLogin();

const handleSubmit = async () => {
  const res = await login(email.value, password.value);
  if (!error.value) {
    console.log("user logged in");
    // emit("toChat");
    // router.push({name: "ChatroomView"})
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Log in</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button :disabled="isPending">{{ isPending ? "Loading..." : "Log in" }}</button>
    <!-- <button v-if="!isPending">Log in</button> -->
    <!-- <button v-if="isPending" disabled>Loading...</button> -->
  </form>
</template>

<style></style>
