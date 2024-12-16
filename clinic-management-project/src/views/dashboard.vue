<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card w-100">
          <div
            class="py-3"
            style="background: linear-gradient(#e66465, #9198e5)"
          >
            <font-awesome-icon
              class="card-img-top"
              :icon="['fas', 'chalkboard-user']"
              style="font-size: 150px; color: #c7edde"
            />
          </div>
          <div class="card-body">
            <h5
              class="card-title text-center"
              style="font-size: 15px; font-weight: 600"
            >
              Number of unprocessed appointments
            </h5>
            <div
              class="card-text mt-1 mb-1 text-center"
              style="font-size: 50px"
            >
              {{ this.countStatic.numberUnprocessedAppointments }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card w-100">
          <div
            class="py-3"
            style="
              background: linear-gradient(rgb(140 220 90), rgb(182 192 121));
            "
          >
            <font-awesome-icon
              class="card-img-top"
              :icon="['fas', 'user-doctor']"
              style="font-size: 150px; color: #c7edde"
            />
          </div>
          <div class="card-body">
            <h5
              class="card-title text-center"
              style="font-size: 15px; font-weight: 600"
            >
              Quantity of doctors
            </h5>
            <div
              class="card-text mt-1 mb-1 text-center"
              style="font-size: 50px"
            >
              {{ countStatic.numberDoctors }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card w-100">
          <div
            class="py-3"
            style="
              background: linear-gradient(rgb(49 147 192), rgb(145, 152, 229));
            "
          >
            <font-awesome-icon
              class="card-img-top"
              :icon="['fas', 'user-nurse']"
              style="font-size: 150px; color: #c7edde"
            />
          </div>
          <div class="card-body">
            <h5
              class="card-title text-center"
              style="font-size: 15px; font-weight: 600"
            >
              Number of nurses
            </h5>
            <div
              class="card-text mt-1 mb-1 text-center"
              style="font-size: 50px"
            >
              {{ countStatic.numberNurses }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-3 container">
    <div class="card w-100" style="padding: 30px">
      <div class="card-title" style="font-size: 20px; font-weight: 600">
        <div class="mb-2">Statistics of the total revenue in a month</div>
      </div>
      <div class="card-body">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
  <div class="mt-3 container">
    <div class="card w-100" style="padding: 30px">
      <div class="card-title" style="font-size: 20px; font-weight: 600">
        <div class="mb-2">Statistics of the number of patients in a month</div>
      </div>
      <div class="card-body">
        <Chart
          type="bar"
          :data="chartDataPatients"
          :options="chartOptionsPatients"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/axios";

export default {
  name: "BarChart",
  data() {
    return {
      chartData: null,
      chartOptions: null,
      countStatic: {},
      dataRevenue: {},
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      chartDataPatients: null,
      chartOptionsPatients: null,
    };
  },
  async created() {
    await this.handlerCountData();
    await this.handlerGetDataRevenue();
    await this.handlerGetDataPatients();
  },
  methods: {
    handlerCountData() {
      HTTP.get("statis/CountUnprocessedAppointmentsDoctorNurses").then(
        (res) => {
          this.countStatic = res.data;
          console.log(this.countStatic);
        }
      );
    },
    async handlerGetDataRevenue() {
      HTTP.get("statis/StatisticsRevenuePatientsInMonth").then((res) => {
        const months = res.data.map((el) => this.monthNames[el.month - 1]);
        const newData = res.data.map((el) => el.totalPrice);
        const data = { mounth: months, data: newData };
        this.chartOptions = this.HandlerChartOptions();
        this.chartData = this.handlerChartData(
          data,
          "Statistics of the total revenue in a month"
        );
      });
    },
    async handlerGetDataPatients() {
      HTTP.get("statis/StatisticsNumberPatientsInMonth").then((res) => {
        const months = res.data.map((el) => this.monthNames[el.month - 1]);
        const newData = res.data.map((el) => el.countQueue);
        const data = { mounth: months, data: newData };
        this.chartOptionsPatients = this.HandlerChartOptions();
        this.chartDataPatients = this.handlerChartData(
          data,
          "Statistics of the number of patients in a month"
        );
      });
    },
    handlerChartData(data, label) {
      return {
        labels: data.mounth,
        datasets: [
          {
            label: label,
            data: data.data,
            backgroundColor: [
              "rgba(255, 159, 64, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgb(255, 159, 64)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    HandlerChartOptions() {
      return {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    },
  },
};
</script>
