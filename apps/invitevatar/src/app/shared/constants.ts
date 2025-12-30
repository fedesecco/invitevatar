export const supabaseConfig = {
  url: 'https://hioqjfycecarjomoomtg.supabase.co',
  anonKey: 'sb_publishable_d2Lwn2LgLVphDE1eL-joiQ_VH2zu-Fz',
  redirectPath: 'avatars',
};

export enum Section {
  invites = 'invites',
  avatars = 'avatars',
  apiKeys = 'api-keys',
  settings = 'settings',
}

export enum Lang {
  en = 'en',
  it = 'it',
}
export const SUPPORTED_LANGS = Object.values(Lang);
export const DEFAULT_LANG = Lang.en;
export const DEFAULT_SECTION = Object.values(Section)[0];
