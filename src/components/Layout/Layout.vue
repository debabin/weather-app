<script setup lang="ts">
import { ref } from 'vue';
import { Sunny, Person } from '@vicons/ionicons5';
import { darkTheme, lightTheme } from 'naive-ui';
import { useStorage } from '@vueuse/core';

import { LOCAL_STORAGE_KEYS, router } from '@/utils/constants';
import { useProfileContext } from '@/utils/context/profile';

const profile = useProfileContext().profile;

const storagedTheme = useStorage(LOCAL_STORAGE_KEYS.THEME, 'light');
const theme = ref(storagedTheme.value === 'dark' ? darkTheme : lightTheme);

const toggleTheme = () => {
  const updatedTheme = storagedTheme.value === 'dark' ? 'light' : 'dark';
  theme.value = storagedTheme.value === 'dark' ? lightTheme : darkTheme;
  storagedTheme.value = updatedTheme;
};

const goToProfile = () => router.push({ name: 'profile' });
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-layout>
      <n-layout-header class="header_container">
        <div class="container header">
          <n-text>🌦️ weather app</n-text>
          <n-icon size="20" v-if="profile.email" @click="goToProfile" :component="Person" />
          <n-icon size="20" @click="toggleTheme" :component="Sunny" />
        </div>
      </n-layout-header>

      <slot />
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.header_container {
  padding: 5px 0;
  border-bottom: solid 1px var(--n-border-color);
}
.header {
  padding: 0 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header i {
  cursor: pointer;
}
</style>
