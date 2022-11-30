<template>
    <div 
    class="flex justify-center items-center ">
        <form>
            <div class="flex flex-col min-h-auto max-h-56 w-[30rem] shadow-custom rounded-xl mt-4 p-3">
                <div :class="isVisible" class="flex-row">
                    <input
                        v-model="note.title"
                        class="inputTitle py-2 px-3 form-control w-[90%] text-base inline-block focus:text-gray-700 focus:bg-white focus:border-transparent focus:outline-none"
                        type="text" placeholder="Tiêu đề">
                    <div @click="pinNote()"
                        class="pin inline-block rounded-full px-2 py-1 text-xl cursor-pointer hover:bg-gray-300">
                        <i :class="{ 'bxs-pin': note.isPin, 'bx-pin': !note.isPin }" class='bx'></i>
                    </div>
                </div>
                <textarea @focusin="visibleNoteTitle()"
                    spellcheck=false
                    rows="1"
                    v-model="note.content"
                    class="py-2 px-3 form-control block w-full text-base focus:text-gray-700 focus:bg-white focus:border-transparent focus:outline-none"
                    placeholder="Tạo ghi chú..." id=""></textarea>

                <div class="flex justify-around">
                    <button @click="saveNote()" :class="isVisible"
                        class="w-20 text-sm bg-green-500 hover:bg-green-700 text-white font-bold mt-3 ml-3 py-1 px-4 rounded"
                        type="button">
                        Thêm
                    </button>

                    <button @click="hideForm()" :class="isVisible"
                        class="w-22 text-sm bg-red-500 hover:bg-red-700 text-white font-bold mr-8 mt-3 py-1 px-5 rounded"
                        type="button">
                        Đóng
                    </button>

                        <div
                        :class="[{'bg-gray-300': showColorPicker==true},isVisible]" title="Chọn màu ghi chú" @click="displayColorPicker()"
                            class="editButton absolute text-lg top-2 right-2 py-1 px-2 cursor-pointer border-solid border-gray-200 hover:bg-gray-300 rounded-full">
                            <i class='bx bx-palette bx-xl'></i>
                        </div>

                </div>
            </div>
        </form>
        <div :class="isVisible" class="color-picker absolute translate-y-28 z-30">
            <ColorPicker :isOpen="showColorPicker" :currentNote="note" />
        </div>
    </div>
</template>

<script>
import ColorPicker from '@/components/ColorPicker.vue';
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: "CreateNoteForm",
    components: {
        ColorPicker,
    },
    data() {
        return {
            note: {
                title: "",
                content: "",
                color: "#ffffff",
                isDeleted: false,
                isPin: false,
            },
            isVisible: "hidden",
            showColorPicker: false,
        }
    },
    computed: {
        ...mapGetters({getAccountInfor: "getAccountInfor",
                        getNoteList: "getNoteList"})
    },
    methods: {
        ...mapActions({createNewNote: "createNewNote",
                        getAllNotes: "getAllNotes"}),
        visibleNoteTitle() {
            this.isVisible = "block";
        },
        pinNote() {
            this.note.isPin = !this.note.isPin;
        },
        hideForm(){
            this.isVisible = 'hidden';
            this.showColorPicker = false;
        },
        displayColorPicker(){
            this.showColorPicker = !this.showColorPicker;
        },
        refreshInput(){
            this.note.content = "";
            this.note.title = "";
            this.note.isPin = false;
            this.showColorPicker = false;
        },
        async saveNote(){
            const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  });
            if(!this.note.title && !this.note.content){
                Toast.fire({
                    icon: 'warning',
                    title: 'Vui lòng nhập nội dung cho ghi chú!!'
                  });     
            } else{
                const payload = {
                    userId: this.getAccountInfor._id,
                    note: this.note
                }
                await this.createNewNote(payload);

                Toast.fire({
                    icon: 'success',
                    title: 'Thêm ghi chú thành công'
                  });
                  
                await this.getAllNotes(this.getAccountInfor._id);
                this.refreshInput();
            }
        }

    }
}
</script>