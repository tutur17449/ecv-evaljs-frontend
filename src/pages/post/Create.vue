<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-12">
        <h1>Create post</h1>
      </div>
    </div>
    <div class="row wrapper-light">
      <div class="col-12">
        <Alert v-if="error !== ''" :message="error" />
        <b-form
          @submit="onSubmit"
          :validated="headlineValidation && bodyValidation"
        >
          <b-form-group class="mb-4">
            <label for="post-headline">Headline :</label>
            <b-form-input
              v-model="headline"
              :state="headlineValidation"
              id="post-headline"
            ></b-form-input>
            <b-form-invalid-feedback :state="headlineValidation">
              The headline must be greater than 4 characters.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="headlineValidation">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group>
            <label for="post-body">Body :</label>
            <b-form-input
              v-model="body"
              :state="bodyValidation"
              id="post-body"
            ></b-form-input>
            <b-form-invalid-feedback :state="bodyValidation">
              The body must be greater than 4 characters.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="bodyValidation">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>

          <b-button
            :disabled="isLoading"
            pill
            variant="success"
            type="submit"
            class="mt-5"
          >
            Create post
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
  name: "CreatePost",
  components: {
    Alert,
  },
  data() {
    return {
      isLoading: false,
      headline: "",
      body: "",
      error: "",
    };
  },
  methods: {
    ...mapActions({
      fetchNewPost: "post/fetchNewPost",
    }),
    async onSubmit(e) {
      e.preventDefault();
      this.error = "";
      if (e.target.classList.contains("was-validated")) {
        this.isLoading = true;
        try {
          await this.fetchNewPost({
            headline: this.headline,
            body: this.body,
          });
        } catch (err) {
          this.error = err.response?.data.message || "Unauthorized";
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
  computed: {
    headlineValidation() {
      return this.headline.length >= 4;
    },
    bodyValidation() {
      return this.body.length >= 4;
    },
  },
};
</script>