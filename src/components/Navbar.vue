<script>
import logo from "../assets/pyramid_logo.png";
import Wallet from "./Wallet.vue";
import Connect from "./Connect.vue";
export default {
  data() {
    return {
      logo,
      menuState: false,
      showAlert: true,
      showWallet: false,
      showConnect: false,
      domain: window.location.host,
    };
  },
  computed: {
    address() {
      return this.$store.getters.getAccount;
    }
  },
  props: {
    title: String,
  },
  emits: ['connectWallet', 'logoutWallet'],
  methods: {
    openMenu() {
      this.menuState = !this.menuState;
    },
    hideAlert() {
      this.showAlert = false;
    },
    openWallet() {
      this.showWallet = !this.showWallet;
    },
    openConnect() {
      this.showConnect = !this.showConnect;
    },
    connect(wallet) {
      this.$emit('connectWallet', wallet);
    },
    logout() {
      this.$emit('logoutWallet');
    }
  },
  components: {
    Wallet,
    Connect
  },
};
</script>
<template>
  <div class="fixed w-full z-50">
    <div class="alert shadow-lg flex-row" v-if="showAlert">
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
      <span class="text-xs"
        >Phishing warning: please make sure you're visiting
        https://{{domain}} - check the URL carefully</span
      >
    </div>
    <div>
      <button @click="hideAlert" class="w-auto h-auto">X</button>
    </div>
  </div>
  <div class="navbar bg-base-100 z-40">
    <router-link class="navbar-start" to="/"
      ><img :src="logo" alt="" />
      <a class="ml-2 normal-case text-xl">{{ title }}</a>
    </router-link>

    <div class="navbar-end">
      <a class="btn" @click="openConnect" v-show="!address">Connect Wallet</a>

      <div
        v-bind:class="{ 'dropdown-open': menuState }"
        class="dropdown dropdown-end"
        ref="menu"
        @click="openMenu"
      >
        <label class="btn" v-show="address"
          ><svg
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            class="fill-gray-500 mr-2"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 4C18.5 4 19 4.5 19 6L19 8C20.1046 8 21 8.89543 21 10L21 17C21 19 20 20 17.999 20H6C4 20 3 19 3 17L3 7C3 5.5 4.5 4 6 4L17 4ZM5 7C5 6.44772 5.44772 6 6 6L19 6L19 8L6 8C5.44772 8 5 7.55229 5 7ZM17 16C18 16 19.001 15 19 14C18.999 13 18 12 17 12C16 12 15 13 15 14C15 15 16 16 17 16Z"
            ></path>
          </svg>
          {{ address.substring(0, 2) }}...{{
            address.substring(address.length - 4, address.length)
          }}</label
        >
        <ul
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between" @click="openWallet">
              Wallet
            </a>
          </li>
          <li><a><router-link to="/settings">Settings</router-link></a></li>
          <li><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  </div>
  
  <Wallet :open="showWallet" @close-modal="openWallet" @logout-account="logout"/>
  <Connect :open="showConnect" @close-modal="openConnect" @connect-wallet="connect"/>  
</template>
