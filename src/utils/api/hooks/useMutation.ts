import { ref } from 'vue';

export const useMutation = <Function extends (...args: any[]) => any>(fn: Function) => {
  const loading = ref(false);

  return {
    loading,
    execute: async (...args: Parameters<Function>): Promise<ReturnType<Function>> => {
      loading.value = true;
      const response = await fn(...args);
      loading.value = false;

      return response;
    }
  };
};
