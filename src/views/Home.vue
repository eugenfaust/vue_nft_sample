<script>
import bitcoin_pic from "../assets/bitcoin_info.jpg";
import workers from "../assets/workers.jpg";
import diagram from "../assets/diagram.jpg";
import AOS from "aos";
import gsap from "gsap";
export default {
  data() {
    return {
      bitcoin_pic,
      workers,
      diagram,
      carousel: [
        {
          id: 1,
          pic: bitcoin_pic,
          text: "And our cryptocurrency too! Everyone is buying, buy and you! We not scammers!",
          active: true,
        },
        {
          id: 2,
          pic: bitcoin_pic,
          text: "Sample 2",
          active: false,
        },
        {
          id: 3,
          pic: bitcoin_pic,
          text: "Sample 3",
          active: false,
        },
      ],
    };
  },
  methods: {},
  mounted() {
    AOS.init();
  },

  components: {},
};
</script>
<template>
  <div>
    <!-- card 1 -->
    <div class="hero min-h-screen bg-base-200">
      <div data-aos="fade" class="card max-w-lg">
        <img :src="bitcoin_pic" class="card-img-top rounded-lg" alt="..." />
        <div class="card-body">
          <h5 class="card-title">And our cryptocurrency too!</h5>
          <p class="card-text" @click="prev">
            Everyone is buying, buy and you! We not scammers!
          </p>
          <a href="#" class="btn btn-success">Buy Now!</a>
        </div>
      </div>
    </div>

    <!-- card 2 -->
    <div class="hero min-h-screen bg-base-200">
      <div
        data-aos="flip-up"
        data-aos-offset="200"
        data-aos-easing="ease-in-out"
        class="card max-w-lg"
      >
        <img :src="workers" class="card-img-top rounded-lg" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Our team</h5>
          <p class="card-text">Our employees have high qualifications</p>
          <a href="#" class="btn btn-danger">Buy NFT</a>
        </div>
      </div>
    </div>
    <!-- card  3-->
    <div class="hero min-h-screen bg-base-200">
      <div data-aos="fade-right" class="card max-w-lg" @change="prev">
        <img :src="diagram" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Your finances are our concern</h5>
          <p class="card-text">
            After buying our currency, you will receive a high growth of assets
          </p>
          <a href="#" class="btn btn-info">Join us!</a>
        </div>
      </div>
    </div>
  </div>
</template>
