<template>
    <div class="h-auto w-full mb-2 max-w-full grid grid-flow-row-dense  md:grid-cols-4 gap-x-1 gap-y-5 sm:grid-cols-3 ">
        <div v-if="getNoteList == [] || getNoteList == undefined"
            class="mx-auto mt-20 text-2xl col-span-4 row-span-2 text-green-700">Bạn chưa có ghi chú nào</div>
        <NoteCard v-else v-for="note in getReverseNoteList" :key="note._id" :note="note" />
        
    </div>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue';
import {mapActions, mapGetters} from 'vuex';

    export default{
        components:{
            NoteCard,
        },
        data(){
            return{
                note: {},
            }
        },
        computed: {
            ...mapGetters({getAccountInfor: "getAccountInfor",
                           getNoteList: "getNoteList",
                           getReverseNoteList: "getReverseNoteList"}),
        },
        methods: {
            ...mapActions({getAllNotes: "getAllNotes"}),
        },
       async mounted() {
           await this.getAllNotes(this.getAccountInfor._id);
        },
        async updating(){
            await this.getAllNotes(this.getAccountInfor._id);
        }
}
</script>