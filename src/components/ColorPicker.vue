<template>
	<transition>
		<div ref="colorPicker" v-if="isOpen"
			class="w-90% p-3 h-12 mx-auto shadow-custom-1 flex flex-row shadow-md bg-white rounded-lg z-20">
			<div ref="colorList" v-for="(color, index) in colors" :key="index"
				class="color-chosen rounded-full mr-2 p-3  cursor-pointer"
				:class="[{ 'bg-white border-[1px] border-gray-300': color == '#ffffff', 'ring-offset-green-300 ring-2': colorSelected == color }, color]"
				@click="setColor(color)">
			</div>
		</div>
	</transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: "ColorPicker",
	props: {
		isOpen: Boolean,
		currentNote: Object,
	},
	data() {
		return {
			colors: ['#ffffff', 'bg-blue-200', 'bg-yellow-200', 'bg-gray-200', 'bg-green-300', 'bg-red-200', 'bg-purple-300'],
			colorSelected: this.currentNote.color || '#ffffff',
		}
	},
	computed: {
		...mapGetters({ getAccountInfor: "getAccountInfor" })
	},
	methods: {
		hideColorPicker() {
			this.isOpen = !this.isOpen;
		},
		async setColor(color) {
			this.colorSelected = color;
			this.currentNote.color = this.colorSelected;

			this.$store.commit("SET_NOTE", this.currentNote);
			const payload = {
				userId: this.getAccountInfor._id,
				note: this.currentNote,
			};

			//if note has description update it
			if (this.currentNote.content != '' || this.currentNote.title != '') {
				//call action from store to update note
				await this.updateNote(payload);
			}

			//reload edited notelist
			await this.getAllNotes(this.getAccountInfor._id);
		},
		...mapActions({
			updateNote: "updateNote",
			getAllNotes: "getAllNotes"
		})
	},
}
</script>    

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
     
