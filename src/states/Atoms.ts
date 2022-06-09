import { atom } from 'recoil';

export const SelectedHerosState = atom<HeroInfo[]>({
  key: 'selectedHerosState',
  default: [],
});

export const CurrentUserState = atom({
  key: 'selectedHerosState',
  default: { name: '', email: '', imageURL: '' },
});
