<script>
import Web3Service from "../services/Web3Service";
export default {
  data() {
    return {
      successCopy: false,
      isOpenTransactions: false,
    };
  },
  computed: {
    address() {
      return this.$store.getters.getAccount;
    },
    balance() {
      return this.$store.getters.getBalance;
    }
  },
  props: {
    open: Boolean,
    logout: Function,
  },
  methods: {
    copyWallet() {
      navigator.clipboard.writeText(this.address);
      this.successCopy = true;
      setTimeout(() => (this.successCopy = false), 1000);
    },
    openTransactions() {
      this.isOpenTransactions = true;
    },
    openWallet() {
      this.isOpenTransactions = false;
    },
    async initWallet() {
      const balance = await Web3Service.getBalance(this.address);
      this.$store.commit('setBalance', Math.round(balance * 1000000) / 1000000);
    },
  },
  watch: {
    async open(newValue) {
      if (newValue) {
        await this.initWallet();
      }
    },
  },
};
</script>
<template>
  <div
    class="modal modal-bottom sm:modal-middle bg-slate-50 bg-opacity-20"
    :class="{ 'modal-open': open }"
  >
    <div class="modal-box border-gray-600 border-2">
      <button
        class="btn btn-sm btn-circle absolute right-2 top-2"
        @click="$emit('closeModal')"
      >
        ✕
      </button>
      <h3 class="font-bold text-lg">Your wallet</h3>
      <div class="divider mb-0"></div>
      <div class="btn-group grid grid-cols-2">
        <button
          class="btn"
          :class="{
            'btn-info': !isOpenTransactions,
            'btn-outline': isOpenTransactions,
          }"
          @click="openWallet"
        >
          Wallet
        </button>
        <button
          class="btn"
          :class="{
            'btn-info': isOpenTransactions,
            'btn-outline': !isOpenTransactions,
          }"
          @click="openTransactions"
        >
          Transactions
        </button>
      </div>
      <div class="divider mt-0"></div>
      <div v-if="!isOpenTransactions">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Your wallet</span>
          </label>
          <label class="input-group">
            <input
              type="text"
              placeholder="0x...."
              :value="address"
              class="input input-bordered w-full"
              disabled
            />

            <div class="indicator">
              <Transition>
                <span
                  v-if="successCopy"
                  class="indicator-item indicator-top indicator-center badge badge-info"
                  >Copied!</span
                >
              </Transition>
              <span class="btn rounded-l-none" @click.prevent="copyWallet"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                  /></svg
              ></span>
            </div>
          </label>
        </div>
        <div class="flex justify-start flex-col">
          <div class="flex flex-row justify-between mt-5 mb-1">
            <div class="badge badge-primary">Goerli</div>
            <a
              :href="'https://goerli.etherscan.io/address/' + address"
              target="_blank"
              class="text-blue-400"
              >Etherscan
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="currentColor"
                class="w-5 h-5 inline"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
          <div class="flex flex-row justify-between">
            <span>GOR Balance</span>
            <span>{{ balance }}</span>
          </div>
        </div>
        <div class="alert alert-warning shadow-lg mt-5">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span
              >Lock CAKE to enjoy the benefits of farm yield boosting,
              participating in IFOs, voting power boosts, and so much more! Go
              to Pools</span
            >
          </div>
        </div>
        <div class="modal-action">
          <label
            for="my-modal-6"
            class="btn btn-outline w-full"
            @click="$emit('logoutAccount'), $emit('closeModal')"
            >Disconnect Wallet</label
          >
        </div>
      </div>
      <div v-else>
        <p class="text-secondary mb-5">Recent transactions</p>
        <div class="flex flex-col justify-center items-center">
          No recent transactions
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
