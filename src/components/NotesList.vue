<template>
    <div class="note-view">
        <!-- don't have any note display below text -->
        <div v-if="getNotDeletedNoteList.length == 0 || getNotDeletedNoteList == undefined"
            class="ml-[40%] mt-10 text-2xl text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"
                style="fill: rgba(229, 229, 229, 1);transform: ;msFilter:;">
                <path
                    d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z">
                </path>
                <path d="M7 9h10v2H7zm0 4h5v2H7z"></path>
            </svg>
            <p class="-ml-7">Bạn chưa có ghi chú nào</p>
        </div>
        <!-- has note, display list note -->
        <div v-else class="note-list">
            <!-- display all of note with pin or not pinned note if search function is not being use -->
            <div v-if="getPinNoteList.length != 0 && getNoteSearchList.length == 0"
                class="block ml-1 mb-2 text-[0.7rem] font-bold text-gray-500 uppercase">Được ghim</div>
            <div class=" mb-2 grid grid-flow-row-dense  md:grid-cols-4 gap-y-5 sm:grid-cols-3 ">
                <!-- list pin Note if has note is pined and do not has note is being search -->
                <transition-group name="list">
                    <NoteCard v-if="getPinNoteList.length != 0 && getNoteSearchList.length == 0"
                        v-for="PinNote in getPinNoteList" :key="PinNote._id" :note="PinNote" />
                </transition-group>
            </div>

            <div v-if="getPinNoteList.length != 0 && getNoteSearchList.length == 0"
                class="block ml-1 mb-2 mt-10 text-[0.7rem] font-bold text-gray-500 uppercase">Khác</div>
            <div class=" mb-2 grid grid-flow-row-dense  md:grid-cols-4  gap-y-5 sm:grid-cols-3 ">
                <!-- list NOT pin note -->
                <transition-group name="list">
                    <NoteCard v-if="getNotPinNoteList != [] && getNoteSearchList.length == 0"
                        v-for="note in getNotPinNoteList" :key="note._id" :note="note" />
                </transition-group>
            </div>
        </div>
        <!-- if has note search list, display result match with it and hide another note -->
        <div class="search-result" v-if="getNoteSearchList.length != 0">
            <div v-if="getNoteSearchList.length != 0"
                class="block ml-1 mb-2 mt-10 text-[0.7rem] font-bold text-gray-500 uppercase">Kết quả tìm kiếm
            </div>
            <div class=" mb-2 grid grid-flow-row-dense  md:grid-cols-4  gap-y-5 sm:grid-cols-3 ">
                <!-- list result note -->
                <transition-group name="list">
                    <NoteCard v-if="getNoteSearchList != []" v-for="note in getNoteSearchList" :key="note._id"
                        :note="note" />
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    components: {
        NoteCard,
    },
    data() {
        return {
            note: {},
        }
    },

    computed: {
        ...mapGetters({
            getAccountInfor: "getAccountInfor",
            getNoteList: "getNoteList",
            getPinNoteList: "getPinNoteList",
            getNotPinNoteList: "getNotPinNoteList",
            getNoteSearchList: "getNoteSearchList",
            getNotDeletedNoteList: "getNotDeletedNoteList"
        }),
    },
    methods: {
        ...mapActions({ getAllNotes: "getAllNotes" }),
        ...mapMutations["SET_NOTE_SEARCH_LIST"]
    },
    async mounted() {
        await this.getAllNotes(this.getAccountInfor._id);
        this.$store.commit("SET_NOTE_SEARCH_LIST", [])
    },
    async updating() {
        await this.getAllNotes(this.getAccountInfor._id);
    }
}
</script>

<style scoped>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all .6s ease;
}

.list-enter-from {
    opacity: 0;
    transform: scale(0.5);
}

.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>