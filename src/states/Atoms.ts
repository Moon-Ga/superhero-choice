import { atom } from 'recoil';

const SelectedHerosState = atom<HeroInfo[]>({
  key: 'selectedHerosState',
  default: [],
});

export { SelectedHerosState };
