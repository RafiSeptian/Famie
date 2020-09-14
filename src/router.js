import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        name:'home',
        path: '/',
        component: require('./views/Home').default
    },

    {
        name:'detail',
        path: '/film/detail/:id',
        component: require('./views/Detail').default,
        props: true
    }
]

export default new Router({
    routes
})