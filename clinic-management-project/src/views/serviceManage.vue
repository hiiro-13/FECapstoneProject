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
      label="Adding Service"
      class="p-button-rounded p-button-success mb-3"
      @click="openCreateService()"
    />
  </div>
  <div>
    <DataTable
      :value="services"
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
      :globalFilterFields="['serviceName']"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Service Manage</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              v-model="filters['serviceName'].value"
            />
          </span>
        </div>
      </template>
      <template #empty> No project found. </template>
      <template #loading>
        <ProgressSpinner />
      </template>
      <div>
        <Column field="serviceName" header="Services Name">
          <template #body="{ data }">
            {{ data.serviceName }}
          </template>
        </Column>
        <Column field="servicePrice" header="Services Price" sortable>
          <template #body="{ data }">
            {{ data.servicePrice }}
          </template>
        </Column>
        <Column field="createdDate" header="Created Date" sortable>
          <template #body="{ data }">
            {{ this.formatDate(data.createdDate) }}
          </template>
        </Column>
        <Column field="actions" header="Actions">
          <template #body="{ data }">
            <Button
              label="Edit"
              class="p-button-raised p-button-warning me-2"
              @click="openEditService(data)"
            />
            <Button
              label="Delete"
              class="p-button-raised p-button-danger me-2"
              :class="{ disable: data.isDelete === true }"
              @click="deleteService(data.id)"
            />
            <Button
              label="Restore"
              class="p-button-raised me-2"
              :class="{ disable: data.isDelete === false }"
              @click="restoreService(data.id)"
            />
            <Button
              label="Hard Delete"
              class="p-button-raised p-button-help"
              @click="HarddeleteService(data.id)"
            />
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    :header="selectedService != null ? 'Edit Service' : 'Adding New Service'"
    v-model:visible="displayServiceModal"
    :closable="false"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div
      class="mb-3"
      :class="{
        error: validation.hasError('servicesModel.serviceName'),
      }"
    >
      <label class="mb-2">Service Name:</label>
      <InputText v-model="servicesModel.serviceName" style="width: 100%" />
      <small style="color: red">{{
        validation.firstError("servicesModel.serviceName")
      }}</small>
    </div>
    <div
      :class="{
        error: validation.hasError('servicesModel.servicePrice'),
      }"
    >
      <label>Price:</label>
      <InputNumber
        v-model="servicesModel.servicePrice"
        showButtons
        style="width: 100%"
        min="0"
      />
      <small style="color: red">{{
        validation.firstError("servicesModel.servicePrice")
      }}</small>
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
      services: [],
      loading: false,
      displayServiceModal: false,
      filters: {
        serviceName: {
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      },
      servicesModel: {
        id: 0,
        serviceName: "",
        servicePrice: 0,
      },
      selectedService: null,
      loader: false,
    };
  },
  created() {
    this.getAllService();
  },
  beforeUpdate() {
    if (this.selectedService != null) {
      this.servicesModel.id = this.selectedService.id;
      this.servicesModel.serviceName = this.selectedService.serviceName;
      this.servicesModel.servicePrice = this.selectedService.servicePrice;
    }
  },
  validators: {
    "servicesModel.serviceName": function (value) {
      return Validator.value(value).required("Service name is require");
    },
    "servicesModel.servicePrice": function (value) {
      return Validator.value(value).required("Price is require");
    },
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    async getAllService() {
      this.loading = true;
      HTTP.get("Services/AdminGetAllService")
        .then((response) => {
          this.services = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openCreateService() {
      this.displayServiceModal = true;
    },
    closeModal() {
      this.displayServiceModal = false;
      this.validation.reset();
      this.resetForm();
    },
    handleSubmit() {
      if (this.selectedService != null) {
        this.updateService();
      } else {
        this.createService();
      }
    },
    openEditService(data) {
      this.displayServiceModal = true;
      this.selectedService = { ...data };
    },
    resetForm() {
      this.selectedService = null;
      this.servicesModel.id = 0;
      this.servicesModel.serviceName = "";
      this.servicesModel.servicePrice = 0;
    },
    async createService() {
      const success = await this.$validate();
      if (success) {
        this.loader = true;
        HTTP.post("Services", this.servicesModel)
          .then((respone) => {
            this.loader = false;
            this.closeModal();
            this.getAllService();
            this.validation.reset();
            this.resetForm();
            this.$toast.add({
              severity: "success",
              summary: "Successfully",
              detail: "Record has been create successfully",
              life: 3000,
            });
          })
          .catch((error) => {
            console.log(error);
            this.$toast.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected",
              life: 3000,
            });
          });
      }
    },
    async updateService() {
      const success = await this.$validate();
      if (success) {
        this.loader = true;
        HTTP.put("Services/" + this.selectedService.id, this.servicesModel)
          .then((respone) => {
            this.loader = false;
            this.closeModal();
            this.getAllService();
            this.validation.reset();
            this.$toast.add({
              severity: "success",
              summary: "Confirmed",
              detail: "Record has been edit successfully",
              life: 3000,
            });
          })
          .catch((error) => {
            console.log(error);
            this.$toast.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected",
              life: 3000,
            });
          });
      }
    },
    deleteService(id) {
      this.$confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          // eslint-disable-next-line no-unused-vars
          HTTP.put("Services/DeleteService/" + id)
            .then((response) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.getAllService();
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
    HarddeleteService(id) {
      this.$confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          // eslint-disable-next-line no-unused-vars
          HTTP.delete("Services/DeleteService/" + id)
            .then((response) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.getAllService();
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
    restoreService(id) {
      this.$confirm.require({
        message: "Do you want to restore this record?",
        header: "Restore Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-success",
        accept: async () => {
          HTTP.put("Services/RestoreService/" + id)
            .then((response) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record has been restore",
                life: 3000,
              });
              this.getAllService();
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
