<template>
  <div class="row">
    <div v-for="post in data" :key="post.id" class="col-12 col-lg-4">
      <CardPost
        :post="post"
        :isLike="
          auth && post.likes.find((i) => i.author === user.userData._id)
            ? true
            : false
        "
      />
    </div>
  </div>
</template>

<script>
import CardPost from "@/components/posts/CardPost";
import { mapGetters } from "vuex";

export default {
  name: "DisplayPosts",
  props: ["data"],
  components: {
    CardPost,
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      auth: "auth/getAuth",
    }),
  },
};
</script>
