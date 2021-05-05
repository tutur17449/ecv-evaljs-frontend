<template>
  <div>
    <div v-if="isLoading" class="mt-5">
      <Spinner />
    </div>
    <div v-else class="container mt-5 mb-5">
      <div class="row">
        <div
          class="d-flex flex-row align-items-center justify-content-between w-100"
        >
          <h1>Home</h1>
          <b-button pill v-if="auth" variant="success">
            <router-link class="navlink dark" :to="{ name: 'post.createOne' }">
              Add post
            </router-link>
          </b-button>
        </div>
      </div>
      <Alert v-if="error !== ''" :message="error" />
      <div v-if="posts.length === 0" class="mt-5">
        <p>No post yet ...</p>
      </div>
      <DisplayPosts v-else :data="posts" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DisplayPosts from "@/components/posts/DisplayPosts";
import Spinner from "@/components/Spinner";
import Alert from "@/components/Alert";

export default {
  name: "Home",
  data() {
    return {
      isLoading: true,
      error: "",
    };
  },
  components: {
    DisplayPosts,
    Spinner,
    Alert,
  },
  methods: {
    ...mapActions({
      fetchPosts: "post/fetchPosts",
    }),
  },
  computed: {
    ...mapGetters({
      posts: "post/getPosts",
      auth: "auth/getAuth",
    }),
  },
  async mounted() {
    this.error = "";
    try {
      await this.fetchPosts();
    } catch (err) {
      this.error = "An error occured";
    } finally {
      this.isLoading = false;
    }
  },
};
</script>