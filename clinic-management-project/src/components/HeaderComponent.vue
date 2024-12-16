<template>
  <header>
    <div class="container-fluid mt-3 hidden sm:block">
      <nav class="navbar">
        <!-- logo -->
        <ul class="navbar-nav">
          <div class="flex items-center">
            <router-link
              :to="{ name: 'home', params: {} }"
              class="navbar__logo"
            >
              <img src="../assets/image/VTP2_1.svg" alt="website logo" />
            </router-link>
            <div class="sm:block hidden xl:hidden only:">
              <div class="relative">
                <button
                  class="bg-transparent text-black text-3xl hover:bg-red-600"
                  @click="() => handleDrop('menu')"
                >
                  <font-awesome-icon :icon="['fas', 'bars']" />
                </button>
                <div
                  v-if="showDropDown"
                  class="absolute left-10 w-[300px] bg-[#f07276] text-white z-40 rounded-lg"
                >
                  <div class="nav-item m-4">
                    <router-link
                      :to="{ name: 'home', params: {} }"
                      class="nav-link text-white"
                      @click="() => handleDrop('item')"
                      >Home</router-link
                    >
                  </div>
                  <div class="nav-item m-4">
                    <a
                      href="#service"
                      class="nav-link text-white"
                      @click="() => handleDrop('item')"
                      >Service</a
                    >
                  </div>
                  <div class="nav-item m-4">
                    <router-link
                      :to="{ name: 'Appointment', params: {} }"
                      class="nav-link text-white"
                      @click="() => handleDrop('item')"
                      >Make Appointment</router-link
                    >
                  </div>
                  <div class="nav-item m-4">
                    <a href="#" class="nav-link">Our Doctor</a>
                  </div>
                  <div class="nav-item m-4">
                    <a
                      href="#"
                      class="nav-link text-white"
                      @click="() => handleDrop('item')"
                      >About Us</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
        <!-- links -->

        <template v-if="!isLoggedIn">
          <div class="hidden xl:block">
            <ul class="nav">
              <li
                class="nav-item"
                @mouseenter="hoverHome = true"
                @mouseleave="hoverHome = false"
                :class="{ 'div-hover': hoverHome, active: isHomeActive }"
                @click="GoHome()"
              >
                <a class="nav-link" style="cursor: pointer">Home</a>
              </li>
              <li
                class="nav-item"
                @mouseenter="hoverService = true"
                @mouseleave="hoverService = false"
                :class="{ 'div-hover': hoverService, active: isServiceActive }"
                @click.prevent="GoService()"
              >
                <a class="nav-link" style="cursor: pointer">Service</a>
              </li>
              <li
                class="nav-item"
                @mouseenter="hoverAppointment = true"
                @mouseleave="hoverAppointment = false"
                :class="{
                  'div-hover': hoverAppointment,
                  active: isAppointmentActive,
                }"
                @click="GoAppointment()"
              >
                <a class="nav-link" style="cursor: pointer">Make Appointment</a>
              </li>
              <li
                class="nav-item"
                @mouseenter="hoverOurDoctor = true"
                @mouseleave="hoverOurDoctor = false"
                :class="{
                  'div-hover': hoverOurDoctor,
                  active: isOurDoctorActive,
                }"
                @click.prevent="GoOurDoctor()"
              >
                <a class="nav-link" style="cursor: pointer">Our Doctor</a>
              </li>
              <li
                class="nav-item"
                @mouseenter="hoverAboutUs = true"
                @mouseleave="hoverAboutUs = false"
                :class="{
                  'div-hover': hoverAboutUs,
                  active: isAboutUsActive,
                }"
                @click.prevent="GoAboutUs()"
              >
                <a href="" class="nav-link" style="cursor: pointer">About Us</a>
              </li>
            </ul>
          </div>
          <ul class="nav">
            <li
              class="nav-item"
              @mouseenter="hoverSignin = true"
              @mouseleave="hoverSignin = false"
              :class="{
                'div-hover': hoverSignin,
                active: isSigninActive,
              }"
              @click="GoSignIn()"
            >
              <a class="nav-link" style="cursor: pointer">Sign In</a>
            </li>

            <router-link :to="{ name: 'Register', params: {} }">
              <button @click="isRegister">Register</button>
            </router-link>
          </ul>
        </template>
        <template v-else>
          <div class="hidden xl:block">
            <ul class="nav">
              <li
                class="nav-item"
                @mouseenter="hoverHome = true"
                @mouseleave="hoverHome = false"
                :class="{ 'div-hover': hoverHome, active: isHomeActive }"
                @click="GoHome()"
              >
                <a class="nav-link" style="cursor: pointer">Home</a>
              </li>
              <li
                class="nav-item"
                @mouseenter="hoverService = true"
                @mouseleave="hoverService = false"
                :class="{ 'div-hover': hoverService, active: isServiceActive }"
                @click.prevent="GoService()"
              >
                <a class="nav-link" style="cursor: pointer">Service</a>
              </li>
              <li
                class="nav-item"
                @mouseenter="hoverAppointment = true"
                @mouseleave="hoverAppointment = false"
                :class="{
                  'div-hover': hoverAppointment,
                  active: isAppointmentActive,
                }"
                @click="GoAppointment()"
              >
                <a class="nav-link" style="cursor: pointer">Make Appointment</a>
              </li>
              <li
                class="nav-item"
                @mouseenter="hoverOurDoctor = true"
                @mouseleave="hoverOurDoctor = false"
                :class="{
                  'div-hover': hoverOurDoctor,
                  active: isOurDoctorActive,
                }"
              >
                <a
                  class="nav-link"
                  style="cursor: pointer"
                  @click.prevent="GoOurDoctor()"
                  >Our Doctor</a
                >
              </li>
              <li
                class="nav-item"
                @mouseenter="hoverAboutUs = true"
                @mouseleave="hoverAboutUs = false"
                :class="{
                  'div-hover': hoverAboutUs,
                  active: isAboutUsActive,
                }"
              >
                <a href="#" class="nav-link" @click.prevent="GoAboutUs()"
                  >About Us</a
                >
              </li>
            </ul>
          </div>

          <ul class="nav">
            <li
              class="nav-item"
              @mouseenter="hoverUser = true"
              @mouseleave="hoverUser = false"
              :class="{
                'div-hover': hoverUser,
                active: isUserActive,
              }"
              @click="GoUserProfileManage()"
            >
              <a class="nav-link" style="cursor: pointer"
                >Hello {{ fullName }}</a
              >
            </li>
            <li class="nav-item">
              <button id="Logout" @click="logout">Logout</button>
            </li>
          </ul>
        </template>
      </nav>
    </div>
    <div class="sm:hidden">
      <div class="m-4">
        <img
          src="../assets/image/VTP2_1.svg"
          alt="website logo"
          class="w-[200px]"
        />
      </div>
      <div class="flex justify-between">
        <div class="relative">
          <button
            class="bg-transparent text-black text-3xl hover:bg-red-600"
            @click="() => handleDrop('menu')"
          >
            <font-awesome-icon :icon="['fas', 'bars']" />
          </button>
          <div
            v-if="showDropDown"
            class="absolute left-0 w-[314px] bg-[#f07276] text-white z-40 rounded-lg"
          >
            <div class="nav-item m-4">
              <router-link
                :to="{ name: 'home', params: {} }"
                class="nav-link text-white"
                @click="() => handleDrop('item')"
                >Home</router-link
              >
            </div>
            <div class="nav-item m-4">
              <a
                href="#service"
                class="nav-link text-white"
                @click="() => handleDrop('item')"
                >Service</a
              >
            </div>
            <div class="nav-item m-4">
              <router-link
                :to="{ name: 'Appointment', params: {} }"
                class="nav-link text-white"
                @click="() => handleDrop('item')"
                >Make Appointment</router-link
              >
            </div>
            <div class="nav-item m-4">
              <a href="#" class="nav-link">Our Doctor</a>
            </div>
            <div class="nav-item m-4">
              <a
                href="#"
                class="nav-link text-white"
                @click="() => handleDrop('item')"
                >About Us</a
              >
            </div>
          </div>
        </div>
        <div>
          <div v-if="!isLoggedIn">
            <ul class="nav">
              <router-link
                :to="{ name: 'Login', params: {} }"
                class="nav-link"
                @click="isLogin"
                >Sign In</router-link
              >
              <router-link :to="{ name: 'Register', params: {} }">
                <button @click="isRegister">Register</button>
              </router-link>
            </ul>
          </div>
          <div v-else>
            <ul class="nav">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'userProfile', params: {} }"
                  >Hello {{ fullName }}</router-link
                >
              </li>
              <li class="nav-item">
                <button id="Logout" @click="logout">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { ref } from "vue";
export default {
  data() {
    return {
      fullName: localStorage.getItem("fullName"),
      showDropDown: ref(false),
      hoverHome: false,
      isHomeActive: false,
      hoverService: false,
      isServiceActive: false,
      hoverAppointment: false,
      isAppointmentActive: false,
      hoverOurDoctor: false,
      isOurDoctorActive: false,
      hoverAboutUs: false,
      isAboutUsActive: false,
      hoverSignin: false,
      isSigninActive: false,
      isUserActive: false,
      hoverUser: false,
    };
  },
  setup() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return window.localStorage.getItem("fullName");
    },
  },
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("fullName");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("usId");
      window.localStorage.removeItem("DoctorId");
      window.localStorage.removeItem("NurseId");
      window.localStorage.removeItem("PatientId");
      window.localStorage.removeItem("MLExpertId");
      window.localStorage.removeItem("MRITechnicianId");
      this.$router.go();
    },
    handleDrop() {
      this.showDropDown = !this.showDropDown;
    },
    GoHome() {
      this.isHomeActive = true;
      this.isServiceActive = false;
      this.isAppointmentActive = false;
      this.isOurDoctorActive = false;
      this.isAboutUsActive = false;
      this.isSigninActive = false;
      this.isUserActive = false;
      this.$router.push({ name: "home", params: {} });
    },
    GoService() {
      this.$router.push({ name: "home", params: {} });
      const serviceElement = document.getElementById("service");
      serviceElement.scrollIntoView({ behavior: "smooth" });
      this.isServiceActive = true;
      this.isHomeActive = false;
      this.isAppointmentActive = false;
      this.isOurDoctorActive = false;
      this.isAboutUsActive = false;
      this.isSigninActive = false;
    },
    GoAppointment() {
      this.$router.push({ name: "Appointment", params: {} });
      this.isAppointmentActive = true;
      this.isHomeActive = false;
      this.isServiceActive = false;
      this.isOurDoctorActive = false;
      this.isAboutUsActive = false;
      this.isSigninActive = false;
    },
    GoOurDoctor() {
      this.$router.push({ name: "home", params: {} });
      const serviceElement = document.getElementById("ourDoctor");
      serviceElement.scrollIntoView({ behavior: "smooth" });
      this.isOurDoctorActive = true;
      this.isHomeActive = false;
      this.isServiceActive = false;
      this.isAppointmentActive = false;
      this.isAboutUsActive = false;
      this.isSigninActive = false;
    },
    GoAboutUs() {
      this.isHomeActive = false;
      this.$router.push({ name: "home", params: {} });
      const serviceElement = document.getElementById("aboutUs");
      serviceElement.scrollIntoView({ behavior: "smooth" });
      this.isAboutUsActive = true;
      this.isOurDoctorActive = false;
      this.isServiceActive = false;
      this.isAppointmentActive = false;
      this.isSigninActive = false;
    },
    GoSignIn() {
      this.isHomeActive = false;
      this.$router.push({ name: "Login", params: {} });
      this.isSigninActive = true;
      this.isAboutUsActive = false;
      this.isOurDoctorActive = false;
      this.isServiceActive = false;
      this.isAppointmentActive = false;
    },
    GoUserProfileManage() {
      this.isHomeActive = false;
      this.$router.push({ name: "userProfile", params: {} });
      this.isUserActive = true;
      this.isSigninActive = false;
      this.isAboutUsActive = false;
      this.isOurDoctorActive = false;
      this.isServiceActive = false;
      this.isAppointmentActive = false;
    },
  },
};
</script>
<style scoped>
.active .nav-link {
  color: #840e07 !important;
  border-bottom: 2px solid black !important;
}

.div-hover .nav-link:hover {
  color: #840e07 !important;
  border-bottom: 2px solid black !important;
}
</style>
