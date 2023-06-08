<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { toCurrency } from "@/helpers/filters";

import StepNavigation from "./components/StepNavigation.vue";

const { mdAndUp } = useDisplay();

const paymentSteps = ["Delivery", "Payment", "Finish"];
const dropShippingFee = 5900;
const productPrice = 50000;

const paymentStatus = ref("Delivery");
const isDropshipper = ref(false);
const productCount = ref(10);

const productCost = computed(() => productCount.value * productPrice);
const totalCost = computed(
  () => productCost.value + (isDropshipper.value ? dropShippingFee : 0)
);
</script>

<template>
  <v-container fluid class="fill-height" style="background-color: #fffae6">
    <v-row class="fill-height align-center justify-center pa-10">
      <v-col class="12">
        <StepNavigation :steps="paymentSteps" :payment-status="paymentStatus" />
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
                <v-col cols="9">
                  <v-row>
                    <v-col cols="auto">
                      <h4 class="text-h4 font-weight-bold text-primary">
                        <span
                          class="card_title"
                          :style="{
                            // 'box-shadow': `inset 0px -8px 0px rgba(238, 238, 238, 1)`,
                          }"
                          >Delivery Details
                          <v-divider
                            thickness="8px"
                            length="300px"
                            color="grey"
                            :style="{
                              position: 'relative',
                              top: '-12px',
                            }"
                          ></v-divider>
                        </span>
                      </h4>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                      <v-checkbox
                        class="text-success"
                        v-model="isDropshipper"
                        color="success"
                        density="compact"
                        single-line
                        hide-details
                      >
                        <template #label>
                          <div class="text-black font-weight-medium">
                            Send as dropshipper
                          </div>
                        </template>
                      </v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>

                <v-divider thickness="1px" color="primary" vertical></v-divider>

                <v-col cols="3">
                  <v-row>
                    <v-col cols="12">
                      <div class="text-h5 text-primary font-weight-bold mb-3">
                        Summary
                      </div>

                      <div
                        class="text-subtitle-2 font-weight-regular text-grey"
                      >
                        {{ productCount }} items purchased
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
                            value: productCost,
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
                            value: dropShippingFee,
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
                            value: totalCost,
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
