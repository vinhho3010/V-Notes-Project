<template>
    <div 
    class="flex justify-center items-center ">
        <form>
            <div class="flex flex-col min-h-auto max-h-56 w-[30rem] shadow-custom rounded-xl mt-4 p-3">
                <div :class="isVisible" class="flex-row">
                    <input
                        class="inputTitle py-2 px-3 form-control w-[90%] text-base inline-block focus:text-gray-700 focus:bg-white focus:border-transparent focus:outline-none"
                        type="text" placeholder="Tiêu đề">
                    <div @click="pinNote()"
                        class="pin inline-block rounded-full px-2 py-1 text-xl cursor-pointer hover:bg-gray-300">
                        <i :class="{ 'bxs-pin': isPin, 'bx-pin': !isPin }" class='bx'></i>
                    </div>
                </div>
                <textarea @focusin="visibleNoteTitle()"
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
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isVisible: "hidden",
            isPin: false,
        }
    },
    methods: {
        visibleNoteTitle() {
            this.isVisible = "block";
        },
        saveNote() {
            console.log("Save note handle");
        },
        pinNote() {
            this.isPin = !this.isPin;
        },
        hideForm(){
            this.saveNote();
            this.isVisible = 'hidden'
        }

    }
}
</script>

<style scoped>
.shadow-custom {
    box-shadow: 0 0 5px;
}
</style>