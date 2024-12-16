<template>
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
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Machine Learning Model Mange</h5>
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
      <Column field="#" header="#">
        <template #body="{ index }">
          {{ ++index }}
        </template>
      </Column>
      <Column field="modelName" header="Model Name">
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
            disabled="true"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { HTTP, HTTP_DJANGO } from "@/axios";
import dayjs from "dayjs";
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

    clearForm() {
      this.model = {
        file: null,
        name: "",
        accuracy: null,
      };
    },
  },
};
</script>
