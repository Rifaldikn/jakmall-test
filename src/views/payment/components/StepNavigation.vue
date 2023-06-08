<script setup>
const props = defineProps({
  steps: {
    type: Object,
    required: true,
    default: () => {},
  },
  paymentStatus: {
    type: String,
    defaut: "Delivery",
  },
});
</script>

<template>
  <v-row no-gutters="">
    <v-col
      cols="12"
      md="6"
      class="d-flex bg-secondary rounded-pill mx-auto justify-center"
      :style="{ bottom: '-55px', position: 'relative', zIndex: 999 }"
    >
      <div
        v-for="(step, key, index) in props.steps"
        :key="key"
        class="justify-space-around align-center pa-5"
      >
        <div
          class="text-h6 d-flex align-center"
          :class="{
            'justify-space-around': index < steps.length - 1,
          }"
        >
          <div class="mr-3">
            <v-avatar
              size="30"
              class="mr-2"
              :color="
                paymentStatus == key
                  ? 'primary elevation-1'
                  : 'rgba(255, 138, 0, 0.2)'
              "
              :class="paymentStatus == key ? 'text-white' : 'text-primary'"
            >
              <span> {{ index + 1 }}</span>
            </v-avatar>
            <span class="text-primary font-weight-regular">
              {{ key }}
            </span>
          </div>
          <v-icon v-if="index < Object.keys(steps).length - 1" color="primary">
            mdi-chevron-right
          </v-icon>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
