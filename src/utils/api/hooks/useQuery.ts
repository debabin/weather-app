import { onMounted, ref } from 'vue';

interface Options<Data> {
  onSuccess?: (data: Data) => void;
  skip?: boolean;
}

export const useQuery = <Function extends (...args: any[]) => any>(
  fn: Function,
  options?: Options<Awaited<ReturnType<Function>>>
) => {
  const loading = ref(false);
  const data = ref<Awaited<ReturnType<typeof fn>>['data'] | null>(null);

  const query = async (...args: Parameters<Function>) => {
    loading.value = true;
    const response = await fn(...args);
    data.value = response.data;
    options?.onSuccess && options.onSuccess(response);
    loading.value = false;
  };

  !options?.skip && onMounted(query);

  return {
    loading,
    data,
    refetch: query
  };
};
