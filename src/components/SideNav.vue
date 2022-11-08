<template>
<div v-if="isShow" class="h-full flex flex-row bg-white fixed">
  <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
    <ul class="flex flex-col py-2">
      <li>
        <a href="#" class="flex flex-row items-center h-12 w-[95%] transform hover:translate-x-1 transition-transform ease-in duration-200 text-gray-500 rounded-r-full hover:text-gray-600 hover:bg-[#FFF5BD]">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class='bx bx-bulb' ></i></span>
          <span class="text-sm font-medium">Ghi chú</span>
        </a>
      </li>
      <li>
        <a href="#" class="flex flex-row items-center h-12 w-[95%] transform hover:translate-x-1 transition-transform ease-in duration-200 text-gray-500 rounded-r-full hover:text-gray-600 hover:bg-[#FFF5BD]">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class='bx bx-trash'></i></span>
          <span class="text-sm font-medium">Thùng rác</span>
        </a>
      </li>
      <li>
        <a href="#" class="flex flex-row items-center h-12 w-[95%] transform hover:translate-x-1 transition-transform ease-in duration-200 text-gray-500 rounded-r-full hover:text-gray-600 hover:bg-[#FFF5BD]">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class='bx bx-purchase-tag-alt' ></i></span>
          <span class="text-sm font-medium">Quản lý nhãn</span>
        </a>
      </li>
   
      <li>
        <a href="#" class="flex flex-row items-center h-12 w-[95%] transform hover:translate-x-1 transition-transform ease-in duration-200 text-gray-500 rounded-r-full hover:text-gray-600 hover:bg-[#FFF5BD]">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-log-out"></i></span>
          <span class="text-sm font-medium">Logout</span>
        </a>
      </li>
    </ul>

  </div>
</div>
</template>

<script>
    export default{
        props: {
            isShow: Boolean,
        }
    }
</script>