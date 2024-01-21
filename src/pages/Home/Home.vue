<script setup lang="ts">
import { ref, watch } from 'vue';
import { watchDebounced } from '@vueuse/core';

import CityItem from '@/components/CityItem/CityItem.vue';
import { useMutation, useQuery } from '@/utils/api/hooks';
import { getCities, getSearch, deleteCity, getCitiesPopular } from '@/utils/api/requests';

import SearchInput from './components/SearchInput/SearchInput.vue';

// delete cors

const CITIES_LIMIT = 6;

const search = ref('');
const getSearchMutation = useMutation(getSearch);
watchDebounced(
  search,
  async () => {
    const response = await getSearchMutation.execute({ q: search.value });
    if (response.data.length) cities.value = response.data;
  },
  { debounce: 1000 }
);

const page = ref(1);

const cities = ref<City[]>([]);

const deleteCityMutation = useMutation(deleteCity);
const getCitiesQuery = useQuery(() =>
  getCities({ data: { limit: CITIES_LIMIT, offset: (page.value - 1) * CITIES_LIMIT } })
);
watch(page, getCitiesQuery.refetch);

const getCitiesPopularQuery = useQuery(getCitiesPopular);

const onDelete = async (id: string) => {
  await deleteCityMutation.execute({ data: { id } });
  getCitiesQuery.refetch();
};
</script>

<template>
  <section class="container">
    <div class="search_container">
      <SearchInput />
    </div>

    <div class="cities_container">
      <n-h2 align-text type="info">
        <n-text type="info">Popular cities</n-text>
      </n-h2>

      <n-skeleton v-if="getCitiesPopularQuery.loading.value" height="300px" width="100%" />
      <n-grid v-else x-gap="12" y-gap="12" cols="1 s:2 m:3" responsive="screen">
        <n-gi v-for="citiesPopular in getCitiesPopularQuery.data.value" :key="citiesPopular">
          <CityItem :name="citiesPopular" />
        </n-gi>
      </n-grid>
    </div>

    <div class="user_cities_container">
      <n-h2 align-text type="info">
        <n-text type="info">User cities</n-text>
      </n-h2>

      <n-flex v-if="getCitiesQuery.loading.value" vertical size="large" align="center">
        <n-skeleton height="300px" width="100%" />
        <n-skeleton size="small" width="30%" />
      </n-flex>

      <n-flex v-else vertical size="large">
        <n-grid x-gap="12" y-gap="12" cols="1 s:2 m:3" responsive="screen">
          <n-gi v-for="city in getCitiesQuery.data.value?.data" :key="city">
            <CityItem :name="city" @delete="onDelete(city)" />
          </n-gi>
        </n-grid>

        <n-flex
          justify="center"
          v-if="getCitiesQuery.data.value && getCitiesQuery.data.value.total > CITIES_LIMIT"
        >
          <n-pagination
            v-model:page="page"
            :page-count="Math.round(getCitiesQuery.data.value.total / CITIES_LIMIT)"
          />
        </n-flex>
      </n-flex>
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
}

.cities_container {
  margin-top: 20px;
}

.user_cities_container {
  margin-top: 50px;
}

.user_cities_container h2,
.cities_container h2 {
  text-align: center;
}
</style>
