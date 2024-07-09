<script setup>
    import { RewardAPI } from '@/endpoints'
    import DailyCard from '@/components/Rewards/DailyCard.vue'

    const oneDay = 24*60*60*1000;
</script>
<template>
    <div>
        <div class="accordion accordion-flush" id="rewardsAccordion">
            <div class="accordion-item">
                <h2 class="accordion-header" id="daily">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#dailyContent">
                        <h3>Daily</h3>
                    </button>
                </h2>
                <div id="dailyContent" class="accordion-collapse collapse show" data-bs-parent="#rewardsAccordion">
                    <div class="accordion-body">
                        Get your daily rewards.
                        <div class="container">
                            <div class="row">
                                <div class="col" v-for="daily, key in dailys">
                                    <DailyCard :reward="daily.reward" :date="new Date(daily.date)" :amount="daily.amount" :isToday="key == 3"></DailyCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="stampCard">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#stampCardContent">
                        <h3>Stamp Card</h3>
                    </button>
                </h2>
                <div id="stampCardContent" class="accordion-collapse collapse" data-bs-parent="#rewardsAccordion">
                    <div class="accordion-body">
                        Get a stamp for every stream you watch and rewards for every 5th and 10th!
                        1234567
                        891011121314
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="freebies">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#freebiesContent">
                        <h3>Freebies</h3>
                    </button>
                </h2>
                <div id="freebiesContent" class="accordion-collapse collapse" data-bs-parent="#rewardsAccordion">
                    <div class="accordion-body">
                        Get available free stuff
                        1234567
                        891011121314
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data: () => {
        return {
            dailys: []
        }
    },
    computed: {
    },
    async mounted() {
        const response = await RewardAPI.getDaily();
        this.dailys = await response.data;
    },
    methods: {
    }
}
</script>

<style scoped>
button {
    background-color: unset !important;
}

button:focus {
    outline: none;
    box-shadow: none;
    background-color: unset;
    border: none;
}
</style>
