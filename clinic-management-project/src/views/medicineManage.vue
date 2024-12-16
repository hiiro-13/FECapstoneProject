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
  <div>
    <Button
      label="Adding Medicine"
      class="p-button-rounded p-button-success mb-3"
      @click="openCreateMedicine()"
    />
  </div>
  <div>
    <DataTable
      :value="medicines"
      :paginator="true"
      :rows="5"
      :rowHover="true"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      responsiveLayout="scroll"
      v-model:filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['medicineName']"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Medicine Manage</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              v-model="filters['medicineName'].value"
            />
          </span>
        </div>
      </template>
      <template #empty> No project found. </template>
      <template #loading>
        <ProgressSpinner />
      </template>
      <div>
        <Column field="medicineName" header="Medicine Name">
          <template #body="{ data }">
            {{ data.medicineName }}
          </template>
        </Column>
        <Column field="price" header="Price" sortable>
          <template #body="{ data }"> {{ data.price }} </template>
        </Column>
        <Column field="expiration" header="Expiration" sortable>
          <template #body="{ data }">
            {{ this.formatDate(data.expiration) }}
          </template>
        </Column>
        <Column field="inStock" header="Quantity in stock" sortable>
          <template #body="{ data }">
            {{ data.inStock }}
          </template>
        </Column>
        <Column field="description" header="Description">
          <template #body="{ data }">
            {{ data.description }}
          </template>
        </Column>
        <Column field="actions" header="Actions">
          <template #body="{ data }">
            <Button
              label="Edit"
              class="p-button-raised p-button-warning me-2"
              @click="openEditMedicine(data)"
            />
            <Button
              label="Delete"
              class="p-button-raised p-button-danger me-2"
              :class="{ disable: data.isDelete === true }"
              @click="deleteMedidcine(data.id)"
            />
            <Button
              label="Restore"
              class="p-button-raised me-2"
              :class="{ disable: data.isDelete !== true }"
              @click="restoreMedicine(data.id)"
            />
            <Button
              label="Hard Delete"
              class="p-button-raised p-button-help"
              @click="HarddeleteMedidcine(data.id)"
            />
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    :header="selectedMedicine != null ? 'Edit Medicine' : 'Adding New Medicine'"
    v-model:visible="displayMedicineModal"
    :closable="false"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="row justify-content-center">
      <div class="col-md-12 row">
        <div class="col-md-9 flex-column">
          <div
            class="d-flex p-inputgroup"
            :class="{
              error: validation.hasError('medicineModel.medicineName'),
            }"
          >
            <span class="p-inputgroup-addon">
              <i class="fa-sharp fa-solid fa-capsules"></i>
            </span>
            <InputText
              placeholder="Medicine Name"
              v-model="medicineModel.medicineName"
              name="medicineName"
              class="w-100"
            />
          </div>
          <small style="color: red">{{
            validation.firstError("medicineModel.medicineName")
          }}</small>
        </div>
        <div class="col-md-3">
          <div
            :class="{
              error: validation.hasError('medicineModel.expiration'),
            }"
          >
            <Calendar
              inputId="icon"
              v-model="medicineModel.expiration"
              :showIcon="true"
              placeholder="Expiration"
            />
            <small style="color: red">{{
              validation.firstError("medicineModel.expiration")
            }}</small>
          </div>
        </div>
      </div>
      <div class="col-md-12 row mt-3">
        <div class="col-md-6">
          <div class="d-flex flex-column">
            <div
              class="d-flex p-inputgroup"
              :class="{
                error: validation.hasError('medicineModel.price'),
              }"
            >
              <span class="p-inputgroup-addon">
                <i>$</i>
              </span>
              <InputNumber placeholder="Price" v-model="medicineModel.price" />
            </div>
            <small style="color: red">{{
              validation.firstError("medicineModel.price")
            }}</small>
          </div>
        </div>
        <div class="col-md-6">
          <div class="d-flex flex-column">
            <div
              class="d-flex p-inputgroup"
              :class="{
                error: validation.hasError('medicineModel.inStock'),
              }"
            >
              <span class="p-inputgroup-addon">
                <i class="fa-regular fa-hashtag"></i>
              </span>
              <InputNumber
                placeholder="Amount"
                v-model="medicineModel.inStock"
              />
            </div>
            <small style="color: red">{{
              validation.firstError("medicineModel.inStock")
            }}</small>
          </div>
        </div>
      </div>
      <div class="col-md-12 row mt-3">
        <div
          class="col-md-12"
          :class="{
            error: validation.hasError('medicineModel.description'),
          }"
        >
          <Textarea
            v-model="medicineModel.description"
            :autoResize="true"
            rows="5"
            class="form-control"
            placeholder="Description"
          />
          <small style="color: red">{{
            validation.firstError("medicineModel.description")
          }}</small>
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        label="Close"
        class="p-button-danger"
        icon="pi pi-times"
        @click="closeModal()"
      />
      <Button
        label="Submit"
        icon="pi pi-check"
        @click="handleSubmit()"
        autofocus
      />
    </template>
  </Dialog>
</template>
<script>
import { HTTP } from "@/axios";
import dayjs from "dayjs";
import { FilterMatchMode } from "primevue/api";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
export default {
  data() {
    return {
      medicines: [],
      loading: false,
      displayMedicineModal: false,
      // resultPage: {
      //   pageSize: null,
      //   pageNumber: null,
      // },
      selectedMedicine: null,
      filters: {
        medicineName: {
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      },
      medicineModel: {
        id: 0,
        medicineName: "",
        inStock: null,
        price: null,
        expiration: null,
        description: "Non-Description",
      },
      loader: false,
    };
  },
  validators: {
    "medicineModel.medicineName": function (value) {
      return Validator.value(value).required("Medicine name is require");
    },
    "medicineModel.expiration": function (value) {
      return Validator.value(value).required("Experiation is require");
    },
    "medicineModel.price": function (value) {
      return Validator.value(value)
        .required("Price is required")
        .regex(/^\d+$/, "Must accept positive number only");
    },
    "medicineModel.inStock": function (value) {
      return Validator.value(value)
        .required("Amount is required")
        .regex(/^\d+$/, "Must accept positive number only");
    },
    "medicineModel.description": function (value) {
      return Validator.value(value).required("Desciption is require");
    },
  },
  created() {
    this.getAllMedicine();
  },
  beforeUpdate() {
    if (this.selectedMedicine != null) {
      this.medicineModel.id = this.selectedMedicine.id;
      this.medicineModel.medicineName = this.selectedMedicine.medicineName;
      this.medicineModel.inStock = this.selectedMedicine.inStock;
      this.medicineModel.description = this.selectedMedicine.description;
      this.medicineModel.price = this.selectedMedicine.price;
      this.medicineModel.expiration = this.selectedMedicine.expiration;
    }
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    async getAllMedicine() {
      this.loading = true;
      HTTP.get("Medicines/AdminGetAllMedicines")
        .then((response) => {
          this.medicines = response.data;
          this.loading = false;
        })
        .catch((err) => {
          try {
            console.log(err);
            this.loading = false;
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Unhandle Exception",
              life: 3000,
            });
          } catch (error) {
            this.loading = false;
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Unhandle Exception",
              life: 3000,
            });
          }
        });
    },
    handleSubmit() {
      if (this.selectedMedicine != null) {
        this.updateMedicine();
      } else {
        this.createMedicine();
      }
    },
    async createMedicine() {
      const success = await this.$validate();
      if (success) {
        this.loader = true;
        HTTP.post("Medicines", this.medicineModel)
          .then(() => {
            this.closeModal();
            this.loader = false;
            this.showSuccess("Create Medicine Successfully");
            this.getAllMedicine();
            this.validation.reset();
          })
          .catch((err) => {
            try {
              console.log(err);
              this.loader = false;
              this.showError();
            } catch (error) {
              this.loader = false;
              this.showError();
            }
          });
      }
    },
    async updateMedicine() {
      const success = await this.$validate();
      if (success) {
        this.loader = true;
        HTTP.put("Medicines/" + this.selectedMedicine.id, this.medicineModel)
          .then((respone) => {
            this.closeModal();
            this.loader = false;
            this.getAllMedicine();
            this.showSuccess("Edit Medicine Successfully");
            this.validation.reset();
          })
          .catch((err) => {
            try {
              console.log(err);
              this.loader = false;
              this.showError();
            } catch (error) {
              this.loader = false;
              this.showError();
            }
          });
      }
    },
    openCreateMedicine() {
      this.displayMedicineModal = true;
    },
    openEditMedicine(data) {
      this.displayMedicineModal = true;
      this.selectedMedicine = { ...data };
      this.selectedMedicine.expiration = this.dateToYMD(
        this.selectedMedicine.expiration
      );
    },
    closeModal() {
      this.displayMedicineModal = false;
      this.validation.reset();
      this.resetForm();
    },
    deleteMedidcine(id) {
      this.$confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          // eslint-disable-next-line no-unused-vars
          HTTP.put("Medicines/DeleteMedicine/" + id)
            .then((response) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.getAllMedicine();
            })
            .catch((error) => {
              console.log(error);
              this.$toast.add({
                severity: "warn",
                summary: "Warn Message",
                detail: "Message Content",
                life: 3000,
              });
            });
        },
        reject: () => {},
      });
    },
    HarddeleteMedidcine(id) {
      this.$confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          // eslint-disable-next-line no-unused-vars
          HTTP.delete("Medicines/DeleteMedicine/" + id)
            .then((response) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.getAllMedicine();
            })
            .catch((error) => {
              console.log(error);
              this.$toast.add({
                severity: "warn",
                summary: "Warn Message",
                detail: "Unhandle Exception",
                life: 3000,
              });
            });
        },
        reject: () => {},
      });
    },
    restoreMedicine(id) {
      this.$confirm.require({
        message: "Do you want to restore this record?",
        header: "Restore Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-success",
        accept: async () => {
          HTTP.put("Medicines/RestoreMedicne?id=" + id)
            .then((response) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record has been restore",
                life: 3000,
              });
              this.getAllMedicine();
            })
            .catch((error) => {
              console.log(error);
              this.$toast.add({
                severity: "warn",
                summary: "Warn Message",
                detail: "Unhandle Exception",
                life: 3000,
              });
            });
        },
        reject: () => {},
      });
    },
    dateToYMD(date) {
      var ed = new Date(date);
      var d = ed.getDate();
      var m = ed.getMonth() + 1;
      var y = ed.getFullYear();
      return (
        "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
      );
    },
    resetForm() {
      this.selectedMedicine = null;
      this.medicineModel.id = 0;
      this.medicineModel.medicineName = "";
      this.medicineModel.inStock = null;
      this.medicineModel.price = null;
      this.medicineModel.expiration = null;
      this.medicineModel.description = "";
    },
    showSuccess(mess) {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: mess,
        life: 3000,
      });
    },
    showError() {
      this.$toast.add({
        severity: "error",
        summary: "Error Message",
        detail: "Message Content",
        life: 3000,
      });
    },
  },
};
</script>
<style scoped>
.disable {
  pointer-events: none;
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
