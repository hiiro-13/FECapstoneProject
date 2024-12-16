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
  <div class="row">
    <div class="col-md-3">
      <Listbox
        v-model="selectedPatient"
        :options="scanningQueue"
        :filter="true"
        optionLabel="patient.user.fullName"
        listStyle="max-height:500px"
        style="width: 100%; height: 500px"
        filterPlaceholder="Search"
      >
        <template #option="item">
          <div class="country-item" @click="setData(item)">
            <div>
              {{ item.option.patient.user.fullName }}
            </div>
          </div>
        </template>
      </Listbox>
      <div class="mt-2 d-flex justify-content-center">
        <div class="d-flex flex-column">
          <button
            class="btn btn-primary rounded"
            @click="transferPatientToDoctor()"
            :disabled="this.previewUrl === null || this.patients === null"
          >
            Send test image to doctor
          </button>
          <button
            class="mt-2 btn btn-success"
            @click="openPrintTestDialog()"
            :disabled="this.previewUrl === null || this.patients === null"
          >
            Print image
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <Fieldset legend="Patient Information">
        <div class="d-flex justify-content-between gap-2">
          <div class="flex-grow-1 d-flex flex-column">
            <label for="patientFullName" class="form-label">Patient Name</label>
            <InputText
              v-model="patientFullName"
              placeholder="Patient Name"
              class="w-100"
              readonly="true"
              name="patientFullName"
            />
          </div>
          <div class="flex-grow-1 d-flex flex-column">
            <label for="patientAge" class="form-label">Patient Age</label>
            <InputText
              v-model="patientAge"
              placeholder="Search"
              class="w-100"
              readonly="true"
              name="patientAge"
            />
          </div>
          <div class="flex-grow-1 d-flex flex-column">
            <label for="patientAge" class="form-label">Doctor Require</label>
            <InputText
              v-model="doctorRequire"
              placeholder="Doctor Require"
              class="w-100"
              readonly="true"
              name="patientAge"
            />
          </div>
        </div>
      </Fieldset>
      <div class="mt-2">
        <div class="card d-flex flex-column" style="height: 700px">
          <div class="card-header">
            <p class="text-center h4"><strong> MRI Scan Image</strong></p>
          </div>
          <div class="card-body flex-grow-1 upload-container">
            <div class="upload-input-container rounded"></div>
            <input
              ref="fileInput"
              type="file"
              class="upload rounded"
              @change="onFileInputChange"
              accept="image/*"
            />
            <div class="upload-message" :hidden="previewUrl !== null">
              <strong>Please drag or click for choose your photo</strong>
            </div>
            <div v-if="previewUrl" class="image-preview">
              <img :src="previewUrl" alt="Preview" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="displayPrintTestDialog"
    modal
    header="Header"
    :style="{ width: '50vw' }"
  >
    <template #header>
      <div><h5>Scanning MRI Image</h5></div>
    </template>
    <div ref="image">
      <div>
        <div class="d-flex justify-content-between">
          <div>
            <img
              :src="require(`@/assets/image/VTP2_1.svg`)"
              style="width: 100px"
            />
          </div>
          <div>
            <p style="margin-top: 10px; color: gray">
              Presciption No #{{ this.patients.appointmentId }}
            </p>
          </div>
        </div>
        <hr style="margin-top: 0px" />
        <div class="d-flex justify-content-between">
          <div>
            <b>Ego Clinic</b>
            <p>Doctor: {{ this.patients.doctor.user.fullName }}</p>
            <p>TelePhone: {{ this.patients.doctor.user.phoneNumber }}</p>
          </div>
          <div>
            <p class="text-end">Fpt University</p>
            <p class="text-end"><b>Working time</b></p>
            <p class="text-end">Monday to Friday</p>
            <p class="text-end">7:00 am to 6:00 pm</p>
          </div>
        </div>
        <div class="mt-2">
          <h2 class="text-center mt-3">MRI Image</h2>
          <div class="d-flex justify-content-between mt-3">
            <small
              >Patient Name:
              <b>{{ this.patients.patient.user.fullName }}</b>
              <b></b>
            </small>
            <small
              >Gender: <b>{{ this.patients.patient.user.gender }}</b>
              <b></b>
            </small>
            <small
              >Age:
              <b>
                {{ this.caculateAge(this.patients.patient.user.birthDay) }}</b
              >
              <b></b>
            </small>
            <small
              >Address: <b>{{ this.patients.patient.user.address }}</b>
              <b> </b>
            </small>
          </div>

          <div class="d-flex justify-content-center mt-2 mb-2">
            <img :src="this.previewUrl" class="w-50" />
          </div>

          <div class="d-flex justify-content-between">
            <div class="d-flex">{{ this.formatDate(new Date()) }}</div>
            <div class="d-flex">
              Scanning Doctor: <b>{{ technicianName }}</b>
            </div>
          </div>
          <div class="mb-2 mt-2"><hr /></div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Close"
        class="p-button-danger"
        icon="pi pi-times"
        @click="closePrintTestDialog()"
        text
      />
      <Button
        label="Submit"
        icon="pi pi-check"
        @click="printImage()"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script>
import { HTTP } from "@/axios";
import dayjs from "dayjs";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      scanningQueue: [],
      selectedPatient: null,
      patients: null,
      patientFullName: null,
      doctorRequire: null,
      patientAge: null,
      MriImage: null,
      previewUrl: null,
      mriTechnicianId: localStorage.getItem("MRITechnicianId"),
      technicianName: localStorage.getItem("fullName"),
      displayPrintTestDialog: false,
      loader: false,
    };
  },
  created() {
    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:80/SignalRServer")
      .configureLogging(LogLevel.Information)
      .build();
    this.connection
      .start()
      .then(() => {
        this.getAllScanningQueue();
        this.connection.on("CreateScanningQueue", () => {
          this.getAllScanningQueue();
        });
      })
      .catch((error) => console.error(error));
  },

  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    },
    caculateAge(date) {
      return dayjs(new Date()).get("year") - dayjs(date).get("year");
    },
    getAllScanningQueue() {
      HTTP.get("Technician/GetallQueue")
        .then((res) => {
          this.scanningQueue = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setData(data) {
      this.patients = data.option;
      this.patientFullName = this.patients.patient.user.fullName;
      this.patientAge = this.caculateAge(this.patients.patient.user.birthDay);
      this.doctorRequire = this.patients.require;
    },
    onFileInputChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      this.MriImage = file;
      reader.onload = () => {
        this.previewUrl = reader.result;
      };

      reader.readAsDataURL(file);
    },
    transferPatientToDoctor() {
      const formData = new FormData();
      formData.append("file", this.MriImage);
      formData.append("appointmentId", this.patients.appointmentId);
      formData.append("mRITechnicianId", this.mriTechnicianId);
      this.loader = true;
      HTTP.post("Test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          this.loader = false;
          this.getAllScanningQueue();
          this.showSuccess("Transfer Patient To Doctor Successfully");
          this.patientFullName = null;
          this.patientAge = null;
          this.doctorRequire = null;
          this.patients = null;
          this.previewUrl = null;
        })
        .catch((err) => {
          try {
            console.log(err);
            this.loader = false;
            this.showError(err);
          } catch (error) {
            this.loader = false;
            this.showError("Unhandle Exception");
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
        summary: "Error",
        detail: err,
        life: 3000,
      });
    },
    openPrintTestDialog() {
      if (this.patients === null) return;
      this.displayPrintTestDialog = true;
    },
    closePrintTestDialog() {
      this.displayPrintTestDialog = false;
    },
    async printImage() {
      const elementToPrint = this.$refs.image;
      const canvas = await html2canvas(elementToPrint);

      const imageData = canvas.toDataURL("image/png");

      const image = new Image();
      image.src = imageData;

      const windowContent = "<!DOCTYPE html>";
      const printWindow = window.open("", "", "height=600,width=600");
      printWindow.document.write(windowContent);
      setTimeout(() => {
        printWindow.document.write(`
    <html>
      <head>
        <title>Print Test Result </title>
      </head>
      <body>
        <img src="${imageData}" />
      </body>
    </html>
  `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 1000);
    },
  },
};
</script>
<style>
.p-fieldset .p-fieldset-legend {
  background-color: #f4d7d3;
}
.p-listbox .p-listbox-header {
  background-color: #f4d7d3;
}
.p-listbox .p-listbox-list .p-listbox-item {
  border-bottom: 1px solid #cfd8dc;
}
.p-listbox-item {
  position: relative;
  height: 50px;
}
.country-item {
  position: absolute;
  width: 100%;
  height: inherit;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style scoped>
.upload-container {
  position: relative;
}

.upload-input-container {
  position: absolute;
  inset: 10px;
  z-index: 7;

  cursor: pointer;
  outline: 2px dashed black;
  background: gray;
}

.upload {
  position: absolute;
  inset: 10px;
  z-index: 99;

  opacity: 0;
  cursor: pointer;
}

.upload-message {
  position: absolute;
  z-index: 8;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
}

.image-preview {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  height: 80%;
  z-index: 9;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.card-header {
  background-color: #f4d7d3;
}
.card-header h2 {
  padding: 1.25rem;
}
</style>
