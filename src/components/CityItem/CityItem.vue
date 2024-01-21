<script setup lang="ts">
import { computed } from 'vue';
import { ChevronForward } from '@vicons/ionicons5';

import { useQuery } from '@/utils/api/hooks';
import { getForecast } from '@/utils/api/requests';
import { router, cacheWithTimer } from '@/utils/constants';

const emit = defineEmits<{ delete: [] }>();
const { name, onDelete } = defineProps<{ name: string; onDelete?: (event: Event) => void }>();
const cache = cacheWithTimer.get<{ location: Weather.Location; current: Weather.Current }>(name);

const getForecastQuery = useQuery(
  () => getForecast({ q: name, days: 1, alerts: 'no', aqi: 'no' }),
  {
    skip: !!cache,
    onSuccess: ({ data }) => cacheWithTimer.set(name, data, 60_000)
  }
);
const goToCity = () => router.push({ name: 'city', params: { id: name } });

const city = computed(() => cache ?? getForecastQuery.data.value);

let feelsLikeTagType = computed(() => {
  if (city?.value) {
    const feelslike = city?.value.current.feelslike_c;
    if (feelslike < 0) return 'info';
    if (feelslike > 0 && feelslike < 20) return 'warning';
    if (feelslike > 20) return 'error';
  } else return 'info';
});
</script>

<template>
  <n-skeleton
    v-if="getForecastQuery.loading.value && !city"
    size="small"
    height="145px"
    width="100%"
  />
  <n-card
    v-else
    round
    size="small"
    :title="city?.location.name"
    :closable="onDelete"
    @close="$emit('delete')"
  >
    <n-space size="small" vertical>
      <n-space :size="[2, 2]">
        <n-image width="40" :src="city?.current.condition.icon" />
        <n-text class="temp">{{ city?.current.temp_c }}°</n-text>
      </n-space>

      <n-space :size="[2, 2]" justify="space-between">
        <n-space :size="[2, 2]">
          <n-tag size="medium" type="info" round :bordered="false">
            {{ city?.current.condition.text.toLowerCase() }}
          </n-tag>
          <n-tag size="medium" :type="feelsLikeTagType" round :bordered="false">
            FL: {{ city?.current.feelslike_c }}°
          </n-tag>
        </n-space>
        <n-button tertiary circle size="small" @click="goToCity">
          <template #icon>
            <n-icon :component="ChevronForward" />
          </template>
        </n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

<style>
.temp {
  font-size: 25px;
}

.temp_text {
  font-size: 10px;
}
</style>
