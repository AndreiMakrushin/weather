import { createRouter, createWebHistory } from 'vue-router'
import TimeMap from '../pages/TimeMap.vue'
import DayliMap from '../pages/DayliMap.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'time-map',
            component: TimeMap
        },
        {
            path: '/dayli-map',
            name: 'dayli-map',
            component: DayliMap
        }
    ]
})

export default router