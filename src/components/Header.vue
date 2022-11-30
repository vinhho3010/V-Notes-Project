<template>
  <nav class=" flex items-center justify-items-center justify-between flex-wrap bg-[#579981] p-4 max-w-screen"
       :class="{'p-2': state == 'home'}">
       <!-- <div class="">
        <i class='bx bx-menu'></i>
       </div> -->
    <div class="flex items-center flex-shrink-0 ml-4 text-white mr-6"
      >
      <img class="fill-current h-8 w-8 mr-2" width="74" height="74" viewBox="0 0 54 54" src="../assets/MainIcon.png" />
      <span class="font-semibold text-xl tracking-tight cursor-default">V-Notes</span>
    </div>
    
    <transition>
      <div v-if="state == 'home' && this.currentRoute == '/home'">
        <SearchBar/>
      </div>
    </transition>
    
    <div>
      <a v-if="state == 'logInForm'"
        class="inline-block text-sm px-4 mr-4 py-2 leading-none border rounded cursor-pointer text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
        <router-link to="/signup">
          Đăng ký</router-link>
      </a>
      <a v-else-if="state == 'signUpForm'"
        class="inline-block text-sm px-4 mr-4 py-2 leading-none border rounded cursor-pointer text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
        <router-link to="/">
          Đăng nhập</router-link>
      </a>
      <a v-else-if="state == 'home'"
        class="inline-block text-sm px-4 mr-4 py-2 rounded-full leading-none border cursor-default text-white border-white mt-4 lg:mt-0">
        <div class="flex flex-row overflow-hidden text-ellipsis whitespace-nowrap max-w-[9rem]">
          <div class="text-lg mr-1 mt-[0.1rem]"><i class='bx bxs-user'></i></div>
          <div class=" py-1 ml-1 mt-[1px] text-sm font-semibold"> {{getAccountInfor.username}}</div>
        </div>
      </a>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchBar from '@/components/SearchBar.vue';

export default {
    name: "Header",
    components: { SearchBar },
    props: {
        state: String,
    },
    data(){
      return {
        currentRoute: ""
      }
    },
    computed: {
      ...mapGetters({getAccountInfor: "getAccountInfor"})
    },
    methods: {
      
    },
    watch: {
      $route(to, from){
      this.currentRoute = this.$route.fullPath
    }
    },
    mounted(){
     this.currentRoute = "/home"
  },  
}
</script>

<style scoped>
.v-enter-active {
	transition: opacity 0.25s ease-in-out;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>

