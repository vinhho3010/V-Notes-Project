<template>
    <div class="">
        <div v-if="getNoteList == [] || getNoteList == undefined" class="ml-[37%]  mt-20 text-2xl text-green-700">
             Bạn chưa có ghi chú nào
        </div>

        <div v-else class="note-list">
        <div v-if="getPinNoteList.length!=0" class="block w-full ml-1 mb-2 text-[0.7rem] font-bold text-gray-500 uppercase">Được ghim</div>
        <div class="h-auto w-full mb-2 max-w-full grid grid-flow-row-dense  md:grid-cols-4 gap-x-1 gap-y-5 sm:grid-cols-3 ">
            <!-- list pin Note -->
            <transition-group name="list" >
                <NoteCard v-if="getPinNoteList!=[]" v-for="PinNote in getPinNoteList" :key="PinNote._id" :note="PinNote"/>
            </transition-group>
        </div>

        <div v-if="getPinNoteList.length!=0" class="block w-full ml-1 mb-2 mt-10 text-[0.7rem] font-bold text-gray-500 uppercase">Khác</div>
        <div class="h-auto w-full mb-2 max-w-full grid grid-flow-row-dense  md:grid-cols-4 gap-x-1 gap-y-5 sm:grid-cols-3 ">
            <!-- list NOT pin note -->
            <transition-group name="list" >
                    <NoteCard v-if="getNotPinNoteList!=[]" v-for="note in getNotPinNoteList" :key="note._id" :note="note" />
            </transition-group>
        </div>
    </div>
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
                           getReverseNoteList: "getReverseNoteList",
                           getPinNoteList: "getPinNoteList",
                            getNotPinNoteList: "getNotPinNoteList"}),
        },
        methods: {
            ...mapActions({getAllNotes: "getAllNotes"}),
        },
       async mounted() {
           await this.getAllNotes(this.getAccountInfor._id);
           console.log(this.getPinNoteList);
        },
        async updating(){
            await this.getAllNotes(this.getAccountInfor._id);
        }
}
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all .6s ease ;
}

.list-enter-from{
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