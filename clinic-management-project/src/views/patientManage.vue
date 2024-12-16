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
      label="Adding Patient"
      class="p-button-rounded p-button-success mb-3"
      @click="openPatientDialog()"
    />
  </div>
  <div>
    <DataTable
      :value="patients"
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
      :globalFilterFields="['user.fullName']"
    >
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="m-0">Patient Manage</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              v-model="filters['user.fullName'].value"
            />
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
        <Column field="fullName" header="Full Name">
          <template #body="{ data }"> {{ data.user.fullName }} </template>
        </Column>
        <Column field="gender" header="Gender">
          <template #body="{ data }">
            {{ data.user.gender }}
          </template>
        </Column>
        <Column field="birthday" header="Birthday">
          <template #body="{ data }">
            {{ dateToYMD(data.user.birthDay) }}
          </template>
        </Column>
        <Column field="email" header="Email">
          <template #body="{ data }">
            {{ data.user.email ? data.user.email : "No data" }}</template
          >
        </Column>
        <Column field="country" header="Country">
          <template #body="{ data }">
            {{ data.user.address ? data.user.address : "No data" }}</template
          >
        </Column>
        <Column field="phone" header="Phone Number">
          <template #body="{ data }"> {{ data.user.phoneNumber }}</template>
        </Column>
        <Column field="actions" header="Actions">
          <template #body="{ data }">
            <div class="d-flex">
              <Button
                label="Delete"
                class="p-button-raised p-button-danger me-2"
                :class="{ disable: data.user.isDelete === true }"
                @click="DeletePatient(data.id)"
              />
              <Button
                label="Restore"
                class="p-button-raised"
                :class="{ disable: data.user.isDelete === false }"
                @click="RestorePatient(data.id)"
              />
            </div>
          </template>
        </Column>
      </div>
    </DataTable>
  </div>
  <Dialog
    :header="
      selectedUser != null ? 'Edit Patient Information' : 'Adding New Patient'
    "
    v-model:visible="displayPatientDialog"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
    :closable="false"
  >
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.firstName') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-pen"></i>
        </span>
        <InputText placeholder="Firstname" v-model="user.firstName" />
      </div>
      <small style="color: red">{{
        validation.firstError("user.firstName")
      }}</small>
    </div>
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.lastName') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-pen"></i>
        </span>
        <InputText placeholder="Lastname" v-model="user.lastName" />
      </div>
      <small style="color: red">{{
        validation.firstError("user.lastName")
      }}</small>
    </div>
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.username') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-pen"></i>
        </span>
        <InputText placeholder="Account" v-model="user.username" />
      </div>
      <small style="color: red">{{
        validation.firstError("user.username")
      }}</small>
    </div>
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.password') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-pen"></i>
        </span>
        <InputText
          placeholder="Password"
          type="password"
          v-model="user.password"
        />
      </div>
      <small style="color: red">{{
        validation.firstError("user.password")
      }}</small>
    </div>
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.gender') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-transgender"></i>
        </span>
        <Dropdown
          optionLabel="name"
          optionValue="code"
          placeholder="Select Gender"
          :options="selectGender"
          option-label="name"
          :editable="true"
          v-model="user.gender"
        />
      </div>
      <small style="color: red">{{
        validation.firstError("user.gender")
      }}</small>
    </div>
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.birthDay') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-cake-candles"></i>
        </span>
        <Calendar
          dateFormat="mm-dd-yy"
          placeholder="Birthday"
          v-model="user.birthDay"
        />
      </div>
      <small style="color: red">{{
        validation.firstError("user.birthDay")
      }}</small>
    </div>
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.email') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-envelope"></i>
        </span>
        <InputText placeholder="Email" v-model="user.email" />
      </div>
      <small style="color: red">{{
        validation.firstError("user.email")
      }}</small>
    </div>
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.identityCard') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-id-card"></i>
        </span>
        <InputText placeholder="Identity Card" v-model="user.identityCard" />
      </div>
      <small style="color: red">{{
        validation.firstError("user.identityCard")
      }}</small>
    </div>
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.address') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-globe"></i>
        </span>
        <InputText placeholder="Country" v-model="user.address" />
      </div>
      <small style="color: red">{{
        validation.firstError("user.address")
      }}</small>
    </div>
    <div class="flex-column">
      <div
        class="p-inputgroup"
        :class="{ error: validation.hasError('user.phoneNumber') }"
      >
        <span class="p-inputgroup-addon">
          <i class="fa-solid fa-globe"></i>
        </span>
        <InputText
          placeholder="Phone Number"
          type="phoneNumber"
          v-model="user.phoneNumber"
        />
      </div>
      <small style="color: red">{{
        validation.firstError("user.phoneNumber")
      }}</small>
    </div>

    <template #footer>
      <Button
        label="Close"
        class="p-button-danger"
        icon="pi pi-times"
        @click="closePatientDialog()"
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
import SimpleVueValidation from "simple-vue-validator";
import { FilterMatchMode } from "primevue/api";
const Validator = SimpleVueValidation.Validator;
export default {
  data() {
    return {
      patients: [],
      displayPatientDialog: false,
      selectGender: [
        { name: "Female", code: "0" },
        { name: "Male", code: "1" },
        { name: "Undefine", code: "2" },
      ],
      user: {
        username: "",
        password: "",
        email: "",
        identityCard: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthDay: "",
        address: "",
        phoneNumber: "",
      },
      selectedUser: null,
      loader: false,
      filters: {
        "user.fullName": {
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      },
    };
  },
  validators: {
    "user.firstName": function (value) {
      return Validator.value(value)
        .required("First name is require")
        .regex("^[A-Za-z]*$", "Must only contain alphabetic characters.");
    },
    "user.lastName": function (value) {
      return Validator.value(value)
        .required("Last name is require")
        .regex("^[A-Za-z]*$", "Must only contain alphabetic characters.");
    },
    "user.username": function (value) {
      return Validator.value(value).required("User name is require");
    },
    "user.password": function (value) {
      return Validator.value(value)
        .required("Password is require")
        .minLength(6, "Greater than 6 character");
    },
    "user.gender": function (value) {
      return Validator.value(value).required("Gender is require");
    },
    "user.birthDay": function (value) {
      return Validator.value(value).required("Birth day is require");
    },
    "user.email": function (value) {
      return Validator.value(value).required("Email is require").email();
    },
    "user.identityCard": function (value) {
      return Validator.value(value)
        .required("Identity card is require")
        .length(12, "12 digit number character")
        .digit();
    },
    "user.address": function (value) {
      return Validator.value(value).required("Address is require");
    },
    "user.phoneNumber": function (value) {
      return Validator.value(value)
        .required("Phone is require")
        .regex(/^0[1-9]\d{8}$/, "Format '0-xxx-xxx-xxx'");
    },
  },
  created() {
    this.getAllPatient();
  },
  methods: {
    async getAllPatient() {
      HTTP.get("Patient/GetAllPatient")
        .then((response) => {
          this.patients = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dateToYMD(end_date) {
      var ed = new Date(end_date);
      var d = ed.getDate();
      var m = ed.getMonth() + 1;
      var y = ed.getFullYear();
      return (
        "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
      );
    },
    openPatientDialog() {
      this.displayPatientDialog = true;
    },
    async closePatientDialog() {
      this.displayPatientDialog = false;
      this.validation.reset();
      this.clearform();
    },
    async createPatient() {
      const success = await this.$validate();
      if (success === true) {
        this.loader = true;
        HTTP.post("Authentication/Register", this.user)
          .then((res) => {
            this.loader = false;
            this.$toast.add({
              severity: "success",
              summary: "Confirmed",
              detail: "New Patient has create successfully",
              life: 3000,
            });
            this.closePatientDialog();
            this.clearform();
            this.getAllPatient();
            this.validation.reset();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handleSubmit() {
      this.createPatient();
    },
    async DeletePatient(id) {
      this.$confirm.require({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: async () => {
          HTTP.put("Patient/DeletePut?id=" + id)
            .then((res) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record deleted",
                life: 3000,
              });
              this.closePatientDialog();
              this.getAllPatient();
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
    RestorePatient(id) {
      this.$confirm.require({
        message: "Do you want to restore this record?",
        header: "Restore Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-success",
        accept: async () => {
          HTTP.put("Patient/RestorePatient?id=" + id)
            .then((res) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Record has been restore",
                life: 3000,
              });
              this.getAllPatient();
            })
            .catch((err) => {
              console.log(err);
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
    clearform() {
      this.selectedUser = null;
      this.user = {
        username: null,
        password: null,
        email: null,
        identityCard: null,
        firstName: null,
        lastName: null,
        gender: null,
        birthDay: null,
        address: null,
        phoneNumber: null,
      };
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
.p-inputgroup {
  margin: 8px 0;
}
</style>
