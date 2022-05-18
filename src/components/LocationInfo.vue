<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6">{{ country }}</div>
      <div class="text-subtitle2">{{ place?.["place name"] }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <q-item-label caption>{{ `postal code: ${postalCode}` }}</q-item-label>
      <q-item-label caption>{{ `lat: ${place?.latitude}` }}</q-item-label>
      <q-item-label caption>{{ `lng: ${place?.longitude}` }}</q-item-label>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "Bulgaria",
  },
  place: {
    type: Object,
    required: true,
  },
});
</script>
