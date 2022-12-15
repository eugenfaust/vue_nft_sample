<script setup>
import Web3Service from "./services/Web3Service.js";
import Navbar from "./components/Navbar.vue";
import Alert from "./components/Alert.vue";
</script>
<script>
export default {
  data() {
    return {
      title: "Ponzi",
      account: "",
      buy_status: true,
      errorMessage: "",
      errorShow: false,
    };
  },
  methods: {
    async connectWallet(wallet) {
      console.log(wallet);
      if (wallet === 'walletconnect') {
        await Web3Service.connectWalletConnect();
        return;
      } 
      const account = await Web3Service.connectWallet(wallet);
      console.log(account);
      if (account === "") {
        this.$store.commit('showError', 'We didn\'t found ' + wallet + ' in your browser');
      } else {
        this.$store.commit('connectWallet', account);
      }
    },
    async logoutWallet() {
      this.$store.commit('logoutWallet');
    },
    buyNFT() {
      Web3Service.buyNFT(this.account);
    },
    donate() {
      Web3Service.donate(this.account);
    },
    showError(msg) {
      this.errorMessage = msg;
      this.errorShow = true;
    }
  },
  components: { Navbar, Alert },
  async mounted() {
    if (await Web3Service.isInjected()) {
      const account = await Web3Service.getWallet();
      this.$store.commit('connectWallet', account);
    };
  },
};
</script>
<template>
  <Navbar
    :title="title"
    @connect-wallet="connectWallet"
    @logout-wallet="logoutWallet"
  />
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center rounded-lg">
      <router-view />
    </div>
  </div>
  <Alert :show="$store.state.errorShow" :message="$store.state.errorMessage" @close-alert="$store.commit('hideError')" />
</template>
