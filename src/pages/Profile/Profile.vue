<script setup lang="ts">
import CityItem from '@/components/CityItem/CityItem.vue';
import { useMutation, useQuery } from '@/utils/api/hooks';
import { deleteCity, getCities } from '@/utils/api/requests';
import { useProfileContext } from '@/utils/context/profile';

const profile = useProfileContext().profile;

const getCitiesQuery = useQuery((args: { limit: number; offset: number }) =>
  getCities({ limit: 5, offset: 5 })
);
const deleteCityMutation = useMutation(deleteCity);

const onDelete = async (id: string) => {
  await deleteCityMutation.execute({ id });
  getCitiesQuery.refetch({ limit: 5, offset: 5 });
};
</script>

<template>
  <section class="container">
    <div>
      {{ profile?.email }}
    </div>
    <div class="cities_container">
      <n-h2 prefix="bar" align-text type="info">
        <n-text type="info">Cities</n-text>
      </n-h2>

      <n-grid x-gap="12" y-gap="12" :cols="3">
        <n-gi v-for="city in getCitiesQuery.data.value" :key="city">
          <CityItem :name="city" @delete="onDelete(city)" />
        </n-gi>
      </n-grid>
    </div>
  </section>
</template>
