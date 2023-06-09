<script setup>
import { defineProps } from "vue";

defineProps({
  status: {
    type: Boolean,
    default: () => null,
  },
});
</script>

<template>
  <v-icon :color="status == true ? 'success' : status == false ? 'error' : ''">
    {{ status == false ? "mdi-close" : status == true ? "mdi-check" : "" }}
  </v-icon>
</template>
