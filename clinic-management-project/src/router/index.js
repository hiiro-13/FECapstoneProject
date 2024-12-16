import { createRouter, createWebHistory } from "vue-router";
import { HTTP } from "@/axios";

const requireLogin = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token) next({ name: "Login", params: {} });
  else next();
};

const ifHaveRole = (to, from, next) => {
  const role = localStorage.getItem("role");
  if (role === "Doctor") {
    next({ name: "DoctorAppointment", params: {} });
  }
  if (role === "Nurse") {
    next({ name: "AppointmentStatus", params: {} });
  }
  if (role === "Admin") {
    next({ name: "Dashboard", params: {} });
  }
  if (role === "MLExpert") {
    next({ name: "MLExpert", params: {} });
  }
  if (role === "MRITechnician") {
    next({ name: "Technician", params: {} });
  } else next();
};
const ifHaveNotRole = (to, from, next) => {
  const role = localStorage.getItem("role");
  if (role === "Patient") {
    next({ name: "home", params: {} });
  } else next();
};

const ifDifferentRoleAdmin = (to, from, next) => {
  const role = localStorage.getItem("role");
  if (role === "Doctor") {
    next({ name: "DoctorAppointment", params: {} });
  }
  if (role === "Nurse") {
    next({ name: "AppointmentStatus", params: {} });
  }
  if (role === "Technician") {
    next({ name: "Technician", params: {} });
  }
  if (role === "MLExpert") {
    next({ name: "MLExpert", params: {} });
  } else next();
};
const ifDifferentRoleDoctor = (to, from, next) => {
  const role = localStorage.getItem("role");
  if (role === "Admin") {
    next({ name: "Dashboard", params: {} });
  }
  if (role === "Nurse") {
    next({ name: "AppointmentStatus", params: {} });
  }
  if (role === "Technician") {
    next({ name: "Technician", params: {} });
  }
  if (role === "MLExpert") {
    next({ name: "MLExpert", params: {} });
  } else next();
};
const ifDifferentRoleNurse = (to, from, next) => {
  const role = localStorage.getItem("role");
  if (role === "Admin") {
    next({ name: "Dashboard", params: {} });
  }
  if (role === "Doctor") {
    next({ name: "DoctorAppointment", params: {} });
  }
  if (role === "Technician") {
    next({ name: "Technician", params: {} });
  }
  if (role === "MLExpert") {
    next({ name: "MLExpert", params: {} });
  } else next();
};
const ifDifferentRoleMLExpert = (to, from, next) => {
  const role = localStorage.getItem("role");
  if (role === "Admin") {
    next({ name: "Dashboard", params: {} });
  }
  if (role === "Doctor") {
    next({ name: "DoctorAppointment", params: {} });
  }
  if (role === "Technician") {
    next({ name: "Technician", params: {} });
  }
  if (role === "Nurse") {
    next({ name: "AppointmentStatus", params: {} });
  } else next();
};
const ifDifferentRoleTechnician = (to, from, next) => {
  const role = localStorage.getItem("role");
  if (role === "Admin") {
    next({ name: "Dashboard", params: {} });
  }
  if (role === "Doctor") {
    next({ name: "DoctorAppointment", params: {} });
  }
  if (role === "MLExpert") {
    next({ name: "MLExpert", params: {} });
  }
  if (role === "Nurse") {
    next({ name: "AppointmentStatus", params: {} });
  } else next();
};
const isLoggedIn = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    next({ name: "home", params: {} });
    router.push({ name: "home", params: {} });
  } else next();
};
const checkEmailConfirm = (to, from, next) => {
  patientIsConfirmEmail()
    .then((status) => {
      if (!status) {
        next({ name: "ConfirmEmail", params: {} });
      } else {
        next();
      }
    })
    .catch((error) => {
      console.error(error);
      next(false); // prevent navigation
    });
};

function patientIsConfirmEmail() {
  const userId = localStorage.getItem("usId");
  return HTTP.get("Authentication/GetStatusEmail?id=" + userId)
    .then((res) => res.data)
    .catch((error) => console.error(error));
}

const routes = [
  {
    path: "/404NotFound",
    name: "404",
    meta: {
      layout: "404Page",
    },
    component: () => import("../layout/notFoundPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404NotFound",
  },
  {
    path: "/",
    name: "home",
    meta: {
      layout: "default",
    },
    component: () => import("../views/index.vue"),
    beforeEnter: ifHaveRole,
  },
  {
    path: "/Forgot",
    name: "Forgot",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/forgot.vue"),
  },
  {
    path: "/ResetPassword",
    name: "ResetPassword",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/resetPassword.vue"),
  },
  {
    path: "/Appointment",
    name: "Appointment",
    meta: {
      layout: "default",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/appointment.vue"),
    beforeEnter: [requireLogin, ifHaveRole, checkEmailConfirm],
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/dashboard.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/ReceivePatient",
    name: "ReceivePatient",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/receivepatient.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleNurse],
  },
  {
    path: "/MedicalExam",
    name: "MedicalExam",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/medicalexam.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleDoctor],
  },
  {
    path: "/DoctorAppointment",
    name: "DoctorAppointment",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/doctorAppointment.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleDoctor],
  },
  {
    path: "/MedicineManage",
    name: "MedicineManage",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/medicineManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/DoctorManage",
    name: "DoctorManage",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/doctorManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/NurseManage",
    name: "NurseManage",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/nurseManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/ServiceManage",
    name: "ServiceManage",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/serviceManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/InvoiceManage",
    name: "InvoiceManage",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/invoiceManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/TestManage",
    name: "TestManage",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/testManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/PrescriptionManage",
    name: "PrescriptionManage",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/prescriptionManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/PatientManage",
    name: "PatientManage",
    meta: {
      layout: "admin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/patientManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/Register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () => import("../views/register.vue"),
  },
  {
    path: "/UserProfile",
    name: "userProfile",
    meta: {
      layout: "default",
    },
    component: () => import("../views/userProfile.vue"),
    beforeEnter: [requireLogin, ifHaveRole],
  },
  {
    path: "/DoctorProfile",
    name: "DoctorProfile",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/doctorProfile.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleDoctor],
  },
  {
    path: "/NurseProfile",
    name: "NurseProfile",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/nurseProfile.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleNurse],
  },
  {
    path: "/Login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () => import("../views/login.vue"),
    beforeEnter: isLoggedIn,
  },
  {
    path: "/AppointmentStatus",
    name: "AppointmentStatus",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/appointmentStatus.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleNurse],
  },
  {
    path: "/MLExpertManage",
    name: "MLExpertManage",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/MLExpertManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/MLExpert",
    name: "MLExpert",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/MLExpert.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleMLExpert],
  },
  {
    path: "/ConfirmEmail",
    name: "ConfirmEmail",
    meta: {
      layout: "default",
    },
    component: () => import("../views/confirmEmail.vue"),
    beforeEnter: [requireLogin, ifHaveRole],
  },
  {
    path: "/Technician",
    name: "Technician",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/technician.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleTechnician],
  },
  {
    path: "/TechnicianManage",
    name: "TechnicianManage",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/technicianManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/NurseManageInvoice",
    name: "NurseManageInvoice",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/nurseManageInvoice.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleNurse],
  },
  {
    path: "/AppointmentManage",
    name: "AppointmentManage",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/appointmentManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/MLModelManage",
    name: "MLModelManage",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/MLModelManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
  {
    path: "/MLExpertProfile",
    name: "MLExpertProfile",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/MLExpertProfile.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleMLExpert],
  },
  {
    path: "/TechnicianProfile",
    name: "TechnicianProfile",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/technicianProfile.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleTechnician],
  },
  {
    path: "/Introduce",
    name: "Introduce",
    meta: {
      layout: "admin",
    },
    component: () => import("../views/IntroduceManage.vue"),
    beforeEnter: [requireLogin, ifHaveNotRole, ifDifferentRoleAdmin],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
