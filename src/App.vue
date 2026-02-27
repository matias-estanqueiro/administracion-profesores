<template>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { watch, onMounted } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';

const customizer = useCustomizerStore();

// Función para actualizar el favicon según el tema
const updateFavicon = (theme: string) => {
    const link = (document.querySelector("link[rel*='icon']") as HTMLLinkElement) || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';

    if (theme.startsWith('DARK_')) {
        link.href = '/favicon-white.png';
    } else {
        link.href = '/favicon-black.png';
    }

    document.getElementsByTagName('head')[0].appendChild(link);
};

onMounted(() => {
    updateFavicon(customizer.actTheme);
});

watch(
    () => customizer.actTheme,
    (newTheme) => {
        updateFavicon(newTheme);
    }
);
</script>
