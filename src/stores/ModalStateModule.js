
const ModalStateModule = {
  state: {
    isShowEditModal: false
  },
  getters: {
    getEditModalState(state) {
      return state.isShowEditModal;
    }
  },
  mutations: {
    closeEditModal(state) {
      state.isShowEditModal = false;
    },
    displayEditModal(state) {
      state.isShowEditModal = true;
    },
  },
  action: {},
};

export default ModalStateModule;
