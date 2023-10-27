<script setup lang="ts">
import type { FormInst } from 'naive-ui';

import { useMessage } from 'naive-ui';
import { ref } from 'vue';
import { postSignin } from '@/utils/api/requests';
import { useMutation } from '@/utils/api/hooks';

const emit = defineEmits<{ goToSignUp: [] }>();

const model = ref({
  email: '',
  password: ''
});

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
    email: model.value.email,
    password: model.value.password
  });

  if (response) {
    message.success('autheficated');
  }
};

const formRef = ref<FormInst | null>(null);
const message = useMessage();
</script>

<template>
  <section class="container">
    <div>
      <n-h1>Sing In</n-h1>
    </div>

    <n-form
      @submit.prevent="onSumbit"
      ref="formRef"
      size="small"
      :show-label="false"
      :model="model"
      :rules="rules"
    >
      <n-form-item path="email">
        <n-input v-model:value="model.email" placeholder="email" />
      </n-form-item>
      <n-form-item path="password">
        <n-input v-model:value="model.password" placeholder="password" />
      </n-form-item>

      <n-space justify="space-between">
        <n-button :loading="isLoading" size="small" round @click="emit('goToSignUp')"
          >Sing up</n-button
        >
        <n-button
          attr-type="submit"
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
</style>
