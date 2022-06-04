import { atom } from 'recoil';

const SelectedHerosState = atom<string[]>({
  key: 'selectedHerosState',
  default: [],
});

export { SelectedHerosState };
