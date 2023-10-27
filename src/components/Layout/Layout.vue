<script setup lang="ts">
import { Sunny } from '@vicons/ionicons5';
import { darkTheme, lightTheme } from 'naive-ui';
import { useStorage } from '@vueuse/core';

import { THEME_KEY } from '@/utils/constants';
import { ref } from 'vue';

const theme = ref(lightTheme);
const toggleTheme = () => {
  const storagedTheme = useStorage(THEME_KEY, 'light');
  const updatedTheme = storagedTheme.value === 'dark' ? 'light' : 'dark';
  theme.value = storagedTheme.value === 'light' ? lightTheme : darkTheme;
  storagedTheme.value = updatedTheme;
};
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <n-layout>
      <n-layout-header class="header_container">
        <div class="container header">
          <n-text>🌦️ weather app</n-text>
          <n-icon size="30" @click="toggleTheme">
            <sunny />
          </n-icon>
        </div>
      </n-layout-header>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px">
        <slot />
      </v-main>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.header_container {
  padding: 5px 0;
  border-bottom: solid 1px var(--n-border-color);
}
.header {
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header i {
  cursor: pointer;
}
</style>
