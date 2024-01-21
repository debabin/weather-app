import { inject, ref, type InjectionKey, type Ref, provide } from 'vue';

export const DEFAULT_PROFILE = { email: '', name: '', cities: [] };
export const PROVIDE_PROFILE_KEY: InjectionKey<Ref<Profile>> = Symbol('profile');

export const provideUserContext = (profile: Ref<Profile>) => provide(PROVIDE_PROFILE_KEY, profile);

export const useProfileContext = () => {
  const profile = inject(PROVIDE_PROFILE_KEY, ref(DEFAULT_PROFILE));
  const updateProfile = (newProfile: Profile) => (profile.value = newProfile);

  return { profile, updateProfile };
};
