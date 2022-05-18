<template>
  <q-page>
    <GMapMap
      v-if="store.location"
      :center="store.center"
      :zoom="10"
      map-type-id="roadmap"
      style="height: calc(100vh - 50px)"
      :options="mapOptions"
    >
      <GMapMarker
        v-for="(marker, index) in store.markers"
        :position="marker.position"
        :clickable="true"
        :draggable="false"
        :key="index"
        @click="onMarkerClick(marker.id)"
      >
        <GMapInfoWindow
          :closeclick="true"
          @closeclick="onMarkerClick(null)"
          :opened="openedMarkerId === marker.id"
        >
          <div>
            <LocationInfo
              :country="store.location?.country"
              :postalCode="store.location?.['post code']"
              :place="marker"
            />
          </div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
    <section
      v-else
      class="text-center q-pa-md flex flex-center"
      style="height: calc(100vh - 50px)"
    >
      <div>
        <div style="font-size: 5vw">Oops. No location to show...</div>
        <div style="font-size: 3vw; opacity: 0.4">
          Please enter a BG Postal Code
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useMapStore } from "stores/map";
import LocationInfo from "components/LocationInfo.vue";

const store = useMapStore();

const markers = [
  {
    position: {
      lat: 51.093048,
      lng: 6.84212,
    },
  },
  {
    position: {
      lat: 51.198429,
      lng: 6.69529,
    },
  },
  {
    position: {
      lat: 51.165218,
      lng: 7.067116,
    },
  },
  {
    position: {
      lat: 51.09256,
      lng: 6.84074,
    },
  },
];
const mapStyles = [
  {
    textColor: "black",
    url: "https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m1.png",
    height: 52,
    width: 53,
  },
  {
    textColor: "black",
    url: "https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m2.png",
    height: 55,
    width: 56,
  },
  {
    textColor: "black",
    url: "https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m3.png",
    height: 65,
    width: 66,
  },
  {
    textColor: "black",
    url: "https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m4.png",
    height: 77,
    width: 78,
  },
  {
    textColor: "black",
    url: "https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m5.png",
    height: 89,
    width: 90,
  },
];
const mapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  disableDefaultUi: false,
};
const center = ref({ lat: 51.093048, lng: 6.84212 });

const openedMarkerId = ref(null);

const onMarkerClick = (markerId) => {
  openedMarkerId.value = markerId;
};
</script>
