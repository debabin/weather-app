<script setup lang="ts">
import { ref } from 'vue';

import SingInForm from './components/SingInForm.vue';
import SingUpForm from './components/SingUpForm.vue';

const form = ref<'signin' | 'signup'>('signin');
</script>

<template>
  <SingInForm @goToSignUp="form = 'signup'" v-if="form === 'signin'" />
  <SingUpForm @goToSignIn="form = 'signin'" v-if="form === 'signup'" />
</template>

<style scoped>
.container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
