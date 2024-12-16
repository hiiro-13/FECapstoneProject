<template>
  <div>
    <DataTable
      :value="presciptions"
      :paginator="true"
      :rows="5"
      :rowHover="true"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      responsiveLayout="scroll"
      filterDisplay="menu"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Presciption Manage</h5>
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
        <Column field="patientName" header="Patient Name">
          <template #body="{ data }">
            {{ data.appointment.patient.user.fullName }}
          </template>
        </Column>
        <Column field="createdDate" header="Create Date" sortable>
          <template #body="{ data }">
            {{ this.formatDate(data.createdDate) }}
          </template>
        </Column>
        <Column field="details" header="Details Of Prescription">
          <template #body="{ data }">
            <Button
              icon="pi pi-eye"
              @click="OpenDetailsDialog(data.prescriptionDetails)"
            />
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    header="Presciption Details"
    v-model:visible="showDetails"
    :style="{ width: '50vw' }"
    :modal="true"
    :closable="false"
  >
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Medicine Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Using Day</th>
            <th scope="col">Times Per Day</th>
            <th scope="col">Type</th>
            <th scope="col">Session</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in prescriptionDetails" :key="index">
          <tr>
            <th scope="row">{{ ++index }}</th>
            <td>{{ item.medicine.medicineName }}</td>
            <td>{{ item.medicineAmount }}</td>
            <td>{{ item.usingDay }}</td>
            <td>{{ item.timesPerDay }}</td>
            <td>{{ item.usingType }}</td>
            <td>{{ item.session }}</td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <Button label="Close" @click="showDetails = false" />
    </template>
  </Dialog>
</template>
<script>
import { HTTP } from "@/axios";
import dayjs from "dayjs";
export default {
  data() {
    return {
      presciptions: [],
      showDetails: false,
      prescriptionDetails: [],
      loading: false,
    };
  },
  created() {
    this.getallPrescription();
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    async getallPrescription() {
      this.loading = true;
      await HTTP.get("Prescription/GetAllPrescriptions")
        .then((res) => {
          this.presciptions = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },

    OpenDetailsDialog(data) {
      this.showDetails = true;
      this.prescriptionDetails = data;
    },
  },
};
</script>
