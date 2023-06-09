<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <h4 class="text-h4 font-weight-bold text-primary">
    <span
      class="card_title"
      :style="{
        // 'box-shadow': `inset 0px -8px 0px rgba(238, 238, 238, 1)`,
      }"
      >{{ title }}
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
</template>
