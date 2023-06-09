<script setup>
import { usePaymentStore } from "../Payment.store";

const store = usePaymentStore();
</script>

<template>
  <v-row no-gutters="" class="text-subtitle-2 font-weight-regular">
    <v-col cols="12">
      <div>Delivery Estimation</div>
    </v-col>

    <v-col cols="12">
      <div class="text-success text-subtitle-1 font-weight-medium">
        {{ store.shipmentMethods[store.shipment].duration }}
        by
        {{ store.shipment }}
      </div>
    </v-col>
  </v-row>
</template>
