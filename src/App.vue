<script setup>
import TextArea from './components/TextArea.vue';
</script>

<template>
  <div class="text">
    <TextArea />
  </div>
</template>

<style scoped>
.text {
  z-index: 1;
  width: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  line-height: 40px;
}
</style>
