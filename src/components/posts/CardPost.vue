<template>
  <router-link
    class="navlink"
    :to="{ name: 'post.findOne', params: { id: post._id } }"
  >
    <div class="mt-3">
      <b-card
        :header="post.headline"
        header-bg-variant="white"
        header-text-variant="dark"
        class="text-center"
      >
        <b-card-text class="text-left txt-dark">{{ post.body }}</b-card-text>
        <template #footer>
          <small class="text-muted">{{ formatDate }}</small>
          <div>
            <span>
              <b-icon
                icon="bookmark-heart-fill"
                :variant="isLike ? 'danger' : 'dark'"
              >
              </b-icon>
              <b-badge variant="light">{{ post.likes.length }}</b-badge>
            </span>
            <span>
              <b-icon icon="chat-right-text-fill" variant="dark"></b-icon>
              <b-badge variant="light">{{ post.comments.length }}</b-badge>
            </span>
          </div>
        </template>
      </b-card>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CardPost",
  props: ["post", "isLike"],
  computed: {
    formatDate() {
      return new Date(this.post.dateModified).toLocaleDateString();
    },
  },
};
</script>
<style>
.card,
.card-header {
  border-radius: 20px !important;
}

.card:hover {
  transition: all 250ms;
  transform: scale(1.03);
}
.card-header {
  font-weight: bold;
}

.card-text {
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>