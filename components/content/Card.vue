<template>
    <div class="card not-prose grid-item max-w-full !w-full" :class="[bgColor[color], {'md:col-span-2': big}]">

        <div class="card-body">
            <h2 class="card-title" v-if="title">
                {{title}}
            </h2>
                <slot />
        </div>
    </div>
</template>
<script setup>
const props = defineProps(
    {
        title: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false,
            default: 'neutral'
        },
        big: {
            type: Boolean,
            required: false,
            default: false
        },
    }
)

const bgColor = {
  lc : 'bg-lc',
  eg : 'bg-eg text-white',
  rs : 'bg-rs text-white',
  cc : 'bg-cc text-white',
  primary: 'bg-primary text-white',
  base: 'bg-base-200'
}

</script>