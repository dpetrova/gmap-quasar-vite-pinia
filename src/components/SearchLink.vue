<template>
  <q-form @submit.prevent="onSubmit" class="q-pa-sm">
    <q-select
      v-model="country"
      :options="store.countries"
      :option-value="(item) => (item === null ? null : item.code)"
      :option-label="
        (item) => (item === null ? 'No such country' : item.country)
      "
      :rules="[(val) => val || 'Country is required.']"
      @update:model-value="onUpdate"
      label="Select a country"
      class="full-width q-mb-sm"
    />

    <q-input
      v-model="postalcode"
      :label="label"
      :rules="postalCodeRules()"
      :disable="!country"
      lazy-rules
      class="full-width q-mb-sm"
    >
      <!-- <template v-slot:prepend>
        <q-icon :name="icon" />
      </template> -->
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
import { ref } from "vue";
import { useMapStore } from "stores/map";
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";

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

const country = ref(null);
const postalcode = ref("");

const postalCodeRules = () => {
  return [
    (v) =>
      postcodeValidator(postalcode.value, country.value?.code) ||
      "Please enter a valid postal code",
  ];
};

const onUpdate = () => {
  postalcode.value = "";
};

const onSubmit = () => {
  store.locate(country.value?.code, postalcode.value);
};
</script>
