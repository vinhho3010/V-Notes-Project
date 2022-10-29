<template>
    <div class="container m-0">
      <div class="w-full m-0 p-0">
        <Header/>
      </div>

      <div class="w-full ">
        <div class="mx-auto"><router-view/></div>
        
      </div>
    </div>
    

</template>

<script>
  import Header from '@/components/Header.vue';
  
    export default {
      components: {
        Header,
      },
    };
</script>


<style>
 

  
</style>