<script>
import Metamask from "../assets/wallets/metamask.svg";
import Coinbase from "../assets/wallets/coinbase.svg";
import Web3Service from "../services/Web3Service";
export default {
  data() {
    return {
      Metamask,
      Coinbase,
      menuState: false,
      showAlert: true,
      showWallet: false,
      injected: false,
    };
  },
  props: {
    open: Boolean,
  },
  methods: {
    async checkInjected() {
      this.injected = await Web3Service.isInjected();
    },
  },
  watch: {
    async open(newValue) {
        if (newValue) {
            await this.checkInjected();
        }
    }
  },
  components: {},
};
</script>
<template>
  <div
    class="modal modal-bottom sm:modal-middle"
    :class="{ 'modal-open': open }"
  >
    <div class="modal-box relative">
      <button
        class="btn btn-sm btn-circle absolute right-2 top-2"
        @click="$emit('closeModal')"
      >
        ✕
      </button>
      <h3 class="text-lg font-bold">Connect wallet</h3>
      <p class="py-4">
        Start by connecting with one of the wallets below. Be sure to store your
        private keys or seed phrase securely. Never share them with anyone.
      </p>
      <div class="flex items-center m-5 justify-center">
        <div
          class="items-center flex flex-col justify-center m-2 btn-outline btn"
          v-show="injected"
          @click="$emit('connectWallet', 'injected'), $emit('closeModal')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-7 h-7"
          >
            <path
              d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z"
            />
          </svg>

          <p>Injected</p>
        </div>
        <div
          class="items-center flex flex-col justify-center m-2 btn-outline btn"
          @click="$emit('connectWallet', 'metamask'), $emit('closeModal')"
        >
          <img :src="Metamask" class="h-7 w-7" />
          <p>Metamask</p>
        </div>
        <div
          class="items-center flex flex-col justify-center m-2 btn-outline btn"
          @click="$emit('connectWallet', 'coinbase'), $emit('closeModal')"
        >
          <img :src="Coinbase" class="h-7 w-7" />
          <p>Coinbase Wallet</p>
        </div>
      </div>
    </div>
  </div>
</template>
