<template>
  <div>
    <noscript>
      <div class="p-3"></div>
      <span
        ><div class="container text-center">
          <div class="alert alert-danger fw-bold">
            This site requires JavaScript to be enabled to properly function.
            Please enable JavaScript on your browser, then try again.
          </div>
        </div>
      </span>
    </noscript>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#ff8a2f" :height="10" />
    <NuxtPage />
  </div>
</template>

<style>
.padding {
  padding: 2.5rem;
}

.paddingSm {
  padding: 0.5rem;
}

/* * {
  border-radius: 0 !important;
} */
</style>

<script setup lang="ts">
useHead({
  title: "link shortener",
});
</script>
