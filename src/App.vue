<script setup lang="ts">
import { ref } from 'vue';

import Layout from '@/components/Layout/Layout.vue';

import { getProfile } from './utils/api/requests';
import { provideUserContext } from './utils/context/profile';
import { LOCAL_STORAGE_KEYS, DEFAULT_PROFILE } from './utils/constants';

const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
const profile = ref<Profile>(DEFAULT_PROFILE);

if (token) {
  getProfile().then((response) => (profile.value = response.data.profile));
  provideUserContext(profile);
}
</script>

<template>
  <n-message-provider>
    <n-spin v-if="token && !profile.email" size="small" />
    <layout v-else>
      <div class="content">
        <router-view />
      </div>
    </layout>
  </n-message-provider>
</template>

<style>
:root {
  --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
  --n-color: #fff;
  --n-text-color: rgb(51, 54, 57);
  --n-border-color: rgb(239, 239, 245);
  --side-padding: 32px;
}

.content {
  height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
