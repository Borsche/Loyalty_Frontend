<script setup>
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
                                <div class="col">{{ formatDate(new Date(today - oneDay * 3)) }}</div>
                                <div class="col">{{ formatDate(new Date(today - oneDay * 2)) }}</div>
                                <div class="col">{{ formatDate(new Date(today - oneDay * 1)) }}</div>
                                <div class="col">
                                    Today <br>
                                    {{ formatDate(today) }}
                                </div>
                                <div class="col">{{ formatDate(new Date(today + oneDay * 1)) }}</div>
                                <div class="col">{{ formatDate(new Date(today + oneDay * 2)) }}</div>
                                <div class="col">{{ formatDate(new Date(today + oneDay * 3)) }}</div>
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
            today: new Date(),
        }
    },
    computed: {
    },
    async mounted() {
    },
    methods: {
        formatDate: function(d) {
            console.log(d);
            d = new Date(d);
            return `${(d.getDate())}.${(d.getMonth() + 1)}.`;
        }
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
