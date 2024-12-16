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
    <div class="col-md-2" style="margin-right: 5px">
      <div class="mb-3">
        <Listbox
          v-model="selectedPatient"
          :options="queue"
          :filter="true"
          optionLabel="patient.user.fullName"
          listStyle="max-height:250px"
          style="width: 100%"
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
      </div>
      <div>
        <fieldset>
          <legend><span style="font-size: 15px">Medical Record</span></legend>
          <div class="fieldset-content">
            <Listbox
              v-model="selectedPreviousPresciption"
              listStyle="max-height:250px"
              :options="previousPresciption"
              optionLabel="createdDate"
            >
              <template #option="item">
                <div
                  class="country-item"
                  @click="openPreviousPrescriptionDialog(item)"
                >
                  <div>
                    {{ this.dateToYMD(item.option.createdDate) }}
                  </div>
                </div>
              </template>
            </Listbox>
          </div>
        </fieldset>
      </div>
      <div class="mt-3">
        <fieldset>
          <legend><span style="font-size: 15px">Test Record</span></legend>
          <div class="fieldset-content">
            <Listbox
              v-model="selectedPreviousTest"
              listStyle="max-height:250px"
              :options="previousTestList"
              optionLabel="createdDate"
            >
              <template #option="item">
                <div class="country-item" @click="openPreviousTestDialog(item)">
                  <div>
                    {{ this.dateToYMD(item.option.createdDate) }}
                  </div>
                </div>
              </template>
            </Listbox>
          </div>
        </fieldset>
        <div class="d-flex justify-content-center">
          <button
            class="btn btn-success mt-2"
            :disabled="
              this.patientHealthTracking.patientId === null ||
              this.prescription.length === 0
            "
            @click="openPrescriptionDialog()"
          >
            Save and Print
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-10">
      <div class="mb-3" style="width: 104%">
        <fieldset>
          <legend class="d-flex justify-content-between">
            <span style="font-size: 15px" class="d-flex align-items-center">
              Patient Health Tracking Status
            </span>
            <div
              :hidden="
                (isTransfer === true && isScan === true) ||
                (isTransfer === true && isScan === false)
              "
            >
              <Button
                @click="openTransferToTechnicianDialog()"
                :disabled="patientHealthTracking.patientId === null"
                label="Transfer Patient To Test"
                class="p-button-rounded"
              />
            </div>
            <div
              :hidden="
                (isScan === false && isTransfer === false) ||
                (isScan === false && isTransfer === true) ||
                (isScan === undefined && isTransfer === undefined)
              "
            >
              <button
                class="notification btn btn-success rounded-5"
                @click="openTestDialog()"
              >
                Result
                <span class="badge">1</span>
              </button>
            </div>
            <div
              :hidden="
                (isTransfer === true && isScan === true) ||
                (isTransfer === false && isScan === false) ||
                (isScan === undefined && isTransfer === undefined)
              "
            >
              <button class="text-success">&#10003; Waiting for result</button>
            </div>
          </legend>
          <div class="container mb-3">
            <div class="row row-cols-lg-5 row-cols-2">
              <div class="d-flex flex-column">
                <span> Full Name: </span>
                <InputText
                  v-model="patientHealthTracking.patient.user.fullName"
                  type="text"
                  readonly
                />
              </div>
              <div class="d-flex flex-column">
                <span> Address:</span>
                <InputText
                  type="text"
                  v-model="patientHealthTracking.patient.user.address"
                  readonly
                />
              </div>

              <div class="d-flex flex-column">
                <span> DoB:</span>
                <InputText
                  type="date"
                  v-model="patientHealthTracking.patient.user.birthDay"
                  readonly
                />
              </div>
              <div class="d-flex flex-column">
                <span>Phone Number:</span>
                <InputText
                  type="text"
                  v-model="patientHealthTracking.patient.user.phoneNumber"
                  readonly
                />
              </div>

              <div class="d-flex flex-column">
                <span> Gender:</span>
                <InputText
                  type="text"
                  v-model="patientHealthTracking.patient.user.gender"
                  readonly
                />
              </div>
              <div class="d-flex flex-column">
                <span>Temperature:</span>
                <InputText
                  inputId="withoutgrouping"
                  v-model="patientHealthTracking.tempurature"
                  mode="decimal"
                  :useGrouping="false"
                  placeholder="°C"
                  readonly
                />
              </div>

              <div class="d-flex flex-column">
                <span>Pulse:</span>
                <InputText
                  inputId="withoutgrouping"
                  v-model="patientHealthTracking.pulse"
                  mode="decimal"
                  :useGrouping="false"
                  placeholder="bpm"
                  readonly
                />
              </div>
              <div class="d-flex flex-column">
                <span>Weight:</span>
                <InputText
                  inputId="withoutgrouping"
                  v-model="patientHealthTracking.weight"
                  mode="decimal"
                  :useGrouping="false"
                  placeholder="Kg"
                  readonly
                />
              </div>

              <div class="d-flex flex-column">
                <span>Blood Pressure:</span>
                <InputText
                  inputId="withoutgrouping"
                  v-model="patientHealthTracking.bloodPressure"
                  mode="decimal"
                  :useGrouping="false"
                  placeholder="mmHg"
                  readonly
                />
              </div>
              <div class="d-flex flex-column">
                <span>Height:</span>
                <InputText
                  inputId="withoutgrouping"
                  v-model="patientHealthTracking.height"
                  mode="decimal"
                  :useGrouping="false"
                  placeholder="Cm"
                  readonly
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="mb-3" style="width: 104%">
        <fieldset style="height: 550px">
          <legend>
            <div class="d-flex justify-content-between align-items-center">
              <span style="font-size: 15px">Presciption</span>
              <div class="d-flex">
                <div class="align-items-center d-flex me-3">
                  <span style="font-size: 15px" class="me-1"
                    >Re-Examination Day:</span
                  >
                  <Calendar
                    v-model="ReExamDay"
                    showIcon
                    :disabled="prescription.length === 0"
                    :class="{ 'p-invalid': ReExamDayIsInvalid }"
                  />
                </div>
                <Button
                  label="Clear Presciption"
                  class="p-button-rounded p-button-danger"
                  @click="emptyMedicineInPrescription()"
                  :disabled="prescription.length === 0"
                />
              </div>
            </div>
          </legend>
          <div class="fieldset-content">
            <DataTable
              :value="prescription"
              :scrollable="true"
              scrollHeight="400px"
              :loading="loading"
            >
              <template #empty> No project found. </template>
              <template #loading>
                <ProgressSpinner />
              </template>
              <Column field="medicineName" header="Medicine Name">
                <template #body="{ data }">
                  {{ data.medicineName }}
                </template>
              </Column>
              <Column header="Amount">
                <template #body="{ data }">
                  <input
                    type="number"
                    class="form-control"
                    v-model="data.MedicineAmount"
                    :class="{ 'is-invalid': data.isInvalid }"
                  />
                </template>
              </Column>
              <Column header="Using Day">
                <template #body="{ data }">
                  <input
                    type="number"
                    class="form-control"
                    v-model="data.usingDay"
                    :class="{ 'is-invalid': data.isInvalid }"
                  />
                </template>
              </Column>
              <Column header="Times Per Day">
                <template #body="{ data }">
                  <input
                    type="number"
                    class="form-control"
                    v-model="data.timesPerDay"
                    :class="{ 'is-invalid': data.isInvalid }"
                  />
                </template>
              </Column>
              <Column header="Using Type">
                <template #body="{ data }">
                  <input
                    type="text"
                    class="form-control"
                    v-model="data.usingType"
                    :class="{ 'is-invalid': data.isInvalid }"
                  />
                </template>
              </Column>
              <Column header="Session">
                <template #body="{ data }">
                  <Dropdown
                    v-model="data.session"
                    :options="sessions"
                    optionLabel="name"
                    optionValue="value"
                    placeholder="Session"
                    :class="{ 'p-invalid': data.isInvalid }"
                  />
                </template>
              </Column>
              <Column header="Description">
                <template #body="{ data }">
                  <input
                    type="text"
                    class="form-control"
                    v-model="data.description"
                    :class="{ 'is-invalid': data.isInvalid }"
                  />
                </template>
              </Column>
              <Column header="Action">
                <template #body="{ data, index }">
                  <Button
                    label="Delete"
                    class="p-button-danger"
                    @click="deleteMedicineInPrescription(index, data)"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </fieldset>
      </div>
      <div style="width: 104%">
        <DataTable
          :value="search"
          :scrollable="true"
          scrollHeight="400px"
          :loading="loading"
          showGridlines
          id="prescriptionTable"
        >
          <template #header>
            <div class="d-flex justify-content-between align-items-center">
              <span style="font-size: 15px" class="m-0">Medicine</span>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  placeholder="Keyword Search"
                  v-model="filteredMedicine"
                  @input="filterMedicineList(this.filteredMedicine)"
                />
              </span>
            </div>
          </template>
          <Column header="#">
            <template #body="{ index }">
              {{ ++index }}
            </template>
          </Column>
          <Column field="medicineName" header="Medicine Name">
            <template #body="{ data }">
              {{ data.medicineName }}
            </template>
          </Column>
          <Column field="price" header="Price">
            <template #body="{ data }">
              {{ data.price }}
            </template>
          </Column>
          <Column field="inStock" header="In Stock">
            <template #body="{ data }">
              {{ data.inStock }}
            </template>
          </Column>
          <Column header="Add Medicine">
            <template #body="{ data, index }">
              <Button
                label="Add Medicine"
                class="btnAddMedicine p-button-raised p-button-warning"
                @click="addRowMethod(index, data)"
                :disabled="
                  patientHealthTracking.patientId === null || data.inStock === 0
                "
              />
            </template>
          </Column>
          <template #empty> No project found. </template>
          <template #loading>
            <ProgressSpinner />
          </template>
        </DataTable>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="prescriptionDialog"
    modal
    :style="{ width: '40vw' }"
    :closable="false"
  >
    <template #header>
      <div><span style="font-size: 15px">Presciption</span></div>
    </template>
    <div ref="image">
      <div class="d-flex justify-content-between">
        <div>
          <img
            :src="require(`@/assets/image/VTP2_1.svg`)"
            style="width: 100px"
          />
        </div>
        <div>
          <p style="margin-top: 10px; color: gray">
            Presciption No #{{ this.apmId }}
          </p>
        </div>
      </div>
      <hr style="margin-top: 0px" />
      <div class="d-flex justify-content-between">
        <div>
          <b>Ego Clinic</b>
          <p>Doctor: {{ this.doctorName }}</p>
          <p>TelePhone: 0909090090</p>
        </div>
        <div>
          <p class="text-end">Fpt University</p>
          <p class="text-end"><b>Working time</b></p>
          <p class="text-end">Monday to Friday</p>
          <p class="text-end">7:00 am to 6:00 pm</p>
        </div>
      </div>
      <div>
        <h2 class="text-center mt-3">Presciption</h2>
        <div class="d-flex justify-content-between mt-3">
          <small
            >Patient Name:
            <b>{{ this.patientHealthTracking.patient.user.fullName }}</b>
          </small>
          <small
            >Gender:
            <b>{{ this.patientHealthTracking.patient.user.gender }}</b>
          </small>
          <small
            >Age:
            <b>{{
              this.caculateAge(this.patientHealthTracking.patient.user.birthDay)
            }}</b>
          </small>
          <small
            >Address:
            <b>{{ this.patientHealthTracking.patient.user.address }} </b>
          </small>
        </div>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Medicine name</th>
                <th>Amount</th>
                <th>Using Day</th>
                <th>Time per Days</th>
                <th>Using Type</th>
                <th>Session</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody id="PresciptionTbody">
              <tr v-for="(item, index) in prescription" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ item.medicineName }}</td>
                <td>{{ item.MedicineAmount }}</td>
                <td>{{ item.usingDay }}</td>
                <td>{{ item.timesPerDay }}</td>
                <td>{{ item.usingType }}</td>
                <td>{{ sessionNames[item.session] }}</td>
                <td>{{ item.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex">
          <div class="d-flex flex-column w-100">
            Result of Doctor:
            <Textarea
              v-model="resultOfDoctor"
              rows="5"
              class="form-control mt-2"
            />
          </div>
        </div>
        <div class="mt-3 bottom-0 start-50 row justify-content-between">
          <p>
            <b
              >Seek immediate medical attention if patient <ins>has any</ins> of
              the following symptoms:</b
            >
          </p>
          <div class="col-md-4">
            <p>- Convulsions</p>
            <p>- Sound asleep</p>
          </div>
          <div class="col-md-4">
            <p>- Vomiting</p>
            <p>- Persistent high fever</p>
          </div>
          <div class="col-md-4">
            <p>- Tired breathing</p>
            <p>- Bloody diarrhea</p>
          </div>
        </div>

        <div class="mt-2 mb-2"><hr /></div>
      </div>
    </div>

    <template #footer>
      <Button
        label="Close"
        class="p-button-danger"
        icon="pi pi-times"
        @click="closePrescriptionDialog()"
      />
      <Button
        label="Submit"
        icon="pi pi-check"
        @click="createPresciption()"
        autofocus
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="previousPrescriptionDialog"
    modal
    :style="{ width: '50vw' }"
    :closable="false"
  >
    <template #header> <h5>Previous Presciption Details</h5> </template>

    <div
      class="modal-body"
      id="prescription"
      v-if="
        selectedPreviousPresciption !== null ||
        selectedPreviousPresciption !== undefined
      "
    >
      <div class="d-flex justify-content-between">
        <div>
          <img
            :src="require(`@/assets/image/VTP2_1.svg`)"
            style="width: 100px"
            class="mb-2"
          />
        </div>
        <div>
          <p style="margin-top: 10px; color: gray">
            Prescription No #{{ this.previousAppointment.id }}
          </p>
        </div>
      </div>
      <hr style="margin-top: 0px" />
      <div class="d-flex justify-content-between prescriptionContent">
        <div>
          <b>Ego Clinic</b>
          <p>Specialist clinic</p>
          <p>
            Doctor:
            {{ this.previousAppointment.doctor.user.fullName }}
          </p>
          <p>
            TelePhone:
            {{ this.previousAppointment.doctor.user.phoneNumber }}
          </p>
        </div>
        <div>
          <p class="text-end">Fpt University</p>
          <p class="text-end"><b>Working time</b></p>
          <p class="text-end">Monday to Friday</p>
          <p class="text-end">7:00 am to 6:00 pm</p>
        </div>
      </div>
      <h2 class="text-center mt-3">Presciption</h2>
      <div class="d-flex justify-content-between mt-3">
        <small
          >Patient Name:
          <b>{{ this.previousAppointment.patient.user.fullName }}</b>
        </small>
        <small
          >Gender:
          <b>{{ this.previousAppointment.patient.user.gender }}</b>
        </small>
        <small
          >Age:
          <b>{{
            this.caculateAge(this.previousAppointment.patient.user.birthDay)
          }}</b>
        </small>
        <small
          >Address:
          <b>{{ this.previousAppointment.patient.user.address }} </b>
        </small>
      </div>
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine name</th>
              <th>Time per Days</th>
              <th>using Day</th>
              <th>Method</th>
              <th>Session</th>
            </tr>
          </thead>
          <tbody id="PresciptionTbody">
            <tr
              v-for="(item, index) in this.previousPresciptionDetails"
              :key="index"
            >
              <td>{{ ++index }}</td>
              <td>{{ item.medicine.medicineName }}</td>
              <td>{{ item.timesPerDay }}</td>
              <td>{{ item.usingDay }}</td>
              <td>{{ item.usingType }}</td>
              <td>{{ item.session }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-5 bottom-0 start-50 row">
        <p>
          <b
            >Seek immediate medical attention if patient <ins>has any</ins> of
            the following symptoms:</b
          >
        </p>
        <div class="col-md-4">
          <p>- Convulsions</p>
          <p>- Sound asleep</p>
        </div>
        <div class="col-md-4">
          <p>- Vomiting</p>
          <p>- Persistent high fever</p>
        </div>
        <div class="col-md-4">
          <p>- Tired breathing</p>
          <p>- Bloody diarrhea</p>
        </div>
      </div>
    </div>

    <template #footer>
      <div>
        <Button
          class="p-button-danger"
          @click="closePreviousPrescriptionDialog()"
          label="Close"
        />
      </div>
    </template>
  </Dialog>

  <Dialog
    v-model:visible="displayTransferToTechnicianDialog"
    modal
    header="Require Technician"
    :style="{ width: '50vw' }"
    :closable="false"
  >
    <span class="p-float-label">
      <Textarea v-model="requireScanning" class="form-control" rows="5" />
      <label>Require</label>
    </span>

    <template #footer>
      <Button
        label="Close"
        class="p-button-danger"
        icon="pi pi-times"
        @click="closeTransferToTechnicianDialog"
        text
      />
      <Button
        label="Submit"
        icon="pi pi-check"
        @click="transferPatientToTechnician(this.patientHealthTracking)"
        autofocus
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="displayTestDialog"
    modal
    header="Test Result"
    :style="{ width: '70vw' }"
  >
    <div class="d-flex row">
      <div class="col-md-6">
        <fieldset>
          <legend>Scan Image</legend>
          <div class="fieldset-content">
            <div class="d-flex justify-content-between gap-2">
              <div class="flex-grow-1 d-flex flex-column">
                <div style="border-bottom: 1px solid black">
                  <strong class="me-1"> Technician Name:</strong
                  >{{ this.scanner }}
                </div>
              </div>
            </div>
            <div class="mt-2 d-flex justify-content-center">
              <img :src="MRIScanResult.mriImage" style="width: 80%" />
            </div>
          </div>
        </fieldset>
      </div>
      <div class="col-md-6">
        <fieldset>
          <legend>Machine-learning Result</legend>
          <div class="fieldset-content">
            <div class="d-flex justify-content-between gap-2">
              <Chart
                type="pie"
                :data="chartData"
                :options="chartOptions"
                class="w-100"
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="displayPreviousTestDialog"
    modal
    header="Test Result"
    :style="{ width: '70vw' }"
  >
    <div class="d-flex row">
      <div class="col-md-6">
        <fieldset>
          <legend>Scan Image</legend>
          <div class="fieldset-content">
            <div class="d-flex justify-content-between gap-2">
              <div class="flex-grow-1 d-flex flex-column">
                <div style="border-bottom: 1px solid black">
                  <strong class="me-1"> Technician Name:</strong
                  >{{ this.previousTest.mriTechnician.user.fullName }}
                </div>
              </div>
            </div>
            <div class="mt-2 d-flex justify-content-center">
              <img :src="previousTest.mriImage" style="width: 80%" />
            </div>
          </div>
        </fieldset>
      </div>
      <div class="col-md-6">
        <fieldset>
          <legend>Machine-learning Result</legend>
          <div class="fieldset-content">
            <div class="d-flex justify-content-between gap-2">
              <Chart
                type="pie"
                :data="chartData"
                :options="chartOptions"
                class="w-100"
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { HTTP } from "@/axios";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Chart from "primevue/chart";
import { FilterMatchMode } from "primevue/api";
export default {
  components: { Chart },
  data() {
    return {
      connection: null,
      queue: [],
      medicines: [],
      prescription: [],
      doctorName: localStorage.getItem("fullName"),
      loading: false,
      selectedPatient: null,
      patientHealthTracking: {
        bloodPressure: null,
        doctorId: null,
        height: null,
        patient: {
          id: null,
          user: {
            address: "",
            birthDay: "",
            email: "",
            fullName: "",
            gender: "",
            phoneNumber: "",
          },
        },
        patientId: null,
        pulse: null,
        tempurature: null,
        weight: null,
      },
      previousPresciption: null,
      previousPrescriptionDialog: false,
      sessions: [
        { id: 1, value: 1, name: "Morning" },
        { id: 2, value: 2, name: "Noon" },
        { id: 3, value: 3, name: "Afternoon" },
      ],
      session: null,
      prescriptionDialog: false,
      displayTransferToTechnicianDialog: false,
      requireScanning: "",
      isScan: false,
      isTransfer: false,
      displayTestDialog: false,
      apmId: null,
      MRIScanResult: [],
      scanner: null,
      chartData: null,
      chartOptions: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
      resultOfDoctor: "",
      loader: false,
      previousTestList: [],
      selectedPreviousPresciption: null,
      selectedPreviousTest: null,
      displayPreviousTestDialog: false,
      previousTest: null,
      ReExamDay: null,
      ReExamDayIsInvalid: false,
      filteredMedicine: null,
      filteredMedicineList: [],
      previousAppointment: null,
      previousPresciptionDetails: null,
    };
  },
  created() {
    this.getMedicine();
    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:80/SignalRServer")
      .configureLogging(LogLevel.Information)
      .build();
    this.connection
      .start()
      .then(() => {
        this.getQueue();
        this.connection.on("ReceiveQueue", () => {
          this.getQueue();
        });
        this.connection.on("CreateTest", () => {
          this.checkScanningStatus();
        });
      })
      .catch((error) => console.error(error));
  },
  computed: {
    search() {
      if (this.filteredMedicineList.length === 0) {
        return this.medicines.map((item) => ({ ...item, disabled: false }));
      } else {
        return this.filteredMedicineList.map((item) => ({
          ...item,
          disabled: false,
        }));
      }
    },
    sessionNames() {
      return this.sessions.reduce((acc, cur) => {
        acc[cur.id] = cur.name;
        return acc;
      }, {});
    },
  },
  methods: {
    caculateAge(date) {
      return dayjs(new Date()).get("year") - dayjs(date).get("year");
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    async getQueue() {
      // eslint-disable-next-line no-unused-vars
      HTTP.get("Queue", {
        params: {
          doctorId: window.localStorage.getItem("DoctorId"),
        },
      })
        .then((response) => {
          this.queue = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMedicine() {
      this.loading = true;
      HTTP.get("Medicines/GetAllMedicines")
        .then((response) => {
          this.medicines = response.data;
          this.loading = false;
          console.log(this.medicines);
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    setData(data) {
      this.selectedPatient = data.option;
      this.apmId == this.selectedPatient.appointmentId;
      this.patientHealthTracking = { ...this.selectedPatient };
      this.patientHealthTracking.patient.user.birthDay = this.dateToYMD(
        this.patientHealthTracking.patient.user.birthDay
      );
      this.apmId = this.selectedPatient.appointmentId;
      this.getPreviousPresciption();
      this.getAllTestRecord(this.patientHealthTracking);
      this.checkScanningStatus();
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
    addRowMethod(index, item) {
      let foundMatch = false;
      this.prescription.find((x) => {
        if (x.MedicineId == item.id) {
          foundMatch = true;
          this.$toast.add({
            severity: "error",
            summary: "Error Message",
            detail: x.medicineName + "Has been added in prescription",
            life: 3000,
          });
          return;
        }
      });

      if (!foundMatch) {
        var data = {
          MedicineAmount: item.MedicineAmount,
          description: "Non-Description",
          MedicineId: item.id,
          medicineName: item.medicineName,
          usingDay: null,
          timesPerDay: null,
          usingType: null,
        };
        this.prescription.push(data);
      }
    },
    deleteMedicineInPrescription(index, item) {
      const length = this.prescription.length;
      if (length === 1) {
        this.ReExamDay = null;
      }
      const objWithIdIndex = this.prescription.findIndex(
        (obj) => obj.MedicineId === item.MedicineId
      );

      if (objWithIdIndex > -1) {
        this.prescription.splice(objWithIdIndex, 1);
      }

      const objWithIdIndex1 = this.medicines.findIndex(
        (obj) => obj.id === item.MedicineId
      );

      var element =
        document.getElementsByClassName("btnAddMedicine")[objWithIdIndex1];
      element.classList.remove("disable");
    },
    emptyMedicineInPrescription() {
      this.prescription = [];
      var itemClass = document.querySelectorAll(".btnAddMedicine");
      itemClass.forEach((el) => {
        el.classList.remove("disable");
      });
      this.ReExamDayIsInvalid = false;
      this.ReExamDay = null;
    },
    async getPreviousPresciption() {
      await HTTP.get(
        "Prescription/GetAllPrescriptionsByPatientId/" +
          this.patientHealthTracking.patient.id
      )
        .then((res) => {
          this.previousPresciption = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openPreviousPrescriptionDialog(item) {
      try {
        this.selectedPreviousPresciption = item.option;

        this.previousAppointment = {
          ...this.selectedPreviousPresciption.appointment,
        };
        this.previousPresciptionDetails = {
          ...this.selectedPreviousPresciption.prescriptionDetails,
        };

        if (this.selectedPreviousPresciption.appointment.id !== null) {
          this.previousPrescriptionDialog = true;
        }
      } catch (error) {
        // Handle the error here
        console.log("Error:", error);
      }
    },
    closePreviousPrescriptionDialog() {
      this.previousTest = [];
      this.previousPrescriptionDialog = false;
    },
    async printImage() {
      const elementToPrint = this.$refs.image;
      const canvas = await html2canvas(elementToPrint);

      const imageData = canvas.toDataURL("image/png");

      const image = new Image();
      image.src = imageData;

      const windowContent = "<!DOCTYPE html>";
      const printWindow = window.open("", "", "height=400,width=600");
      printWindow.document.write(windowContent);
      setTimeout(() => {
        printWindow.document.write(`
    <html>
      <head>
        <title>Print Prescription</title>
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
    async createPresciption() {
      this.loader = true;
      await HTTP.post(
        "Prescription/" + this.apmId + "/" + this.formatDate(this.ReExamDay),
        this.prescription
      )
        .then((res) => {
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Create Presciption Successfully",
            life: 3000,
          });
          this.loader = false;
          this.closePrescriptionDialog();
          //this.$router.go(this.$router.currentRoute);
          this.printImage();
          this.getQueue();
          this.prescription = [];
          this.selectedPatient = null;
          this.patientHealthTracking = {
            bloodPressure: null,
            doctorId: null,
            height: null,
            patient: {
              id: null,
              user: {
                address: "",
                birthDay: "",
                email: "",
                fullName: "",
                gender: "",
                phoneNumber: "",
              },
            },
            patientId: null,
            pulse: null,
            tempurature: null,
            weight: null,
          };
          this.emptyMedicineInPrescription();
          this.previousPresciption = [];
          this.isScan = false;
          this.isTransfer = false;
          this.previousTestList = [];
        })
        .catch((err) => {
          try {
            console.log(err);
            this.loader = false;
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Unhandle Exception",
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
    openPrescriptionDialog() {
      for (let i = 0; i < this.prescription.length; i++) {
        const prescriptionItem = this.prescription[i];
        const findMedicine = this.medicines.find(
          (x) => x.id === prescriptionItem.MedicineId
        );
        if (
          prescriptionItem.MedicineAmount === undefined ||
          prescriptionItem.MedicineAmount === "" ||
          prescriptionItem.usingDay === null ||
          prescriptionItem.usingDay === "" ||
          prescriptionItem.timesPerDay === null ||
          prescriptionItem.timesPerDay === "" ||
          prescriptionItem.usingType === null ||
          prescriptionItem.usingType === "" ||
          prescriptionItem.session === undefined ||
          prescriptionItem.description === null ||
          prescriptionItem.description === ""
        ) {
          prescriptionItem.isInvalid = true;
          this.$toast.add({
            severity: "error",
            summary: "Error Message",
            detail: "Please fill in all the information of presciption",
            life: 3000,
          });
          return;
        } else {
          prescriptionItem.isInvalid = false;
          if (this.ReExamDay === null) {
            this.ReExamDayIsInvalid = true;
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Please choose re-examination day",
              life: 3000,
            });
            return;
          }
          if (findMedicine.inStock < prescriptionItem.MedicineAmount) {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: findMedicine.medicineName + " is out of stock ",
              life: 3000,
            });
            return;
          }
        }
      }
      this.prescriptionDialog = true;
    },
    closePrescriptionDialog() {
      this.prescriptionDialog = false;
    },
    openTransferToTechnicianDialog() {
      this.displayTransferToTechnicianDialog = true;
    },
    closeTransferToTechnicianDialog() {
      this.displayTransferToTechnicianDialog = false;
    },
    transferPatientToTechnician(data) {
      var queue = {
        appointmentId: data.appointmentId,
        patientId: data.patientId,
        doctorId: data.doctorId,
        isTransfer: true,
        require: this.requireScanning,
      };
      HTTP.post("Technician/CreateScanningMRIQueue", queue)
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Transfer Patient To Technician Successfully",
            life: 3000,
          });
          this.checkScanningStatus();
          this.closeTransferToTechnicianDialog();
        })
        .catch((err) => {
          try {
            console.log(err);
            this.loader = false;
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Unhandle Exception",
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
    checkScanningStatus() {
      try {
        HTTP.get("Technician/CheckScanningStatus/" + this.apmId)
          .then((res) => {
            this.isScan = res.data.isScan;
            this.isTransfer = res.data.isTransfer;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log("handle error");
      }
    },
    openTestDialog() {
      this.displayTestDialog = true;
      if (this.apmId !== null) {
        HTTP.get("Test/GetByAppointmentId/" + this.apmId)
          .then((res) => {
            this.MRIScanResult = res.data;
            this.scanner = this.MRIScanResult.mriTechnician.user.fullName;
            this.chartData = this.setChartData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return;
    },
    setChartData() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: ["Normal", "Mild Demented", "Very Mild Demented"],
        datasets: [
          {
            data: [
              this.MRIScanResult.testResult.normal,
              this.MRIScanResult.testResult.mild_Demented,
              this.MRIScanResult.testResult.very_Mild_Demented,
            ],
            backgroundColor: [
              documentStyle.getPropertyValue("--blue-500"),
              documentStyle.getPropertyValue("--yellow-500"),
              documentStyle.getPropertyValue("--green-500"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--blue-400"),
              documentStyle.getPropertyValue("--yellow-400"),
              documentStyle.getPropertyValue("--green-400"),
            ],
          },
        ],
      };
    },
    getAllTestRecord(item) {
      HTTP.get("Test/GetAllTestByPatientId?patientId=" + item.patientId)
        .then((res) => {
          this.previousTestList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openPreviousTestDialog(item) {
      this.previousTest = item.option;
      this.MRIScanResult = this.previousTest;
      this.chartData = this.setChartData();

      this.displayPreviousTestDialog = true;
    },
    closePreviousTestDialog() {
      this.displayPreviousTestDialog = false;
    },
    filterMedicineList(name) {
      HTTP.get("Medicines/SearchMedicineByName/" + name)
        .then((res) => {
          this.filteredMedicineList = res.data;
        })
        .catch((err) => {
          this.filteredMedicineList = [];
          console.log(err);
        });
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
.disable {
  pointer-events: none;
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
.pdf-container {
  height: 500px;
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

.notification {
  position: relative;
  display: inline-block;
}

.notification .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background-color: red;
  color: white;
}
.hidden {
  display: none;
}
</style>
<style>
.p-listbox .p-listbox-header {
  background-color: #f8d7d3;
}
.listbox-header {
  background-color: #f8d7d3;
}
.p-listbox-list-wrapper {
  height: 250px;
}
.p-listbox .p-listbox-list .p-listbox-item {
  border-bottom: 1px solid #cfd8dc;
}
.p-datatable.p-datatable-gridlines .p-datatable-header {
  background-color: #f8d7d3;
}
.p-dropdown {
  width: 130px;
}
.p-chart canvas {
  height: 100% !important;
  width: 100% !important ;
}
</style>
<style>
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
