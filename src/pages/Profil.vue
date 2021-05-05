<template>
  <div class="container mt-5 mb-5">
    <div class="row wrapper-light">
      <div
        class="d-flex flex-row align-items-center justify-content-center w-100"
      >
        <h1>
          Welcome {{ user.userData.givenName }} {{ user.userData.familyName }},
        </h1>
      </div>
      <div class="col-12 mt-5">
        <h3>Your likes</h3>
        <div class="w-100 mt-3">
          <p v-if="user.userLikes.length === 0">No activity yet ...</p>
          <ul v-else>
            <li v-for="like in user.userLikes" :key="like._id">
              <router-link
                class="navlink"
                :to="{ name: 'post.findOne', params: { id: like.post._id } }"
              >
                {{ like.post.headline }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12 mt-5">
        <h3>Your comments</h3>
        <div class="w-100 mt-3">
          <p v-if="user.userComments.length === 0">No activity yet ...</p>
          <ul v-else>
            <li v-for="comment in user.userComments" :key="comment._id">
              <router-link
                class="navlink"
                :to="{ name: 'post.findOne', params: { id: comment.post._id } }"
              >
                {{ comment.post.headline }} ( {{ comment.content }} )
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profil",
  data() {
    return {
      isLoading: true,
      error: "",
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
  },
};
</script>