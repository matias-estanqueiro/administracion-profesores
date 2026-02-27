<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Darklogo from '@/assets/images/logos/logo_dark/logo2.png';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="Darklogo" alt="home" />
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    img {
        width: 160px;
    }
}
</style>
