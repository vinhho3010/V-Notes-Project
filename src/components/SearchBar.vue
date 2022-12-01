<template>
    <div
    class="flex justify-center items-center">
        <div class="translate-x-8 text-xl mt-1 text-gray-400 z-10">
            <i class='bx bx-search'></i>
        </div>
        <div  class="w-[40rem] my-1">
            <input
            @focus="isFocus = true"
            v-model="searchText"
            type="search"
            class="form-control block w-full pl-10 pr-5 py-2.5 text-base rounded-lg border border-solid border-gray-300 text-black focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
            placeholder="Tìm kiếm">
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default{
    name: "SeachBar",
    data(){
        return{
            searchText: "",
            isFocus: false
        }
    },
    watch: {
        searchText(){
            this.filterSearch(this.searchText.trim())
        },
        getNoteList(){
            this.filterSearch(this.searchText.trim())
        }
    },
    computed: {
        ...mapGetters({getNoteList: "getNoteList"}),
        
    },
    methods:{
        ...mapActions({filterSearch: "filterSearch"})
    }
}
</script>