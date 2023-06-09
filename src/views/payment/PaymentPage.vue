<script setup>
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { usePaymentStore } from "./Payment.store";

import StepNavigation from "./components/StepNavigation.vue";
import DeliveryStep from "./components/DeliveryStep.vue";
import PaymentStep from "./components/PaymentStep.vue";
import FinishStep from "./components/FinishStep.vue";
import SummaryPrice from "./components/SummaryPrice.vue";
import SummaryProduct from "./components/SummaryProduct.vue";
import SummaryDelivery from "./components/SummaryDelivery.vue";

const store = usePaymentStore();
const { mdAndUp } = useDisplay();

const paymentSteps = {
  Delivery: DeliveryStep,
  Payment: PaymentStep,
  Finish: FinishStep,
};

const getRoute = (position) => {
  const status = store.paymentStatus;
  const routeKeys = Object.keys(paymentSteps);

  const currentRoute = routeKeys.indexOf(status);

  const route = currentRoute + position;

  if (route < 0) return "Cart";

  return routeKeys[route];
};

const currentStepComponent = computed(() => {
  const status = store.paymentStatus;
  return paymentSteps[status];
});

const getNextStepButtonTitle = computed(() => {
  const status = store.paymentStatus;
  const paymentMethod = store.payment;

  if (status == "Delivery") return "Continue to Payment";
  if (status == "Payment") return `Pay with ${paymentMethod}`;

  return false;
});

const isBtnActionDisabled = computed(() => {
  const status = store.paymentStatus;

  if (status == "Delivery") return !store.stepValidation[status];

  return false;
});
</script>

<template>
  <v-container fluid class="fill-height" style="background-color: #fffae6">
    <v-row class="fill-height align-center justify-center pa-10">
      <v-col class="12">
        <StepNavigation
          :steps="paymentSteps"
          :payment-status="store.paymentStatus"
        />
        <v-row class="justify-center">
          <v-col cols="12" class="d-flex justify-center">
            <v-card
              max-width="1100px"
              min-height="550px"
              :width="mdAndUp ? '100%' : ''"
              class="pa-10 rounded-sm"
              variant="flat"
              :style="[
                { 'box-shadow': '2px 10px 20px rgba(255, 138, 0, 0.1)' },
              ]"
            >
              <v-row>
                <v-col cols="12" class="d-flex">
                  <v-btn
                    prepend-icon="mdi-arrow-left"
                    class="text-subtitle-1 font-weight-regular pa-0"
                    variant="plain"
                    :ripple="false"
                    @click="
                      if (getRoute(-1) != 'Cart')
                        store.SET_PaymentStatus(getRoute(-1));
                    "
                  >
                    Back to {{ getRoute(-1) }}
                  </v-btn>
                </v-col>

                <!-- Right Section Step Content -->
                <v-col cols="9">
                  <keep-alive>
                    <component :is="currentStepComponent"></component>
                  </keep-alive>
                </v-col>

                <v-divider thickness="1px" color="primary" vertical></v-divider>

                <!-- Right Section Summary Orders -->
                <v-col cols="3">
                  <SummaryProduct></SummaryProduct>
                  <v-divider class="my-5" style="max-width: 50%"></v-divider>

                  <SummaryDelivery />

                  <SummaryPrice
                    :action-title="getNextStepButtonTitle ?? false"
                    :disabled-btn="isBtnActionDisabled"
                    @on-click-action="
                      store.SET_PaymentStatus(getRoute(1));

                      if (store.paymentStatus == 'Finish') store.SET_OrderId();
                    "
                  >
                  </SummaryPrice>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
