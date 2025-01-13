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
        if (!this.wells[forecastId]) {
          this.wells[forecastId] = [];
        }
        this.wells[forecastId].splice(0, this.wells[forecastId].length, ...data.data);
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

    async calc(forecastId, wellsIds) {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/forecast/${forecastId}/calc`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          documentsIds: wellsIds,
        }),
      }).then(response => {
        return response.json();
      });
    },

    async remove(forecastId, wellsIds) {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/forecast/${forecastId}/remove`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          documentsIds: wellsIds,
        }),
      }).then(response => {
        return response.json();
      });
    },

    async getSchedule(forecastId, wellsIds) {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/export/wellSchedule`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          forecastId: forecastId,
          documentsIds: wellsIds,
        }),
      }).then(response => {
        return response.blob();
      });
    }
  }
})
