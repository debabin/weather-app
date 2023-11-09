<script setup lang="ts">
import type { FormInst } from 'naive-ui';

import { useMessage } from 'naive-ui';
import { ref } from 'vue';
import { postSignin } from '@/utils/api/requests';
import { useMutation } from '@/utils/api/hooks';

const emit = defineEmits<{ goToSignIn: [] }>();

const model = ref({
  email: '',
  password: ''
});

const postSigninMutation = useMutation(postSignin);
const isLoading = postSigninMutation.loading;

const onSumbit = async () =>
  postSigninMutation.execute({ email: model.value.email, password: model.value.password });

const formRef = ref<FormInst | null>(null);
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

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    console.log('@', errors);
    if (!errors) {
      message.success('Valid');
    } else {
      console.log(errors);
      message.error('Invalid');
    }
  });
};
</script>

<template>
  <section class="container">
    <div>
      <n-h1>Hello, traveler</n-h1>
    </div>

    <n-form ref="formRef" size="small" :show-label="false" :model="model" :rules="rules">
      <n-form-item path="email">
        <n-input v-model:value="model.email" placeholder="email" />
      </n-form-item>
      <n-form-item path="password">
        <n-input v-model:value="model.password" placeholder="password" />
      </n-form-item>
      <n-form-item path="passwordRepeat" label="Repeat password">
        <n-input v-model:value="model.password" placeholder="repeat password" />
      </n-form-item>

      <div class="button_container">
        <n-button size="small" strong secondary round type="success" @click="handleValidateClick">
          Sing up
        </n-button>
        <n-a @click="emit('goToSignIn')">Do you have account already ?</n-a>
      </div>
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.button_container a {
  font-size: 10px;
}

.button_container button {
  width: 100%;
}
</style>
