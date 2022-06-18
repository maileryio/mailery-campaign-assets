<template>
  <span>{{ currentTime }}</span>
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
        timer: null,
        currentTime: null
      }
    },
    mounted() {
      this.startTimer();
    },
    destroyed() {
      this.stopTimer();
    },
    methods: {
      startTimer() {
        this.timer = setInterval(() => {
          console.log(this.timezone)
          this.currentTime = moment().tz(this.timezone).format(this.format)
        }, 1000)
      },
      stopTimer() {
        clearTimeout(this.timer)
      }
    }
  }
</script>
