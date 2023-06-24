import {createRouter, createWebHistory} from 'vue-router'
import home from '/src/components/Home.vue'
import associazione from '/src/components/Associazione.vue'
import lupetti from '/src/components/Lupetti.vue'


const routes = [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
        path: '/associazione',
        name: 'associazione',
        component: associazione
      },
      {
        path: '/lc/lupetti',
        name: 'lupetti',
        component: lupetti
      },
    
  ]


  const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router