<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="body">
    <sidebar :isActive="isActive" @open="open(isActive)" />
    <div
      class="page-content p-5"
      id="content"
      :class="{ active: isActive == true }"
    >
      <div class="mb-4 d-flex justify-content-between">
        <!-- Toggle button -->
        <div class="me-1">
          <button
            @click="open"
            id="sidebarCollapse"
            type="button"
            class="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"
          >
            <i class="fa fa-bars"></i
            ><small class="text-uppercase font-weight-bold"></small>
          </button>
        </div>
        <div class="dropdown">
          <button
            type="button"
            id="dropdownMenuButton1"
            class="btn btn-light bg-white rounded-pill shadow-sm px-4"
            data-bs-toggle="dropdown"
            :aria-expanded="dropdown"
            :class="{ show: dropdown }"
            @click="openDropdown"
          >
            {{ fullName == "" ? "Ẩn Danh" : fullName
            }}<i class="fa-regular fa-user ms-1"></i>
          </button>
          <div>
            <ul
              class="dropdown-menu"
              :class="{ show: dropdown }"
              aria-labelledby="dropdownMenuButton1"
              style="width: 200px"
            >
              <router-link
                :to="profile"
                style="color: black; text-decoration: none"
              >
                <li class="d-flex align-items-center">
                  <img
                    src="../assets/image/user.png"
                    height="30"
                    width="30"
                    class="me-3 ms-3"
                  />
                  <h5>{{ fullName }}</h5>
                </li>

                <p class="text-center">{{ this.role }}</p>
                <hr />
              </router-link>
              <li>
                <a
                  style="cursor: pointer"
                  class="dropdown-item"
                  @click="logout()"
                  >Logout</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
<style src="../assets/style/admin.css" scoped></style>
<script>
import Sidebar from "@/components/SideBarAdminComponent.vue";
export default {
  components: { Sidebar },
  data() {
    return {
      isActive: false,
      fullName: localStorage.getItem("fullName"),
      dropdown: false,
      role: localStorage.getItem("role"),
    };
  },

  computed: {
    profile() {
      const role = localStorage.getItem("role");
      if (role === "Doctor") {
        return { name: "DoctorProfile", params: {} };
      } else if (role === "MLExpert") {
        return { name: "MLExpertProfile", params: {} };
      } else if (role === "MRITechnician") {
        return { name: "TechnicianProfile", params: {} };
      } else {
        return { name: "NurseProfile", params: {} };
      }
    },
  },
  methods: {
    open() {
      this.isActive = !this.isActive;
    },
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("fullName");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("usId");
      window.localStorage.removeItem("DoctorId");
      window.localStorage.removeItem("NurseId");
      window.localStorage.removeItem("PatientId");
      window.localStorage.removeItem("MRITechnicianId");
      window.localStorage.removeItem("MLExpertId");
      this.$router.push({ name: "home" });
    },
    openDropdown() {
      this.dropdown = !this.dropdown;
    },
    closeSidebar() {
      if (window.innerWidth < 1200) {
        this.isActive = true;
        return;
      }
      this.isActive = false;
    },
  },
  mounted() {
    window.addEventListener("resize", this.closeSidebar);
  },
  unmounted() {
    window.removeEventListener("resize", this.closeSidebar);
  },
};
</script>
<style>
.p-datatable-header {
  background-color: #f4d7d3 !important;
  border-radius: 0.375rem !important;
}
.p-button {
  color: #fff !important;
  background: #3b82f6;
  border: 1px solid #3b82f6;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  border-radius: 6px;
}
.p-button:enabled:hover {
  background: #2563eb;
  border-color: #2563eb;
}
.p-button.p-button-text:enabled:active {
  background: #3b82f6 !important;
  color: #3b82f6 !important;
  border-color: transparent;
}
.p-button.p-button-text {
  background-color: #3b82f6 !important;
  color: #3b82f6;
  border-color: transparent;
}
</style>
