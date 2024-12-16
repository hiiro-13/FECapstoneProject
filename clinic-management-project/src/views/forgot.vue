<template>
  <loader
    object="#ffffff"
    color1="#000000"
    color2="#ff2600"
    size="5"
    speed="2"
    bg="#343a40"
    objectbg="#999793"
    opacity="80"
    name="circular"
    v-if="loader"
  ></loader>
  <!-- body -->
  <section class="bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-xl sm:p-8"
      >
        <h2
          class="mb-1 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Forgot your password?
        </h2>
        <h6 class="text-center">
          Enter your email address you signed up with and we'll send you reset
          password instructions
        </h6>
        <form
          class="mt-4 space-y-4 lg:mt-5 md:space-y-10"
          :class="{ error: validation.hasError('email') }"
          @click.prevent="resetPassword()"
        >
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Your email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              v-model="email"
            />
          </div>
          <small style="color: red">{{ validation.firstError("email") }}</small>
          <button
            type="submit"
            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Reset passwod
          </button>
        </form>
        <div class="mt-4">
          <router-link
            :to="{ name: 'Login', params: {} }"
            class="block text-center"
            >Never mind, I remember it.</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>
<style src="../assets/style/authentication.css" scoped></style>
<script>
import { HTTP } from "@/axios";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
export default {
  data() {
    return {
      email: "",
      loader: false,
    };
  },
  validators: {
    email: function (value) {
      return Validator.value(value).required("Email is require").email();
    },
  },
  methods: {
    async resetPassword() {
      const success = await this.$validate();
      if (success === true) {
        this.loader = true;
        HTTP.post("Authentication/RequestResetPassword/" + this.email)
          .then(() => {
            this.loader = false;
          })
          .catch((err) => {
            this.loader = false;
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
input {
  margin: 10px 4px;
}
</style>
