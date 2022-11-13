import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import AuthModule from "./AuthModule";
import NotesModule from "./NotesModule"
import AccountModule from "./AccountModule"
import ModalStateModule from "./ModalStateModule";

//create new instance of store

const store = createStore({
    modules: {
        AuthModule,
        NotesModule,
        AccountModule,
        ModalStateModule,
    },
    plugins: [createPersistedState()],
});

export default store