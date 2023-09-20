import { defineStore } from 'pinia';

//* --- Meta ------------------------------------------------ *//

//* --- State ----------------------------------------------- *//
type AppState = {
  //: public
  //...

  //: private
  _theme: Themes;
};

//* --- Store ----------------------------------------------- *//
export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    _theme: useColorMode().preference as Themes
  }),

  getters: {
    theme: (s): Themes => s._theme
  },

  actions: {
    switchTheme() {
      const colorMode = useColorMode();
      colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
      this._theme = colorMode.preference as Themes;
    }
  }
});

//* --- Utils ----------------------------------------------- *//

type Themes = 'light' | 'dark';
