<script setup lang="ts">
import { Sunny } from '@vicons/ionicons5';
import { darkTheme, lightTheme } from 'naive-ui';
import { useStorage } from '@vueuse/core';

import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { ref } from 'vue';

const storagedTheme = useStorage(LOCAL_STORAGE_KEYS.THEME, 'light');
const theme = ref(storagedTheme.value === 'dark' ? darkTheme : lightTheme);

const toggleTheme = () => {
  const updatedTheme = storagedTheme.value === 'dark' ? 'light' : 'dark';
  theme.value = storagedTheme.value === 'dark' ? lightTheme : darkTheme;
  storagedTheme.value = updatedTheme;
};
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-layout>
      <n-layout-header class="header_container">
        <div class="container header">
          <n-text>🌦️ weather app</n-text>
          <n-icon size="20" @click="toggleTheme">
            <sunny />
          </n-icon>
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
