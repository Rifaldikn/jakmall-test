<script setup>
defineEmits(["click"]);

defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  activeColor: {
    type: String,
    default: "success",
  },
  baseColor: {
    type: String,
    default: "grey",
  },
  height: {
    type: [String, Number],
    default: "60px",
  },
});
</script>

<template>
  <v-card
    width="180"
    :min-height="height"
    variant="outlined"
    :color="isActive ? activeColor : baseColor"
    :class="{ 'bg-success-10': isActive }"
    class="pa-2"
    @click="$emit('click')"
    hover
  >
    <slot name="content">
      <v-row class="align-center fill-height" no-gutters>
        <v-col cols="10" class="my-auto" :class="{ 'text-black': isActive }">
          <slot> </slot>
        </v-col>

        <v-col cols="2">
          <v-icon v-if="isActive" :color="activeColor" size="small">
            mdi-check
          </v-icon>
        </v-col>
      </v-row>
    </slot>
  </v-card>
</template>
