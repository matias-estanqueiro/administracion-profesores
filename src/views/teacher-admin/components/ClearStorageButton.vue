<script setup lang="ts">
import { DatabaseOffIcon } from 'vue-tabler-icons';

const emit = defineEmits(['storage-cleared']);

const clearAllData = () => {
    localStorage.removeItem('teachers_data');
    emit('storage-cleared');
};
</script>

<template>
    <v-btn color="primary" @click="clearAllData"> <DatabaseOffIcon class="mr-2" /> Limpiar Local Storage </v-btn>
</template>
