<script setup>
</script>
<template>
    <div class="w-100 d-flex flex-column" v-if="!isToday">
        <div class="w-100 bg-primary rounded border border-primary d-flex flex-column align-items-center" style="height: 100px; --bs-bg-opacity: var(--custom-bg-opacity)">
            <points-icon size="large"/>
            <span>x{{ amount }}</span>
            <div class="position-absolute top-0 h-100 w-100 bg-primary" style="--bs-bg-opacity: var(--custom-bg-opacity)"></div>
        </div>
        <span class="text-center w-100">{{ formatDate(date) }}</span>
    </div>
    <div class="w-100 d-flex flex-column" v-else>
        <button class="w-100 bg-primary rounded border text-white" :click="claimReward" style="height: 100px; --bs-bg-opacity: var(--custom-bg-opacity)">
            <points-icon size="large" />
            x{{ amount }}
            <div class="position-absolute top-0 h-100 w-100 bg-primary" style="--bs-bg-opacity: .1">
                <span class="position-absolute" style="transform: rotate(30deg);">Claim!</span>
            </div>
        </button>
        <span class="text-center w-100 fw-bold text-white">{{ formatDate(date) }}<br>Today</span>
    </div>
</template>

<script>
export default {
    data: () => {
        return {}
    },
    props: {
        date: Date,
        reward: 'POINTS' | 'SCRATCH' | 'SPIN',
        amount: Number,
        isToday: Boolean
    },
    data() {
        return {
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        formatDate: function(d) {
            d = new Date(d);
            let day = d.getDate();
            day = day < 10 ? "0"+day : day;
            let month = d.getMonth() + 1;
            month = month < 10 ? "0"+month : month;
            return `${day}.${month}.`;
        },
        claimReward: async function() {
            
        }
    },
    mounted() {}
}
</script>

<style scoped>
button:hover > div {
    display: block;
}

button > div {
    display: none;
}
</style>
