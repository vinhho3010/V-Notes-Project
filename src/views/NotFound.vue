<template>
    <div class="w-screen">
        <Header />
    </div>
    <div class="w-full flex justify-center content-center my-24">
        <div class="w-4/12 my-auto">
            <h3 class="text-center text-2xl font-medium">Oops, Trang hiện tại không khả dụng</h3>
            <router-link to="/">
                <button class="ml-[8rem] bg-transparent w-[40%] mt-5 text-green-800  font-semibold text-lg hover:bg-green-700 hover:text-white py-2 px-8 border-2 border-green-700 hover:border-transparent focus:ring-lime-400 rounded-lg">
                        Trang chủ
                </button>
            </router-link>
        </div>
        <img
        class="w-4/12 h-auto"
        src="../assets/picture/404-background.jpg" />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
    export default{
        name:"NotFound",
        components: {
            Header,
        }
    }
</script>