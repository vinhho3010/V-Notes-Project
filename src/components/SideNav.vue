<template>
<div v-if="isShow" class="h-full flex flex-row bg-white fixed">
  <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
    <ul class="flex flex-col py-2">
      <li>
        <router-link  to="/home">
          <a href="#" 
          :class="[{'bg-[#FFF5BD]': currentRoute == '/home'}]"
          class="flex flex-row items-center h-14 w-[95%] transform hover:translate-x-1 transition-transform ease-in duration-200 text-gray-500 rounded-r-full hover:text-gray-600 hover:bg-[#FFF5BD] focus:bg-[#FFF5BD]">
            <span class="inline-flex items-center justify-center h-12 w-12 text-xl text-gray-400"><i class='bx bx-bulb' ></i></span>
            <span class="text-[0.95rem] font-medium">Ghi chú</span>
          </a>
        </router-link>
      </li>

      <li>
        <router-link to="/trash">
          <a href="#"
          :class="[{'bg-[#FFF5BD]': currentRoute == '/trash'}]"
          class="mt-1 flex flex-row items-center h-14 w-[95%] transform hover:translate-x-1 transition-transform ease-in duration-200 text-gray-500 rounded-r-full hover:text-gray-600 hover:bg-[#FFF5BD] focus:bg-[#FFF5BD]">
            <span class="inline-flex items-center justify-center h-12 w-12 text-xl text-gray-400"><i class='bx bx-trash'></i></span>
            <span class="text-[0.95rem] font-medium">Thùng rác</span>
          </a>
        </router-link>
      </li>
   
      <li>
        <a
        @click="logout()"
        href="#" class="mt-1 flex flex-row items-center h-14 w-[95%] transform hover:translate-x-1 transition-transform ease-in duration-200 text-gray-500 rounded-r-full hover:text-gray-600 hover:bg-[#FFF5BD] focus:bg-[#FFF5BD]">
          <span class="inline-flex items-center justify-center h-12 w-12 text-xl text-gray-400"><i class="bx bx-log-out"></i></span>
          <span class="text-[0.95rem] font-medium">Đăng xuất</span>
        </a>
      </li>
    </ul>

  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
    export default{
        props: {
            isShow: Boolean,
        },
        data(){
          return{
            currentRoute: "",
          }
        },
        methods: {
        ...mapActions({logout: "logout"})
    },
    watch: {
      $route(to, from){
      this.currentRoute = this.$route.fullPath
    }
    },
    mounted(){
      this.currentRoute = '/home'
    }
    }
</script>