<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <FullCalendar class="my-calendar" :options="calendarOptions" />
      </div>
    </div>
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { HTTP } from "@/axios";
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      appointments: [],
      calendarOptions: {
        plugins: [interactionPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        dateClick: this.handleDateClick,
        events: null,
      },
    };
  },
  created() {
    this.getAllApointment();
  },
  async mounted() {
    const events = await this.getAllApointment();
    this.calendarOptions.events = events;
  },
  methods: {
    handleDateClick: function (arg) {
      alert("date click! " + arg.dateStr);
    },
    async getAllApointment() {
      const res = await HTTP.get(
        "ReservedSchedules/DocId/" + localStorage.getItem("DoctorId")
      );
      return res.data.map((appointment) => ({
        title: appointment.title,
        start: appointment.start,
        end: appointment.end,
      }));
    },
  },
};
</script>
