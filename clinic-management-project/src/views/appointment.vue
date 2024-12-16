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
  <div class="container-fluid mb-4">
    <h1 class="intro-title text-center text-decoration-underline">
      SIGN UP FOR TREATMENT
    </h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="intro-content">
          <p>
            Customers wishing to make an appointment at EGO Clinic System,
            please follow the instructions:
          </p>
          <div class="">
            <li>
              Make an appointment by calling the Customer Care switchboard at
              <span> 0287 102 6789</span> – <span>0287 300 6858</span> (EGO
              General Clinic in Can Tho City) or <span> 1800 6858</span> –
              <span>024 7106 6858</span>
              (EGO General Clinic in Hanoi).
            </li>
            <li>Book an appointment online by filling out the form below.</li>
            <li>
              If you don't see any slots to pick, please make sure that you have
              already chosed the doctor and picked a day.
            </li>
            <li>
              Please note, in case of emergency, please immediately go to the
              nearest medical facility or go directly to the EGO Polyclinic
              System.
            </li>
          </div>
          <Fieldset>
            <template #legend>
              <span class="font-bold text-white text-center"
                >Make Appointment</span
              >
            </template>
            <div class="container mt-3">
              <div class="row d-flex">
                <div class="col-md-6 mb-3">
                  <Dropdown
                    class="w-100"
                    v-model="selectDocs"
                    :options="doctors"
                    optionLabel="user.fullName"
                    placeholder="Please select a Doctor"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <Calendar
                    class="w-100"
                    inputId="datetemplate"
                    v-model="date"
                    placeholder="Please pick a day"
                  >
                  </Calendar>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-3">
                  <MultiSelect
                    class="w-100"
                    v-model="selectServices"
                    :options="services"
                    optionLabel="serviceName"
                    placeholder="Select Services"
                    display="chip"
                    :filter="true"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-3">
                  <span>Slots:</span>
                  <div class="checkbox-grid">
                    <label
                      v-for="(option, index) in options"
                      :key="index"
                      :class="{
                        'checkbox-button': true,
                        checked: selected.includes(option),
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
                        v-model="selected"
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
              </div>
              <div class="row">
                <div class="">
                  <span>Reason</span>
                  <div class="d-flex justify-content-around mb-3">
                    <div>
                      <Textarea
                        class="w-100"
                        v-model="appointment.Reason"
                        :autoResize="false"
                        rows="15"
                        cols="120"
                        placeholder="Enter your medical condition, questions for the doctor and health problems to see"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- <a
                href="#"
                class="submit-button d-flex justify-content-center"
                style="text-decoration: none"
              >
                <span class="text-white text-decoration-none">Submit</span>
              </a> -->
              <div class="d-flex justify-content-end">
                <Button
                  label="Submit"
                  @click="createAppointment()"
                  :disabled="validateDisbleButton()"
                />
              </div>
            </div>
          </Fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/axios";
import dayjs from "dayjs";

export default {
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
      date: null,
      selectServices: [],
      services: [],
      doctors: [],
      schedules: [],
      disabledButtons: [false, false, false, false, false, false],
      selectDocs: null,
      appointment: {
        DoctorId: null,
        PatientId: localStorage.getItem("PatientId"),
        AppointmentDate: null,
        SubTotal: null,
        Reason: null,
      },
      Service: [],
      selectedSlot: [],
      options: dateOptions,
      selected: [],
      emailConfirmStatus: false,
      loader: false,
    };
  },
  watch: {
    selectDocs: function () {
      if (this.selectDocs && this.date) {
        this.checkDoctorSchedule(this.selectDocs.id, this.date);
      }
    },
    date: function () {
      if (this.selectDocs && this.date) {
        this.checkDoctorSchedule(this.selectDocs.id, this.date);
      }
    },
  },
  async created() {
    this.getAllServices();
    this.getAllDocs();
    this.checkSlot();
  },
  methods: {
    validateDisbleButton() {
      if (
        this.appointment.Reason == null ||
        this.selected.length <= 0 ||
        this.selectServices.length === 0 ||
        this.date == null ||
        this.selectDocs == null ||
        this.appointment.Reason == ""
      ) {
        return true;
      }
      return false;
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    },
    async getAllServices() {
      HTTP.get("Services")
        .then((response) => {
          this.services = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getAllDocs() {
      await HTTP.get("Doctor/GetAllDoctor")
        .then((response) => {
          this.doctors = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async checkSlot() {
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

        const pickday = dayjs(this.formatDate(this.date)).format("YYYY-MM-DD");

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
    },
    checkDoctorSchedule(doc, date) {
      this.selected = [];
      this.disabledButtons = [];
      const docId = doc;
      const formattedDate = this.dateToYMD(date);

      HTTP.get(
        `ReservedSchedules/GetDocScheduleByDate/${docId}/${formattedDate}`
      )
        .then((res) => {
          this.schedules = res.data;
          this.checkSlot();
          this.showSuccess("Get Schedule Successfully");
        })
        .catch((err) => {
          console.log(err);
          this.showSuccess("Get Schedule Successfully");
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
    showSuccess(mess) {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: mess,
        life: 3000,
      });
    },
    async checkOne(option) {
      this.selected = [option]; // assign the selected option to the option parameter
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
    //lỗi chọn ngày khác nhưng vẫn lên hôm nay , check lại
    async createAppointment() {
      this.appointment.DoctorId = this.selectDocs.id;
      this.appointment.AppointmentDate = this.date;
      const serviceId = this.selectServices.map((svId) => svId.id);
      const services = { ServiceId: [...serviceId] };
      this.appointment.AppointmentDetails = { ...services };
      for (let i = 0; i < serviceId.length; i++) {
        if (serviceId[i] !== 0) {
          await HTTP.get(`Services/` + serviceId[i]).then((res) => {
            this.appointment.SubTotal += res.data.servicePrice;
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
          this.$router.go();
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
  },
};
</script>
<style scoped>
/* .p-dropdown.p-component.p-inputwrapper.w-100,
.p-calendar.p-component.p-inputwrapper.w-100,
.p-multiselect.p-component.p-inputwrapper.p-multiselect-chip.w-100,
.checkbox-button {
  border-radius: 18px;
} */

.p-multiselect {
  width: 35rem;
}
.p-fieldset-legend {
  color: #840e07;
}
.fieldset p {
  line-height: 1.5;
  margin: 0;
}
.container {
  font-weight: 400;
}
.intro-title {
  color: #840e07;
}
.intro-content li span {
  color: red;
}
.card {
  background-color: #fecccc;
}
.submit-button {
  background-color: #ca574f;
  border-radius: 100px;
  height: 40px;
  align-items: center;
}
input {
  border-radius: 100px;
}
input::placeholder {
  color: #000;
}
.cantChoose {
  background-color: gray !important;
  pointer-events: none;
}
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
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

.checkbox-button.checked {
  background-color: #198754;
}
.p-dropdown.p-component.p-inputwrapper.p-inputwrapper-filled {
  width: 135%;
}
</style>
<style>
.p-fieldset .p-fieldset-legend {
  background-color: #cb5850;
}
.p-fieldset {
  background-color: #fecccc;
}
</style>
