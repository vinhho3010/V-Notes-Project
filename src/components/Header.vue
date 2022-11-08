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
      <a v-else-if="state == 'home'"
        @click="logout()"
        class="inline-block text-sm px-4 mr-4 py-2 leading-none border rounded cursor-pointer text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
        Đăng xuất
      </a>
    </div>
  </nav>
</template>

<script>
import SearchBar from './SearchBar.vue';

export default {
    name: "Header",
    props: {
        state: String,
    },
    emits: ["logout"],
    methods: {
        logout() {
            this.$emit("logout");
        }
    },
    components: { SearchBar }
}
</script>

