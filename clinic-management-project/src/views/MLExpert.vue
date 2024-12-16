<template>
  <div>
    <Button
      label="Adding ML-Model"
      class="p-button-rounded p-button-success mb-3 me-2"
      @click="openCreateMLDialog()"
    />
    <Button
      label="Save Changes"
      class="p-button-rounded p-button-primary mb-3"
      @click="ChangeMLModel()"
    />
  </div>
  <div>
    <DataTable
      :value="modelList"
      :paginator="true"
      :rows="10"
      :rowHover="true"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 25, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      responsiveLayout="scroll"
      v-model:filters="filters"
      filterDisplay="menu"
      :globalFilterFields="['name']"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Machine Learning Model Mange</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              v-model="filters['name'].value"
            />
          </span>
        </div>
      </template>
      <template #empty> No project found. </template>
      <template #loading>
        <ProgressSpinner />
      </template>
      <Column field="#" header="#">
        <template #body="{ index }">
          {{ ++index }}
        </template>
      </Column>
      <Column field="name" header="Model Name">
        <template #body="{ data }"> {{ data.name }} </template>
      </Column>
      <Column field="acc" header="Model Accuracy" sortable>
        <template #body="{ data }"> {{ data.acc }}% </template>
      </Column>
      <Column field="upload_at" header="Update At" sortable>
        <template #body="{ data }">
          {{ this.formatDate(data.upload_at) }}
        </template>
      </Column>
      <Column header="Active">
        <template #body="{ data }">
          <SelectButton
            id="item"
            :value="isActive(data.id, selectedModelId)"
            :options="options"
            v-model="data.selectedActive"
            @change="InActiveButtton(data)"
          />
        </template>
      </Column>
      <Column header="Action">
        <template #body="{ data }">
          <Button
            label="Delete"
            class="p-button-raised p-button-danger me-2"
            @click="DeleteModel(data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="displayCreateMLDialog"
    modal
    header="Adding new Machine Learning Model"
    :style="{ width: '50vw' }"
    :closable="false"
  >
    <div class="form-group mb-2">
      <label for="MLModel">Machine Learning Model:</label>
      <input
        class="form-control form-control-lg"
        id="MLModel"
        type="file"
        @change="handleFileUpload"
      />
    </div>
    <div class="form-group mb-2">
      <label for="ModelName">Model Name:</label>
      <InputText
        id="ModelName"
        v-model="model.name"
        class="w-full md:w-14rem"
        placeholder="Input Model Name"
      />
    </div>
    <div class="form-group">
      <label for="ModelAccuracy">Accuracy:</label>
      <InputNumber
        id="ModelAccuracy"
        v-model="model.accuracy"
        class="w-full md:w-14rem"
        prefix="%"
        :min="0"
        :max="100"
        placeholder="Input Model Accuracy"
      />
    </div>
    <template #footer>
      <div class="d-flex justify-content-end">
        <Button
          class="me-2"
          @click="createMLModel()"
          :disabled="loading === true"
          label="Submit"
        />

        <Button
          class="p-button-danger"
          @click="CloseCreateMLDialog()"
          label="Close"
        />
      </div>
    </template>
  </Dialog>
</template>
<script>
import { HTTP, HTTP_DJANGO } from "@/axios";
import dayjs from "dayjs";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      modelList: [],
      selectedModelId: null,
      options: ["Active", "Inactive"],
      displayCreateMLDialog: false,
      model: {
        file: null,
        name: "",
        accuracy: null,
      },
      loading: false,
      change: null,
      filters: {
        name: {
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      },
    };
  },
  created() {
    this.getAllModel();
  },
  computed: {
    isActive() {
      return (id, selected) => {
        return selected === id ? this.options[0] : this.options[1];
      };
    },
  },

  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    },
    async getAllModel() {
      await HTTP_DJANGO.get("machine-learning/?format=json")
        .then((res) => {
          this.modelList = res.data;
          this.getActiveModel();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getActiveModel() {
      await HTTP_DJANGO.get("activation/?format=json")
        .then((res) => {
          this.selectedModelId = res.data[res.data.length - 1].model;
          this.modelList.forEach((model) => {
            model.selectedActive =
              model.id === this.selectedModelId ? "Active" : "Inactive";
          });
        })
        .catch(() => {
          console.log("Dont Have Model Active");
        });
    },
    openCreateMLDialog() {
      this.displayCreateMLDialog = true;
    },
    CloseCreateMLDialog() {
      this.displayCreateMLDialog = false;
    },
    createMLModel() {
      this.loading = true;
      // Create a new FormData object
      const formData = new FormData();
      // Append the model properties to the FormData object
      formData.append("File", this.model.file);
      formData.append("Name", this.model.name);
      formData.append("Acc", this.model.accuracy);
      // Send a POST request to the API endpoint with the FormData object
      HTTP.post("MLExpert/CreateMLModel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          this.clearForm();
          this.CloseCreateMLDialog();
          this.$toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: "You have create successfully",
            life: 3000,
          });
          this.getAllModel();
        })
        .catch((error) => {
          console.log(error);
        });
      this.loading = false;
    },
    handleFileUpload(event) {
      this.model.file = event.target.files[0];
    },
    clearForm() {
      this.model = {
        file: null,
        name: "",
        accuracy: null,
      };
    },
    InActiveButtton(data) {
      this.selectedModelId = data;
      for (let i = 0; i < this.modelList.length; i++) {
        if (this.modelList[i].id !== data.id) {
          this.modelList[i].selectedActive = "Inactive";
        }
      }
    },
    ChangeMLModel() {
      var model = {
        ...this.selectedModelId,
      };

      this.$confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          HTTP_DJANGO.post("activation/", { model: model.id })
            .then((res) => {
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
    DeleteModel(data) {
      this.$confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          HTTP_DJANGO.delete("machine-learning/" + data.id + "/")
            .then((res) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Delete Successfully",
                life: 3000,
              });
              this.getAllModel();
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
