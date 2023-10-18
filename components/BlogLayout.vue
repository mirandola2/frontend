<template>
    <div class="container flex flex-col lg:flex-row gap-5 pt-5">
      <div class="mx-auto w-full">
        <slot>

        </slot>
       
      </div>
      
      <Sidebar />
    </div>
  </template>
  <script setup>
  
  
  const badge = {
    lc: { bg: "bg-lc text-lc-content", text: "L/C" },
    eg: { bg: "bg-eg text-eg-content", text: "E/G" },
    rs: { bg: "bg-rs text-rs-content", text: "R/S" },
    cc: { bg: "bg-cc text-white", text: "Gruppo" },
  };
  
  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  </script>
  