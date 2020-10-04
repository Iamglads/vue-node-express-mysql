import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },

  {
    path: "/signup",
    name: "login",
    component: Signup
  },

  {
    path: "/login",
    name: "login",
    component: Login
  },

];

const router = new VueRouter({
  routes
});

export default router;
