<template>
  <div>
    <Spinner v-if="isLoading" />
    <div v-else class="container mt-5 mb-5">
      <div class="row">
        <div
          class="d-flex flex-row align-items-center justify-content-between w-100"
        >
          <h1>{{ post.headline }}</h1>
          <div v-if="getIsAuthor">
            <b-button
              pill
              size="xs"
              variant="info"
              class="mr-2"
              :disabled="isActions"
            >
              <router-link
                class="navlink dark"
                :to="{ name: 'post.updateOne' }"
              >
                <b-icon icon="pencil-square" aria-label="Help"></b-icon>
              </router-link>
            </b-button>
            <b-button
              @click="onSubmit"
              pill
              size="xs"
              variant="danger"
              :disabled="isActions"
            >
              <b-icon icon="trash" aria-label="Help"></b-icon>
            </b-button>
          </div>
        </div>
      </div>
      <div class="row wrapper-light">
        <div class="col-12">
          <Alert v-if="error !== ''" :message="error" />
          <div
            class="d-flex flex-row align-items-center justify-content-between w-100"
          >
            <div class="d-flex">
              <small class="text-muted">
                Published on {{ formatDate }} by {{ post.author.givenName }}
                {{ post.author.familyName }}
              </small>
            </div>
            <div class="d-flex">
              <span>
                <b-icon
                  @click="likeDislike"
                  icon="bookmark-heart-fill"
                  class="h5 mb-2"
                  :variant="getIsLike ? 'danger' : 'dark'"
                >
                </b-icon>
                <b-badge variant="light">{{ post.likes.length }}</b-badge>
              </span>
              <span>
                <b-icon
                  icon="chat-right-text-fill"
                  class="h5 mb-2"
                  variant="dark"
                ></b-icon>
                <b-badge variant="light">{{ post.comments.length }}</b-badge>
              </span>
            </div>
          </div>
        </div>
        <div class="col-12 mt-5">
          <p>{{ post.body }}</p>
        </div>
        <div class="separator mt-5 mb-5"></div>
        <div class="col-12 col-lg-6">
          <CommentsBox :id="id" :comments="post.comments" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Spinner from "@/components/Spinner";
import CommentsBox from "@/components/posts/CommentsBox";
import Alert from "@/components/Alert";

export default {
  name: "Post",
  data() {
    return {
      isLoading: true,
      isActions: false,
      error: "",
      id: this.$route.params.id,
    };
  },
  components: {
    Spinner,
    CommentsBox,
    Alert,
  },
  methods: {
    ...mapActions({
      fetchPost: "post/fetchPost",
      fetchDeletePost: "post/fetchDeletePost",
      fetchLike: "post/fetchLike",
      fetchDislike: "post/fetchDislike",
    }),
    async onSubmit() {
      this.error = "";
      this.isActions = true;
      try {
        await this.fetchDeletePost(this.id);
      } catch (err) {
        this.error = err.response?.data.message || "Unauthorized";
      } finally {
        this.isActions = false;
      }
    },
    async likeDislike() {
      this.error = "";
      this.isActions = true;
      if (!this.auth) {
        return;
      }
      try {
        if (this.getIsLike) {
          const like = this.post.likes.find(
            (i) => i.author._id === this.user._id
          );
          return await this.fetchDislike(like._id);
        }
        return await this.fetchLike(this.id);
      } catch (err) {
        this.error = err.response?.data.message || "Unauthorized";
      } finally {
        this.isActions = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      post: "post/getPost",
      user: "auth/getUser",
      auth: "auth/getAuth",
    }),
    formatDate() {
      return new Date(this.post.dateModified).toLocaleDateString();
    },
    getIsLike() {
      return (
        this.auth &&
        this.post.likes.find((i) => i.author === this.user.userData._id)
      );
    },
    getIsAuthor() {
      return this.auth && this.user.userData._id === this.post.author._id;
    },
  },
  async mounted() {
    this.error = "";
    try {
      await this.fetchPost(this.id);
    } catch (err) {
      this.error = err.response?.data.message || "Unauthorized";
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
<style>
.separator {
  width: 100%;
  border-top: 1px solid #ced4da;
}
</style>