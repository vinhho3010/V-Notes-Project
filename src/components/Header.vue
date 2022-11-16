<template>
  <nav class=" flex items-center justify-items-center justify-between flex-wrap bg-[#579981] p-4 max-w-screen"
       :class="{'p-2': state == 'home'}">
    <div class="flex items-center flex-shrink-0 ml-4 text-white mr-6"
      :class="{'ml-8': state =='home'}">
      <img class="fill-current h-8 w-8 mr-2" width="74" height="74" viewBox="0 0 54 54" src="../assets/MainIcon.png" />
      <span class="font-semibold text-xl tracking-tight">V-Notes</span>
    </div>
    
    <div v-if="state == 'home'">
      <SearchBar/>
    </div>
    
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
      <!-- <a v-else-if="state == 'home'"
        @click="logout()"
        class="inline-block text-sm px-4 mr-4 py-2 leading-none border rounded cursor-pointer text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
        Đăng xuất
      </a> -->
      <a v-else-if="state == 'home'"
        class="inline-block text-sm px-4 mr-4 py-2 rounded-full leading-none border cursor-pointer text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
        <div class="flex flex-row">
          <div class="text-lg mr-1 mt-[0.1rem]"><i class='bx bxs-user'></i></div>
          <div class=" py-1 ml-1 mt-[1px] text-sm font-semibold"> {{getAccountInfor.username}}</div>
        </div>
      </a>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchBar from './SearchBar.vue';

export default {
    name: "Header",
    components: { SearchBar },
    props: {
        state: String,
    },
    emits: ["logout"],
    computed: {
      ...mapGetters({getAccountInfor: "getAccountInfor"})
    },
    methods: {
        logout() {
            this.$emit("logout");
        }
    },
    
}
</script>

