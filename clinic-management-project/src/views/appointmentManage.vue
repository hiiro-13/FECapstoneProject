<template>
  <DataTable
    :value="appointment"
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
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText placeholder="Keyword Search" />
        </span>
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
      <Column header="Patient name">
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
      <Column header="Patient Email">
        <template #body="{ data }">
          {{ data.patient.user.email ? data.patient.user.email : "No data" }}
        </template>
      </Column>
      <Column field="appointmentDate" header="Appointment Date" sortable>
        <template #body="{ data }">
          {{ this.formatDate(data.appointmentDate) }}
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
        autofocus
      />
    </template>
  </Dialog>
</template>
<script>
import { HTTP } from "@/axios";
import dayjs from "dayjs";
export default {
  data() {
    return {
      appointment: [],
      loading: false,
      displayUsingServiceDialog: false,
      usingService: [],
    };
  },
  created() {
    this.getAllApointment();
  },
  methods: {
    caculateAge(date) {
      return dayjs(new Date()).get("year") - dayjs(date).get("year");
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm");
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
    openUsingServiceDialog(data) {
      this.usingService = data.appointmentDetails;
      this.displayUsingServiceDialog = true;
    },
    closeUsingServiceDialog() {
      this.displayUsingServiceDialog = false;
    },
  },
};
</script>
