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
  <div class="container d-flex">
    <div class="row row-cols-6">
      <div class="col-md-12">
        <fieldset>
          <legend>
            <div class="d-flex justify-content-between">
              <h5 class="d-flex align-items-center">Patient Infomation</h5>
              <div>
                <button class="btn btn-info" @click="openCreateAccountDialog()">
                  <span style="color: white">Create new Account</span>
                  <i style="color: white" class="fa-solid fa-plus ms-1"></i>
                </button>
                <button
                  class="btn btn-primary"
                  style="margin-left: 10px"
                  @click="openCreateAppointmentDialog()"
                >
                  <span>Create Appointment</span>
                  <i class="fa-solid fa-plus ms-1"></i>
                </button>
                <button
                  class="btn btn-success ms-2"
                  @click="createQueue()"
                  :disabled="buttonTransfer"
                >
                  <span>Transfer Patient To Doctor</span>
                  <i class="fa-solid fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </legend>
          <div class="container mb-3">
            <div class="row justify-content-center">
              <div class="col-lg-6 row">
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span>Identity Card:</span>
                    <AutoComplete
                      v-model="queueDetails"
                      :suggestions="filteredPatients"
                      @complete="searchPatient($event)"
                      optionLabel="patient.user.identityCard"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span> Full Name:</span>
                    <InputText type="text" v-model="queue.fullName" readonly />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span> DoB:</span>
                    <InputText type="date" v-model="queue.birthDay" readonly />
                  </div>
                </div>
              </div>
              <div class="col-lg-6 row">
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span> Gender:</span>
                    <InputText type="text" v-model="queue.gender" readonly />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span> Address:</span>
                    <InputText type="text" v-model="queue.address" readonly />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span>Phone Number:</span>
                    <InputText
                      type="text"
                      v-model="queue.phoneNumber"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-6 row">
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span>Pulse:</span>
                    <InputNumber
                      inputId="withoutgrouping"
                      v-model="inputQueue.Pulse"
                      mode="decimal"
                      :useGrouping="false"
                      placeholder="bpm"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span> Blood Pressure:</span>
                    <InputNumber
                      inputId="withoutgrouping"
                      v-model="inputQueue.BloodPressure"
                      mode="decimal"
                      :useGrouping="false"
                      placeholder="mmHg"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span>Temperature:</span>
                    <InputNumber
                      inputId="withoutgrouping"
                      v-model="inputQueue.Tempurature"
                      mode="decimal"
                      :useGrouping="false"
                      placeholder="°C"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-6 row">
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span> Weight:</span>
                    <InputNumber
                      inputId="withoutgrouping"
                      v-model="inputQueue.Weight"
                      mode="decimal"
                      :useGrouping="false"
                      placeholder="Kg"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span> Height:</span>
                    <InputNumber
                      inputId="withoutgrouping"
                      v-model="inputQueue.Height"
                      mode="decimal"
                      :useGrouping="false"
                      placeholder="Cm"
                    />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex flex-column">
                    <span> Doctor:</span>
                    <Dropdown
                      v-model="doctor.doctorId"
                      :options="doctors"
                      optionValue="id"
                      optionLabel="fullName"
                      placeholder="Select a Doctor"
                      :disabled="doctor.doctorId !== null"
                      class="w-full md:w-14rem"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="mt-3 col-md-12">
        <fieldset>
          <legend>
            <div class="d-flex justify-content-between align-items-center">
              <h5>Doctor's Appoitment</h5>
              <div>
                <Dropdown
                  v-model="idDoctor"
                  :options="doctors"
                  optionValue="id"
                  optionLabel="fullName"
                  placeholder="Select a Doctor"
                  class="w-full md:w-14rem"
                />
              </div>
            </div>
          </legend>
          <div class="fieldset-content" style="height: 700px">
            <FullCalendar
              :options="calendarOptions"
              style="max-height: 650px"
            />
          </div>
        </fieldset>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="CreateAppointmentDialog"
    modal
    header="Create Appointment"
    :style="{ width: '80vw' }"
    :closable="false"
  >
    <div style="display: flex">
      <div class="col-md-6" style="border-right: solid 1px">
        <div class="d-flex justify-content-around" style="padding-top: 30px">
          <div class="p-inputgroup flex-1" style="margin-right: 20px">
            <AutoComplete
              v-model="selectedPatientDontHaveAPM"
              :suggestions="filteredPatientsDontHaveAPM"
              @complete="searchPatientDontHaveAPMByIdCard($event)"
              optionLabel="user.identityCard"
            />
            <span class="p-inputgroup-addon">
              <i class="pi pi-search"></i>
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-around mt-4">
          <div class="p-inputgroup flex-1" style="margin-right: 10px">
            <span class="p-inputgroup-addon">
              <i class="pi pi-info"></i>
            </span>
            <InputText
              placeholder="First Name"
              v-model="userDontHaveAPM.firstName"
              readonly
            />
          </div>
          <div
            class="p-inputgroup flex-1"
            style="margin-left: 10px; margin-right: 20px"
          >
            <InputText
              placeholder="Last Name"
              v-model="userDontHaveAPM.lastName"
              readonly
            />
            <span class="p-inputgroup-addon">
              <i class="pi pi-info"></i>
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-around mt-4">
          <div class="p-inputgroup flex-1" style="margin-rigth: 10px">
            <span class="p-inputgroup-addon">
              <i class="pi pi-info"></i>
            </span>
            <InputText
              placeholder="Phone number"
              v-model="userDontHaveAPM.phone"
              readonly
            />
          </div>
          <div
            class="p-inputgroup flex-1"
            style="margin-left: 10px; margin-right: 20px"
          >
            <InputText
              placeholder="Date of Birth"
              v-model="userDontHaveAPM.birthday"
              readonly
            />
            <span class="p-inputgroup-addon">
              <i class="pi pi-info"></i>
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-around mt-4">
          <div class="p-inputgroup flex-1" style="margin-right: 10px">
            <span class="p-inputgroup-addon">
              <i class="pi pi-info"></i>
            </span>
            <InputText
              placeholder="Email Address"
              v-model="userDontHaveAPM.email"
              readonly
            />
          </div>
          <div
            class="p-inputgroup flex-1"
            style="margin-left: 10px; margin-right: 20px"
          >
            <InputText
              placeholder="Gender"
              v-model="userDontHaveAPM.gender"
              readonly
            />
            <span class="p-inputgroup-addon">
              <i class="pi pi-info"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-6" style="border-left: solid 1px">
        <div class="d-flex justify-content-around" style="padding-top: 30px">
          <div class="p-inputgroup flex-1" style="margin-left: 20px">
            <span class="p-inputgroup-addon">
              <i class="pi pi-calendar-plus"></i>
            </span>
            <MultiSelect
              v-model="selectedServices"
              :options="services"
              optionLabel="serviceName"
              placeholder="Select Services"
              display="chip"
              :filter="true"
              class="w-full md:w-10rem"
              :disabled="userDontHaveAPM.id === null"
            />
          </div>
        </div>
        <div class="d-flex justify-content-around" style="padding-top: 30px">
          <div
            class="p-inputgroup flex-1"
            style="margin-right: 10px; margin-left: 20px"
          >
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <Dropdown
              v-model="selectDocs"
              :options="doctors"
              optionValue="id"
              optionLabel="fullName"
              placeholder="Select a Doctor"
              :disabled="userDontHaveAPM.id === null"
            />
          </div>
          <div class="p-inputgroup flex-1" style="margin-left: 10px">
            <Calendar
              inputId="datetemplate"
              v-model="date"
              showIcon
              placeholder="Pick a day"
              :disabled="userDontHaveAPM.id === null"
            />
          </div>
        </div>
        <div class="d-flex justify-content-around" style="padding-top: 30px">
          <div class="checkbox-grid">
            <label
              v-for="(option, index) in options"
              :key="index"
              :class="{
                'checkbox-button': true,
                checked: selectedSlot.includes(option),
                cantChoose:
                  disabledButtons[index] === true ||
                  this.selectDocs === null ||
                  this.date === null,
              }"
              @click="checkOne(option)"
            >
              <input
                type="checkbox"
                :value="option"
                v-model="selectedSlot"
                @change="checkOne(option)"
                :class="{
                  cantChoose:
                    disabledButtons[index] === true ||
                    this.selectDocs === null ||
                    this.date === null,
                }"
              />
              <span class="button-label">{{ option.label }}</span>
            </label>
          </div>
        </div>
        <div
          class="d-flex justify-content-around"
          style="padding-top: 30px; margin-left: 20px"
        >
          <div>
            <Textarea
              class="w-100"
              v-model="appointment.Reason"
              :auto-resize="false"
              cols="80"
              placeholder="Reason for appointment"
              :disabled="userDontHaveAPM.id === null"
            />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Close"
        icon="pi pi-times"
        @click="closeCreateAppointmentDialog()"
        text
        class="p-button-danger"
      />
      <Button
        label="Submit"
        icon="pi pi-check"
        @click="createAppointment()"
        autofocus
      />
    </template>
  </Dialog>
  <Dialog
    v-model:visible="CreateAccountDialog"
    modal
    header="Create New Patient Account"
    :style="{ width: '50vw' }"
    :closable="false"
  >
    <div class="d-flex row">
      <div class="p-inputgroup col-md-6 w-50">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <InputText
          id="usn"
          v-model="registerData.UserName"
          placeholder="User Name. Default = Phone Number"
          disabled
        />
      </div>
      <div class="p-inputgroup col-md-6 w-50">
        <Password
          id="pwd"
          v-model="registerData.Password"
          :feedback="false"
          placeholder="Password. Default = 123456"
          disabled
        />
        <span class="p-inputgroup-addon">
          <i class="pi pi-lock"></i>
        </span>
      </div>
    </div>
    <div class="d-flex row" style="padding-top: 30px">
      <div
        class="p-inputgroup col-md-6 w-50"
        :class="{ error: validation.hasError('registerData.firstName') }"
      >
        <span class="p-inputgroup-addon">
          <i class="pi pi-info"></i>
        </span>
        <InputText
          id="fname"
          v-model="registerData.firstName"
          placeholder="First Name"
        />
      </div>
      <div
        class="p-inputgroup col-md-6 w-50"
        :class="{ error: validation.hasError('registerData.lastName') }"
      >
        <InputText
          id="lname"
          v-model="registerData.lastName"
          placeholder="Last Name"
        />
        <span class="p-inputgroup-addon">
          <i class="pi pi-info"></i>
        </span>
      </div>
      <div class="col-md-6 mt-1" style="color: red">
        {{ validation.firstError("registerData.firstName") }}
      </div>
      <div class="col-md-6 mt-1" style="color: red">
        {{ validation.firstError("registerData.lastName") }}
      </div>
    </div>
    <div class="d-flex row" style="padding-top: 30px">
      <div
        class="p-inputgroup col-md-6 w-50"
        :class="{ error: validation.hasError('registerData.phoneNumber') }"
      >
        <span class="p-inputgroup-addon">
          <i class="pi pi-phone"></i>
        </span>
        <InputText
          id="phone"
          v-model="registerData.phoneNumber"
          placeholder="Phone Number"
        />
      </div>
      <div
        class="p-inputgroup col-md-6 w-50"
        :class="{ error: validation.hasError('registerData.identityCard') }"
      >
        <div class="d-flex w-100">
          <InputText
            id="identityCard"
            v-model="registerData.identityCard"
            placeholder="ID Card"
          />
          <span class="p-inputgroup-addon">
            <i class="pi pi-id-card"></i>
          </span>
        </div>
      </div>
      <div class="col-md-6 mt-1" style="color: red">
        {{ validation.firstError("registerData.phoneNumber") }}
      </div>
      <div class="col-md-6 mt-1" style="color: red">
        {{ validation.firstError("registerData.identityCard") }}
      </div>
    </div>
    <div class="d-flex row" style="padding-top: 30px">
      <div
        class="p-inputgroup col-md-6 w-50"
        :class="{ error: validation.hasError('registerData.gender') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa fa-transgender-alt"></i>
        </span>
        <Dropdown
          optionLabel="name"
          optionValue="code"
          placeholder="Gender"
          :options="selectGender"
          option-label="name"
          :editable="true"
          v-model="registerData.gender"
        />
      </div>
      <div
        class="p-inputgroup col-md-6 w-50"
        :class="{ error: validation.hasError('registerData.birthday') }"
      >
        <Calendar
          v-model="registerData.birthday"
          showIcon
          dateFormat="dd/mm/yy"
          placeholder="Date of Birth"
        />
      </div>
      <div class="col-md-6 mt-1" style="color: red">
        {{ validation.firstError("registerData.gender") }}
      </div>
      <div class="col-md-6 mt-1" style="color: red">
        {{ validation.firstError("registerData.birthday") }}
      </div>
    </div>
    <template #footer>
      <Button
        label="Close"
        icon="pi pi-times"
        @click="closeCreateAccountDialog()"
        text
        class="p-button-danger"
      />
      <Button label="Create" icon="pi pi-check" @click="Register()" autofocus />
    </template>
  </Dialog>
</template>
<script>
import { HTTP } from "@/axios";
import { ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    const options = [
      "8:00 AM",
      "9:30 AM",
      "11:00 AM",
      "2:00 PM",
      "3:30 PM",
      "5:00 PM",
    ];
    const dateOptions = options.map((option) => {
      const [time, period] = option.split(" ");
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      date.setMilliseconds(0);
      if (period === "PM" && hours !== "12") {
        date.setHours(date.getHours() + 12);
      }
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return {
        value: date,
        label: formattedTime,
      };
    });
    return {
      registerData: {
        UserName: "",
        Password: "",
        firstName: "",
        lastName: "",
        birthday: "",
        phoneNumber: "",
        gender: "",
        identityCard: "",
      },
      patient: null,
      selected: ref(0),
      idDoctor: ref(0),
      keyword: null,
      patients: [],
      doctors: [],
      queue: {},
      user: {
        id: null,
        patientid: null,
        fullName: "",
        gender: "",
        birthDay: "",
        phoneNumber: "",
        address: "",
      },
      doctor: {
        doctorId: null,
      },
      inputQueue: {
        Pulse: null,
        BloodPressure: null,
        Tempurature: null,
        Weight: null,
        Height: null,
      },
      filteredPatients: null,
      queueDetails: null,
      calendar: null,
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        events: [],
      },
      appointments: [],
      services: [],
      service: [],
      options: dateOptions,
      selectedSlot: [],
      selectedServices: [],
      disabledButtons: [false, false, false, false, false, false],

      appointment: {
        DoctorId: null,
        PatientId: null,
        AppointmentDate: null,
        Subtotal: null,
        Reason: null,
      },
      selectDocs: null,
      date: null,
      calendarReady: false,
      apmId: null,
      CreateAppointmentDialog: false,
      selectedDoctorCreateAppointment: null,
      CreateAccountDialog: false,
      selectGender: [
        { name: "Female", code: "0" },
        { name: "Male", code: "1" },
        { name: "Undefine", code: "2" },
      ],
      patientList: [],
      selectedPatientDontHaveAPM: null,
      filteredPatientsDontHaveAPM: null,
      //TAO GÁN CÁI THẰNG ĐÃ TÌM ĐƯỢC VÔ MODEL NÀY , M MÓC RA RỒI CREATE APM, cần field nào thì thêm vô object này
      userDontHaveAPM: {
        id: null,
        firstName: null,
        lastName: null,
        phone: null,
        birthday: null,
        email: null,
        gender: null,
      },
      schedules: [],
    };
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
    "registerData.identityCard": function (value) {
      return Validator.value(value).required("Identity is require");
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
  },
  watch: {
    selectDocs: {
      handler(newValue, oldValue) {
        if (this.selectDocs && this.date) {
          this.checkDocSchedule(this.selectDocs, this.date);
        }
      },
      deep: true,
    },
    date: {
      handler(newValue, oldValue) {
        if (this.selectDocs && this.date) {
          this.checkDocSchedule(this.selectDocs, this.date);
        }
      },
      deep: true,
    },
    idDoctor(newVal) {
      this.getDoctorAppointments(newVal);
    },
    //HÀM NÀY ĐỂ SET GIÁ TRỊ MUỐN SET NHƯ NÀO THÌ MÓC TRONG NEWVAL RA, TAO CÓ LOG(CHECK DỮ LIỆU)
    selectedPatientDontHaveAPM(newVal) {
      try {
        if (newVal !== null) {
          this.userDontHaveAPM.id = newVal.id;
          this.userDontHaveAPM.firstName = newVal.user.firstName;
          this.userDontHaveAPM.lastName = newVal.user.lastName;
          this.userDontHaveAPM.birthday = newVal.user.birthDay;
          this.userDontHaveAPM.phone = newVal.user.phoneNumber;
          this.userDontHaveAPM.email = newVal.user.email;
          this.userDontHaveAPM.gender = newVal.user.gender;
          console.log(newVal);
        }
      } catch (error) {
        console.log("handle error");
      }
    },
    deep: true,
  },
  async created() {
    await this.getPatient();
    await this.getAllPatient();
    await this.getAllDoctor();
    await this.getAllServices();
    await this.checkSlot();
  },
  async beforeUpdate() {
    if (this.queueDetails != null) {
      try {
        this.user.id = this.queueDetails.id;
        this.user.fullName = this.queueDetails.patient.user.fullName;
        this.user.birthDay = this.dateToYMD(
          this.queueDetails.patient.user.birthDay
        );
        this.user.gender = this.queueDetails.patient.user.gender;
        this.user.phoneNumber = this.queueDetails.patient.user.phoneNumber;
        this.user.address = this.queueDetails.patient.user.address;
        this.user.patientid = this.queueDetails.patient.id;
        this.doctor.doctorId = this.queueDetails.doctor.id;
        this.queue = { ...this.user };
      } catch (err) {
        console.log("Handle Error");
      }
    }
  },
  computed: {
    buttonTransfer() {
      if (
        this.inputQueue.Pulse === null ||
        this.inputQueue.Pulse === "" ||
        this.inputQueue.BloodPressure === null ||
        this.inputQueue.BloodPressure === "" ||
        this.inputQueue.Tempurature === null ||
        this.inputQueue.Tempurature === "" ||
        this.inputQueue.Weight === null ||
        this.inputQueue.Weight === "" ||
        this.inputQueue.Height === null ||
        this.inputQueue.Height === ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async getPatient() {
      HTTP.get("Appointment")
        .then((response) => {
          this.patients = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getAllPatient() {
      HTTP.get("Patient/GetAllPatient")
        .then((res) => {
          this.patientList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dateToYMD(end_date) {
      var ed = new Date(end_date);
      var d = ed.getDate();
      var m = ed.getMonth() + 1;
      var y = ed.getFullYear();
      return (
        "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
      );
    },
    async getAllDoctor() {
      HTTP.get("Doctor/GetAllDoctor")
        .then((res) => {
          res.data.forEach((el) => {
            this.doctors.push({
              experience: el.experience,
              id: el.id,
              fullName: el.user.fullName,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createQueue() {
      var data = {
        AppointmentId: this.queue.id,
        patientid: this.queue.patientid,
        fullName: this.queue.fullName,
        birthDay: this.queue.birthDay,
        address: this.queue.address,
        gender: this.queue.gender,
        phoneNumber: this.queue.phoneNumber,
        Pulse: this.inputQueue.Pulse,
        BloodPressure: this.inputQueue.BloodPressure,
        Tempurature: this.inputQueue.Tempurature,
        Weight: this.inputQueue.Weight,
        Height: this.inputQueue.Height,
        doctorId: this.doctor.doctorId,
      };
      this.$confirm.require({
        message: "Do you want to transfer patient " + data.fullName,
        header: "Transfer Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-success",
        accept: async () => {
          HTTP.post("Queue", data)
            .then((respone) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Transfer Patient " + data.fullName + " Successfully ",
                life: 3000,
              });
              location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        },
        reject: () => {},
      });
    },
    async searchPatient(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredPatients = [...this.patients];
        } else {
          try {
            this.filteredPatients = this.patients.filter(function (el) {
              return el.patient.user.identityCard
                .toLowerCase()
                .includes(event.query.toLowerCase());
            });
          } catch (error) {
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: "Dont Have Patient To Find",
              life: 3000,
            });
          }
        }
      }, 250);
    },
    async searchByIdCard(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredPatients = [];
          this.filteredPatients = [...this.patients];
        } else {
          try {
            this.filteredPatients = [];
            this.filteredPatients = this.patients.filter(function (el) {
              return el.patient.user.identityCard
                .toLowerCase()
                .includes(event.query.toLowerCase());
            });
          } catch (error) {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Cannot find any patient",
              life: 3000,
            });
          }
        }
      }, 250);
    },

    async searchPatientDontHaveAPMByIdCard(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          // Add null check for event.query
          this.filteredPatientsDontHaveAPM = [];
          this.filteredPatientsDontHaveAPM = [...this.patientList];
        } else {
          try {
            this.filteredPatientsDontHaveAPM = [];
            this.filteredPatientsDontHaveAPM = this.patientList.filter(
              function (el) {
                return el.user.identityCard
                  .toLowerCase()
                  .includes(event.query.toLowerCase());
              }
            );
          } catch (error) {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Cannot find any patient",
              life: 3000,
            });
          }
        }
      }, 250);
    },
    async getDoctorAppointments(id) {
      try {
        const res = await HTTP.get("ReservedSchedules/DocId/" + id);
        if (res.data === "") {
          const events = {
            title: null,
            start: null,
            end: null,
          };
          this.calendarOptions.events = events;
        } else {
          const events = res.data.map((appointment) => ({
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
          }));
          this.calendarOptions.events = events;
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        return []; // return an empty array to prevent errors in the calendar component
      }
    },
    async getAllServices() {
      this.loading = true;
      await HTTP.get("Services")
        .then((res) => {
          this.services = res.data;
        })
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "Error Message",
            detail: err.respone.data.error[0].description,
            life: 3000,
          });
        });
    },
    async checkSlot() {
      if (this.schedules.length > 0) {
        const results = await this.options.map((val, index) => {
          // include index for tracking selectedSlot
          const slotHour = val.value.getHours();
          for (let i = 0; i < this.schedules.length; i++) {
            const scheduleHour = new Date(this.schedules[i].start).getHours();
            if (slotHour === scheduleHour) {
              if (this.selectedSlot === index) {
                this.selectedSlot = null; // reset selectedSlot if checkbox is disabled
              }
              return true;
            }
          }

          const current = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss");

          const hour = dayjs(current).get("hour");

          const pickday = dayjs(this.formatDate(this.date)).format(
            "YYYY-MM-DD"
          );

          const currentday = dayjs(current).format("YYYY-MM-DD");
          if (pickday < currentday) {
            return true;
          }
          if (pickday === currentday) {
            if (slotHour <= hour) {
              return true;
            }
          }
          if (this.disabledButtons[index]) {
            if (this.selectedSlot === index) {
              this.selectedSlot = null; // reset selectedSlot if checkbox is disabled
            }
            return true;
          }
          return false;
        });
        this.disabledButtons = results;
        if (this.selectedSlot === null) {
          // select the first available slot if none is selected
          this.selectedSlot = results.indexOf(false);
        }
        return results;
      }
    },
    async checkDocSchedule(doc, date) {
      this.selectedSlot = [];
      this.disabledButtons = [];
      const docId = doc;
      const formattedDate = this.dateToYMD(date);
      HTTP.get(
        `ReservedSchedules/GetDocScheduleByDate/${docId}/${formattedDate}`
      )
        .then((res) => {
          this.schedules = res.data;
          this.checkSlot();
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Load Schedule Successfully",
            life: 3000,
          });
        })
        .catch((err) => {
          this.$toast.add({
            severity: "Error",
            summary: "Error Message",
            detail: err.respone.data.errors[0].description,
          });
        });
    },
    async checkOne(option) {
      this.selected = [option];
      const hours = this.selected[0].value
        .getHours()
        .toString()
        .padStart(2, "0");
      const minutes = this.selected[0].value
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const seconds = this.selected[0].value
        .getSeconds()
        .toString()
        .padStart(2, "0");
      // eslint-disable-next-line no-unused-vars
      const time = `${hours}:${minutes}:${seconds}`;
    },
    openCreateAppointmentDialog() {
      this.CreateAppointmentDialog = true;
    },
    closeCreateAppointmentDialog() {
      this.userDontHaveAPM.id = null;
      this.userDontHaveAPM.firstName = null;
      this.userDontHaveAPM.lastName = null;
      this.userDontHaveAPM.birthday = null;
      this.userDontHaveAPM.phone = null;
      this.userDontHaveAPM.email = null;
      this.userDontHaveAPM.gender = null;
      this.selectedPatientDontHaveAPM = null;
      this.CreateAppointmentDialog = false;
    },
    openCreateAccountDialog() {
      this.CreateAccountDialog = true;
    },
    closeCreateAccountDialog() {
      this.CreateAccountDialog = false;
      this.validation.reset();
    },
    async Register() {
      const success = await this.$validate();
      if (success === true) {
        this.registerData.UserName = this.registerData.phoneNumber;
        this.registerData.Password = "123456@@";
        HTTP.post("Authentication/RegisterByNurse", this.registerData)
          .then((res) => {
            this.getPatient();
            this.getAllPatient();
            this.getAllDoctor();
            this.getAllServices();
            this.closeCreateAccountDialog();
            this.$toast.add({
              severity: "success",
              summary: "Success Message",
              detail: "Create new Patient account success",
              life: 3000,
            });
            this.registerData = {
              UserName: "",
              Password: "",
              firstName: "",
              lastName: "",
              birthday: "",
              phoneNumber: "",
              gender: "",
              IdentityCard: "",
            };
          })
          .catch((err) => {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: err,
              life: 3000,
            });
          });
      }
    },
    async createAppointment() {
      this.appointment.DoctorId = this.selectDocs;
      this.appointment.PatientId = parseInt(this.userDontHaveAPM.id);
      this.appointment.AppointmentDate = this.date;
      const serviceId = this.selectedServices.map((svId) => svId.id);
      const services = { ServiceId: [...serviceId] };
      this.appointment.AppointmentDetails = { ...services };
      for (let i = 0; i < serviceId.length; i++) {
        if (serviceId[i] !== 0) {
          await HTTP.get(`Services/` + serviceId[i]).then((res) => {
            this.appointment.Subtotal += res.data.servicePrice;
          });
        }
      }
      const slot = this.formatDate(this.selected[0].value);
      const [year, month, day] = dayjs(this.appointment.AppointmentDate)
        .format("YYYY-MM-DD")
        .split("-");
      const hours = dayjs(slot).format("HH:mm:ss");
      this.appointment.AppointmentDate = dayjs(
        `${year}-${month}-${day} ${hours}`
      );
      this.appointment.AppointmentDate = this.formatDate(
        this.appointment.AppointmentDate
      );
      this.loader = true;
      HTTP.post("Appointment", this.appointment)
        .then(() => {
          this.loader = false;
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Create Appointment Successfully",
            life: 3000,
          });
          this.closeCreateAppointmentDialog();
        })
        .catch((err) => {
          try {
            this.loader = false;
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: err.response.data,
              life: 3000,
            });
          } catch (error) {
            this.loader = false;
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Unhandle Exception",
              life: 3000,
            });
          }
        });
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>
<style scoped>
#patientBody {
  text-align: center;
  display: block;
  height: 150px;
  overflow-y: scroll;
}
fieldset {
  box-sizing: border-box;
  border: 1px solid #dee2e6;
  background: #ffffff;
  color: #495057;
  border-radius: 6px;
}
fieldset legend {
  padding: 1.25rem;
  border: 1px solid #dee2e6;
  color: #343a40;
  background: #f4d7d3;
  font-weight: 700;
  border-radius: 6px;
}
.fieldset-content {
  box-sizing: border-box;
  padding: 1.25rem;
}
</style>
<style>
.p-inputnumber-input {
  width: 80%;
}
.p-autocomplete-input {
  width: 100%;
}
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
}

.checkbox-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0d6efd;
  color: #fff;
  border: none;
  border-radius: 10px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.checkbox-button:hover {
  background-color: #0b5ed7;
}

.checkbox-button input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  cursor: pointer;
}
.cantChoose {
  background-color: gray !important;
  pointer-events: none;
}
.checkbox-button.checked {
  background-color: #198754;
}
</style>
