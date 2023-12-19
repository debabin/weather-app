<script setup lang="ts">
import { ref } from 'vue';
import { watchDebounced } from '@vueuse/core';

import CityItem from '@/components/CityItem/CityItem.vue';
import { useMutation, useQuery } from '@/utils/api/hooks';
import { getCities, getSearch, deleteCity } from '@/utils/api/requests';
import { router } from '@/utils/constants';

import SearchInput from './components/SearchInput/SearchInput.vue';

// delete cors
// default cities to mock request
// use query params for refetch
// add pagination logic for cities req

const search = ref('');
const defaultCities = [
  'tomsk-tomsk-russia',
  'novosibirsk-novosibirsk-russia',
  'new-york-new-york-united-states-of-america',
  'paris-ile-de-france-france',
  'australind-western-australia-australia',
  'toronto-ontario-canada'
];
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

const deleteCityMutation = useMutation(deleteCity);
const getCitiesQuery = useQuery((args: { limit: number; offset: number }) =>
  getCities({ limit: 5, offset: 5 })
);

const goToCity = (id: string) => router.push({ name: 'city', params: { id } });
const onDelete = async (id: string) => {
  await deleteCityMutation.execute({ id });
  getCitiesQuery.refetch({ limit: 5, offset: 5 });
};
</script>

<template>
  <section class="container">
    <div class="search_container">
      <SearchInput />
    </div>

    <div class="cities_container">
      <n-h2 prefix="bar" align-text type="info">
        <n-text type="info">Popular cities</n-text>
      </n-h2>

      <n-grid x-gap="12" y-gap="12" :cols="3">
        <n-gi v-for="defaultCity in defaultCities" :key="defaultCity">
          <CityItem :name="defaultCity" />
        </n-gi>
      </n-grid>
    </div>

    <div class="cities_container">
      <n-h2 prefix="bar" align-text type="info">
        <n-text type="info">User cities</n-text>
      </n-h2>

      <n-grid x-gap="12" y-gap="12" :cols="3">
        <n-gi v-for="city in getCitiesQuery.data.value" :key="city">
          <CityItem :name="city" @delete="onDelete(city)" />
        </n-gi>
      </n-grid>
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
  margin-top: 20px;
}
</style>
