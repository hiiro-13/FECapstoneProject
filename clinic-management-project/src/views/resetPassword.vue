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
        class="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-lg sm:p-8"
      >
        <h2
          class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          New Password
        </h2>
        <form
          class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          @click.prevent="changePassword()"
        >
          <div :class="{ error: validation.hasError('email') }">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Your email</label
            >
            <input
              type="email"
              disabled
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@domain.com"
              v-model="email"
            />
            <small style="color: red">{{
              validation.firstError("email")
            }}</small>
          </div>
          <div :class="{ error: validation.hasError('password') }">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >New Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              v-model="password"
            />
            <small style="color: red">{{
              validation.firstError("password")
            }}</small>
          </div>
          <div :class="{ error: validation.hasError('confirmPassword') }">
            <label
              for="confirm-password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Confirm password</label
            >
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              v-model="confirmPassword"
            />
            <small style="color: red">{{
              validation.firstError("confirmPassword")
            }}</small>
          </div>
          <button
            type="submit"
            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
        <div class="mt-4">
          <router-link
            :to="{ name: 'Login', params: {} }"
            class="block text-center"
            >Have account?</router-link
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
      token: "",
      password: "",
      confirmPassword: "",
      loader: false,
    };
  },
  created() {
    this.email = this.$route.query.email ? this.$route.query.email : "";
    this.token = decodeURIComponent(this.$route.query.token).replace(
      /\s/g,
      "+"
    );
  },
  validators: {
    email: function (value) {
      return Validator.value(value).required("Email is require").email();
    },
    password: function (value) {
      return Validator.value(value)
        .required("Password is require")
        .minLength(6, "Greater than 6 character");
    },
    "confirmPassword,password": function (confirmPassword, password) {
      return Validator.value(confirmPassword).match(password);
    },
  },
  methods: {
    async changePassword() {
      const success = await this.$validate();
      if (success === true) {
        this.loader = true;
        const params = {
          email: this.email,
          password: this.password,
          confirmpassword: this.confirmPassword,
          token: this.token,
        };
        HTTP.post("Authentication/ResetPassword", params)
          .then(() => {
            this.loader = false;
            this.showSuccess("Your Password Has Been Reset");
            this.$router.push("/");
          })
          .catch((err) => {
            this.loader = false;
            console.log(err);
          });
      }
    },
    showSuccess(mess) {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: mess,
        life: 3000,
      });
    },
  },
};
</script>

<style scoped>
input {
  margin: 10px 4px;
}
</style>
