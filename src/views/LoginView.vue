<script setup>
    import oidc from '../oidc'
</script>

<template>
    <div class="d-flex justify-content-center align-items-center h-100 flex-column text-center text-white">
        👁️👄👁️<br>
        You are not logged in. 😮
        <button class="btn btn-primary border-0" @click="oidc.authorize()" style="background-color: #9146FF"><twitch-icon></twitch-icon> Login with Twitch</button>
    </div>
</template>

<script>
</script>
