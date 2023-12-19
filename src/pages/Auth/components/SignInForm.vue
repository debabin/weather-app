<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import type { FormInst } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { ref } from 'vue';

import { postSignin } from '@/utils/api/requests';
import { useForm, useMutation } from '@/utils/api/hooks';
import { router, LOCAL_STORAGE_KEYS } from '@/utils/constants';

const initalValues = {
  email: '',
  password: ''
} as const;

const emit = defineEmits<{ goToSignUp: [] }>();

const formRef = ref<FormInst | null>(null);
const form = useForm(initalValues);
const message = useMessage();

const rules = {
  email: {
    required: true,
    message: 'Please input your email',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: 'Please input your password',
    trigger: ['input', 'blur']
  }
};

const postSigninMutation = useMutation(postSignin);
const isLoading = postSigninMutation.loading;

const onSumbit = async () => {
  const response = await postSigninMutation.execute({
    email: form.model.value.email,
    password: form.model.value.password
  });

  if (response.data.error) {
    form.errors.value.password = response.data.error;
  }

  if (response.data.success) {
    useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, response.data.token);
    message.success('autheficated');
    router.push({ name: 'home', replace: true });
  }
};
</script>

<template>
  <section class="container">
    <div>
      <n-h1>Sign In</n-h1>
    </div>

    <n-form
      @submit.prevent="onSumbit"
      ref="formRef"
      size="small"
      :show-label="false"
      :model="form.model"
      :rules="rules"
    >
      <n-form-item path="email">
        <n-input v-model:value="form.model.value.email" placeholder="email" />
      </n-form-item>
      <n-form-item path="password">
        <n-input v-model:value="form.model.value.password" placeholder="password" type="password" />
      </n-form-item>

      <n-space v-if="form.errors.value.password" justify="space-between" vertical>
        {{ form.errors.value.password }}
      </n-space>

      <n-space justify="space-between" vertical class="button_container">
        <n-button block :loading="isLoading" size="small" round @click="emit('goToSignUp')"
          >Sing up</n-button
        >
        <n-button
          block
          attr-type="submit"
          :disabled="!form.dirty.value"
          :loading="isLoading"
          size="small"
          strong
          secondary
          round
          type="success"
        >
          Submit
        </n-button>
      </n-space>
    </n-form>
  </section>
</template>

<style scoped>
.container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.button_container {
  margin-top: 20px;
}
</style>
