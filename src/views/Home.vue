<template>
    <div class="w-full relative">
        <div class="w-full sticky top-0 left-0 right-0 z-50">
            <Header state="home"
                    :currentRoute = "currentRoute" />
        </div>

        <div class="w-full flex flex-row mt-0 z-500">
            <div class="basis-1/6">
                <SideNav :isShow = showSideNav
                         :currentRoute = "currentRoute" />
            </div>
            <div class="basis-5/6">
                <div class="w-full mb-5 mr-9">
                    <router-view name="CreateNoteForm"></router-view>
                    <!-- <CreateNoteForm /> -->
                </div>
                <div class="noteList">
                    <router-view name="NotesList"></router-view>
                    <!-- <NotesList /> -->
                </div>
            </div>
        </div>

        <div class="w-screen z-[99] absolute top-0">
            <EditNoteModal :showEditModal="showEditModal"
                           :currentRoute = "currentRoute" />
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import SideNav from '@/components/SideNav.vue';
import NotesList from '@/components/NotesList.vue'
import CreateNoteForm from '@/components/CreateNoteForm.vue';
import EditNoteModal from '../components/EditNoteModal.vue';
export default {
    components: {
        Header,
        SideNav,
        NotesList,
        CreateNoteForm,
        EditNoteModal,
    },
    data() {
        return {
            showSideNav: true,
            showEditModal: false,
            currentRoute: this.$route.path.slice(1)
        }
    },
}

</script>

<style>
.shadow-custom {
    box-shadow: 0 0 3px;
}

.shadow-custom-1 {
    box-shadow: 0 0 1.5px;
}
</style>