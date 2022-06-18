<template>
  <span>{{ time }}</span>
</template>

<script>
  import moment from 'moment-timezone';

  export default {
    name: 'ui-clock',
    props: {
      format: String,
      timezone: String
    },
    data() {
      return {
        time: null,
        timer: null
      };
    },
    mounted() {
      this.startTimer();
    },
    updated() {
      this.time = this.currentTime();
    },
    destroyed() {
      this.stopTimer();
    },
    methods: {
      startTimer() {
        this.timer = setInterval(() => {
          this.time = this.currentTime();
        }, 1000);
      },
      stopTimer() {
        clearTimeout(this.timer);
      },
      currentTime() {
        return moment().tz(this.timezone).format(this.format);
      }
    }
  }
</script>
