<script setup lang="ts">
import { watchEffect } from 'vue';
import { ChevronForward } from '@vicons/ionicons5';

import { useQuery } from '@/utils/api/hooks';
import { getForecast } from '@/utils/api/requests';
import { router } from '@/utils/constants';

const emit = defineEmits<{ delete: [] }>();
const { name, onDelete } = defineProps<{ name: string; onDelete?: (event: Event) => void }>();

const getForecastQuery = useQuery(() => getForecast({ q: name, days: 1, alerts: 'no', aqi: 'no' }));
const goToCity = () => router.push({ name: 'city', params: { id: name } });

watchEffect(() => console.log('@', getForecastQuery.loading.value));
// const { current, location } = getForecastQuery.data.value;
// const feelsLikeTagType = getForecastQuery.data.value?.current.feelslike_c > 15 ? 'info' : 'warning';
</script>

<template>
  <n-skeleton
    v-if="getForecastQuery.loading.value"
    :style="{
      '--n-color-start': 'rgba(255, 255, 255, 0.12)',
      '--n-color-end': 'rgba(255, 255, 255, 0.18)'
    }"
    height="140px"
    width="260px"
    :sharp="true"
  />
  <n-card
    v-else
    round
    size="small"
    :title="getForecastQuery.data.value?.location.name"
    :closable="onDelete"
    @close="$emit('delete')"
  >
    <n-space size="small" vertical>
      <n-space :size="[2, 2]">
        <n-image width="40" :src="getForecastQuery.data.value?.current.condition.icon" />
        <n-text class="temp">{{ getForecastQuery.data.value?.current.temp_c }}°</n-text>
      </n-space>

      <n-space :size="[2, 2]" justify="space-between">
        <n-space :size="[2, 2]">
          <n-tag size="medium" type="info" round :bordered="false">
            {{ getForecastQuery.data.value?.current.condition.text.toLowerCase() }}
          </n-tag>
          <n-tag size="medium" type="info" round :bordered="false">
            FL: {{ getForecastQuery.data.value?.current.feelslike_c }}°
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
