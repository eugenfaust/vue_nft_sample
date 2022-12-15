import { createStore } from "vuex";
import Web3Service from "../services/Web3Service";
// Create a new store instance.
const store = createStore({
  state() {
    return {
      count: 0,
      account: "",
      balance: 0,
      errorMessage: "",
      errorShow: false,
    };
  },
  getters: {
    getAccount(state) {
      return state.account;
    },
    getBalance(state) {
      return state.balance;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setBalance(state, balance) {
      state.balance = balance;
    },
    connectWallet(state, address) {
      state.account = address;
    },
    logoutWallet(state) {
      state.account = "";
    },
    buyNFT(state) {
      Web3Service.buyNFT(state.account);
    },
    donate(state) {
      Web3Service.donate(state.account);
    },
    showError(state, msg) {
      state.errorMessage = msg;
      state.errorShow = true;
    },
    hideError(state) {
        state.errorShow = false;
    }
  },
});
export default store;
