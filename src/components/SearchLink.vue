<template>
  <q-form @submit.prevent="onSubmit" class="q-pa-sm">
    <q-input
      v-model="postalcode"
      :label="label"
      :rules="postalCodeBgRules()"
      lazy-rules
      class="full-width q-mb-sm"
    >
      <template v-slot:prepend>
        <q-icon :name="icon" />
      </template>
    </q-input>

    <q-btn
      label="Search"
      type="submit"
      color="primary"
      :disable="!postalcode"
      class="full-width"
    />
  </q-form>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useMapStore } from "stores/map";

defineProps({
  icon: {
    type: String,
    default: "",
  },
  action: {
    type: String,
    default: "#",
  },
  label: {
    type: String,
    default: "Search",
  },
  caption: {
    type: String,
    default: "",
  },
});

const store = useMapStore();

const postalcode = ref("");

const postalCodeBgRules = () => {
  return [(v) => /^\d{4}$/.test(v) || "Please enter a valid BG postal code"];
};

const onSubmit = () => {
  store.locate(postalcode.value);
};
</script>
