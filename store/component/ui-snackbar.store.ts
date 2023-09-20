import { defineStore } from 'pinia';

//* --- State ----------------------------------------------- *//
type SnackbarState = {
  _isOpen: boolean;
  _timeout: number;
  _data: ISnackbarData;
};

//* --- Store ----------------------------------------------- *//
export const useSnackbarStore = defineStore('snackbar', {
  state: (): SnackbarState => ({
    _isOpen: false,
    _timeout: 1500,
    _data: {} as ISnackbarData
  }),

  getters: {
    timeout: (s): number => s._timeout,
    data: (s): ISnackbarData => s._data
  },

  actions: {
    setIsOpen(value: boolean) {
      this._isOpen = value;
    },

    evokeSnackbar(value: ISnackbarData, timeout?: number) {
      this._isOpen = true;
      this._data = value;

      if (timeout) {
        this._timeout = timeout;
      }
    }
  }
});

//* --- Utils ----------------------------------------------- *//

export interface ISnackbarData {
  title: string;
  type?: 'success' | 'error';
}
