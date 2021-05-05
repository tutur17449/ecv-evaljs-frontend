<template>
  <div>
    <Spinner v-if="isLoading" />
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Spinner from "@/components/Spinner";

export default {
  name: "App",
  components: {
    Spinner,
  },
  data() {
    return { isLoading: true };
  },
  methods: {
    ...mapActions({
      checkAuth: "auth/checkAuth",
      fetchLogout: "auth/fetchLogout",
    }),
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/getAuth",
    }),
  },
  async mounted() {
    try {
      await this.checkAuth();
    } catch (err) {
      if (!this.isAuth) {
        return;
      }
      await this.fetchLogout();
      console.log(err.message);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>