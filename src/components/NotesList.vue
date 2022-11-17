<template>
    <div class="note-view">
        <!-- don't have any note display below text -->
        <div v-if="getNoteList == [] || getNoteList == undefined" class="ml-[37%]  mt-20 text-2xl text-green-700">
            Bạn chưa có ghi chú nào</div>
        <!-- has note, display list note -->
        <div v-else class="note-list">
            <!-- display all of note with pin or not pinned note if search function is not being use -->
            <div v-if="getPinNoteList.length != 0 && getNoteSearchList.length==0"
                class="block w-full ml-1 mb-2 text-[0.7rem] font-bold text-gray-500 uppercase">Được ghim</div>
            <div class=" mb-2 grid grid-flow-row-dense  md:grid-cols-4 gap-y-5 sm:grid-cols-3 ">
                <!-- list pin Note if has note is pined and do not has note is being search -->
                <transition-group name="list">
                    <NoteCard v-if="getPinNoteList.length != 0 && getNoteSearchList.length==0"
                     v-for="PinNote in getPinNoteList" :key="PinNote._id" :note="PinNote" />
                </transition-group>
            </div>

            <div v-if="getPinNoteList.length != 0 && getNoteSearchList.length==0"
                class="block w-full ml-1 mb-2 mt-10 text-[0.7rem] font-bold text-gray-500 uppercase">Khác</div>
            <div class=" mb-2 grid grid-flow-row-dense  md:grid-cols-4  gap-y-5 sm:grid-cols-3 ">
                <!-- list NOT pin note -->
                <transition-group name="list">
                    <NoteCard v-if="getNotPinNoteList != [] && getNoteSearchList.length==0" v-for="note in getNotPinNoteList" :key="note._id"
                        :note="note" />
                </transition-group>
            </div>
        </div>
        <!-- if has note search list, display result match with it and hide another note -->
        <div class="search-result" v-if="getNoteSearchList.length != 0" >
            <div v-if="getNoteSearchList.length != 0"
                class="block w-full ml-1 mb-2 mt-10 text-[0.7rem] font-bold text-gray-500 uppercase">Kết quả tìm kiếm
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
    watch: {
        getNoteSearchList(){
            console.log(this.getNoteSearchList);
        }
    },
    computed: {
        ...mapGetters({
            getAccountInfor: "getAccountInfor",
            getNoteList: "getNoteList",
            getPinNoteList: "getPinNoteList",
            getNotPinNoteList: "getNotPinNoteList",
            getNoteSearchList: "getNoteSearchList"
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