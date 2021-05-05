<template>
  <div class="flex flex-column">
    <h4 class="pt-2 pb-5">All comments</h4>
    <Alert v-if="error !== ''" :message="error" />
    <div v-if="comments.length === 0">
      <p>No comments yet ...</p>
    </div>
    <div v-else>
      <div v-for="comment in comments" :key="comment._id">
        <Comment
          :setError="setError"
          :comment="comment"
          :id="id"
          :isAuthor="
            auth && comment.author._id === user.userData._id ? true : false
          "
        />
      </div>
    </div>
    <div v-if="auth" class="mt-5">
      <b-form-group class="mb-4">
        <label for="user-comment">Your comment :</label>
        <b-form-input v-model="content" id="user-comment"></b-form-input>
      </b-form-group>
      <b-button pill @click="onClick" variant="outline-success"
        >Publish</b-button
      >
    </div>
  </div>
</template>

<script>
import Comment from "@/components/posts/Comment";
import { mapActions, mapGetters } from "vuex";
import Alert from "@/components/Alert";

export default {
  name: "CommentsBox",
  props: ["id", "comments"],
  components: {
    Comment,
    Alert,
  },
  data() {
    return {
      error: "",
      content: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      fetchNewComment: "post/fetchNewComment",
    }),
    async onClick() {
      this.error = "";
      try {
        await this.fetchNewComment({
          content: this.content,
          post: this.id,
        });
        this.content = "";
      } catch (err) {
        this.error = err.response?.data.message || "Unauthorized";
      } finally {
        this.isLoading = false;
      }
    },
    setError(message) {
      this.error = message;
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      auth: "auth/getAuth",
    }),
  },
};
</script>
 