<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTeacherStore } from './stores/teacherStore';
import TeacherForm from './components/TeacherForm.vue';
import TeacherTable from './components/TeachersTable.vue';
import ClearStorageButton from './components/ClearStorageButton.vue';
import type { Teacher } from './types/Teacher';

// Accedemos al store para usar sus datos y métodos
const teacherStore = useTeacherStore();
const teacherToEdit = ref<Teacher | null>(null);

onMounted(() => {
    teacherStore.loadFromStorage();
});

const handleEditRequest = (teacher: Teacher) => {
    teacherToEdit.value = { ...teacher };
};

const resetEdit = () => {
    teacherToEdit.value = null;
};
</script>

<template>
    <v-row class="mb-4">
        <v-col cols="12" md="4">
            <v-card color="primary">
                <v-card-text class="d-flex justify-space-between align-center">
                    <div class="text-h5 mb-2 font-weight-medium">Total Profesores:</div>
                    <div class="text-h4 font-weight-bold">{{ teacherStore.totalTeachers }}</div>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="4">
            <v-card color="primary">
                <v-card-text class="d-flex justify-space-between align-center">
                    <div class="text-h5 mb-2 font-weight-medium">Documentación Entregada:</div>
                    <div class="text-h4 font-weight-bold">{{ teacherStore.docsReadyCount }}</div>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="4">
            <v-card color="primary">
                <v-card-text class="d-flex justify-end align-center flex-column">
                    <v-progress-linear :model-value="teacherStore.docsReadyPercentage" color="white" height="8" rounded></v-progress-linear>
                    <div class="text-h4 w-100 text-right">{{ teacherStore.docsReadyPercentage }}%</div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
            <v-card title="Registro de Profesor" elevation="10">
                <template v-slot:append>
                    <ClearStorageButton @storage-cleared="teacherStore.clearAll" />
                </template>
                <v-card-text>
                    <TeacherForm
                        :editing-data="teacherToEdit"
                        @add-teacher="(data) => teacherStore.saveTeacher(data, teacherToEdit?.id)"
                        @saved="resetEdit"
                    />
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <TeacherTable
                :teachers="teacherStore.teachers"
                @delete-teacher="teacherStore.deleteTeacher"
                @edit-teacher="handleEditRequest"
            />
        </v-col>
    </v-row>
</template>
