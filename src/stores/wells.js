import { defineStore } from 'pinia'

export const useWellsStore = defineStore('wells', {
  state: () => {
    return {
      wells: {},
    }
  },

  actions: {
    async fetch(forecastId) {
      return fetch(`/api/forecast/${forecastId}/wellObjects`).then(response => {
        return response.json();
      }).then(data => {
        this.wells[forecastId] = data.data;
      });
    },

    async getWellData(forecastId, wellId) {
      return fetch(`/api/forecast/${forecastId}/${wellId}`).then(response => {
        return response.json();
      }).then(data => {
        this.wells[forecastId].forEach(well => {
          if (well.DocumentId === wellId) {
            well.indicators = data.data.indicators;
          }
        })
      });
    }
  }
})
