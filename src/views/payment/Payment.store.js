import { defineStore } from "pinia";

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
      paymentStatus: "Delivery",
      productCount: 10,
      dropShippingFee: 5900,
      productPrice: 50000,
      isDropshipper: false,
      user: {
        name: "",
        phoneNumber: "",
        dropshipName: "",
        deliveryAddress: "",
        dropshipperName: "",
        dropshipperPhoneNumber: "",
      },
      payment: "e-Wallet",
      shipment: "Go-Send",
      stepValidation: {
        delivery: false,
        payment: false,
      },
      eWallet: {
        balance: 1500000,
      },
    };
  },

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
      return (
        this.productCost + (state.isDropshipper ? state.dropShippingFee : 0)
      );
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
  },
});
