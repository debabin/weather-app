<script setup lang="ts">
import { ref } from 'vue';
import { watchDebounced } from '@vueuse/core';

import { useMutation } from '@/utils/api/hooks';
import { getSearch } from '@/utils/api/requests';

const search = ref('');
const cities = ref<City[]>([]);

const getSearchMutation = useMutation(getSearch);
const isLoading = getSearchMutation.loading;

watchDebounced(
  search,
  async () => {
    const response = await getSearchMutation.execute({ q: search.value });
    if (response.data.length) cities.value = response.data;
  },
  { debounce: 1000 }
);
</script>

<template>
  <section class="container">
    <div class="search_container">
      <div>
        <n-input
          v-model:value="search"
          :disabled="isLoading"
          size="tiny"
          type="text"
          placeholder="Find city"
        />
        <div class="cities_container">
          <ul v-if="cities.length">
            <li v-for="city in cities" :key="city.id">
              {{ city.name }}
            </li>
          </ul>
          <div v-else>no cities</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.search_container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;

  margin-top: 30px;
}

.cities_container {
  position: absolute;
}
</style>
