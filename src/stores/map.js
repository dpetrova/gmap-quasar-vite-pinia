import { defineStore } from "pinia";

export const useMapStore = defineStore("map", {
  state: () => ({
    // location: {
    //   "post code": "3000",
    //   country: "Bulgaria",
    //   "country abbreviation": "BG",
    //   places: [
    //     {
    //       "place name": "\u0412\u0440\u0430\u0446\u0430 / Vraca",
    //       longitude: "23.5625",
    //       state: "\u0412\u0440\u0430\u0446\u0430 / Vraca",
    //       "state abbreviation": "VRC",
    //       latitude: "43.21",
    //     },
    //   ],
    // },
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
    async locate(postalCode) {
      try {
        this.location = await this.api.get(postalCode);
      } catch (error) {
        this.location = null;
      }
    },
  },
});
