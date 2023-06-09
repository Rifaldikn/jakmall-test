<script setup>
import { usePaymentStore } from "../Payment.store";
const store = usePaymentStore();
</script>

<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h5 text-primary font-weight-bold mb-3">Summary</div>

      <div class="text-subtitle-2 font-weight-regular text-grey">
        {{ store.productCount }} items purchased
      </div>
    </v-col>
  </v-row>
</template>
