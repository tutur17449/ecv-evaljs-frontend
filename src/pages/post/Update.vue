<template>
  <div>
    <Spinner v-if="isLoading" />
    <div v-else class="container mt-5 mb-5">
      <div class="row">
        <div class="col-12">
          <h1>Update post</h1>
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
              :disabled="isUpdating"
              pill
              variant="success"
              type="submit"
              class="mt-5"
            >
              Update post
            </b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UpdatePost",
  components: {
    Alert,
    Spinner,
  },
  data() {
    return {
      isLoading: true,
      isUpdating: false,
      headline: "",
      body: "",
      error: "",
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions({
      fetchPost: "post/fetchPost",
      fetchUpdatePost: "post/fetchUpdatePost",
    }),
    async onSubmit(e) {
      e.preventDefault();
      this.error = "";
      if (e.target.classList.contains("was-validated")) {
        this.isUpdating = true;
        try {
          await this.fetchUpdatePost({
            headline: this.headline,
            body: this.body,
            id: this.id,
          });
        } catch (err) {
          this.error = err.response?.data.message || "Unauthorized";
        } finally {
          this.isUpdating = false;
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      post: "post/getPost",
    }),
    headlineValidation() {
      return this.headline.length >= 4;
    },
    bodyValidation() {
      return this.body.length >= 4;
    },
  },
  async mounted() {
    this.error = "";
    try {
      await this.fetchPost(this.id);
      this.headline = this.post.headline;
      this.body = this.post.body;
    } catch (err) {
      this.error = err.response?.data.message || "Unauthorized";
    } finally {
      this.isLoading = false;
    }
  },
};
</script>