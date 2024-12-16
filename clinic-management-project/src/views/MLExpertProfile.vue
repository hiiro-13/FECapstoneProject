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
  <div class="container">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <!-- Profile editing form -->
        <div class="form">
          <div class="form-group">
            <label>
              <span> Machine learning expert Profile </span>
            </label>
            <div class="flex justify-center">
              <form enctype="multipart/form-data">
                <div
                  class="lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] border-[1px] rounded-full m-6"
                >
                  <img
                    src=""
                    class="object-cover w-full h-full rounded-full avatar"
                    alt=""
                    @click="changeAvatar()"
                    style="border: 1px solid"
                  />
                </div>
                <input type="file" id="file-input" style="display: none" />
              </form>
            </div>
            <div class="d-flex justify-content-center mb-5">
              <Button
                label="Change Password"
                class="p-button-secondary"
                @click="OpenChangePasswordDialog()"
              />
            </div>
            <div class="container">
              <div class="row">
                <div class="row col-md-12">
                  <div
                    class="col-md-6 flex-column"
                    :class="{
                      error: validation.hasError(
                        'mLExpertProfile.user.firstName'
                      ),
                    }"
                  >
                    <label>First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstname"
                      placeholder="First Name"
                      v-model="mLExpertProfile.user.firstName"
                    />
                    <small style="color: red">{{
                      validation.firstError("mLExpertProfile.user.firstName")
                    }}</small>
                  </div>
                  <div
                    class="col-md-6 flex-column"
                    :class="{
                      error: validation.hasError(
                        'mLExpertProfile.user.lastName'
                      ),
                    }"
                  >
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastname"
                      placeholder="Last Name"
                      v-model="mLExpertProfile.user.lastName"
                    />
                    <small style="color: red">{{
                      validation.firstError("mLExpertProfile.user.lastName")
                    }}</small>
                  </div>
                </div>
                <div class="col-md-12 row">
                  <div
                    class="col-md-6 flex-column"
                    :class="{
                      error: validation.hasError(
                        'mLExpertProfile.user.birthDay'
                      ),
                    }"
                  >
                    <label>Date of Birth</label>
                    <Calendar
                      class="w-100"
                      id="birthday"
                      v-model="mLExpertProfile.user.birthDay"
                      dateFormat="dd/mm/yy"
                    />
                    <small style="color: red">{{
                      validation.firstError("mLExpertProfile.user.birthDay")
                    }}</small>
                  </div>
                  <div
                    class="col-md-6 flex-column"
                    :class="{
                      error: validation.hasError('mLExpertProfile.user.gender'),
                    }"
                  >
                    <label>Gender</label>
                    <div class="flex flex-wrap gap-3 mt-3">
                      <div class="form-check">
                        <RadioButton
                          v-model="mLExpertProfile.user.gender"
                          inputId="maleGender"
                          value="Male"
                        />
                        <label class="ml-2">Male</label>
                      </div>
                      <div class="form-check">
                        <RadioButton
                          v-model="mLExpertProfile.user.gender"
                          inputId="femaleGender"
                          value="Female"
                        />
                        <label class="ml-2">Female</label>
                      </div>
                      <div class="form-check">
                        <RadioButton
                          v-model="mLExpertProfile.user.gender"
                          inputId="otherGender"
                          value="Undefined"
                        />
                        <label class="ml-2">Other</label>
                      </div>
                    </div>
                    <small style="color: red">{{
                      validation.firstError("mLExpertProfile.user.gender")
                    }}</small>
                  </div>
                </div>

                <div class="col-md-12 row">
                  <div
                    class="col-md-6 flex-column"
                    :class="{
                      error: validation.hasError('mLExpertProfile.user.email'),
                    }"
                  >
                    <label>Email Address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Email Address"
                      v-model="mLExpertProfile.user.email"
                    />
                    <small style="color: red">{{
                      validation.firstError("mLExpertProfile.user.email")
                    }}</small>
                  </div>
                  <div
                    class="col-md-6 flex-column"
                    :class="{
                      error: validation.hasError(
                        'mLExpertProfile.user.phoneNumber'
                      ),
                    }"
                  >
                    <label>Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="phonenum"
                      placeholder="Phone number"
                      v-model="mLExpertProfile.user.phoneNumber"
                    />
                    <small style="color: red">{{
                      validation.firstError("mLExpertProfile.user.phoneNumber")
                    }}</small>
                  </div>
                </div>

                <div class="col-md-12 row">
                  <div
                    class="col-md-6 flex-column"
                    :class="{
                      error: validation.hasError('mLExpertProfile.experience'),
                    }"
                  >
                    <label>Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder="Address"
                      v-model="mLExpertProfile.user.address"
                    />
                    <small style="color: red">{{
                      validation.firstError("mLExpertProfile.user.address")
                    }}</small>
                  </div>
                  <div
                    class="col-md-6 flex-column"
                    :class="{
                      error: validation.hasError(
                        'mLExpertProfile.user.identityCard'
                      ),
                    }"
                  >
                    <label>Identity Card</label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder="Address"
                      v-model="mLExpertProfile.user.identityCard"
                    />
                    <small style="color: red">{{
                      validation.firstError("mLExpertProfile.user.identityCard")
                    }}</small>
                  </div>
                </div>

                <div
                  class="col-md-12 mb-3"
                  :class="{
                    error: validation.hasError('mLExpertProfile.experience'),
                  }"
                >
                  <label>Experience</label>
                  <div class="input-group">
                    <input
                      class="form-control"
                      placeholder="Experience in ... Year"
                      v-model="mLExpertProfile.experience"
                    />
                    <span class="input-group-text">Year</span>
                  </div>
                  <small style="color: red">{{
                    validation.firstError("mLExpertProfile.experience")
                  }}</small>
                </div>

                <div class="d-flex justify-content-end">
                  <Button
                    @click="handleSubmit(this.mLExpertProfile.id)"
                    label="Save Changes"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
</template>
<style scoped>
.p-button-raised.p-button-danger {
  margin-left: 10px;
}
label {
  font-weight: bold;
}
.form {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
}
.p-dropdown.p-component.p-inputwrapper.p-inputwrapper-filled.form-control,
.p-inputtext.p-component {
  border-radius: 15px;
  height: 35px;
}

.form-control,
.p-inputtext.p-component {
  border-radius: 15px;
  height: 55px;
}

.p-image.p-component.card-top.p-image-preview-container img {
  width: 250px;
  height: 250px;
  border-radius: 500px /500px;
}

.p-image-preview-indicator {
  border-radius: 500px;
}
</style>
<script>
import { HTTP } from "@/axios";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
export default {
  data() {
    return {
      mLExpertProfile: {
        id: null,
        experience: null,
        user: {
          firstName: null,
          lastName: null,
          gender: null,
          birthDay: null,
          address: null,
          email: null,
          userName: null,
          phoneNumber: null,
          identityCard: null,
        },
      },

      selectGender: [
        { name: "Female", code: "0" },
        { name: "Male", code: "1" },
        { name: "Undefine", code: "2" },
      ],
      loader: false,
      displayChangePasswordDialog: false,
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
    };
  },
  validators: {
    "mLExpertProfile.user.firstName": function (value) {
      return Validator.value(value)
        .required("First name is require")
        .regex("^[A-Za-z]*$", "Must only contain alphabetic characters.");
    },
    "mLExpertProfile.user.lastName": function (value) {
      return Validator.value(value)
        .required("Last name is require")
        .regex("^[A-Za-z]*$", "Must only contain alphabetic characters.");
    },
    "mLExpertProfile.user.gender": function (value) {
      return Validator.value(value).required("Gender is require");
    },
    "mLExpertProfile.user.birthDay": function (value) {
      return Validator.value(value).required("Birth day is require");
    },
    "mLExpertProfile.user.email": function (value) {
      return Validator.value(value).required("Email is require").email();
    },
    "mLExpertProfile.user.identityCard": function (value) {
      return Validator.value(value)
        .required("Identity card is require")
        .length(12, "12 digit number character")
        .digit();
    },
    "mLExpertProfile.user.address": function (value) {
      return Validator.value(value).required("Address is require");
    },
    "mLExpertProfile.user.phoneNumber": function (value) {
      return Validator.value(value)
        .required("Phone is require")
        .regex(/^0[1-9]\d{8}$/, "Format '0-xxx-xxx-xxx'");
    },
    "mLExpertProfile.experience": function (value) {
      return Validator.value(value).required("Experience is require").digit();
    },
  },
  async created() {
    this.GetMLExpertById();
  },
  methods: {
    async GetMLExpertById() {
      this.loader = true;
      await HTTP.get(
        `MLExpert/GetMLExpertById?id=` + localStorage.getItem("MLExpertId")
      ).then((res) => {
        this.loader = false;
        (this.mLExpertProfile.user = { ...res.data.user }),
          (this.mLExpertProfile = { ...res.data });
        const imageSrc = this.mLExpertProfile.user.image;
        const img = document.querySelector(".avatar");
        img.setAttribute("src", imageSrc);
      });
    },
    async handleSubmit(id) {
      const success = await this.$validate();
      if (success === true) {
        this.$confirm.require({
          message: "Do you want to update your profile?",
          header: "Update User's Profile",
          icon: "fa fa-user-circle-o",
          acceptClass: "p-button-success",
          accept: async () => {
            HTTP.put(
              "MLExpert/EditMLExpert?id=" + id,
              this.mLExpertProfile
            ).then((res) => {
              this.$toast.add({
                severity: "success",
                summary: "Confirmed",
                detail: "User have Updated Profile!",
                life: 3000,
              });
            });
          },
          reject: () => {},
        });
      }
    },
    changeAvatar() {
      const userId = this.mLExpertProfile.user.id;

      var fileInput = document.getElementById("file-input");
      fileInput.click();

      // Add event listener for when file is selected
      fileInput.addEventListener("change", function () {
        // Get the selected file
        var file = fileInput.files[0];
        // Create a new FormData object and add the file to it
        const formData = new FormData();
        formData.append("file", file);
        // Send an AJAX request to upload the file
        HTTP.post("Avatar", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
          params: {
            id: userId,
          },
        }).then((res) => {
          const imageSrc = res.data;
          const img = document.querySelector(".avatar");
          img.setAttribute("src", imageSrc);
        });
      });
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
    async changePassword() {
      var data = {
        Id: localStorage.getItem("usId"),
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
        HTTP.put("Authentication/ChangePassword", data)
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
              this.showError(err.response.data);
            } catch (error) {
              this.loader = false;
              this.showError("Unhandle Exception");
            }
          });
      }
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
  },
};
</script>
