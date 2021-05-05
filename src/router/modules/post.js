import Post from "@/pages/post/Post.vue";
import Create from "@/pages/post/Create.vue";
import Update from "@/pages/post/Update.vue";

const routes = [
  {
    path: "/post/create",
    name: "post.createOne",
    component: Create,
    meta: { auth: true },
  },
  {
    path: "/post/:id",
    name: "post.findOne",
    component: Post,
  },
  {
    path: "/post/:id/edit",
    name: "post.updateOne",
    component: Update,
    meta: { auth: true },
  },
];

export default routes;
