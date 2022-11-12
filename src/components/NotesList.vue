<template>
    <div class="h-auto w-full mb-2 max-w-full grid grid-flow-row-dense md:grid-cols-4 gap-x-1 gap-y-5 sm:grid-cols-3 ">
     <NoteCard
     v-if="noteList"
     v-for="note in noteList" :key="note._id"
     :data = "note"/>
     <div v-else class="mx-auto text-xl flex self-auto">Bạn chưa có ghi chú nào</div>
    </div>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue';
import { nextTick } from 'vue';
import {mapActions, mapGetters, mapState} from 'vuex';

    export default{
        components:{
            NoteCard,
        },
        data(){
            return{
                note: {},
                noteList: [],
            }
        },
        computed: {
            ...mapGetters({getAccountInfor: "getAccountInfor",
                        getNoteList: "getNoteList"}),
        },
        methods: {
            ...mapActions({getAllNotes: "getAllNotes"}),
        },
       async mounted() {
           await this.getAllNotes(this.getAccountInfor._id);
           this.noteList = this.getNoteList;
        },
        async updating(){
            await this.getAllNotes(this.getAccountInfor._id);
           this.noteList = this.getNoteList;
        }
}
</script>