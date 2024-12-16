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
  <div>
    <div class="text-center">
      <h1 class="font-medium text-2xl lg:text-3xl mb-4">Register for more</h1>
    </div>
    <div class="d-flex justify-content-around">
      <div
        class="w-100 flex-column me-1"
        :class="{ error: validation.hasError('registerData.firstName') }"
      >
        <input
          type="text"
          placeholder="First Name"
          v-model="registerData.firstName"
        />
        <small class="ms-4" style="color: red">{{
          validation.firstError("registerData.firstName")
        }}</small>
      </div>
      <div class="w-100 flex-column">
        <input
          type="text"
          placeholder="Last Name"
          v-model="registerData.lastName"
          :class="{ error: validation.hasError('registerData.lastName') }"
        />
        <small class="ms-4" style="color: red">{{
          validation.firstError("registerData.lastName")
        }}</small>
      </div>
    </div>
    <div class="d-flex justify-content-around">
      <div
        class="w-75 me-3 flex-column"
        :class="{ error: validation.hasError('registerData.email') }"
      >
        <input type="email" placeholder="Email" v-model="registerData.email" />
        <small class="ms-4" style="color: red">{{
          validation.firstError("registerData.email")
        }}</small>
      </div>
      <div
        class="w-25 flex-column"
        :class="{ error: validation.hasError('registerData.gender') }"
      >
        <select v-model="registerData.gender" style="margin-top: 8px">
          <option value="" disabled selected>Gender</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
          <option value="2">Undefine</option>
        </select>
        <small class="ms-4" style="color: red">{{
          validation.firstError("registerData.gender")
        }}</small>
      </div>
    </div>
    <div
      class="d-flex flex-column"
      :class="{ error: validation.hasError('registerData.address') }"
    >
      <input type="text" placeholder="Address" v-model="registerData.address" />
      <small class="ms-4" style="color: red">{{
        validation.firstError("registerData.gender")
      }}</small>
    </div>
    <div class="d-flex justify-content-around">
      <div
        class="w-100 flex-column me-1"
        :class="{ error: validation.hasError('registerData.identityCard') }"
      >
        <input
          type="text"
          placeholder="Identity Card"
          v-model="registerData.identityCard"
        />
        <small class="ms-4" style="color: red">{{
          validation.firstError("registerData.identityCard")
        }}</small>
      </div>
      <div
        class="w-100 flex-column"
        :class="{ error: validation.hasError('registerData.birthday') }"
      >
        <input
          placeholder="Birth date"
          class="textbox-n"
          type="text"
          onfocus="(this.type='date')"
          id="date"
          v-model="registerData.birthday"
        />
        <small class="ms-4" style="color: red">{{
          validation.firstError("registerData.birthday")
        }}</small>
      </div>
    </div>
    <div
      class="d-flex flex-column"
      :class="{ error: validation.hasError('registerData.phoneNumber') }"
    >
      <input
        type="text"
        placeholder="Phone Number"
        v-model="registerData.phoneNumber"
      />
      <small class="ms-4" style="color: red">{{
        validation.firstError("registerData.phoneNumber")
      }}</small>
    </div>
    <div
      class="flex-column"
      :class="{ error: validation.hasError('registerData.UserName') }"
    >
      <input
        type="text"
        placeholder="Username"
        v-model="registerData.UserName"
      />
      <small class="ms-4" style="color: red">{{
        validation.firstError("registerData.UserName")
      }}</small>
    </div>
    <div class="d-flex justify-content-around">
      <div
        class="w-100 me-1 flex-column"
        :class="{ error: validation.hasError('registerData.Password') }"
      >
        <input
          type="password"
          placeholder="Password"
          v-model="registerData.Password"
        />
        <small class="ms-4" style="color: red">{{
          validation.firstError("registerData.Password")
        }}</small>
      </div>
      <div
        class="w-100 flex-column"
        :class="{ error: validation.hasError('registerData.ConfirmPass') }"
      >
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="registerData.ConfirmPass"
        />
        <small class="ms-4" style="color: red">{{
          validation.firstError("registerData.ConfirmPass")
        }}</small>
      </div>
    </div>
    <router-link
      :to="{ name: 'Forgot' }"
      class="text-black text-end d-block m-2"
      style="margin-top: -10px; margin-right: 20px"
      >Need help?</router-link
    >
    <div class="d-flex justify-content-center">
      <button
        type="submit"
        class="confrim w-50"
        @click="register"
        :disabled="loader === true"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<style src="../assets/style/authentication.css" scoped></style>
<script>
import { HTTP } from "@/axios";
import { ref } from "vue";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
export default {
  setup() {
    let registerData = ref({
      UserName: "",
      Password: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      birthday: "",
      phoneNumber: "",
      ConfirmPass: "",
      gender: "",
      identityCard: "",
    });
    let loader = ref(false);
    return { registerData, loader };
  },
  validators: {
    "registerData.firstName": function (value) {
      return Validator.value(value)
        .required("First name is require")
        .regex("^[A-Za-z]*$", "Must only contain alphabetic characters.");
    },
    "registerData.lastName": function (value) {
      return Validator.value(value)
        .required("Last name is require")
        .regex("^[A-Za-z]*$", "Must only contain alphabetic characters.");
    },
    "registerData.email": function (value) {
      return Validator.value(value).required("Email is require").email();
    },
    "registerData.UserName": function (value) {
      return Validator.value(value).required("User name is require");
    },
    "registerData.identityCard": function (value) {
      return Validator.value(value).required("Identity is require").length(12);
    },
    "registerData.phoneNumber": function (value) {
      return Validator.value(value)
        .required("Phone number is require")
        .digit()
        .length(10);
    },
    "registerData.gender": function (value) {
      return Validator.value(value).required("Gender is require");
    },
    "registerData.birthday": function (value) {
      return Validator.value(value).required("Birth day is require");
    },
    "registerData.Password": function (value) {
      return Validator.value(value)
        .required("Password is require")
        .minLength(6, "Greater than 6 character");
    },
    "registerData.ConfirmPass,registerData.Password": function (
      ConfirmPass,
      Password
    ) {
      return Validator.value(ConfirmPass).match(Password);
    },
  },
  methods: {
    async register() {
      const success = await this.$validate();
      if (success === true) {
        this.loader = true;
        HTTP.post("Authentication/Register", this.registerData)
          .then(() => {
            this.showSuccess("Register Successfully");
            this.loader = false;
            this.$router.push({ name: "Login", params: {} });
          })
          .catch((err) => {
            this.loader = false;
            this.showError(err.response.data);
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
    showError(err) {
      this.$toast.add({
        severity: "error",
        summary: "Error Message",
        detail: err,
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
