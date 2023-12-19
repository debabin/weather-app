<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useMutation, useQuery } from '@/utils/api/hooks';
import { postCity, deleteCity, getForecast } from '@/utils/api/requests';
import { useProfileContext } from '@/utils/context/profile';

const route = useRoute();
const cityId = route.params.id.toString();

const getForecastQuery = useQuery(() =>
  getForecast({ q: cityId, days: 10, alerts: 'yes', aqi: 'yes' })
);

const profile = useProfileContext().profile;
const isCitySaved = computed(() => profile.value.cities.some((city) => city === cityId));

const deleteCityMutation = useMutation(deleteCity);
const postCityMutation = useMutation(postCity);

const onDelete = async () => {
  await deleteCityMutation.execute({ id: cityId });
  profile.value.cities = profile.value.cities.filter((id) => id !== cityId);
};
const onAdd = async () => {
  await postCityMutation.execute({ data: { id: cityId } });
  profile.value.cities.push(cityId);
};
</script>

<template>
  <section class="container">{{ getForecastQuery.data.value?.location.name }}</section>
  <button v-if="isCitySaved" @click="onDelete">delete</button>
  <button v-else @click="onAdd">add</button>
</template>
