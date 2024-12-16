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
  <div class="mb-5">
    <div class="container mx-auto px-4">
      <div
        class="flex flex-col md:flex-row justify-center gap-x-24 py-8"
        style="border-top: 1px solid #eee; border-bottom: 1px solid #eee"
      >
        <div class="flex flex-col items-center space-x-4">
          <form enctype="multipart/form-data">
            <img
              src=""
              alt="avatar"
              class="w-80 h-80 rounded-full object-cover rounded-full avatar"
              @click="changeAvatar()"
              style="border: 1px solid; transition: 1s all ease"
            />
            <input type="file" id="file-input" style="display: none" />
          </form>
          <div class="flex flex-col justify-center items-center">
            <h1 class="text-xl font-bold">
              @{{ this.patientInfomation.fullName }}
            </h1>
            <Button
              label="Change Password"
              class="p-button-secondary"
              @click="OpenChangePasswordDialog()"
            />
          </div>
        </div>
        <div>
          <div class="flex space-x-8 justify-center">
            <button
              @click="EditProfileForm()"
              class="text-black"
              @mouseenter="hoverEditProfile = true"
              @mouseleave="hoverEditProfile = false"
              :class="{
                'div-hover': hoverEditProfile,
                active: displayEditProfileForm,
              }"
            >
              <font-awesome-icon :icon="['fas', 'user']" />Your Profile
            </button>
            <button
              @click="UserInvoice()"
              class="text-black"
              @mouseenter="hoverUserInvoice = true"
              @mouseleave="hoverUserInvoice = false"
              :class="{
                'div-hover': hoverUserInvoice,
                active: displayInvoiceTable,
              }"
            >
              <font-awesome-icon :icon="['fas', 'file-invoice-dollar']" /> Your
              Invoice
            </button>
            <button
              href="#"
              @click="UserPresciption()"
              class="text-black"
              @mouseenter="hoverUserPresciption = true"
              @mouseleave="hoverUserPresciption = false"
              :class="{
                'div-hover': hoverUserPresciption,
                active: displayPresciptionTable,
              }"
            >
              <font-awesome-icon
                :icon="['fas', 'prescription-bottle-medical']"
              />
              Your Presciption
            </button>
            <button
              href="#"
              @click="UserTest()"
              class="text-black"
              @mouseenter="hoverUserTest = true"
              @mouseleave="hoverUserTest = false"
              :class="{ 'div-hover': hoverUserTest, active: displayTestTable }"
            >
              <font-awesome-icon :icon="['fass', 'notes-medical']" /> Your Test
              Record
            </button>
          </div>
          <!-- Add your repositories here -->
          <div>
            <div
              class="card shadow-2-strong card-registration mt-2"
              style="border-radius: 15px"
              :hidden="displayEditProfileForm === false"
            >
              <div class="card-body p-4 p-md-5">
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div
                      class="form-outline"
                      :class="{
                        error: validation.hasError(
                          'patientInfomation.firstName'
                        ),
                      }"
                    >
                      <h6 class="mb-2 pb-1">First Name:</h6>
                      <InputText
                        type="text"
                        v-model="patientInfomation.firstName"
                        class="w-100"
                      />
                    </div>
                    <small style="color: red">{{
                      validation.firstError("patientInfomation.firstName")
                    }}</small>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div
                      class="form-outline"
                      :class="{
                        error: validation.hasError(
                          'patientInfomation.lastName'
                        ),
                      }"
                    >
                      <h6 class="mb-2 pb-1">Last Name:</h6>
                      <InputText
                        type="text"
                        v-model="patientInfomation.lastName"
                        class="w-100"
                      />
                    </div>
                    <small style="color: red">{{
                      validation.firstError("patientInfomation.lastName")
                    }}</small>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4 d-flex align-items-center">
                    <div
                      class="form-outline datepicker w-100"
                      :class="{
                        error: validation.hasError(
                          'patientInfomation.birthDay'
                        ),
                      }"
                    >
                      <h6 class="mb-2 pb-1">Birth Day:</h6>
                      <Calendar
                        id="birthdayDate"
                        v-model="patientInfomation.birthDay"
                        dateFormat="dd/mm/yy"
                        class="w-100"
                      />
                    </div>
                    <small style="color: red">{{
                      validation.firstError("patientInfomation.birthDay")
                    }}</small>
                  </div>
                  <div class="col-md-6 mb-4">
                    <h6 class="mb-2 pb-1">Gender:</h6>
                    <div class="d-flex">
                      <div
                        class="form-check form-check-inline"
                        :class="{
                          error: validation.hasError(
                            'patientInfomation.gender'
                          ),
                        }"
                      >
                        <RadioButton
                          inputId="femaleGender"
                          name="pizza"
                          v-model="patientInfomation.gender"
                          value="Female"
                        />
                        <label class="form-check-label ml-2" for="femaleGender"
                          >Female</label
                        >
                      </div>

                      <div class="form-check form-check-inline">
                        <RadioButton
                          inputId="maleGender"
                          name="pizza"
                          v-model="patientInfomation.gender"
                          value="Male"
                        />
                        <label class="form-check-label ml-2" for="maleGender"
                          >Male</label
                        >
                      </div>

                      <div class="form-check form-check-inline">
                        <RadioButton
                          inputId="otherGender"
                          name="pizza"
                          v-model="patientInfomation.gender"
                          value="Undefined"
                        />
                        <label class="form-check-label ml-2" for="otherGender"
                          >Other</label
                        >
                      </div>
                      <small style="color: red">{{
                        validation.firstError("patientInfomation.gender")
                      }}</small>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4 pb-2">
                    <div
                      class="form-outline"
                      :class="{
                        error: validation.hasError('patientInfomation.email'),
                      }"
                    >
                      <h6 class="mb-2 pb-1">Email:</h6>
                      <InputText
                        type="email"
                        v-model="patientInfomation.email"
                        class="w-100"
                      />
                    </div>
                    <small style="color: red">{{
                      validation.firstError("patientInfomation.email")
                    }}</small>
                  </div>
                  <div class="col-md-6 mb-4 pb-2">
                    <div
                      class="form-outline"
                      :class="{
                        error: validation.hasError(
                          'patientInfomation.phoneNumber'
                        ),
                      }"
                    >
                      <h6 class="mb-2 pb-1">Phone Number:</h6>
                      <InputText
                        type="tel"
                        v-model="patientInfomation.phoneNumber"
                        class="w-100"
                      />
                    </div>
                    <small style="color: red">{{
                      validation.firstError("patientInfomation.phoneNumber")
                    }}</small>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4 pb-2">
                    <div
                      class="form-outline"
                      :class="{
                        error: validation.hasError('patientInfomation.address'),
                      }"
                    >
                      <h6 class="mb-2 pb-1">Address:</h6>
                      <InputText
                        type="email"
                        v-model="patientInfomation.address"
                        class="w-100"
                      />
                    </div>
                    <small style="color: red">{{
                      validation.firstError("patientInfomation.address")
                    }}</small>
                  </div>
                  <div class="col-md-6 mb-4 pb-2">
                    <div
                      class="form-outline"
                      :class="{
                        error: validation.hasError(
                          'patientInfomation.identityCard'
                        ),
                      }"
                    >
                      <h6 class="mb-2 pb-1">Identity Card:</h6>
                      <InputText
                        type="tel"
                        v-model="patientInfomation.identityCard"
                        class="w-100"
                      />
                    </div>
                    <small style="color: red">{{
                      validation.firstError("patientInfomation.identityCard")
                    }}</small>
                  </div>
                </div>

                <div class="mt-4 pt-2 d-flex justify-content-end">
                  <Button @click="EditInfomation()" label="Save Changes" />
                </div>
              </div>
            </div>

            <div
              class="card shadow-2-strong card-registration mt-2"
              style="border-radius: 15px"
              :hidden="displayInvoiceTable === false"
            >
              <div class="card-body p-4 p-md-5">
                <DataTable :value="userInvoiceList" paginator :rows="5">
                  <Column header="#">
                    <template #body="{ index }">
                      {{ ++index }}
                    </template>
                  </Column>
                  <Column header="Doctor Name">
                    <template #body="{ data }">
                      {{ data.appointment.doctor.user.fullName }}
                    </template>
                  </Column>
                  <Column header="Total Price">
                    <template #body="{ data }">
                      {{ data.totalPrice }}
                    </template>
                  </Column>
                  <Column header="Created Date">
                    <template #body="{ data }">
                      {{ this.formatDate(data.appointment.createdDate) }}
                    </template>
                  </Column>
                  <Column header="Paid Status">
                    <template #body="{ data }">
                      {{ data.isPaied }}
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>

            <div
              class="card shadow-2-strong card-registration mt-2"
              style="border-radius: 15px"
              :hidden="displayPresciptionTable === false"
            >
              <div class="card-body p-4 p-md-5">
                <DataTable :value="userPresciptionList" paginator :rows="5">
                  <Column header="#">
                    <template #body="{ index }">
                      {{ ++index }}
                    </template>
                  </Column>
                  <Column header="Doctor Name">
                    <template #body="{ data }">
                      {{ data.appointment.doctor.user.fullName }}
                    </template>
                  </Column>
                  <Column header="Created Date">
                    <template #body="{ data }">
                      {{ this.formatDate(data.createdDate) }}
                    </template>
                  </Column>
                  <Column header="Re-Examination Day">
                    <template #body="{ data }">
                      {{ data.reExaminationDay }}
                    </template>
                  </Column>
                  <Column header="Medicine list ">
                    <template #body="{ data }">
                      <Button
                        icon="pi pi-eye"
                        iconPos="right"
                        @click="OpenPrescriptionDialog(data)"
                      />
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>

            <div
              class="card shadow-2-strong card-registration mt-2"
              style="border-radius: 15px"
              :hidden="displayTestTable === false"
            >
              <div class="card-body p-4 p-md-5">
                <DataTable :value="userTestRecordList" paginator :rows="3">
                  <Column header="#">
                    <template #body="{ index }">
                      {{ ++index }}
                    </template>
                  </Column>
                  <Column header="MRI Technician Name">
                    <template #body="{ data }">
                      {{ data.mriTechnician.user.fullName }}
                    </template>
                  </Column>
                  <Column header="Test Result" style="width: 70%">
                    <template #body="{ data }">
                      <div class="mb-2 d-flex flex-column">
                        <span><b> Mild Demented:</b></span>
                        <ProgressBar
                          :value="data.testResult.mild_Demented"
                        ></ProgressBar>
                      </div>
                      <div class="mb-2 d-flex flex-column">
                        <span><b>Normal:</b></span>
                        <ProgressBar
                          :value="data.testResult.normal"
                        ></ProgressBar>
                      </div>
                      <div class="mb-2 d-flex flex-column">
                        <span><b>Very mild Demented:</b></span>
                        <ProgressBar
                          :value="data.testResult.very_Mild_Demented"
                        ></ProgressBar>
                      </div>
                    </template>
                  </Column>
                  <Column header="Created Date">
                    <template #body="{ data }">
                      {{ this.formatDate(data.createdDate) }}
                    </template>
                  </Column>
                  <Column header="Test Image">
                    <template #body="{ data }">
                      <Button
                        icon="pi pi-eye"
                        iconPos="right"
                        @click="OpenTestImageDialog(data)"
                      />
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="displayPrescriptionDialog"
    modal
    header="List Medicine"
    :style="{ width: '50vw' }"
    :closable="false"
  >
    <DataTable :value="medicineList">
      <Column field="medicine.medicineName" header="Medincine Name"></Column>
      <Column field="medicineAmount" header="Medicine Amount"></Column>
      <Column field="usingDay" header="Using Day"></Column>
      <Column field="usingType" header="Using Type"></Column>
      <Column field="session" header="Session"></Column>
      <Column field="description" header="Description"></Column>
    </DataTable>
    <template #footer>
      <Button
        label="Close"
        class="p-button-danger"
        icon="pi pi-times"
        @click="ClosePrescriptionDialog()"
        text
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="displayChangePasswordDialog"
    modal
    header="Change Password"
    :style="{ width: '50vw' }"
    :closable="false"
  >
    <div class="d-flex">
      <div class="w-100">
        <div
          class="d-flex flex-column mb-2"
          :class="{
            error: validation.hasError('currentPassword'),
          }"
        >
          <span><b>Current Password:</b></span>
          <InputText
            v-model="currentPassword"
            type="Password"
            placeholder="Current Password"
          />
          <small style="color: red">{{
            validation.firstError("currentPassword")
          }}</small>
        </div>
        <div
          class="d-flex flex-column mb-2"
          :class="{
            error: validation.hasError('newPassword'),
          }"
        >
          <span><b>New Password:</b></span>
          <InputText
            v-model="newPassword"
            type="Password"
            placeholder="New Password"
          />
          <small style="color: red">{{
            validation.firstError("newPassword")
          }}</small>
        </div>
        <div
          class="d-flex flex-column"
          :class="{
            error: validation.hasError('confirmPassword'),
          }"
        >
          <span><b>Confirm Password:</b></span>
          <InputText
            v-model="confirmPassword"
            type="Password"
            placeholder="Confirm New Password"
          />
          <small style="color: red">{{
            validation.firstError("confirmPassword")
          }}</small>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Close"
        class="p-button-danger"
        icon="pi pi-times"
        @click="CloseChangePasswordDialog()"
      />
      <Button
        label="Submit"
        icon="pi pi-check"
        @click="changePassword()"
        autofocus
      />
    </template>
  </Dialog>

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
import { HTTP } from "@/axios";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
import dayjs from "dayjs";
export default {
  data() {
    return {
      patientInfomation: {
        firstName: null,
        lastName: null,
        address: null,
        birthDay: null,
        email: null,
        gender: null,
        phoneNumber: null,
        identityCard: null,
      },
      displayEditProfileForm: true,
      displayInvoiceTable: false,
      displayPresciptionTable: false,
      displayTestTable: false,
      userInvoiceList: [],
      userPresciptionList: [],
      userTestRecordList: [],
      displayPrescriptionDialog: false,
      medicineList: [],
      displayChangePasswordDialog: false,
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
      displayTestImageDialog: false,
      testImage: null,
      loader: false,
      hoverEditProfile: false,
      hoverUserTest: false,
      hoverUserPresciption: false,
      hoverUserInvoice: false,
    };
  },
  validators: {
    "patientInfomation.firstName": function (value) {
      return Validator.value(value)
        .required("First name is require")
        .regex("^[A-Za-z]*$", "Must only contain alphabetic characters.");
    },
    "patientInfomation.lastName": function (value) {
      return Validator.value(value)
        .required("Last name is require")
        .regex("^[A-Za-z]*$", "Must only contain alphabetic characters.");
    },
    "patientInfomation.gender": function (value) {
      return Validator.value(value).required("Gender is require");
    },
    "patientInfomation.birthDay": function (value) {
      return Validator.value(value).required("Birth day is require");
    },
    "patientInfomation.email": function (value) {
      return Validator.value(value).required("Email is require").email();
    },
    "patientInfomation.identityCard": function (value) {
      return Validator.value(value)
        .required("Identity card is require")
        .length(12, "12 digit number character")
        .digit();
    },
    "patientInfomation.address": function (value) {
      return Validator.value(value).required("Address is require");
    },
    "patientInfomation.phoneNumber": function (value) {
      return Validator.value(value)
        .required("Phone is require")
        .regex(/^0[1-9]\d{8}$/, "Format '0-xxx-xxx-xxx'");
    },
    // currentPassword: function (value) {
    //   return Validator.value(value).required("Password is require");
    // },
    // newPassword: function (value) {
    //   return Validator.value(value)
    //     .required("Password is require")
    //     .minLength(6, "Greater than 6 character");
    // },
    // "confirmPassword,newPassword": function (confirmPassword, newPassword) {
    //   return Validator.value(confirmPassword).required().match(newPassword);
    // },
  },
  created() {
    this.getPatientInfomation();
    this.EditProfileForm();
    this.getInvoiceOfUser();
    this.getPresciptionOfUser();
    this.getTestRecordOfUser();
  },
  beforeUpdate() {},
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
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
    getPatientInfomation() {
      HTTP.get("Patient/GetPatientById?id=" + localStorage.getItem("PatientId"))
        .then((res) => {
          this.patientInfomation = { ...res.data.user };
          this.patientInfomation.birthDay = this.dateToYMD(
            this.patientInfomation.birthDay
          );
          const imageSrc = this.patientInfomation.image;
          const img = document.querySelector(".avatar");
          img.setAttribute("src", imageSrc);
        })
        .catch((err) => {
          try {
            this.loader = false;
            this.showError(err);
          } catch (error) {
            this.loader = false;
            this.showError("Unhandle Exception");
          }
        });
    },
    async EditInfomation() {
      const success = await this.$validate();
      if (success === true) {
        HTTP.put(
          "Patient/EditPatientInfomation/" + localStorage.getItem("PatientId"),
          this.patientInfomation
        )
          .then((res) => {
            this.showSuccess(res.data);
            this.validation.reset();
          })
          .catch((err) => {
            console.log(err);
            this.showError(err.response.data);
          });
      }
    },
    EditProfileForm() {
      this.getPatientInfomation();
      this.displayEditProfileForm = true;
      this.displayInvoiceTable = false;
      this.displayPresciptionTable = false;
      this.displayTestTable = false;
    },
    UserInvoice() {
      this.displayInvoiceTable = true;
      this.displayEditProfileForm = false;
      this.displayPresciptionTable = false;
      this.displayTestTable = false;
    },
    UserPresciption() {
      this.displayPresciptionTable = true;
      this.displayInvoiceTable = false;
      this.displayEditProfileForm = false;
      this.displayTestTable = false;
    },
    UserTest() {
      this.displayTestTable = true;
      this.displayPresciptionTable = false;
      this.displayInvoiceTable = false;
      this.displayEditProfileForm = false;
    },
    OpenPrescriptionDialog(item) {
      this.medicineList = item.prescriptionDetails;
      this.displayPrescriptionDialog = true;
    },
    ClosePrescriptionDialog() {
      this.displayPrescriptionDialog = false;
    },
    OpenChangePasswordDialog() {
      this.displayChangePasswordDialog = true;
    },
    CloseChangePasswordDialog() {
      this.displayChangePasswordDialog = false;
      this.currentPassword = null;
      this.newPassword = null;
      this.confirmPassword = null;
      this.validation.reset();
    },
    showSuccess(mess) {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: mess,
        life: 3000,
      });
    },
    showError(mess) {
      this.$toast.add({
        severity: "error",
        summary: "Error Message",
        detail: mess,
        life: 3000,
      });
    },
    getInvoiceOfUser() {
      this.loader = true;
      HTTP.get(
        "Invoice/GetInvoiceByPatientID?patientID=" +
          localStorage.getItem("PatientId")
      )
        .then((res) => {
          this.userInvoiceList = res.data;
          this.loader = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPresciptionOfUser() {
      this.loader = true;
      HTTP.get(
        "Prescription/GetAllPrescriptionsByPatientId/" +
          localStorage.getItem("PatientId")
      )
        .then((res) => {
          this.loader = false;
          this.userPresciptionList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTestRecordOfUser() {
      this.loader = true;
      HTTP.get(
        "Test/GetAllTestByPatientId?patientId=" +
          localStorage.getItem("PatientId")
      )
        .then((res) => {
          this.loader = false;
          this.userTestRecordList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async changePassword() {
      var data = {
        PatientId: localStorage.getItem("PatientId"),
        CurrentPassword: this.currentPassword,
        NewPassword: this.newPassword,
      };
      if (this.newPassword != this.confirmPassword) {
        this.showError("Confirm password doesn't match with new password");
        return;
      }
      const success = await this.$validate();
      if (success === true) {
        this.loader = true;
        HTTP.put("Authentication/ChangePasswordPatient", data)
          .then((res) => {
            this.loader = false;
            this.showSuccess("Change Password Successfully");
            this.CloseChangePasswordDialog();
            this.currentPassword = null;
            this.newPassword = null;
            this.confirmPassword = null;
          })
          .catch((err) => {
            try {
              this.loader = false;
              this.showError(err.response.data[0]);
            } catch (error) {
              this.loader = false;
              this.showError("Unhandle Exception");
            }
          });
      }
    },
    OpenTestImageDialog(item) {
      this.displayTestImageDialog = true;
      this.testImage = item.mriImage;
    },
    CloseTestImageDialog() {
      this.displayTestImageDialog = false;
    },
    changeAvatar() {
      const userId = localStorage.getItem("usId");
      var fileInput = document.getElementById("file-input");
      fileInput.click();
      this.loader = true;
      fileInput.addEventListener("change", function () {
        var file = fileInput.files[0];
        const formData = new FormData();
        formData.append("file", file);
        console.log(userId);
        console.log(file);

        HTTP.post("Avatar", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
          params: {
            id: userId,
          },
        }).then((res) => {
          console.log(res);
          const imageSrc = res.data;
          const img = document.querySelector(".avatar");
          img.setAttribute("src", imageSrc);
        });
      });
      this.loader = false;
    },
  },
};
</script>
<style scoped>
.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: 0.75em;
  padding-right: 0.75em;
}
.card-registration .select-arrow {
  top: 13px;
}
.div-hover {
  color: #840e07;
  border-bottom: 2px solid black;
}
.active {
  color: #840e07;
  border-bottom: 2px solid black;
}
</style>
