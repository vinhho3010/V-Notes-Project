
const ModalStateModule = {
  state: {
    isShowEditModal: false,
    isShowColorPicker: false,
    noteEdit: {},
  },
  getters: {
    getEditModalState(state) {
      return state.isShowEditModal;
    },
    getColorPickerState(state){
      return state.isShowColorPicker;
    }
  },
  mutations: {
    closeEditModal(state) {
      state.isShowEditModal = false;
    },
    displayEditModal(state) {
      state.isShowEditModal = true;
    },
    closeColorPicker(state){
      state.isShowColorPicker = false;
    },
    displayColorPicker(state){
      state.isShowColorPicker = true;
    }
  },
  action: {},
};

export default ModalStateModule;
