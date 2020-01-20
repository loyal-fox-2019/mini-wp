import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  name: 'AnalyticsChart',
  props: ['chartdata', 'options'],
  mounted () {
    if (this.$data._chart) {
      this.$data._chart.destroy();
    }
    this.renderChart(this.chartdata, this.options)
  }
}