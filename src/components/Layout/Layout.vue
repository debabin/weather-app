<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Sunny, Person, Moon } from '@vicons/ionicons5';
import { darkTheme, lightTheme } from 'naive-ui';
import { useStorage } from '@vueuse/core';

import { LOCAL_STORAGE_KEYS, ROUTES, router } from '@/utils/constants';
import { useProfileContext } from '@/utils/context/profile';

const profile = useProfileContext().profile;

const storedTheme = useStorage(LOCAL_STORAGE_KEYS.THEME, 'light');
const theme = ref(storedTheme.value === 'dark' ? darkTheme : lightTheme);

const toggleTheme = () => {
  const updatedTheme = storedTheme.value === 'dark' ? 'light' : 'dark';
  theme.value = storedTheme.value === 'dark' ? lightTheme : darkTheme;
  storedTheme.value = updatedTheme;
};

const goToProfile = () => router.push({ name: 'profile' });
</script>

<template>
  <n-config-provider :theme="theme">
    <n-layout>
      <n-layout-header class="header_container">
        <div class="container header">
          <div>
            <router-link :to="ROUTES.HOME">
              <n-text>🌦️ weather app</n-text>
            </router-link>
          </div>

          <n-flex size="medium">
            <div>
              <n-icon size="20" v-if="profile.email" @click="goToProfile" :component="Person" />
            </div>
            <div>
              <n-icon
                size="20"
                @click="toggleTheme"
                :component="theme.name === 'light' ? Sunny : Moon"
              />
            </div>
          </n-flex>
        </div>
      </n-layout-header>

      <slot />
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.header_container {
  padding: 15px 0;
  border-bottom: solid 1px var(--n-border-color);
}
.header_container a {
  text-decoration: none;
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
