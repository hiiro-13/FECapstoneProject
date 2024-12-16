<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="vertical-nav bg-white"
    id="sidebar"
    :class="{ active: isActive == true }"
  >
    <div class="py-4 px-3 mb-4 bg-light">
      <div class="align-items-center">
        <img src="../assets/image/VTP2_1.svg" height="80" width="200" />
      </div>
    </div>

    <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">
      Main
    </p>

    <ul class="nav flex-column mb-0">
      <div v-if="role === 'Admin'">
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'Dashboard', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-gauge mr-3"></i>
            Dashboard
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'MedicineManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'prescription-bottle-medical']" />
            Medicine Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'PatientManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-bed-pulse"></i>
            Patient Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'DoctorManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'user-doctor']" />
            Doctor Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'NurseManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'user-nurse']" />
            Nurse Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'MLExpertManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'flask']" />
            ML-Expert Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'ServiceManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'stethoscope']" />
            Service Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'InvoiceManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'file-invoice']" />
            Invoice Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'TestManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'microscope']" />
            Test Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'PrescriptionManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'file-medical']" />
            Prescription Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'TechnicianManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'chalkboard-user']" />
            Technician Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'AppointmentManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'calendar-check']" />
            Appointment Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'MLModelManage', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'microchip']" />
            ML Model Manage
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'Introduce', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'house']" />
            Introduce Manage
          </router-link>
        </li>
      </div>
      <div v-else-if="role === 'Doctor'">
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'MedicalExam', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'prescription-bottle-medical']" />
            Medical Exam
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'DoctorAppointment', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'calendar-check']" />
            Appointment
          </router-link>
        </li>
      </div>
      <div v-else-if="role === 'MLExpert'">
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'MLExpert', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-hand-holding-medical"></i>
            Machine Learning Model
          </router-link>
        </li>
      </div>
      <div v-else-if="role === 'MRITechnician'">
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'Technician', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-hand-holding-medical"></i>
            MRI Scan
          </router-link>
        </li>
      </div>
      <div v-else>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'ReceivePatient', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <i class="fa-solid fa-hand-holding-medical"></i>
            Receive Patient
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'AppointmentStatus', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'calendar-check']" />
            Appointment Status List
          </router-link>
        </li>
        <li class="nav-item hover:bg-[#f4d7d3]">
          <router-link
            :to="{ name: 'NurseManageInvoice', params: {} }"
            class="nav-link text-dark font-italic"
          >
            <font-awesome-icon :icon="['fas', 'file-invoice']" />
            Patient Invoice
          </router-link>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: localStorage.getItem("role"),
      activeSideBar: false,
    };
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    open() {
      this.$emit("open", this.isActive);
      this.activeSideBar != this.activeSideBar;
    },
  },
};
</script>
