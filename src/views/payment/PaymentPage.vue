<script setup>
import { ref } from "vue";

const paymentSteps = ["Delivery", "Payment", "Finish"];

const paymentStatus = ref("Delivery");
</script>

<template>
  <v-container fluid class="fill-height" style="background-color: #fffae6">
    <v-row class="fill-height align-center justify-center pa-10">
      <v-col class="12">
        <v-col
          cols="12"
          md="6"
          class="d-flex bg-secondary rounded-pill mx-auto justify-center"
          :style="{ bottom: '-50px', position: 'relative', zIndex: 999 }"
        >
          <v-col
            v-for="(step, index) in paymentSteps"
            :key="step"
            class="justify-space-around"
          >
            <div class="text-h6 d-flex align-center justify-space-around">
              <div>
                <v-avatar
                  size="30"
                  class="mr-2"
                  :color="
                    paymentStatus == step
                      ? 'primary elevation-1'
                      : 'rgba(255, 138, 0, 0.2)'
                  "
                  :class="paymentStatus == step ? 'text-white' : 'text-primary'"
                >
                  <span> {{ index + 1 }}</span>
                </v-avatar>
                <span class="text-primary font-weight-regular">
                  {{ step }}
                </span>
              </div>
              <v-icon v-if="index < paymentSteps.length - 1" color="primary">
                mdi-chevron-right
              </v-icon>
            </div>
          </v-col>
        </v-col>
        <v-card
          min-height="550px"
          class="pa-10 rounded-sm"
          variant="flat"
          :style="[{ 'box-shadow': '2px 10px 20px rgba(255, 138, 0, 0.1)' }]"
        >
          <v-row>
            <v-col cols="3" class="d-flex">
              <v-btn
                prepend-icon="mdi-arrow-left"
                class="text-subtitle-1 font-weight-regular"
                variant="plain"
                :ripple="false"
              >
                Back to cart
              </v-btn>
            </v-col>

            <v-col cols="3"></v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
