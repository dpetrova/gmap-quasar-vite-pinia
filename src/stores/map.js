import { defineStore } from "pinia";
import countries from "./countries.json";

export const useMapStore = defineStore("map", {
  state: () => ({
    countries,
    location: null,
  }),
  getters: {
    center: (state) => {
      return {
        lat: +state.location?.places?.[0]?.latitude,
        lng: +state.location?.places?.[0]?.longitude,
      };
    },
    markers: (state) => {
      const places = state.location?.places;
      return places?.map((item, index) => {
        return {
          ...item,
          id: index,
          position: {
            lat: +item.latitude,
            lng: +item.longitude,
          },
        };
      });
    },
  },
  actions: {
    async locate(countryCode, postalCode) {
      try {
        this.location = await this.api.get(`${countryCode}/${postalCode}`);
      } catch (error) {
        this.location = null;
      }
    },
  },
});
