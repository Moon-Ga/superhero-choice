import { atom } from 'recoil';

export const SelectedHerosState = atom<HeroInfo[]>({
  key: 'selectedHerosState',
  default: [],
});

export const CurrentUserState = atom({
  key: 'currentUserState',
  default: { name: '', email: '', imageURL: '', uid: '' },
});
