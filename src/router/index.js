import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "../store/main";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import SearchView from "../views/SearchView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Cart from '../views/Cart.vue';
import MyOrder from '../views/MyOrder.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:category_slug/:product_slug",
      name: "product_detail",
      component: ProductDetailView,
    },
    {
      path: "/:category_slug",
      name: "category_detail",
      component: CategoryView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/my-order',
      name: 'my-order',
      component: MyOrder
    }
  ],
});

router.beforeEach((to, from, next) => {
  const store = useStore()

  if ((to.name === 'login' || to.name === 'register') && store.isAuthenticated) next({ name: 'home' })
  else next()
})

export default router;
