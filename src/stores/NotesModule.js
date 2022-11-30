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
        noteSearchList: [],
    },
    getters: {
        getNote(state){
            return state.note;
        },
        getNoteList(state){
            if(state.noteList == undefined){
                state.noteList = [];
            }
            return state.noteList;          
        },
        getNoteSearchList(state){
            return state.noteSearchList.slice().reverse();          
        },
        getNoteSearchListColor(state, color){
            return state.noteSearchList.slice().filter((note) =>{
                return note.color == color
            }).reverse();          
        },
        getPinNoteList(state, getters){
            return getters.getNoteList.slice().filter((note) =>{
                return note.isPin == true && note.isDeleted == false
            }).reverse();     
        },
        getNotPinNoteList(state, getters){
            return getters.getNoteList.slice().filter((note) =>{
                return note.isPin == false && note.isDeleted == false
            }).reverse();   
        },
        getDeletedNoteList(state, getters){
            return getters.getNoteList.slice().filter((note) =>{
                return note.isDeleted == true
            }).reverse(); 
        },
        getNotDeletedNoteList(state, getters){
            return getters.getNoteList.slice().filter((note) =>{
                return note.isDeleted == false
            }).reverse(); 
        },
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
        SET_NOTE_SEARCH_LIST(state, noteList){
            state.noteSearchList = noteList;
        },
        ADD_NEW_NOTE(state){
            //add new note to noteList 
            state.noteList.push(state.note);
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
                    //add new note to noteList
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
        },
        filterSearch({commit, state}, searchText){
            if(searchText=='' || searchText == undefined){
                commit("SET_NOTE_SEARCH_LIST", [])
                return;
            }
        const noteListGetter = state.noteList;
            const result = noteListGetter.filter(note => {
                return note.isDeleted==false &&
                 (note.content.trim().toLowerCase().includes(searchText.trim().toLowerCase()) 
                        || note.title.trim().toLowerCase().includes(searchText.trim().toLowerCase()));
            })
        //set search result into noteSarchList
         commit("SET_NOTE_SEARCH_LIST", result);
        }
    }
}

export default NotesModule;