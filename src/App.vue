<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserInfoStore } from '@/stores/userInfo'
import { mapState } from 'pinia'
import { headers, UserAPI } from '@/endpoints'
</script>

<template>
    <header class="border-bottom text-white d-flex justify-content-between align-items-center w-100">
        <div class="wrapper d-flex justify-content-around justify-content-lg-start flex-wrap align-items-center w-100">
            <input id="menu_toggle" type="checkbox" />
            <label class="menu_btn" for="menu_toggle">
                <span></span>
            </label>
            <div id="profile_info">
                <img id="profile_picture" v-if="!userInfo.picture" src="@/assets/no_profile.png"/>
                <img id="profile_picture" v-else :src="userInfo.picture" />
                <div>
                    <span id="username">{{ userInfo.username }}</span>
                    <span class="ms-2">Punkte: 0</span>
                </div>
            </div>

            <nav>
                <RouterLink class="route" to="rewards">
                    <chest-icon :size="48"/>
                    <span class="caption">Rewards</span>
                </RouterLink>
                <RouterLink class="route" to="command">
                    <dashboard-icon :size="48"/>
                    <span class="caption">Commands</span>
                </RouterLink>
                <RouterLink class="route" to="message">
                    <card-icon :size="48"/>
                    <span class="caption">Message</span>
                </RouterLink>
                <RouterLink class="route" to="games">
                    <slotmachine-icon :size="48"/>
                    <span class="caption">Games</span>
                </RouterLink>
                <RouterLink class="route" to="trade">
                    <compare-icon :size="48"/>
                    <span class="caption">Trade</span>
                </RouterLink>
        </nav>
        </div>
    </header>
    <div class="row m-0 p-3" style="height: calc(100% - 150px)">
        <div class="col-4 p-0 rounded border bg-primary" style="--bs-bg-opacity: var(--custom-bg-opacity)">
            <RouterView />
        </div>
        <div class="col-8 d-none d-lg-block" id="twitchEmbed"></div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            collapseNav: true
        }
    },
    computed: {
        ...mapState(useUserInfoStore, ['userInfo'])
    },
    methods: {},
    async mounted() {
        var options = {
            width: 1280 + 300,
            height: 720,
            channel: 'blasaj'
        }

        new Twitch.Embed('twitchEmbed', options)
    },
}
</script>

<style scoped>
header {
    background-color: #00000027;
}

nav {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-basis: 100%;
    flex-direction: column;
    overflow: hidden;
    transition: 1s;
    height: 5rem;
    align-items: center;
}

/*
  Burger Menu
*/

#menu_toggle:not(:checked) ~ nav {
    height: 0px;
}

#menu_toggle {
    display: inline-block;
    flex-grow: 1;
}

#menu_toggle {
    opacity: 0;
}
#menu_toggle:checked + .menu_btn > span {
    transform: rotate(45deg);
}
#menu_toggle:checked + .menu_btn > span::before {
    top: 0;
    transform: rotate(0deg);
}
#menu_toggle:checked + .menu_btn > span::after {
    top: 0;
    transform: rotate(90deg);
}
#menu_toggle:checked ~ .menu_box {
    left: 0 !important;
}

.menu_btn {
    width: 26px;
    height: 26px;
    cursor: pointer;
    z-index: 1;
    order: -1;
    left: 5px;
    top: 10px;
}
.menu_btn > span,
.menu_btn > span::before,
.menu_btn > span::after {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: var(--color-text);
    transition-duration: 0.25s;
}
.menu_btn > span::before {
    content: '';
    top: -8px;
}
.menu_btn > span::after {
    content: '';
    top: 8px;
}

/*
 Burger Menu End
*/

nav a.router-link-exact-active {
    text-decoration: underline;
    color: white;
}

nav a {
    display: flex;
    padding: 0 1rem;
    font-size: 1.5rem;
    text-decoration: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

nav .caption {
    margin-top: -1.3rem;
}

nav a, nav a:visited {
    color: var(--color-text);
}

nav a:first-of-type {
    border: 0;
}

.wrapper div {
    flex-grow: 2;
}

#profile_picture {
    height: 50px;
    border-radius: 25px;
}

#profile_info {
    display: flex;
    align-items: center;
}

#profile_info div {
    display: flex;
    flex-direction: column;
}

#profile_info #username {
    font-size: 1.5rem;
    line-height: 1.4rem;
}

#twitchEmbed iframe {
    width: 100% !important;
}

#content .side {
    height: 1000px;
    background-color: #ffffff27;
    flex-grow: 1;
    margin: 1rem;
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem;
}

@media (min-width: 1024px) {
    header .wrapper {
        display: flex;
        margin-left: 2rem;
        justify-content: flex-start;
    }

    .wrapper div {
        flex-grow: unset;
    }

    nav {
        font-size: 1rem;
        order: unset;
        flex-basis: unset;
        flex-direction: row;
        display: flex;
        transition: none;
    }

    nav a {
        border-left: 1px solid var(--color-text);
    }

    #menu_toggle {
        display: none;
    }

    #menu_toggle:not(:checked) ~ nav {
        height: unset;
    }

    .menu_btn {
        display: none;
    }

    #content {
        height: calc(100% - 150px);
    }
}
</style>
