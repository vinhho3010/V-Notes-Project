import { createRouter, createWebHistory } from 'vue-router';
import CreateNoteForm from '@/components/CreateNoteForm.vue';
import NotesList from '@/components/NotesList.vue';
import DeletedNotesList from '@/components/DeletedNotesList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/",
      name: "login",
      component: () => import("@/views/LoginForm.vue"),
      alias: "/login",
    },
        {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignUpForm.vue"),
    },
    {
      path: "/home",
      name: "home",
      redirect: "/home",
      component: () => import("@/views/Home.vue"),
      children: [{
          path: "",
          name: "homeView",
          components: {
            CreateNoteForm: CreateNoteForm,
            NotesList: NotesList,
          },
        },
      ],
    },
    {
      path: "/trash",
      name: "trash",
      redirect: "/trash",
      component: () => import("@/views/Home.vue"),
      children: [{
        path: "",
        name: "trashView",
        components: {
            NotesList: DeletedNotesList,
          },
        },
      ],
    },
  ],
});

//route protection 
router.beforeEach(async (to, from) => {
  if (
     !(localStorage.getItem('token'))&&
     to.name !== 'login' &&
     to.name !== 'signup' &&
     to.name !== 'notfound'
  ) {
     return { name: 'login' };
  }
});

export default router
