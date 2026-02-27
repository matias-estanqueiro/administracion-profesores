<script setup lang="ts">
import { RouterLink } from 'vue-router';
import LogoIcon from '@/assets/images/logos/logo_white/logo1.png';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="LogoIcon" alt="home" />
        </RouterLink>
    </div>
</template>
