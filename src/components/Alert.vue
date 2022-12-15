<script>
export default {
  data() {
    return {
    };
  },
  props: {
    message: String,
    show: Boolean,
  },
  methods: {
  },
  components: {},
};
</script>
<template>
    <Transition>
  <div class="toast animate-none toast-top toast-start z-50" v-show="show">
  <div class="alert alert-error">
    <span class="h-2 w-2 absolute top-6 right-6 cursor-pointer" @click="$emit('closeAlert')">
        x
    </span>
    <div class="m-5">
      <span>{{message}}</span>
    </div>
  </div>
</div>
</Transition>
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
