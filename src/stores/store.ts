import { defineStore } from 'pinia';

interface Hero {
  id: number;
  name: string;
  gender: string;
  imageUrl: string;
}

interface State {
  heroes: Hero[];
}

export const useStore = defineStore({
  id: 'app',
  state: (): State => ({
    heroes: [],
  }),
  actions: {
    addHero(hero: Hero) {
      this.heroes.push(hero);
    },
  },
});