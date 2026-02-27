<script setup lang="ts">
import { MailIcon, UserCircleIcon } from 'vue-tabler-icons';
import { profileDD } from '@/_mockApis/headerData';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" class="profile_popup">
        <template v-slot:activator="{ props }">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <UserCircleIcon size="35" color="white" />
                </v-avatar>
            </v-btn>
        </template>
    </v-menu>
</template>
