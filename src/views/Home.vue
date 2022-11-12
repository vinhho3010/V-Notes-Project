<template>
    <div class="w-screen relative">
        <div class="w-full sticky top-0 z-50">
            <Header state="home" @logout="logout" />
        </div>

        <div class="w-full flex flex-row mt-0">
            <div class="basis-1/6">
                <SideNav :isShow = showSideNav />
            </div>
            <div class="basis-5/6">
                <div class="w-full mb-5 mr-9">
                    <CreateNoteForm />
                </div>
                <div class="noteList">
                    <NotesList />
                </div>
            </div>
        </div>

        <div class="w-screen z-[9999] absolute top-0">
            <EditNoteModal :showEditModal="showEditModal" />
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import SideNav from '@/components/SideNav.vue';
import NotesList from '@/components/NotesList.vue'
import CreateNoteForm from '@/components/CreateNoteForm.vue';
import EditNoteModal from '../components/EditNoteModal.vue';
import { mapActions } from 'vuex';
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
        }
    },
    methods: {
        logout() {
            if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
                localStorage.clear();
                this.$router.push('/');
            }
        },
    },
}

</script>