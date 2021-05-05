<template>
  <div class="comment">
    <div class="comment-header">
      <b-avatar variant="dark" :text="getFirstAuthorLetters"></b-avatar>
      <div class="comment-details">
        <small class="text-muted">
          {{ comment.author.givenName }}
          {{ comment.author.familyName }}</small
        >
        <small class="text-muted"> Published on {{ formatDate }}</small>
      </div>
    </div>
    <div class="comment-text">
      <div class="comment-edit mt-3" v-if="isEdit">
        <b-form-input v-model="content" id="user-comment"></b-form-input>
        <b-icon
          @click="onUpdate"
          icon="check-circle"
          class="h5 mb-2"
          variant="dark"
        >
        </b-icon>
      </div>
      <p v-else class="p-0 m-0 mt-3">{{ comment.content }}</p>
    </div>
    <div v-if="isAuthor" class="comment-actions">
      <b-icon
        @click="toggleEddit"
        icon="pencil-square"
        class="h5 mb-2"
        variant="dark"
      >
      </b-icon>
      <b-icon @click="onDelete" icon="trash" class="h5 mb-2" variant="dark">
      </b-icon>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Comment",
  props: ["setError", "comment", "id", "isAuthor"],
  data() {
    return {
      isEdit: false,
      content: this.comment.content,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      fetchUpdateComment: "post/fetchUpdateComment",
      fetchDeleteComment: "post/fetchDeleteComment",
    }),
    toggleEddit() {
      this.isEdit = !this.isEdit;
    },
    async onUpdate() {
      this.setError("");
      try {
        await this.fetchUpdateComment({
          content: this.content,
          post: this.id,
          id: this.comment._id,
        });
      } catch (err) {
        this.setError(err.response?.data.message || "Unauthorized");
      } finally {
        this.isEdit = false;
        this.isLoading = false;
      }
    },
    async onDelete() {
      this.setError("");
      try {
        await this.fetchDeleteComment(this.comment._id);
      } catch (err) {
        this.setError(err.response?.data.message || "Unauthorized");
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    getFirstAuthorLetters() {
      return (
        this.comment.author.givenName.substr(0, 1) +
        this.comment.author.familyName.substr(0, 1)
      );
    },
    formatDate() {
      return new Date(this.comment.dateModified).toLocaleDateString();
    },
  },
};
</script>
 <style>
.comment {
  position: relative;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}

.comment-header {
  display: flex;
  flex-direction: row;
}

.comment-details {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}

.comment-text {
  max-width: 80%;
}

.comment-actions {
  position: absolute;
  right: 5px;
  bottom: 0px;
}

.comment-edit {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>