import { computed, ref } from 'vue';

export const useForm = <T extends Record<string, string>>(initialValues: T) => {
  initialValues;
  const model = ref({ ...initialValues });
  const errors = ref<Record<keyof typeof initialValues, string>>(
    Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: null }), {} as T)
  );
  const dirty = computed(() => {
    let dirty = false;

    for (const prop in model.value) {
      dirty = model.value[prop] !== initialValues[prop];
      if (dirty) break;
    }

    return dirty;
  });

  return {
    model,
    errors,
    dirty
  };
};
