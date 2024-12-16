<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <header-component />
    <div class="">
      <div class="lg:flex justify-around m-6 relative">
        <div class="xl:text-2xl lg:text-2xl text-xl text-center lg:mt-[9rem]">
          <h1 class="lg:text-left lg:text-4xl font-medium mb-4">
            Sign up to track your health
          </h1>
          <p class="lg:text-left lg:w-2/3">
            if you have ready an account you can
            <a href="#" class="Login-text" target="_blank">Login </a>here. Or
            <a href="#" class="Login-text" target="_blank">Register </a>to join
            with us
          </p>
          <div class="text-span w-[240px] h-[240px]"></div>
        </div>
        <!-- Form Center -->
        <div class="hidden lg:block absolute top-80">
          <img
            src="@/assets/image/3636112-removebg-preview1.png"
            alt=""
            class="w-[300px] h-[300px]"
          />
        </div>
        <div class="lg:w-1/3 w-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<style src="../assets/style/authentication.css" scoped></style>
<script>
import HeaderComponent from "@/components/HeaderComponent";
export default {
  components: { HeaderComponent },
};
</script>
