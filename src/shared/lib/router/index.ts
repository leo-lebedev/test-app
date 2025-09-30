import {createRouter, createWebHistory} from 'vue-router'

const OrdersListPage = () => import('../../../pages/orders')
const OrderPage = () => import('../../../pages/order')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: OrdersListPage},
        {path: '/order/:id', component: OrderPage},
        {
            path: '/order/:id/edit',
            name: 'orders-edit', // ← обязательно
            component: OrderPage,
            props: {mode: 'edit'},
        }
    ],
})

export default router

