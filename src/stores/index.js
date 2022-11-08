import { createStore } from "vuex";

import ModalStateModule from "./ModalStateModule";

//create new instance of store

const store = createStore({
    modules: {
        ModalStateModule,
    }
});

export default store