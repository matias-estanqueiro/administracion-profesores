<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';

import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import { useAuthStore } from '@/stores/auth';
const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
const authStore = useAuthStore();

import { UserCircleIcon } from 'vue-tabler-icons';
</script>

<template>
    <v-navigation-drawer
        left
        v-model="customizer.Sidebar_drawer"
        elevation="0"
        rail-width="75"
        mobile-breakpoint="960"
        app
        class="leftSidebar"
        :rail="customizer.mini_sidebar"
        expand-on-hover
        width="256"
    >
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <div class="profile">
                <div class="profile-pic profile-pic py-7 px-3">
                    <v-avatar size="45">
                        <UserCircleIcon size="45" color="white" />
                    </v-avatar>
                </div>
                <div class="profile-name d-flex align-center px-3 py-5">
                    <h5 class="text-white font-weight-medium">User</h5>
                </div>
            </div>
            <v-list class="py-6 px-4">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
