<script setup>
import { ref } from "vue";
import { usePaymentStore } from "../Payment.store";
import { required } from "@/helpers/inputRules";

const store = usePaymentStore();

const rules = {
  name: [required],
  phoneNumber: [required],
  address: [required],
};

const formValid = ref(false);
</script>

<template>
  <v-form v-model="formValid" validate-on="input">
    <template #default="{}">
      <v-row>
        <v-col cols="6">
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
        <v-col cols="auto">
          <v-checkbox
            name="isDropshipper"
            class="text-success"
            v-model="store.isDropshipper"
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
        <v-col cols="12" md="6">
          <v-text-field
            label="Name"
            name="name"
            v-model="store.user.name"
            variant="outlined"
            :rules="rules.name"
            color="primary"
            clear-icon="mdi-close"
            clearable
          >
            <template #:append-inner>
              <v-icon v-if="isValid" color="green">mdi-check</v-icon>
              <v-icon v-if="!isValid" color="red">mdi-close</v-icon>
            </template>
            <template #clear>
              <v-btn color="primary" density="compact" variant="plain" icon="mdi-close"></v-btn>
            </template>
          </v-text-field>
          <v-text-field
            name="phoneNumber"
            label="Phone Number"
            v-model="store.phoneNumber"
            variant="outlined"
          ></v-text-field>
          <v-textarea
            name="deliveryAddress"
            label="Delivery Address"
            v-model="store.deliveryAddress"
            variant="outlined"
            auto-grow
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            name="dropshipperName"
            label="Dropship Name"
            v-model="store.user.dropshipperName"
            variant="outlined"
          >
          </v-text-field>
          <v-text-field
            name="dropshipperPhoneNumber"
            label="Dropship Phone Number"
            v-model="store.user.dropshipperPhoneNumber"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>
    </template>
  </v-form>
</template>
