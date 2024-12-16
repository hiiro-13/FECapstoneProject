<template>
  <div>
    <DataTable
      :value="invoiceList"
      :paginator="true"
      :rows="10"
      :rowHover="true"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 25, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      responsiveLayout="scroll"
      v-model:filters="filters"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Invoice Manage</h5>
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
        <Column field="#" header="#">
          <template #body="{ index }">
            {{ ++index }}
          </template>
        </Column>
        <Column header="Doctor Name">
          <template #body="{ data }">
            {{ data.appointment.doctor.user.fullName }}
          </template>
        </Column>
        <Column header="Patient Name">
          <template #body="{ data }">
            {{ data.appointment.patient.user.fullName }}
          </template>
        </Column>
        <Column field="totalPrice" header="Total Price" sortable>
          <template #body="{ data }">
            {{ data.totalPrice ? data.totalPrice : "No data" }}
          </template>
        </Column>
        <Column field="appointment.createdDate" header="Created Date" sortable>
          <template #body="{ data }">
            {{ this.formatDate(data.appointment.createdDate) }}
          </template>
        </Column>
        <Column header="Details">
          <template #body="{ data }">
            <Button icon="pi pi-eye" @click="OpenDetailsInvoiceDialog(data)" />
          </template>
        </Column>
        <Column header="Is Paid">
          <template #body="{ data }">
            <span
              class="badge"
              :class="{
                'rounded-pill bg-danger': data.isPaied === false,
                'rounded-pill bg-success': data.isPaied === true,
              }"
              >{{ data.isPaied ? "Yes" : "No" }}</span
            >
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="displayDetailsInvoiceDialog"
    modal
    header="Details"
    :style="{ width: '50vw' }"
    :closable="false"
  >
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Using</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Service</td>
          <td>{{ this.totalServicePrice }}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Presciption</td>
          <td>{{ this.totalMedicinePrice }}</td>
        </tr>
      </tbody>
    </table>
    <template #footer>
      <Button
        label="Close"
        class="p-button-danger"
        icon="pi pi-times"
        @click="CloseDetailsInvoiceDialog()"
        text
      />
    </template>
  </Dialog>
</template>
<script>
import dayjs from "dayjs";
import { HTTP } from "@/axios";
export default {
  data() {
    return {
      invoiceList: [],
      displayDetailsInvoiceDialog: false,
      totalMedicinePrice: null,
      totalServicePrice: null,
    };
  },
  created() {
    this.getAllInvoice();
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    getAllInvoice() {
      HTTP.get("Invoice/GetAllInvoice")
        .then((res) => {
          this.invoiceList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    OpenDetailsInvoiceDialog(data) {
      this.totalServicePrice = data.appointment.subTotal;
      this.totalMedicinePrice = data.totalPrice - data.appointment.subTotal;
      this.displayDetailsInvoiceDialog = true;
    },
    CloseDetailsInvoiceDialog() {
      this.displayDetailsInvoiceDialog = false;
    },
    AcceptPaid(item) {
      this.$confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          HTTP.put("Invoice/AcceptInvoicePaied?idInvoice=" + item.id)
            .then((res) => {
              this.getAllInvoice();
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "You have accepted",
                life: 3000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        reject: () => {},
      });
    },
  },
};
</script>
