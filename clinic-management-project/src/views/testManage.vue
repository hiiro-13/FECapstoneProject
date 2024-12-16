<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <DataTable
      :value="testList"
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
          <h5 class="m-0">Test Manage</h5>
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
          <template #body="{ index }"> {{ ++index }} </template>
        </Column>
      </div>
      <div>
        <Column header="Patient Full Name">
          <template #body="{ data }">
            {{ data.scanningMRIQueue.patient.user.fullName }}
          </template>
        </Column>
      </div>
      <div>
        <Column header="Doctor Full Name">
          <template #body="{ data }">
            {{ data.scanningMRIQueue.doctor.user.fullName }}
          </template>
        </Column>
      </div>
      <div>
        <Column header="Techinician Full Name">
          <template #body="{ data }">
            {{ data.mriTechnician.user.fullName }}
          </template>
        </Column>
      </div>
      <div>
        <Column field="createdDate" header="Created Date" sortable>
          <template #body="{ data }">
            {{ this.formatDate(data.createdDate) }}
          </template>
        </Column>
      </div>
      <div>
        <Column header="Test Result" style="width: 25%">
          <template #body="{ data }">
            <div class="mb-2 d-flex flex-column">
              <span><b> Mild Demented:</b></span>
              <ProgressBar :value="data.testResult.mild_Demented"></ProgressBar>
            </div>
            <div class="mb-2 d-flex flex-column">
              <span><b>Normal:</b></span>
              <ProgressBar :value="data.testResult.normal"></ProgressBar>
            </div>
            <div class="mb-2 d-flex flex-column">
              <span><b>Very mild Demented:</b></span>
              <ProgressBar
                :value="data.testResult.very_Mild_Demented"
              ></ProgressBar>
            </div>
          </template>
        </Column>
      </div>
      <div>
        <Column header="Test Details">
          <template #body="{ data }">
            <Button
              class="p-button-primary"
              icon="pi pi-eye"
              @click="OpenTestImageDialog(data)"
            />
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="displayTestImageDialog"
    modal
    header="Test Image Result"
    :style="{ width: '50vw' }"
    :closable="false"
  >
    <div class="d-flex justify-content-center align-items-center">
      <img :src="testImage" class="w-50" />
    </div>
    <template #footer>
      <Button
        label="Close"
        class="p-button-danger"
        icon="pi pi-times"
        @click="CloseTestImageDialog()"
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
      testList: [],
      displayTestImageDialog: false,
      testImage: null,
    };
  },
  created() {
    this.getAllTest();
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    getAllTest() {
      HTTP.get("Test/GetAllTest")
        .then((res) => {
          this.testList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    OpenTestImageDialog(item) {
      this.displayTestImageDialog = true;
      this.testImage = item.mriImage;
    },
    CloseTestImageDialog() {
      this.displayTestImageDialog = false;
    },
  },
};
</script>
