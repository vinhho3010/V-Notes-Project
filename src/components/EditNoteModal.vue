<template>
    <Transition name="bounce">
        <div v-if="getEditModalState" class="w-screen h-screen flex justify-center items-center  bg-opacity-40 z-9999 bg-black">
            <form>
                <div class="flex flex-col min-h-auto max-h-[70vh] w-[30rem] bg-white shadow-custom rounded-xl  p-3 -mt-32">
                    <div class="flex-row">
                        <input
                            class="inputTitle py-2 px-3 form-control w-[90%] text-base inline-block focus:text-gray-700 focus:bg-white focus:border-transparent focus:outline-none"
                            type="text" placeholder="Tiêu đề">
                        <div @click="pinNote()"
                            class="pin inline-block rounded-full px-2 py-1 text-xl cursor-pointer hover:bg-gray-300">
                            <i :class="{ 'bxs-pin': isPin, 'bx-pin': !isPin }" class='bx'></i>
                        </div>
                    </div>
                    <textarea @focusin="visibleNoteTitle()"
                        rows="4"
                        class="py-2 px-3 form-control block w-full text-base  focus:text-gray-700 focus:bg-white focus:border-transparent focus:outline-none"
                        placeholder="Tạo ghi chú..." id=""></textarea>
                    <div class="flex justify-around">
                        <button @click="saveNote()"
                        class="w-22 text-sm bg-green-500 hover:bg-green-700 text-white font-bold ml-5 mt-3 py-1.5 px-6 rounded"
                        type="button">
                        Cập nhật
                    </button>

                    <button @click="closeEditModal()"
                        class="w-22 text-sm bg-red-500 hover:bg-red-700 text-white font-bold mr-8 mt-3 py-1.5 px-8 rounded"
                        type="button">
                        Đóng
                    </button>
                    </div>
                </div>
            </form>
        </div>
    </Transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    props: {
        showEditModal: Boolean,
    },
    data(){
        return {
          isPin: false,
        }
    },
    emits: ["saveNote",],
    methods:{
        ...mapMutations({closeEditModal: "closeEditModal"}),
        hideModal(){
            this.$emit('saveNote')
        },
        pinNote() {
            this.isPin = !this.isPin;
        },
    },
    computed: {
        ...mapGetters({getEditModalState: "getEditModalState"})
    }
}

</script>

<style scoped>
.shadow-custom {
    box-shadow: 0 0 5px;
}

/* define appear animation */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  25%{
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.25);
  }
  75%{
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

/* .v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}*/
.v-enter-from,
.v-leave-to {
  opacity: 0;
} 
</style>