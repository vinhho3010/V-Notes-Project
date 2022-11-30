<template>
  <Transition name="bounce">
    <div @click.self="closeEditModal()" v-if="getEditModalState"
      class="fixed w-screen h-screen flex justify-center items-center bg-opacity-40 z-9999 bg-black">
      <form>
        <div class="flex flex-col min-h-auto max-h-[70vh] w-[30rem] bg-white shadow-custom rounded-xl p-3 -mt-32">
          <div class="flex-row">
            <input v-model="editedNote.title"
              class="inputTitle py-2 px-3 form-control w-[90%] text-base inline-block focus:text-gray-700 focus:bg-white focus:border-transparent focus:outline-none"
              type="text" placeholder="Tiêu đề">

            <div v-show="this.currentRoute == '/home'" @click="pinNote()"
              class="pin inline-block rounded-full px-2 py-1 text-xl cursor-pointer hover:bg-gray-300">
              <i :class="{ 'bxs-pin': editedNote.isPin, 'bx-pin': !editedNote.isPin }" class='bx'></i>
            </div>
          </div>
          <textarea
            spellcheck=false
            v-model="editedNote.content" rows="4"
            class="py-2 px-3 form-control block w-full text-base focus:text-gray-700 focus:bg-white focus:border-transparent focus:outline-none"
            placeholder="Tạo ghi chú..." id=""></textarea>
          <div class="flex justify-around">
            <button v-show="this.currentRoute == '/home'" @click="editNote()"
              class="w-22 text-sm bg-green-500 hover:bg-green-700 text-white font-bold ml-5 mt-3 py-1.5 px-6 rounded"
              type="button">
              Cập nhật
            </button>

            <button v-show="this.currentRoute == '/trash'" @click="restoreNote()"
              class="w-22 text-sm bg-yellow-400 hover:bg-yellow-500 text-white font-bold ml-5 mt-3 py-1.5 px-6 rounded"
              type="button">
              Khôi phục
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

            <div v-show="this.currentRoute == '/home'" :class="[{ 'bg-gray-300': showColorPicker == true }]" title="Chọn màu ghi chú"
              @click="displayColorPicker()"
              class="editButton absolute text-lg top-3 right-1 py-1 px-2 cursor-pointer border-solid border-gray-200 hover:bg-gray-300 rounded-full">
              <i class='bx bx-palette bx-xl'></i>
            </div>
          </div>
        </div>
      </form>
      <div class="color-picker absolute translate-y-20">
        <ColorPicker :isOpen="showColorPicker" :currentNote="editedNote" />
      </div>
    </div>
  </Transition>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ColorPicker from '@/components/ColorPicker.vue';
import Swal from 'sweetalert2'
export default {
  props: {
    showEditModal: Boolean,
  },
  components: {
    ColorPicker,
  },
  data() {
    return {
      isPin: false,
      showColorPicker: false,
      currentRoute: "",
      editedNote: {}
    }
  },
  methods: {
    ...mapMutations({ closeEditModal: "closeEditModal" }),
    //change state of pin attribute
    pinNote() {
      this.editedNote.isPin = !this.editedNote.isPin;
    },
    closeEditModal() {
      this.$store.commit("closeEditModal");
      //hide color picker after update note
      this.showColorPicker = false;
    },
    displayColorPicker() {
      this.showColorPicker = !this.showColorPicker;
    },
    confirmDeleteNote() {
      let notiText = "Bạn muốn xoá vĩnh viễn ghi chú này?";
      if (this.currentRoute == "/home") {
        notiText = "Bạn muốn chuyển ghi chú vào thùng rác?"
      } else if (this.currentRoute == "/trash") {
        notiText = "Bạn muốn xoá vĩnh viễn ghi chú này?"
      }
      //show confirm modal to delete note
      Swal.fire({
        title: 'Xoá',
        text: notiText,
        showDenyButton: true,
        confirmButtonColor: "#DC3741",
        denyButtonColor: "#BDB8B7",
        confirmButtonText: 'Xoá',
        denyButtonText: `Huỷ bỏ`,
      }).then((result) => {
        if (this.currentRoute == "/trash" && result.isConfirmed) {
          //if user want to delete note, delete it by call deleteNoteHandle function
          this.deleteNoteHandle();
        } else if (this.currentRoute == "/home" && result.isConfirmed) {
          //move note to trash
          this.moveToTrash()
        }
      });
    },
    //delete note handle
    async deleteNoteHandle() {
      const payload = {
        note: this.editedNote,
      };
      //call action from store to update note
      await this.deleteNote(payload);
      //reload edited notelist
      await this.getAllNotes(this.getAccountInfor._id);
      this.closeEditModal()
      //show alert notification
      Swal.fire("", "Ghi chú được xoá thành công", "success");
    },
    async moveToTrash() {
      //change state of isDeleted attribute to move note into trash
      this.editedNote.isDeleted = true;
      const payload = {
        userId: this.getAccountInfor._id,
        note: this.editedNote,
      };
      //call action from store to update note
      await this.updateNote(payload);
      //reload edited notelist
      await this.getAllNotes(this.getAccountInfor._id);
      this.closeEditModal()
      Swal.fire("", "Ghi chú được chuyển vào thùng rác", "success");
    },
    async restoreNote() {
      this.editedNote.isDeleted = false;
      const payload = {
        userId: this.getAccountInfor._id,
        note: this.editedNote,
      };
      //call action from store to update note
      await this.updateNote(payload);
      //reload edited notelist
      await this.getAllNotes(this.getAccountInfor._id);
      this.closeEditModal()
      Swal.fire("", "Ghi chú được khôi phục thành công", "success");
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
      getAllNotes: "getAllNotes",
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
    },
    $route(to, from) {
      this.currentRoute = this.$route.fullPath
    }
  },
  mounted() {
    this.editedNote = { ...this.getNote }
    this.currentRoute = "/home"
  },
}

</script>

<style scoped>
.shadow-custom {
  box-shadow: 0 0 5px;
}

.bounce-enter-active {
  animation: bounce-in 0.45s;
}

.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
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

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>