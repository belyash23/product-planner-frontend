import { defineStore } from 'pinia'

export const useWellsStore = defineStore('wells', {
  state: () => {
    return {
      wells: {},
    }
  },

  actions: {
    async fetch(forecastId) {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/forecast/${forecastId}/wellObjects`).then(response => {
        return response.json();
      }).then(data => {
        this.wells[forecastId] = data.data;
      });
    },

    async getWellData(forecastId, wellId) {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/forecast/${forecastId}/${wellId}`).then(response => {
        return response.json();
      }).then(data => {
        this.wells[forecastId].forEach(well => {
          if (well.DocumentId === wellId) {
            well.data = data.data;
          }
        })
      });
    },

    async saveAttributes(forecastId, wellId, newData) {
      newData = JSON.parse(JSON.stringify(newData));
      newData.forEach(attribute => {
        if (attribute.type === 'Number') {
          attribute.value = attribute.value.toString();
        }
        delete attribute.type;
      })

      return fetch(`${import.meta.env.VITE_BACKEND_URL}/forecast/${forecastId}/${wellId}/editAttributes`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(newData),
      }).then(response => {
        return response.json()
      });
    },
  }
})
