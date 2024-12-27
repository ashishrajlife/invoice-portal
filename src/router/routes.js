import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import addinvoice from '@/components/addinvoice.vue';
import TransactionDetails from '@/components/TransactionDetails.vue';
import Preview from '@/components/Preview.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // This route requires authentication
  },
  {
    path: "/addinvoice",
    name: "addinvoice",
    component: addinvoice,
  },
  {
    path: "/transactiondetails",
    name: "transactiondetails",
    component: TransactionDetails,
  },
  {
    path: '/transactiondetail',
    name: 'transactiondetail',
    component: TransactionDetails,
  },
  {
    path: '/preview',
    name: 'preview',
    component: Preview,
  },
  
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
