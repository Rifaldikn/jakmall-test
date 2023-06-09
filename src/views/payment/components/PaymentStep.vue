<script setup>
import { usePaymentStore } from "../Payment.store";
import { toCurrency } from "@/helpers/filters";

import CardTitle from "@/components/CardTitle.vue";
import SelectionCard from "@/components/SelectionCard.vue";

const store = usePaymentStore();
</script>
<template>
  <v-row>
    <v-col cols="12">
      <CardTitle title="Shipment" />
    </v-col>
    <v-col
      cols="auto"
      v-for="(shipment, key) in store.shipmentMethods"
      :key="key"
    >
      <SelectionCard
        :is-active="store.shipment == key"
        @click="store.shipment = key"
      >
        <div class="text-caption font-weight-bold">
          {{ key }}
        </div>
        <div class="text-subtitle-1 font-weight-bold">
          {{
            toCurrency({
              value: shipment.price,
              locales: "en-US",
              style: "decimal",
            })
          }}
        </div>
      </SelectionCard>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <CardTitle title="Payment" />
    </v-col>
    <v-col cols="auto" v-for="payment in store.paymentMethods" :key="payment">
      <SelectionCard
        height="100%"
        :is-active="store.payment == payment"
        @click="store.payment = payment"
      >
        <div
          class="font-weight-bold"
          :class="{
            'text-subtitle-1 font-weight-bold': payment != 'e-Wallet',
            'text-caption': payment == 'e-Wallet',
            'my-3': payment != 'e-Wallet',
          }"
        >
          {{ payment }}
        </div>
        <div
          class="text-subtitle-1 font-weight-bold"
          v-if="payment == 'e-Wallet'"
        >
          {{
            toCurrency({
              value: store.eWallet.balance,
              locales: "en-US",
              style: "decimal",
            })
          }}
        </div>
      </SelectionCard>
    </v-col>
  </v-row>
</template>
