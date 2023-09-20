import { defineStore } from 'pinia';

//* --- State ----------------------------------------------- *//
type ModalState = {
  _isOpen: boolean;
  _timeout: number;
  _data: IModalData;
};

//* --- Store ----------------------------------------------- *//
export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    _isOpen: false,
    _timeout: 1000,
    _data: {} as IModalData
  }),

  getters: {
    timeout: (s): number => s._timeout,
    data: (s): IModalData => s._data
  },

  actions: {
    setIsOpen(value: boolean) {
      this._isOpen = value;
    },

    evokeModal(value: IModalData) {
      this._isOpen = true;
      this._data = value;
    }
  }
});

//* --- Utils ----------------------------------------------- *//

interface IModalData {
  title: string;
  content: string;
  okText: string;
  cancelText: string;
  type?: 'success' | 'error';
  okCallback?: () => void;
  cancelCallback?: () => void;
}
