import { defineStore } from 'pinia'

export const useForecastsStore = defineStore('forecasts', {
  state: () => {
    return {
      forecasts: [],
    }
  },

  actions: {
    async fetch() {
      return fetch(`/api/forecasts`).then(response => {
        return response.json();
      }).then(data => {
        this.forecasts = data.data;
      });
    },
    async copy(id) {

    },
    async delete(id) {
      return fetch(`/api/forecasts/${id}`, {
        method: 'DELETE',
      }).then(response => {
        return response.json();
      }).then(data => {
        if (data.status === 'OK') {
          this.forecasts.forEach((forecast, index, forecasts) => {
            if (forecast.forecastId === id) {
              forecasts.splice(index, 1);
            }
          });
        }

        return data;
      })
    },
  }
})
