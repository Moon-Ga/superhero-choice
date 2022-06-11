import { atom } from 'recoil';

export const CurrentUserState = atom({
  key: 'currentUserState',
  default: { name: '', email: '', imageURL: '', uid: '' },
});
