<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <header-component />
  <div class="content">
    <slot />
  </div>
  <footer-component />
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  components: { HeaderComponent, FooterComponent },
};
</script>
<style>
.p-button {
  color: #fff !important;
  background: #3b82f6;
  border: 1px solid #3b82f6;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  border-radius: 6px;
}
</style>
