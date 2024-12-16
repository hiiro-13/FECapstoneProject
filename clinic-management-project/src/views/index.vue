<!-- eslint-disable vue/multi-word-component-names -->
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
    <div class="banner">
      <img :src="require('@/assets/image/Rectangle1146.jpg')" />
      <p class="text1">The best solution</p>
      <p class="text2">for all your health needs.</p>
    </div>
    <div class="body-title container text-3xl font-medium" id="aboutUs">
      <h1 class="text-center mt-4 mb-4">Why should you choose EGO?</h1>
    </div>
    <div class="body-content">
      <div class="flex flex-wrap justify-center">
        <div class="square d-flex flex-column align-items-center m-4">
          <div class="d-flex justify-content-center align-items-center">
            <img
              src="../assets/image/Vector.png"
              height="180px"
              class="hexagon position-absolute"
            />
            <img
              src="../assets/image/Group.png"
              class="hexagon position-absolute"
            />
          </div>
          <div class="mt-auto mb-5">
            <div class="d-flex px-5 justify-content-center align-items-center">
              <p class="text-white text-center" style="font-size: 15px">
                Find and book an appointment with the doctor of your choice
              </p>
            </div>
          </div>
        </div>
        <div class="square d-flex flex-column align-items-center m-4">
          <div class="d-flex justify-content-center align-items-center">
            <img
              src="../assets/image/Vector.png"
              height="180px"
              class="hexagon position-absolute"
            />
            <img
              src="../assets/image/Plurginphone.png"
              class="hexagon position-absolute"
            />
          </div>
          <div class="mt-auto mb-5">
            <div class="d-flex px-5 justify-content-center align-items-center">
              <p class="text-white text-center" style="font-size: 15px">
                Just one simple step with no waiting time
              </p>
            </div>
          </div>
        </div>
        <div class="square d-flex flex-column align-items-center m-4">
          <div class="d-flex justify-content-center align-items-center">
            <img
              src="../assets/image/Vector.png"
              height="180px"
              class="hexagon position-absolute"
            />
            <img
              src="../assets/image/Khien.png"
              class="hexagon position-absolute"
            />
          </div>
          <div class="mt-auto mb-5">
            <div class="d-flex px-5 justify-content-center align-items-center">
              <p class="text-white text-center" style="font-size: 15px">
                Applying state regulations, quick procedures
              </p>
            </div>
          </div>
        </div>
        <div class="square d-flex flex-column align-items-center m-4">
          <div class="d-flex justify-content-center align-items-center">
            <img
              src="../assets/image/Vector.png"
              height="180px"
              class="hexagon position-absolute"
            />
            <img
              src="../assets/image/PlurginPricelist.png"
              class="hexagon position-absolute"
            />
          </div>
          <div class="mt-auto mb-5">
            <div class="d-flex px-5 justify-content-center align-items-center">
              <p class="text-white text-center" style="font-size: 15px">
                EGO Clinic lists service price list
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body-title container" id="ourDoctor">
      <h1 class="text-center mt-4 text-3xl font-medium">Our Doctor</h1>
      <h5>We want to bring you the best healthcare experience</h5>
    </div>
    <div class="flex justify-center flex-wrap p-4">
      <div class="flex flex-wrap justify-center">
        <div
          class="text-gray-400 shadow-card p-4 rounded-lg m-4"
          v-for="item in IntroduceDoctorList"
          :key="item.id"
        >
          <div class="flex">
            <div class="mr-4">
              <h1 class="text-xl font-bold text-blue-600">
                {{ item.doctor.user.fullName }}
              </h1>
              <p>{{ item.content }}</p>
              <p>
                <span
                  ><font-awesome-icon
                    :icon="['fas', 'star']"
                    class="text-yellow-400 mr-2"
                /></span>
                <span class="text-black font-bold">{{ item.rate }}</span>
              </p>
            </div>
            <div>
              <img
                :src="item.doctor.user.image"
                alt=""
                class="w-[100px] h-[100px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body-title container" id="service">
      <h1 class="text-center mt-4 text-3xl font-medium">
        The best service at EGO
      </h1>
      <h5>We want to bring you the best healthcare experience</h5>
    </div>
    <div class="flex justify-center flex-wrap">
      <div
        v-for="item in IntroduceServiceList"
        :key="item.id"
        class="flex items-center justify-around border-[1px] border-t-zinc-300 rounded-lg p-6 shadow-card w-[360px] m-4"
      >
        <div>
          <h1 class="font-medium text-2xl">{{ item.service.serviceName }}</h1>
          <ul>
            <li class="my-4">
              <font-awesome-icon
                :icon="['fass', 'circle']"
                class="text-[6px]"
              />
              {{ item.content }}
            </li>
          </ul>
        </div>
        <div>
          <font-awesome-icon :icon="['fas', 'syringe']" class="text-4xl" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "@/axios";
export default {
  data() {
    return {
      IntroduceDoctorList: [],
      IntroduceServiceList: [],
      loader: false,
    };
  },
  created() {
    this.getAllDoctorIntroduce();
    this.getAllServiceIntroduce();
  },
  methods: {
    getAllDoctorIntroduce() {
      this.loader = true;
      HTTP.get("Introduce/GetAllDoctorIntroduce")
        .then((res) => {
          this.IntroduceDoctorList = res.data;
          this.loader = false;
        })
        .catch((err) => {
          this.loader = false;
          console.log(err);
        });
    },
    getAllServiceIntroduce() {
      this.loader = true;
      HTTP.get("Introduce/GetAllServiceIntroduce")
        .then((res) => {
          this.IntroduceServiceList = res.data;
          this.loader = false;
        })
        .catch((err) => {
          this.loader = false;
          console.log(err);
        });
    },
  },
};
</script>
<style scoped src="../assets/style/home.css"></style>
