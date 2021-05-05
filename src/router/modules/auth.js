import Signin from "@/pages/Signin.vue";
import Signup from "@/pages/Signup.vue";
import Profil from "@/pages/Profil.vue";

const routes = [
  {
    path: "/signin",
    name: "auth.signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "auth.signup",
    component: Signup,
  },
  {
    path: "/profil",
    name: "auth.profil",
    component: Profil,
    meta: { auth: true },
  },
];

export default routes;
