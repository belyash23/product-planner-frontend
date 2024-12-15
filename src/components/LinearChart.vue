<template>
  <div ref="chart">
  </div>
</template>

<script>

import Highcharts from 'highcharts';
import HC_drilldown from 'highcharts/modules/drilldown';

export default {
  props: {
    title: String,
    years: Array,
    yearsData: Array,
    monthsData: Array,
  },
  data() {
    return {
      loadData: false,
      chartOptions: {
        series: [
          {
            data: [1, 2, 3]
          }
        ]
      },
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    };
  },
  computed: {
    series() {
      const series = [];
      for (let i = 0; i < this.years.length; i++) {
        series.push({
          y: this.yearsData[i],
          drilldown: this.years[i],
          name: this.years[i],
        })
      }

      return series;
    },

    drilldownSeries() {
      const series = [];
      for (let i = 0; i < this.monthsData.length; i++) {
        series.push({
          id: this.years[i],
          data: this.monthsData[i],
          name: this.title,
        });
      }

      return series;
    },
  },
  mounted() {
    const months = this.months;
    const years = this.years;

    Highcharts.chart(this.$refs.chart, {
      chart: {
        type: 'spline',
        events: {
          drilldown: function(e) {
            this.xAxis[0].setCategories(months);
          }, drillup: function(e) {
            this.xAxis[0].setCategories(years);
          }, drillupall: function() {
            this.xAxis[0].setCategories(years);
          }
        }
      },
      title: {
        text: this.title,
        align: 'left'
      },

      xAxis: {
        categories: this.years
      },

      yAxis: {
        title: {
          text: ''
        }
      },

      legend: {
        enabled: false,
      },

      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          },
          dataLabels: {
            enabled: true
          },
        },
        line: {
          dataLabels: {
            enabled: true
          },
        }
      },

      series: [{
        name: this.title,
        data: this.series
       }],

      drilldown: {
        activeDataLabelStyle: {
          textDecoration: 'none',
          color: '#000000'
        },
        activeAxisLabelStyle: {
          textDecoration: 'none',
          color: 'inherit'
        },
        series: this.drilldownSeries,
      },

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      },
    });

  }
};
</script>
