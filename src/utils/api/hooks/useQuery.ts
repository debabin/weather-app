import { onMounted, ref } from 'vue';

export const useQuery = <Function extends (...args: any[]) => any>(fn: Function) => {
  const loading = ref(false);
  const data = ref<Awaited<ReturnType<typeof fn>>['data'] | null>(null);

  const query = async (...args: Parameters<Function>) => {
    loading.value = true;
    const response = await fn(...args);
    data.value = response.data;
    loading.value = false;
  };

  onMounted(query);

  return {
    loading,
    data,
    refetch: query
  };
};
