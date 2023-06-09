<script setup>
import { ref } from "vue";
import { usePaymentStore } from "../Payment.store";
import { required, phoneNumber } from "@/helpers/inputRules";

import CardTitle from "@/components/CardTitle.vue";
import ValidationIcon from "@/components/ValidationIcon.vue";

const store = usePaymentStore();

const rules = {
  name: [required],
  phoneNumber: [required, phoneNumber],
  deliveryAddress: [required],
  dropshipperName: [required],
  dropshipperPhoneNumber: [required, phoneNumber],
};

const formValid = ref(false);
const dropshipperFormValid = ref(false);

const clearDropshipperData = () => {
  store.user.dropshipperName = null;
  store.user.dropshipperPhoneNumber = null;
};

const getFieldStatus = (key, items) => {
  return items.value.find(({ id }) => id == key)?.isValid;
};
</script>

<template>
  <v-row>
    <v-col cols="6">
      <CardTitle title="Delivery Details" />
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="auto">
      <v-checkbox
        name="isDropshipper"
        class="text-success"
        v-model="store.isDropshipper"
        color="success"
        density="compact"
        @update:focused="clearDropshipperData()"
        single-line
      >
        <template #label>
          <div class="text-black font-weight-medium">Send as dropshipper</div>
        </template>
      </v-checkbox>
    </v-col>
    <v-col cols="12" md="6">
      <v-form v-model="formValid" validate-on="input">
        <template #default="{ items }">
          <v-text-field
            label="Name"
            name="name"
            v-model="store.user.name"
            variant="outlined"
            class="mb-3"
            :rules="rules.name"
          >
            <template #append-inner>
              <ValidationIcon :status="getFieldStatus('name', items)" />
            </template>
          </v-text-field>

          <v-text-field
            name="phoneNumber"
            label="Phone Number"
            v-model="store.user.phoneNumber"
            variant="outlined"
            :rules="rules.phoneNumber"
            class="mb-3"
          >
            <template #append-inner>
              <ValidationIcon :status="getFieldStatus('phoneNumber', items)" />
            </template>
          </v-text-field>
          <v-textarea
            name="deliveryAddress"
            label="Delivery Address"
            v-model="store.user.deliveryAddress"
            variant="outlined"
            :rules="rules.deliveryAddress"
            clear-icon="mdi-close"
            class="mb-3"
            maxLength="120"
            counter="120"
            auto-grow
          >
            <template #append-inner>
              <ValidationIcon
                :status="getFieldStatus('deliveryAddress', items)"
              />
            </template>
          </v-textarea>
        </template>
      </v-form>
    </v-col>

    <v-col cols="12" md="6" v-if="store.isDropshipper">
      <v-form v-model="dropshipperFormValid" validate-on="input">
        <template #default="{ items }">
          <v-text-field
            name="dropshipperName"
            label="Dropship Name"
            v-model="store.user.dropshipperName"
            variant="outlined"
            :disabled="!store.isDropshipper"
            :rules="rules.name"
          >
            <template #append-inner>
              <ValidationIcon
                :status="getFieldStatus('dropshipperName', items)"
              />
            </template>
          </v-text-field>
          <v-text-field
            name="dropshipperPhoneNumber"
            label="Dropship Phone Number"
            v-model="store.user.dropshipperPhoneNumber"
            variant="outlined"
            :disabled="!store.isDropshipper"
            :rules="rules.dropshipperPhoneNumber"
          >
            <template #append-inner>
              <ValidationIcon
                :status="getFieldStatus('dropshipperPhoneNumber', items)"
              />
            </template>
          </v-text-field>
        </template>
      </v-form>
    </v-col>
  </v-row>
</template>

<style scoped></style>
