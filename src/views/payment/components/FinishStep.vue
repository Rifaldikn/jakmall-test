<script setup>
import { usePaymentStore } from "../Payment.store";

import CardTitle from "@/components/CardTitle.vue";

const store = usePaymentStore();
</script>

<template>
  <v-row class="align-center justify-center fill-height justify-center">
    <v-col cols="6">
      <CardTitle title="Thak you" class="mb-5" />
      <div class="font-weight-regular text-black">
        Order Id: {{ store.orderId }}
      </div>
      <div class="text-subtitle-2 font-weight-regular text-grey">
        Your order will be delivered today with {{ store.shipment }}
      </div>

      <v-btn
        variant="plain"
        color="grey"
        class="text-capitalize font-weight-medium my-5 pa-0"
        prepend-icon="mdi-arrow-left"
        :ripple="false"
        >Go to homepage</v-btn
      >
    </v-col>
  </v-row>
</template>
