<template>
  <Transition name="bounce">
    <div v-if="getEditModalState"
      class="fixed w-screen h-screen flex justify-center items-center bg-opacity-40 z-9999 bg-black">
      <form>
        <div class="flex flex-col min-h-auto max-h-[70vh] w-[30rem] bg-white shadow-custom rounded-xl  p-3 -mt-32">
          <div class="flex-row">
            <input v-model="editedNote.title"
              class="inputTitle py-2 px-3 form-control w-[90%] text-base inline-block focus:text-gray-700 focus:bg-white focus:border-transparent focus:outline-none"
              type="text" placeholder="Tiêu đề">
            <div @click="pinNote()"
              class="pin inline-block rounded-full px-2 py-1 text-xl cursor-pointer hover:bg-gray-300">
              <i :class="{ 'bxs-pin': editedNote.isPin, 'bx-pin': !editedNote.isPin }" class='bx'></i>
            </div>
          </div>
          <textarea v-model="editedNote.content" rows="4"
            class="py-2 px-3 form-control block w-full text-base  focus:text-gray-700 focus:bg-white focus:border-transparent focus:outline-none"
            placeholder="Tạo ghi chú..." id=""></textarea>
          <div class="flex justify-around">
            <button @click="editNote()"
              class="w-22 text-sm bg-green-500 hover:bg-green-700 text-white font-bold ml-5 mt-3 py-1.5 px-6 rounded"
              type="button">
              Cập nhật
            </button>

            <button @click="confirmDeleteNote()"
              class="w-22 text-sm bg-red-500 hover:bg-red-700 text-white font-bold mt-3 py-1.5 px-9 rounded"
              type="button">
              Xoá
            </button>

            <button @click="closeEditModal()"
              class="w-22 text-sm bg-gray-400 hover:bg-gray-500 text-white font-bold mr-8 mt-3 py-1.5 px-6 rounded"
              type="button">
              Huỷ bỏ
            </button>
          </div>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Swal from 'sweetalert2'
export default {
  props: {
    showEditModal: Boolean,
  },
  data() {
    return {
      isPin: false,
      editedNote: {}
    }
  },
  methods: {
    ...mapMutations({ closeEditModal: "closeEditModal" }),
    pinNote() {
      this.editedNote.isPin = !this.editedNote.isPin;
    },
    confirmDeleteNote() {
      //show confirm modal to delete note
      Swal.fire({
        title: 'Xoá',
        text: 'Bạn muốn xoá ghi chú này?',
        showDenyButton: true,
        confirmButtonColor: "#DC3741",
        denyButtonColor: "#BDB8B7",
        confirmButtonText: 'Xoá',
        denyButtonText: `Huỷ bỏ`,
      }).then((result)=> {
        if(result.isConfirmed){
          //if user want to delete note, delete it by call deleteNoteHandle function
          this.deleteNoteHandle();
        }
      });
    },

    //delete note handle
    async deleteNoteHandle(){
      const payload = {
        note: this.editedNote,
      };
       //call action from store to update note
          await this.deleteNote(payload); 
          await this.getAllNotes(this.getAccountInfor._id); 
          this.closeEditModal() 
          Swal.fire("", "Ghi chú được xoá thành công", "success");      
          //reload edited notelist
          
          
          
    },
    //edit note chosen
    async editNote() {
      const payload = {
        userId: this.getAccountInfor._id,
        note: this.editedNote,
      };

      //call action from store to update note
      await this.updateNote(payload);

      //reload edited notelist
      await this.getAllNotes(this.getAccountInfor._id);

      this.closeEditModal()
      Swal.fire("", "Ghi chú được cập nhật thành công", "success");

    },
    ...mapActions({
      updateNote: "updateNote",
      deleteNote: "deleteNote",
      getAllNotes: "getAllNotes"
    })
  },
  computed: {
    ...mapGetters({
      getEditModalState: "getEditModalState",
      getNote: "getNote",
      getAccountInfor: "getAccountInfor"
    }),
  },
  watch: {
    //get data from selected note when display edit modal
    getEditModalState() {
      this.editedNote = { ...this.getNote }
    }
  },
  mounted() {
    this.editedNote = { ...this.getNote }
  },
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

  25% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(1.25);
  }

  75% {
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