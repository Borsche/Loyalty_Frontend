<script setup>
    import * as PointsSVg from '@/assets/Points.svg'

    const sizeMap = new Map([
        ['small', 24],
        ['medium', 48],
        ['large', 64]
    ])
</script>
<template>
    <span role="img">
        <img src="@/assets/Points.svg" :width="sizeMap.get(size)" :height="sizeMap.get(size)"/>
    </span>
</template>

<script>
export default {
    data: () => {
        return {}
    },
    props: {
        size: 'small' | 'medium' | 'large'
    },
    data() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
    },
    mounted() {}
}
</script>

<style>
</style>
