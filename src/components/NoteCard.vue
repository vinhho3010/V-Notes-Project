<template>
    <div
    @click="editableButton()"
    @blur="unEditableButton()"
    tabindex="0"
    class="w-[90%] min-h-[30px] max-h-60 py-4 px-3 shadow-md rounded-xl relative bg-white  border-2 border-solid border-gray-300 overflow-hidden ">
        <div    
        v-if="showEditButton"
        @click="displayEditModal()"
        class="editButton absolute top-1 right-1 py-1 px-2 cursor-pointer hover:bg-gray-400 rounded-full">
            <i class='bx bx-edit bx-xl' ></i>
        </div>
        <div class="title mt-3">
            {{title}}
        </div>
        <div class="content mt-3">
            {{content}}
        </div>
     </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default{
    props:{
        content: String,
        title: String,
    },
    data(){
        return {
            showEditButton: false,
        }
    },
    emits: ["showEditModal"],
    methods: {
        editableButton(){
            this.showEditButton=true;
        },
        unEditableButton(){
            this.showEditButton=false
        },
        showEditModal(){
            this.$emit("showEditModal");
        },
        ...mapMutations({displayEditModal: "displayEditModal"})
    },
    computed: {
    
    }

}
</script>

