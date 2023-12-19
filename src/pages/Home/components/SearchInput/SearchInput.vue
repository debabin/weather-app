<script setup lang="ts">
import { ref } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { Sunny, Search } from '@vicons/ionicons5';

import { useMutation } from '@/utils/api/hooks';
import { getSearch } from '@/utils/api/requests';
import { router } from '@/utils/constants';

const isFocused = ref(false);
const search = ref('');
const cities = ref<City[]>([]);

const getSearchMutation = useMutation(getSearch);
const isLoading = getSearchMutation.loading;

watchDebounced(
  search,
  async () => {
    if (!search.value) return (cities.value = []);

    const response = await getSearchMutation.execute({ q: search.value });
    if (response.data.length) cities.value = response.data;
  },
  { debounce: 1000 }
);

const goToCity = (id: string) => router.push({ name: 'city', params: { id } });
</script>

<template>
  <div class="container">
    <n-input
      round
      clearable
      type="text"
      size="large"
      placeholder="Find city"
      @focus="isFocused = true"
      @blur="isFocused = false"
      v-model:value="search"
      :loading="isLoading"
    >
      <template #prefix>
        <n-icon color="white" size="20" :component="Search" />
      </template>
    </n-input>
    <div class="cities_container" v-if="isFocused">
      <n-list hoverable clickable bordered>
        <n-list-item v-for="city in cities" :key="city.id" @click="goToCity(city.url)">
          <n-thing :title="city.name" content-style="margin-top: 5px;">
            <n-space size="small" style="margin-top: 4px">
              <n-tag :bordered="false" type="info" size="small">{{ city.region }}</n-tag>
            </n-space>

            <n-text strong depth="3" class="country">
              {{ city.country }}
            </n-text>
          </n-thing>
        </n-list-item>
        <n-list-item v-if="!cities.length">No cities</n-list-item>
      </n-list>
    </div>
  </div>
  <div v-if="isFocused" class="fader" />
</template>

<style scoped>
.container {
  z-index: 9998;
  position: relative;
}

.cities_container {
  z-index: 9999;
  position: absolute;
  top: 50px;
  right: 0;
  width: 100%;
}

.country {
  font-size: 10px;
}

.fader {
  z-index: 9997;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
