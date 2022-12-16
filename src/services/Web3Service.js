import Web3 from "web3";
import RavenNFT from "../RavenNFT.json";
import CoinManager from "../CoinManager.json";
import TestToken from "../TestToken.json";

export default class Web3Service {
  static contract = "0x24A25fF8978Ae5b0B05361BA66dC65522Bf22dC1";
  static nftURI = "ipfs://QmRCP22WG79oVd65KTUTZQFm6ASBY5T4MBh4FxSAGjeEMT";
  static getProvider(_provider = Web3.givenProvider) {
    return new Web3(_provider);
  }
  static async getWallet() {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      return accounts[0] ? accounts[0] : "";
    } else {
      return "";
    }
  }
  static async isInjected() {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      return accounts[0] ? true : false;
    }
  }
  static async connectWallet(walletType = "metamask") {
    if (typeof window.ethereum !== "undefined") {
      let provider = window.ethereum;
      if (walletType !== "injected") {
        if (
          !(provider.isMetaMask && walletType == "metamask") &&
          !(provider.isCoinbaseWallet && walletType == "coinbase")
        ) {
          provider = undefined;
        }
        // edge case if MM and CBW are both installed
        if (window.ethereum.providers?.length) {
          window.ethereum.providers.forEach(async (p) => {
            console.log(p);
            if (p.isMetaMask && walletType == "metamask") provider = p;
            else if (p.isCoinbaseWallet && walletType == "coinbase")
              provider = p;
          });
        }
      }

      if (provider == undefined) {
        return "";
      }
      const account = (
        await provider.request({ method: "eth_requestAccounts" })
      )[0];
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x61",
            },
          ],
        });
      } catch (switchError) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "BSC Testnet",
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
            },
          ],
        });
      }
      return account;
    } else {
      return "";
    }
  }
  static donate(account) {
    const transactionParameters = {
      nonce: "0x00",

      to: "0x9ca1e6a27ebaa6d730776a5eb7b995e24fc67632",
      from: account,
      value: Web3.utils.toWei("0.001", "ether"),
      data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057",
    };

    this.getProvider()
      .eth.sendTransaction(transactionParameters)
      .then((result) => {
        alert("Donate is done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static buyNFT(account) {
    var nftContract = this.getProvider().eth;
    nftContract = new nftContract.Contract(RavenNFT.abi, this.contract);
    nftContract.methods
      .mintNFT(account, this.nftURI)
      .send({ from: account })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async getBalance(account) {
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });
    return Web3.utils.fromWei(balance, "ether");
  }

  static async sendMoney(account) {
    const testToken = "0x9a6AACC5E482ca3d04fB282A51210f842262F72E";
    const coinManager = "0xb81b47b0FC2E4dc7Da9C6E6337947E31E192fd00";
    var testContract = this.getProvider().eth;
    testContract = new testContract.Contract(TestToken.abi, testToken);
    testContract.methods
      .approve(coinManager, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
      .send({from: account}).then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static async investMoney(account) {
    const testToken = "0x9a6AACC5E482ca3d04fB282A51210f842262F72E";
    const coinManager = "0xb81b47b0FC2E4dc7Da9C6E6337947E31E192fd00";
    var coinContract = this.getProvider().eth;
    coinContract = new coinContract.Contract(CoinManager.abi, coinManager);
    coinContract.methods
      .investTokens(Web3.utils.toWei('10'))
      .send({from: account}).then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
