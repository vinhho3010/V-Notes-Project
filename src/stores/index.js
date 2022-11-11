import { createStore } from "vuex";
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
    }
});

export default store