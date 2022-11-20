<template>
    <div class="note-view">
        <!-- clean trash title -->
        <div v-if="getDeletedNoteList.length != 0" @click="cleanTrash()"
            class="clean-trash translate-x-[58rem] text-blue-400 hover:bg-blue-100 mt-2 mb-5 text-base rounded-lg w-48 text-center py-2 cursor-pointer">
            <p>Dọn sạch thùng rác</p>
        </div>
        <!-- don't have any note display below text -->
        <div v-if="getDeletedNoteList.length == 0 || getDeletedNoteList == undefined"
            class="ml-[37%]  mt-20 text-2xl text-green-700">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"
                    style="fill: rgba(229, 229, 229, 1);transform: ;msFilter:;">
                    <path
                        d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z">
                    </path>
                    <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                </svg>
            </div>
            <p class="-ml-24">Không có ghi chú nào trong thùng rác</p>
        </div>
        <!-- has note, display list note -->
        <div v-else class="deleted-note-list">
            <!-- display all of notes have deleted -->
            <div class=" mb-2 grid grid-flow-row-dense md:grid-cols-4 gap-y-5 sm:grid-cols-3 ">
                <!-- list deleted note -->
                <transition-group name="list">
                    <NoteCard v-if="getDeletedNoteList.length != 0" v-for="DeletedNote in getDeletedNoteList"
                        :key="DeletedNote._id" :note="DeletedNote" />
                </transition-group>
            </div>

        </div>
    </div>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Swal from 'sweetalert2';

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
            getDeletedNoteList: "getDeletedNoteList"
        }),
    },
    methods: {
        ...mapActions({ getAllNotes: "getAllNotes",
                        deleteNote: "deleteNote" }),

        ...mapMutations["SET_NOTE_SEARCH_LIST"],
        
        cleanTrash() {
            //show confirm modal to delete note
            Swal.fire({
                title: 'Xoá',
                text: 'Bạn muốn xoá tất cả ghi chú khỏi danh sách? Tất cả ghi chú sẽ bị xoá vĩnh viễn và không thể khôi phục',
                showDenyButton: true,
                confirmButtonColor: "#DC3741",
                denyButtonColor: "#BDB8B7",
                confirmButtonText: 'Xoá',
                denyButtonText: `Huỷ bỏ`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteAllNote();
                }
            });  
        },
        async deleteAllNote(){
            //delete all deleted notes
            await this.getDeletedNoteList.forEach(deletedNote => {
                let payload = {
                    note: deletedNote,
                };
                this.deleteNote(payload);
            });
            //show alert notification
            Swal.fire("", "Thùng rác đã được dọn sạch", "success");
            //reload edited notelist
            await this.getAllNotes(this.getAccountInfor._id);
        }
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