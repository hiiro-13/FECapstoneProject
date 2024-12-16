<template>
  <DataTable
    :value="search"
    :paginator="true"
    :rows="5"
    :rowHover="true"
    :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    responsiveLayout="scroll"
  >
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="m-0">Appointment Status</h5>
        <div>
          <span class="p-input-icon-left me-2">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              @input="SearchByName(this.keyword)"
              v-model="keyword"
            />
          </span>
          <Calendar
            v-model="startDate"
            showIcon
            class="me-2"
            placeholder="Start Date"
          />
          <Calendar
            v-model="endDate"
            showIcon
            placeholder="End Date"
            class="me-2"
          />
          <Button label="Clear" class="p-button-secondary" @click="Clear()" />
        </div>
      </div>
    </template>
    <template #empty> No project found. </template>
    <template #loading>
      <ProgressSpinner />
    </template>
    <div>
      <Column header="#">
        <template #body="{ index }">
          {{ ++index }}
        </template>
      </Column>
      <Column header="Doctor name">
        <template #body="{ data }">
          {{ data.doctor.user.fullName }}
        </template>
      </Column>
      <Column field="patient.user.fullName" header="Patient name">
        <template #body="{ data }">
          {{ data.patient.user.fullName }}
        </template>
      </Column>
      <Column header="Gender">
        <template #body="{ data }">
          {{ data.patient.user.gender }}
        </template>
      </Column>
      <Column header="Age">
        <template #body="{ data }">
          {{ this.caculateAge(data.patient.user.birthDay) }}
        </template>
      </Column>
      <Column header="Phone Number">
        <template #body="{ data }">
          {{ data.patient.user.phoneNumber }}
        </template>
      </Column>
      <Column header="Identity Card">
        <template #body="{ data }">
          {{ data.patient.user.identityCard }}
        </template>
      </Column>
      <Column header="Patient Email">
        <template #body="{ data }">
          {{ data.patient.user.email ? data.patient.user.email : "No data" }}
        </template>
      </Column>
      <Column header="Appointment Date">
        <template #body="{ data }">
          {{ this.formatDate(data.appointmentDate) }}
        </template>
      </Column>
      <Column field="isCancel" header="Waitting Contact" sortable>
        <template #body="{ data }">
          <span
            class="badge"
            :class="{
              'rounded-pill bg-warning': data.isCancel === 'Waitting',
              'rounded-pill bg-danger': data.isCancel === 'Cancel',
              'rounded-pill bg-success': data.isCancel === 'Accept',
            }"
            >{{ data.isCancel }}</span
          >
        </template>
      </Column>
      <Column field="isDone" header="Status" sortable>
        <template #body="{ data }">
          <div
            :class="{
              'spinner-border': data.isDone === false,
            }"
          ></div>
          <i
            class="fa-sharp fa-solid fa-check fa-bounce"
            style="color: #47c723; font-size: 30px"
            :hidden="data.isDone === false"
          ></i>
        </template>
      </Column>
      <Column field="isTransfer" header="Transfer" sortable>
        <template #body="{ data }">
          <span
            class="badge"
            :class="{
              'rounded-pill bg-danger': data.isTransfer === false,
              'rounded-pill bg-success': data.isTransfer === true,
            }"
            >{{ data.isTransfer ? "Yes" : "No" }}</span
          >
        </template>
      </Column>
      <Column header="Action">
        <template #body="{ data }">
          <div class="d-flex">
            <Button
              class="me-1"
              @click="openUsingServiceDialog(data)"
              label="Service using"
            />

            <Button
              class="me-1 p-button-success"
              @click="acceptAppointment(data.id)"
              :hidden="data.isCancel === 'Accept' || data.isCancel === 'Cancel'"
              label="Accept"
            />

            <Button
              class="p-button-danger"
              @click="cancelAppointment(data.id)"
              :hidden="data.isCancel === 'Accept' || data.isCancel === 'Cancel'"
              label="Cancel"
            />
          </div>
        </template>
      </Column>
    </div>
  </DataTable>
  <Dialog
    v-model:visible="displayUsingServiceDialog"
    modal
    header="Service Using"
    :style="{ width: '50vw' }"
    :closable="false"
  >
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Service Price</th>
        </tr>
      </thead>
      <tbody v-if="usingService.length > 0">
        <tr v-for="(item, index) in usingService" :key="index">
          <td>{{ item.service.serviceName }}</td>
          <td>{{ item.service.servicePrice }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <td colspan="2" class="text-center"><p>No data</p></td>
      </tbody>
    </table>
    <template #footer>
      <Button
        label="Close"
        icon="pi pi-times"
        class="p-button-danger"
        @click="closeUsingServiceDialog()"
      />
    </template>
  </Dialog>
</template>
<script>
import { HTTP } from "@/axios";
import dayjs from "dayjs";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
export default {
  data() {
    return {
      appointment: [],
      loading: false,
      displayUsingServiceDialog: false,
      usingService: [],
      keyword: null,
      filteredList: [],
      startDate: null,
      endDate: null,
    };
  },
  computed: {
    search() {
      return this.filteredList.length === 0
        ? this.appointment
        : this.filteredList;
    },
  },
  watch: {
    startDate(newVal) {
      if (this.endDate === null) {
        return;
      } else {
        this.SearchByDate();
      }
    },
    endDate(newVal) {
      if (this.startDate === null) {
        return;
      } else {
        this.SearchByDate();
      }
    },
    deep: true,
  },
  created() {
    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:80/SignalRServer")
      .configureLogging(LogLevel.Information)
      .build();
    this.connection
      .start()
      .then(() => {
        this.getAllApointment();
        this.connection.on("CreateAppointment", () => {
          this.getAllApointment();
        });
        this.connection.on("DoneMedicalExam", () => {
          this.getAllApointment();
        });
      })
      .catch((error) => console.error(error));
  },
  methods: {
    caculateAge(date) {
      return dayjs(new Date()).get("year") - dayjs(date).get("year");
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    getAllApointment() {
      this.loading = true;
      HTTP.get("Appointment/AllAppointment")
        .then((res) => {
          this.appointment = res.data;
          this.loading = false;
        })
        .catch((err) => {
          try {
            console.log(err);
            this.loading = false;
          } catch (error) {
            this.loading = false;
          }
        });
    },
    cancelAppointment(id) {
      this.$confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          HTTP.put("Appointment/CancelAppointment/" + id)
            .then((res) => {
              this.$toast.add({
                severity: "success",
                summary: "Success Message",
                detail: "Cancel Appointment Successfully",
                life: 3000,
              });
              this.getAllApointment();
            })
            .catch((err) => {
              console.log(err);
            });
        },
        reject: () => {},
      });
    },
    acceptAppointment(id) {
      this.$confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          HTTP.put("Appointment/AcceptedAppointment/" + id)
            .then((res) => {
              this.$toast.add({
                severity: "success",
                summary: "Success Message",
                detail: "Message Content",
                life: 3000,
              });
              this.getAllApointment();
            })
            .catch((err) => {
              console.log(err);
            });
        },
        reject: () => {},
      });
    },
    openUsingServiceDialog(data) {
      this.usingService = data.appointmentDetails;
      this.displayUsingServiceDialog = true;
    },
    closeUsingServiceDialog() {
      this.displayUsingServiceDialog = false;
    },
    SearchByName(name) {
      HTTP.get("Appointment/GetAppointmentByName/" + name)
        .then((res) => {
          console.log(res.data);
          this.filteredList = res.data;
        })
        .catch((err) => {
          this.filteredList = [];
          console.log(err);
        });
    },
    SearchByDate() {
      if (this.formatDate(this.endDate) < this.formatDate(this.startDate)) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "End date must be greater than start date",
          life: 3000,
        });
        return;
      }
      HTTP.get(
        "Appointment/GetAppointmentByDate/" +
          this.formatDate(this.startDate) +
          "/" +
          this.formatDate(this.endDate)
      )
        .then((res) => {
          console.log(res.data);
          this.filteredList = res.data;
        })
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "Not Found",
            detail: "Record Not Found",
            life: 3000,
          });
          this.filteredList = [];
          console.log(err);
        });
    },
    Clear() {
      this.startDate = null;
      this.endDate = null;
      this.keyword = null;
      this.filteredList = [];
      this.getAllApointment();
    },
  },
};
</script>
