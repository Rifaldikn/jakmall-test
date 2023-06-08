import { defineStore } from "pinia";

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
    };
  },

  getters: {
    userInfo(state) {
      return state.user;
    },
    productCost(state) {
      return state.productCount * state.productPrice;
    },
    totalCost(state) {
      this.productCost + (state.isDropshipper ? state.dropShippingFee : 0);
    },
  },
});
