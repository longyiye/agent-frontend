import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../pages/Home.vue');
const LoveChat = () => import('../pages/LoveChat.vue');
const ManusChat = () => import('../pages/ManusChat.vue');

const base = import.meta.env.BASE_URL ?? '/';

export const router = createRouter({
	history: createWebHistory(base),
	routes: [
		{ path: '/', name: 'home', component: Home },
		{ path: '/love', name: 'love', component: LoveChat },
		{ path: '/manus', name: 'manus', component: ManusChat },
		{ path: '/:pathMatch(.*)*', redirect: '/' },
	],
});

export default router;


