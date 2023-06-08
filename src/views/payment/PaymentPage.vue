<script setup>
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { toCurrency } from "@/helpers/filters";
import { usePaymentStore } from "./Payment.store";

import StepNavigation from "./components/StepNavigation.vue";
import DeliveryStep from "./components/DeliveryStep.vue";
import PaymentStep from "./components/PaymentStep.vue";
import FinishStep from "./components/FinishStep.vue";

const store = usePaymentStore();
const { mdAndUp } = useDisplay();

const paymentSteps = {
  Delivery: DeliveryStep,
  Payment: PaymentStep,
  Finish: FinishStep,
};

const currentStepComponent = computed(() => {
  const status = store.paymentStatus;
  return paymentSteps[status];
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
                  >
                    Back to cart
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
                  <v-row>
                    <v-col cols="12">
                      <div class="text-h5 text-primary font-weight-bold mb-3">
                        Summary
                      </div>

                      <div
                        class="text-subtitle-2 font-weight-regular text-grey"
                      >
                        {{ store.productCount }} items purchased
                      </div>
                    </v-col>
                  </v-row>

                  <v-row
                    dense
                    class="text-subtitle-2 font-weight-regular text-grey"
                    :style="{
                      marginTop: '100%',
                    }"
                  >
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
                    <v-col cols="12" class="d-flex justify-space-between">
                      <div>Dropshipping Fee</div>
                      <div class="font-weight-bold text-black">
                        {{
                          toCurrency({
                            value: store.isDropshipper
                              ? store.dropShippingFee
                              : 0,
                            locales: "en-US",
                            style: "decimal",
                          })
                        }}
                      </div>
                    </v-col>

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

                    <v-col cols="12" class="pa-0">
                      <v-btn
                        color="primary"
                        height="60px"
                        variant="flat"
                        class="text-capitalize font-weight-medium"
                        size="x-large"
                        block
                        >Continue to Payment
                      </v-btn>
                    </v-col>
                  </v-row>
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
