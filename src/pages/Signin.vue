<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-12">
        <h1>Signin</h1>
      </div>
    </div>
    <div class="row wrapper-light">
      <div class="col-12">
        <Alert v-if="error !== ''" :message="error" />
        <b-form
          @submit="onSubmit"
          :validated="emailValidation && passwordValidation"
        >
          <b-form-group class="mb-4">
            <label for="user-email">Email :</label>
            <b-form-input
              v-model="email"
              :state="emailValidation"
              id="user-email"
            ></b-form-input>
            <b-form-invalid-feedback :state="emailValidation">
              Your email must be greater than 4 characters.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="emailValidation">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group>
            <label for="user-password">Password :</label>
            <b-form-input
              type="password"
              v-model="password"
              :state="passwordValidation"
              id="user-password"
            ></b-form-input>
            <b-form-invalid-feedback :state="passwordValidation">
              Your password must be greater than 4 characters.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="passwordValidation">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>

          <b-button
            pill
            variant="success"
            :disabled="isLoading"
            type="submit"
            class="mt-5"
          >
            Signin
          </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Alert from "@/components/Alert";

export default {
  name: "Signin",
  components: {
    Alert,
  },
  data() {
    return {
      isLoading: false,
      email: "admin@test.fr",
      password: "admin",
      error: "",
    };
  },
  methods: {
    ...mapActions({
      fetchLogin: "auth/fetchLogin",
    }),
    async onSubmit(e) {
      e.preventDefault();
      this.error = "";
      if (e.target.classList.contains("was-validated")) {
        this.isLoading = true;
        try {
          await this.fetchLogin({
            email: this.email,
            password: this.password,
          });
        } catch (err) {
          this.error = err.response.data.message;
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
  computed: {
    emailValidation() {
      return this.email.length >= 4;
    },
    passwordValidation() {
      return this.password.length >= 4;
    },
  },
};
</script>