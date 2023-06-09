import { defineStore } from "pinia";

import { generateAlphanumeric } from "@/helpers/utils";
import { ALLOWED_CHAR, ID_LENGTH } from "@/helpers/variables";

const shipmentMethods = {
  "Go-Send": {
    price: 15000,
    duration: "today",
  },
  JNE: {
    price: 9000,
    duration: "2 days",
  },
  "Personal Courier": {
    price: 29000,
    duration: "1 day",
  },
};

const paymentMethods = ["e-Wallet", "Bank Transfer", "Virtual Acccount"];

export const usePaymentStore = defineStore("payment", {
  state: () => {
    return {
      orderId: "",
      paymentStatus: "Delivery",
      productCount: 10,
      dropShippingFee: 5900,
      productPrice: 50000,
      isDropshipper: false,
      user: {
        email: "",
        phoneNumber: "",
        dropshipName: "",
        deliveryAddress: "",
        dropshipperName: "",
        dropshipperPhoneNumber: "",
      },
      payment: "e-Wallet",
      shipment: "Go-Send",
      stepValidation: {
        Delivery: false,
        Payment: false,
      },
      eWallet: {
        balance: 1500000,
      },
    };
  },
  persist: true,

  getters: {
    userInfo(state) {
      return state.user;
    },
    productCost(state) {
      return state.productCount * state.productPrice;
    },
    shippingCost(state) {
      return shipmentMethods[state.shipment] ?? 0;
    },
    totalCost(state) {
      const product = this.productCost;
      const dropship = state.isDropshipper ? state.dropShippingFee : 0;
      const shipment =
        this.paymentStatus == "Payment"
          ? this.shipmentMethods[state.shipment].price
          : 0;

      const total = product + dropship + shipment;
      return total;
    },

    shipmentMethods() {
      return shipmentMethods;
    },
    paymentMethods() {
      return paymentMethods;
    },
  },

  actions: {
    SET_PaymentStatus(status) {
      this.paymentStatus = status;
    },
    SET_OrderId() {
      this.orderId = generateAlphanumeric(
        ID_LENGTH,
        ALLOWED_CHAR
      ).toUpperCase();
    },
  },
});
