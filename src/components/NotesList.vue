<template>
    <div class="h-auto w-full mb-2 max-w-full grid grid-flow-row-dense md:grid-cols-4 gap-x-1 gap-y-5 sm:grid-cols-3 ">
     <NoteCard :content = "noteContent"/>
     <NoteCard content="
     Lorem ipsumaliquam quam eius fuga voluptatem. Assumen esse doloremque magni consequuntur laudantium!"/>
     <NoteCard content="ok hihih"/>
     <NoteCard/>
     <!-- <NoteCard content="
     Lorem ipsum dolor sit amet consectetur, adipisicing elit. In explicabo minima totam eos dignissimos aliquam quam eius fuga voluptatem. Assumenda doloribus ducimus ullam eum, nesciunt esse doloremque magni consequuntur laudantium!"/>
     <NoteCard content="ok hihih"/>
     <NoteCard/>
     <NoteCard content="
     Lorem ipsum dolor sit amet consectetur, adipisicing elit. In explicabo minima totam eos dignissimos aliquam quam eius fuga voluptatem. Assumenda doloribus ducimus ullam eum, nesciunt esse doloremque magni consequuntur laudantium!"/>
     <NoteCard content="ok hihih"/>
     <NoteCard/>
     <NoteCard content="
     Lorem ipsum dolor sit amet consectetur, adipisicing elit. In explicabo minima totam eos dignissimos aliquam quam eius fuga voluptatem. Assumenda doloribus ducimus ullam eum, nesciunt esse doloremque magni consequuntur laudantium!"/>
     <NoteCard content="ok hihih"/>
     <NoteCard/>
     <NoteCard content="
     Lorem ipsum dolor sit amet consectetur, adipisicing elit. In explicabo minima totam eos dignissimos aliquam quam eius fuga voluptatem. Assumenda doloribus ducimus ullam eum, nesciunt esse doloremque magni consequuntur laudantium!"/>
     <NoteCard content="ok hihih"/>
     <NoteCard/>
     <NoteCard content="
     Lorem ipsum dolor sit amet consectetur, adipisicing elit. In explicabo minima totam eos dignissimos aliquam quam eius fuga voluptatem. Assumenda doloribus ducimus ullam eum, nesciunt esse doloremque magni consequuntur laudantium!"/>
     <NoteCard content="ok hihih"/> -->
    
    
    
    </div>
</template>

<script>
import NoteCard from '@/components/NoteCard.vue';
    export default{
        components:{
            NoteCard,
        },
        data(){
            return{
                noteContent: "Ghi chú trống"
            }
        }
    }
</script>