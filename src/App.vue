<template>
  <n-message-provider>
    <layout>
      <div class="content">
        <router-view />
      </div>
    </layout>
  </n-message-provider>
</template>

<script setup lang="ts">
import Layout from './components/Layout/Layout.vue';
</script>

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
  max-width: 700px;
  margin: 0 auto;
}
</style>
