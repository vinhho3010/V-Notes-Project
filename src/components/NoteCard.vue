<template>
  <div class="note-card" @blur.self="showColorPicker = false" tabindex="0">
    <div
      @mouseover="editableButton()"
      @mouseleave="unEditableButton()"
      @click.self="editNote()"
      class="relative w-[90%] min-h-[30px] max-h-60 pt-4 pb-2 px-3 rounded-xl shadow-custom-bold border-[1.5px] cursor-default border-solid border-gray-300"
      :class="({ 'bg-white': note.color == '#ffffff' }, note.color)"
    >
      <Transition>
        <div
          v-show="this.$route.fullPath == '/home'"
          title="Chọn màu ghi chú"
          v-if="showEditButton"
          @click="displayColorPicker()"
          class="editButton absolute text-lg top-1 right-1 py-1 px-2 cursor-pointer border-solid border-gray-200 hover:bg-gray-300 rounded-full"
        >
          <i class="bx bx-palette bx-xl"></i>
        </div>
      </Transition>
      <transition>
        <div
          v-show="this.$route.fullPath == '/home'"
          title="Ghim ghi chú"
          v-if="showEditButton"
          @click.stop="pinNote()"
          class="pin absolute inline-block bg-white shadow-md border-[1px] border-gray-300 rounded-full -translate-x-7 -translate-y-7 px-[0.3rem] text-lg cursor-pointer hover:bg-gray-300"
        >
          <i
            :class="{ 'bxs-pin': note.isPin, 'bx-pin': !note.isPin }"
            class="bx"
          ></i>
        </div>
      </transition>
      <div
        @click="editNote()"
        class="title mt-[0.85rem] max-h-6 break-words overflow-hidden font-semibold"
      >
        {{ note.title }}
      </div>

      <div
        @click="editNote()"
        class="content mt-3 pb-1 max-h-[10rem] break-words overflow-hidden text-ellipsis"
      >
        {{ note.content }}
        <p
          class="text-lg text-gray-400"
          v-if="note.title == '' && note.content == ''"
        >
          Ghi chú trống
        </p>
      </div>
    </div>
    <div class="color-picker translate-y-1 translate-x-1 absolute z-30">
      <ColorPicker :isOpen="showColorPicker" :currentNote="note" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ColorPicker from "@/components/ColorPicker.vue";
export default {
  props: {
    note: {},
  },
  components: {
    ColorPicker,
  },
  data() {
    return {
      showEditButton: false,
      showColorPicker: false,
      currentRoute: "",
    };
  },
  methods: {
    editableButton() {
      this.showEditButton = true;
    },
    unEditableButton() {
      this.showEditButton = false;
    },
    async pinNote() {
      this.note.isPin = !this.note.isPin;
      this.$store.commit("SET_NOTE", this.note);
      const payload = {
        userId: this.getAccountInfor._id,
        note: this.note,
      };

      //call action from store to update note
      await this.updateNote(payload);

      //reload edited notelist
      await this.getAllNotes(this.getAccountInfor._id);
    },
    displayColorPicker() {
      this.showColorPicker = !this.showColorPicker;
    },
    editNote() {
      //set data for selected note to use in edit modal
      this.$store.commit("SET_NOTE", this.note);
      this.$store.commit("displayEditModal");
    },
    ...mapMutations({
      displayEditModal: "displayEditModal",
      SET_NOTE: "setNote",
    }),

    ...mapActions({ updateNote: "updateNote", getAllNotes: "getAllNotes" }),
  },
  computed: {
    ...mapGetters({ getNote: "getNote", getAccountInfor: "getAccountInfor" }),
  },
  watch: {
      $route(to, from){
      this.currentRoute = this.$route.fullPath
      console.log();
    }
    },
};
</script>

<style scoped>
.shadow-custom-bold:hover {
  box-shadow: 0px 0px 2px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
