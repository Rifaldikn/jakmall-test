<script setup>
import { toCurrency } from "@/helpers/filters";
import { usePaymentStore } from "../Payment.store";

const store = usePaymentStore();
defineEmits(["onClickAction"]);

defineProps({
  actionTitle: {
    type: String,
    required: true,
  },
  disabledBtn: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <slot name="default">
    <v-row
      dense
      class="text-subtitle-2 font-weight-regular text-grey"
      :style="{
        marginTop: '30%',
      }"
    >
      <!-- Total Product Cost -->
      <v-col cols="12" class="d-flex justify-space-between">
        <div>Cost of goods</div>
        <div class="font-weight-bold text-black">
          {{
            toCurrency({
              value: store.productCost,
              locales: "en-US",
              style: "decimal",
            })
          }}
        </div>
      </v-col>

      <!-- Dropshipping Fee -->
      <v-col cols="12" class="d-flex justify-space-between">
        <div>Dropshipping Fee</div>
        <div class="font-weight-bold text-black">
          {{
            toCurrency({
              value: store.isDropshipper ? store.dropShippingFee : 0,
              locales: "en-US",
              style: "decimal",
            })
          }}
        </div>
      </v-col>

      <!-- Shipment Info -->
      <v-col
        cols="12"
        class="d-flex justify-space-between"
        v-if="
          store.paymentStatus == 'Payment' || store.paymentStatus == 'Finish'
        "
      >
        <div>
          <span class="font-weight-bold text-subtitle-2"
            >{{ store.shipment }}
          </span>
          shipment
        </div>
        <div class="font-weight-bold text-black">
          {{
            toCurrency({
              value: store.shipmentMethods[store.shipment].price,
              locales: "en-US",
              style: "decimal",
            })
          }}
        </div>
      </v-col>

      <!-- Total Cost -->
      <v-col
        cols="12"
        class="text-primary text-h5 font-weight-bold d-flex justify-space-between my-5"
      >
        <div>Total</div>
        <div>
          {{
            toCurrency({
              value: store.totalCost,
              locales: "en-US",
              style: "decimal",
            })
          }}
        </div>
      </v-col>

      <v-col cols="12" class="pa-0" v-if="store.paymentStatus != 'Finish'">
        <v-btn
          color="primary"
          height="60px"
          variant="flat"
          class="text-capitalize font-weight-medium"
          size="large"
          :disabled="disabledBtn"
          block
          @click="$emit('onClickAction')"
          >{{ actionTitle }}
        </v-btn>
      </v-col>
    </v-row>
  </slot>
</template>
