<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-12">
        <h1>Signup</h1>
      </div>
    </div>
    <div class="row wrapper-light">
      <div class="col-12">
        <Alert v-if="error !== ''" :message="error" />
        <b-form
          @submit="onSubmit"
          :validated="
            emailValidation &&
            passwordValidation &&
            familyNameValidation &&
            givenNameValidation
          "
        >
          <b-form-group class="mb-4">
            <label for="user-gn">Given name :</label>
            <b-form-input
              v-model="givenName"
              :state="givenNameValidation"
              id="user-gn"
            ></b-form-input>
            <b-form-invalid-feedback :state="givenNameValidation">
              Your given name must be greater than 4 characters.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="givenNameValidation">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group class="mb-4">
            <label for="user-fn">Family name :</label>
            <b-form-input
              v-model="familyName"
              :state="familyNameValidation"
              id="user-fn"
            ></b-form-input>
            <b-form-invalid-feedback :state="familyNameValidation">
              Your family name must be greater than 4 characters.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="familyNameValidation">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>

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
            Signup
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
  name: "Signup",
  components: {
    Alert,
  },
  data() {
    return {
      isLoading: false,
      givenName: "",
      familyName: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    ...mapActions({
      fetchRegister: "auth/fetchRegister",
    }),
    async onSubmit(e) {
      e.preventDefault();
      this.error = "";
      if (e.target.classList.contains("was-validated")) {
        this.isLoading = true;
        try {
          await this.fetchRegister({
            email: this.email,
            password: this.password,
            givenName: this.givenName,
            familyName: this.familyName,
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
    givenNameValidation() {
      return this.givenName.length >= 4;
    },
    familyNameValidation() {
      return this.familyName.length >= 4;
    },
    emailValidation() {
      return this.email.length >= 4;
    },
    passwordValidation() {
      return this.password.length >= 4;
    },
  },
};
</script>