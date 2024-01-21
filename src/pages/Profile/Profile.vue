<script setup lang="ts">
import { ref } from 'vue';
import type { FormInst } from 'naive-ui';

import CityItem from '@/components/CityItem/CityItem.vue';
import { useMutation, useQuery } from '@/utils/api/hooks';
import { deleteCity, getCities, putProfile } from '@/utils/api/requests';
import { useProfileContext } from '@/utils/context/profile';

const profile = useProfileContext().profile;
const updateProfile = useProfileContext().updateProfile;

const formRef = ref<FormInst | null>(null);
const model = ref({ email: profile.value.email, name: profile.value.name });
const rules = {
  email: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'please input email'
  },
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'please input name'
  }
};

const isChangeProfile = ref(false);

const getCitiesQuery = useQuery(() => getCities({ data: { limit: 5, offset: 5 } }));
const deleteCityMutation = useMutation(deleteCity);
const putProfileMutation = useMutation(putProfile);

const onDelete = async (id: string) => {
  await deleteCityMutation.execute({ data: { id } });
  getCitiesQuery.refetch();
};

const onChangeClick = async () => {
  if (!isChangeProfile.value) {
    model.value = { email: profile.value.email, name: profile.value.name };
    isChangeProfile.value = true;
    return;
  }

  const isValid = await formRef.value?.validate();
  if (!isValid) return;

  const putProfileMutationResponse = await putProfileMutation.execute({ data: model.value });
  updateProfile(putProfileMutationResponse.data.profile);
  isChangeProfile.value = false;
};
</script>

<template>
  <section class="container">
    <div v-if="!isChangeProfile" class="profile_container">
      <n-h2 align-text>
        <n-text type="info">Profile</n-text>
      </n-h2>

      <n-flex size="small" align="center">
        <n-tag type="success" size="medium" round>{{ profile.email }}</n-tag>
        <n-tag v-if="profile.name" type="info" size="medium" round>{{ profile.name }}</n-tag>
        <n-button size="small" tertiary round type="primary" @click="onChangeClick">
          change
        </n-button>
      </n-flex>
    </div>
    <div v-else>
      <n-h2 align-text type="info">Change profile</n-h2>
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        :disabled="putProfileMutation.loading"
        label-placement="left"
        size="large"
      >
        <n-form-item label="email" path="email">
          <n-input round v-model:value="model.email" placeholder="email" />
        </n-form-item>
        <n-form-item label="name" path="name">
          <n-input round v-model:value="model.name" placeholder="name" />
        </n-form-item>

        <n-flex size="small" justify="end">
          <n-button
            tertiary
            round
            @click="isChangeProfile = false"
            :disabled="putProfileMutation.loading.value"
          >
            cancel
          </n-button>
          <n-button
            tertiary
            round
            type="primary"
            @click="onChangeClick"
            :disabled="putProfileMutation.loading.value"
          >
            confirm
          </n-button>
        </n-flex>
      </n-form>
    </div>
    <div class="cities_container">
      <n-h2 align-text type="info">
        <n-text type="info">Cities</n-text>
      </n-h2>

      <n-skeleton v-if="getCitiesQuery.loading.value" height="300px" width="100%" sharp />
      <n-grid v-else x-gap="12" y-gap="12" cols="1 s:2 m:3" responsive="screen">
        <n-gi v-for="city in getCitiesQuery.data.value?.data" :key="city">
          <CityItem :name="city" @delete="onDelete(city)" />
        </n-gi>
      </n-grid>
    </div>
  </section>
</template>

<style scoped>
.profile_container {
  margin-bottom: 30px;
}
</style>
