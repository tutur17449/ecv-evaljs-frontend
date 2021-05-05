<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <router-link class="navlink dark" :to="{ name: 'base.home' }">
          ECV JS - AHL app
        </router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="getAuth" class="ml-auto">
          <b-button pill variant="dark">
            <router-link class="navlink dark" :to="{ name: 'auth.profil' }">
              Profil
            </router-link>
          </b-button>
          <b-button pill variant="light">
            <span class="navlink light" @click="fetchLogout"> Log out </span>
          </b-button>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-button pill variant="dark">
            <router-link class="navlink dark" :to="{ name: 'auth.signin' }">
              Sign in
            </router-link>
          </b-button>
          <b-button pill variant="light">
            <router-link class="navlink light" :to="{ name: 'auth.signup' }">
              Sign up
            </router-link>
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Header",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      fetchLogout: "auth/fetchLogout",
    }),
  },
  computed: {
    ...mapGetters({
      getAuth: "auth/getAuth",
      getUser: "auth/getUser",
    }),
  },
  mounted() {},
};
</script>
<style>
.navlink {
  text-decoration: none !important;
}

.navlink.dark,
.navlink.dark:hover {
  color: white !important;
}

.navlink.light,
.navlink.light:hover {
  color: black !important;
}
</style>
