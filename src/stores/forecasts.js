import { defineStore } from 'pinia'

export const useForecastsStore = defineStore('forecasts', {
  state: () => {
    return {
      forecasts: [],
    }
  },

  actions: {
    async fetch() {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/forecasts`).then(response => {
        return response.json();
      }).then(data => {
        this.forecasts = data.data;
      });
    },
    async copy(id, name) {
      let newForecast = {}
      this.forecasts.forEach(forecast => {
        if (forecast.forecastId === id) {
          newForecast = Object.assign({}, forecast);
          newForecast.label = name;
          return fetch(`${import.meta.env.VITE_BACKEND_URL}/forecasts/${id}/copy`, {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(newForecast),
          }).then(response => {
            console.log(newForecast);
            this.forecasts.push(newForecast);
          });
        }
      })
    },
    async delete(id) {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/forecasts/${id}`, {
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
    async importWells(forecastId, fileContent) {
      const formData = new FormData();
      formData.append('file', fileContent);
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/forecast/${forecastId}/uploadWellSchedule`, {
        // headers: {
        //   'Content-Type': undefined,
        // },
        method: 'POST',
        body: formData,
      }).then(response => {
        return response.json();
      });
    },
  }
})
