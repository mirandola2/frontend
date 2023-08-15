<template>
    <div class="card max-w-full text-neutral-content" :class="'bg-'+color">

        <div class="card-body text-sm">
            <h2 class="card-title">
                {{title}}
            </h2>
            <p>
                <slot />
            </p>
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
            required: true
        },
    }
)

</script>