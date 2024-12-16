<!-- eslint-disable vue/multi-word-component-names -->
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
  <div class="m-5">
    <div class="d-flex justify-content-center">
      <h2 class="lg:text-4xl text-3xl m-4">Sign In</h2>
    </div>
    <input type="text" v-model="loginData.userName" placeholder="Username" />
    <input
      type="password"
      v-model="loginData.password"
      placeholder="Password"
    />
    <router-link
      :to="{ name: 'Forgot', params: {} }"
      class="text-black text-end d-block m-2"
      style="margin-top: -10px; margin-right: 20px"
    >
      Need help?</router-link
    >
    <div class="d-flex justify-content-center">
      <button class="confrim w-50" @click="handleLogin()" autofocus>
        Submit
      </button>
    </div>
  </div>
</template>
<style src="../assets/style/authentication.css" scoped></style>
<script>
import { HTTP } from "@/axios";
import { ref } from "vue";
export default {
  setup() {
    const loginData = ref({
      userName: "",
      password: "",
    });
    let loader = ref(false);
    return { loginData, loader };
  },
  methods: {
    async handleLogin() {
      this.loader = true;
      HTTP.post("Authentication/Login", {
        userName: this.loginData.userName,
        password: this.loginData.password,
      })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("fullName", response.data.fullName);
          localStorage.setItem("role", response.data.role);
          if (response.data.role == "Doctor") {
            localStorage.setItem("DoctorId", response.data.doctorId);
          }
          if (response.data.role == "Nurse") {
            localStorage.setItem("NurseId", response.data.nurseId);
          }
          if (response.data.role == "Patient") {
            localStorage.setItem("PatientId", response.data.patientId);
          }
          if (response.data.role == "MLExpert") {
            localStorage.setItem("MLExpertId", response.data.mlExpertId);
          }
          if (response.data.role == "MRITechnician") {
            localStorage.setItem("MRITechnicianId", response.data.technicianId);
          }
          localStorage.setItem("usId", response.data.id);
          this.loader = false;
          this.showSuccess("Login Successfully");
          this.$router.push({ name: "home", params: {} });
        })
        .catch((err) => {
          try {
            this.showError(err.response.data);
            this.loader = false;
          } catch (err) {
            this.showError("Unhandle Exception");
            this.loader = false;
          }
        });
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
        summary: "Login Fail",
        detail: err,
        life: 3000,
      });
    },
  },
};
</script>
