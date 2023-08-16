<template>
    <div class="card grid-item max-w-full htext-neutral-content" :class="{['bg-'+color]: true, 'md:col-span-2': big}">

        <div class="card-body">
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

</script>