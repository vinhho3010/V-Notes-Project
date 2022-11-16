<template>
        <div @click="editableButton()" @blur="unEditableButton()" tabindex="0"
        class="w-[90%] min-h-[30px] max-h-60 py-4 px-3  rounded-xl relative bg-white shadow-custom-bold border-2 border-solid border-gray-300 overflow-hidden ">
        <Transition>
            <div v-if="showEditButton" @click="editNote()"
                class="editButton absolute text-lg top-1 right-1 py-1 px-2 cursor-pointer hover:bg-gray-400 rounded-full">
                <i class='bx bx-edit bx-xl'></i>
            </div>
        </Transition>
        <div class="title mt-[0.85rem]">
            {{ note.title }}
        </div>
        <div class="content mt-3">
            {{ note.content }}
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    props: {
        note: {},
    },
    data() {
        return {
            showEditButton: false,
        }
    },
    methods: {
        editableButton() {
            this.showEditButton = true;
        },
        unEditableButton() {
            this.showEditButton = false
        },
        editNote(){
            //set data for selected note to use in edit modal 
            this.$store.commit("SET_NOTE", this.note);
            this.$store.commit("displayEditModal");
        },
        ...mapMutations({ displayEditModal: "displayEditModal",
                        SET_NOTE: "setNote"}),
    },
    computed: {
        ...mapGetters({getNote: "getNote"})
    }

}
</script>

<style scoped>
.shadow-custom-bold:hover {
    box-shadow: 0px 0px 2px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

