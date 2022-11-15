import axios from "axios"
import config from "../config";
const NotesModule = {
    state: {
        note: {
            _id: "",
            ownerID: "",
            title: "",
            content: "",
            color: "#ffffff",
            isPin: false,
            isDeleted: false,
        },
        noteList: [],
    },
    getters: {
        getNote(state){
            return state.note;
        },
        getNoteList(state){
            return state.noteList;          
        },
        getReverseNoteList(state){
            return state.noteList.slice().reverse();
        }
    },
    mutations: {
        SET_NOTE(state, newNote){
            state.note.ownerID = newNote.ownerID;
            state.note._id = newNote._id;
            state.note.title = newNote.title;
            state.note.content = newNote.content;
            state.note.color = newNote.color;
            state.note.isPin = newNote.isPin;
            state.note.isDeleted = newNote.isDeleted;
        },
        SET_NOTE_LIST(state, noteList){
            state.noteList = noteList;
        },
        ADD_NEW_NOTE(state){
            //add new note to noteList 
            state.noteList.push(state.note);
            console.log(state.noteList);
        },
        REFRESH_NOTE(state){
            state.note._id = "";
            state.note.ownerID = "";
            state.note.title = "";
            state.note.content = "";
            state.note.color = "#ffffff";
            state.note.isPin = false;
            state.note.isDeleted = false;
        }
    },
    actions: {
        async getAllNotes({commit}, userId){
            try {
                const response = await axios.get(`${config.server}/notes/${userId}`).then((response) => {
                    //if user have note, store them into note store
                    commit("SET_NOTE_LIST", response.data.result);

                    console.log(response.data.result);
                });
            } catch (error) {
                console.log(error);
            }
          
        },
        async createNewNote({commit}, payload){
            try {
                const response = await axios.post(`${config.server}/notes/${payload.userId}`, {
                    title: payload.note.title,
                    content: payload.note.content,
                    color: payload.note.color,
                    isDeleted: payload.note.isDeleted,
                    isPin: payload.note.isPin,
                }).then((response)=> {
                    commit("SET_NOTE", response.data.result);
                    commit("ADD_NEW_NOTE");
                })
            } catch (error) {
                console.log(error);
            }
        },
        async updateNote({commit}, payload){
            try {
                const response = await axios.post(`${config.server}/notes/note/${payload.note._id}`, {
                    ownerID: payload.userId,
                    title: payload.note.title,
                    content: payload.note.content,
                    color: payload.note.color,
                    isDeleted: payload.note.isDeleted,
                    isPin: payload.note.isPin,
                }).then( response => {
                    return response.data.result;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteNote({commit}, payload){
            try {
                const response = await axios.delete(`${config.server}/notes/note/${payload.note._id}`, {
                }).then( response => {
                    return response.data.result;
                });
            } catch (error) {
                console.log(error);
            }
        }

    }
}

export default NotesModule;