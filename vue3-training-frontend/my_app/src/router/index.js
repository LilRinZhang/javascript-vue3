import { createRouter, createWebHistory } from 'vue-router'
import Routing from '../views/Routing.vue'
import PostList from '../components/PostList.vue'
import HomeView from '../views/HomeView.vue'
import Top from '../views/Top.vue'
import Search from '../views/Search.vue'
import Add from '../views/Add.vue'
import Update from '../views/Update.vue'

const routes = [
    {
        path: '/routing',
        name: 'routing',
        component: Routing
    },
    {
        path: '/HomeView',
        name: 'HomeView',
        component: HomeView,
    },
    {
        path: '/postlist',
        name: 'Postlist',
        component: PostList
    },
    {
        path: '/',
        name: 'top',
        component: Top,
    },
    {
        path: '/search',
        name: 'search',
        component: Search,
    },
    {
        path: '/add',
        name: 'add',
        component: Add,
    },
    {
        path: '/update',
        name: 'update',
        component: Update,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router