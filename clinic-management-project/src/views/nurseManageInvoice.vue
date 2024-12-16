<template>
  <div>
    <DataTable
      :value="search"
      :paginator="true"
      :rows="5"
      :rowHover="true"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      responsiveLayout="scroll"
      v-model:filters="filters"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Invoice Manage</h5>
          <div>
            <span class="p-input-icon-left me-2">
              <i class="pi pi-search" />
              <InputText
                placeholder="Keyword Search"
                v-model="name"
                @input="SearchByName(this.name)"
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
        <Column header="Total Price">
          <template #body="{ data }">
            {{ data.totalPrice ? data.totalPrice : "No data" }}
          </template>
        </Column>
        <Column header="Created Date">
          <template #body="{ data }">
            {{ this.formatDate(data.appointment.createdDate) }}
          </template>
        </Column>
        <Column header="Details">
          <template #body="{ data }">
            <Button icon="pi pi-eye" @click="OpenDetailsInvoiceDialog(data)" />
          </template>
        </Column>
        <Column field="isPaied" header="Is Paid" sortable>
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
        <Column header="Accept Paied">
          <template #body="{ data }">
            <Button
              class="p-button-success"
              icon="pi pi-check"
              @click="AcceptPaid(data)"
              :disabled="data.isPaied === true"
            />
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
import { HTTP } from "@/axios";
import dayjs from "dayjs";
export default {
  data() {
    return {
      invoiceList: [],
      displayDetailsInvoiceDialog: false,
      totalMedicinePrice: null,
      totalServicePrice: null,
      filteredList: [],
      name: null,
      startDate: null,
      endDate: null,
    };
  },
  computed: {
    search() {
      return this.filteredList.length === 0
        ? this.invoiceList
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
    this.getAllInvoice();
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    getAllInvoice() {
      this.loading = true;
      HTTP.get("Invoice/GetAllInvoice")
        .then((res) => {
          this.invoiceList = res.data;
          this.loading = false;
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
    SearchByName(name) {
      HTTP.get("Invoice/GetInvoiceByName/" + name)
        .then((res) => {
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
        "Invoice/GetInvoiceByDate/" +
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
      this.getAllInvoice();
    },
  },
};
</script>
