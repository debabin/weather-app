import { inject, ref, type InjectionKey, type Ref } from 'vue';

export const DEFAULT_PROFILE = { email: '', cities: [] };
export const PROVIDE_PROFILE_KEY: InjectionKey<Ref<Profile>> = Symbol('profile');
export const injectProfile = () => inject(PROVIDE_PROFILE_KEY, ref(DEFAULT_PROFILE));
