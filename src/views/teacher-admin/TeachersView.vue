<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import TeacherForm from './components/TeacherForm.vue';
import TeachersTable from './components/TeachersTable.vue';
import ClearStorageButton from './components/ClearStorageButton.vue';
// Importamos la interfaz desde un archivo común. Usamos la palabra type para indicar que es solo un tipo de
// TypeScript y no una importación real en tiempo de ejecución.
import type { Teacher, TeacherFormModel } from './types/Teacher';

// Estado Reactivo (La base de datos volátil)
const teachersList = ref<Teacher[]>([]);
const teacherToEdit = ref<Teacher | null>(null);

//  --------------------- LOCAL STORAGE --------------------- //
const STORAGE_KEY = 'teachers_data';

onMounted(() => {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (datosGuardados) {
        try {
            teachersList.value = JSON.parse(datosGuardados);
        } catch (error) {
            console.error('Error al leer de LocalStorage:', error);
            teachersList.value = [];
        }
    }
});

// Observa cambios en la lista y escribe en local storage
// { deep : true } es necesario para detectar cambios dentro de los objetos del array
watch(
    teachersList,
    (nuevaLista) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaLista));
    },
    { deep: true }
);

const resetApp = () => {
    teachersList.value = [];
};
//  --------------------------------------------------------- //

const handleSaveTeacher = (data: Teacher | TeacherFormModel) => {
    if ('id' in data) {
        const index = teachersList.value.findIndex((t) => t.id === data.id);
        if (index !== -1) {
            teachersList.value[index] = data as Teacher;
        }
    } else {
        // Si no hay id, es un alta nueva
        teachersList.value.push({
            ...data,
            id: Date.now()
        });
    }
    teacherToEdit.value = null;
};

const deleteTeacher = (teacherId: number) => {
    teachersList.value = teachersList.value.filter((teacher) => teacher.id !== teacherId);
};

const handleEditRequest = (teacher: Teacher) => {
    teacherToEdit.value = { ...teacher };
};
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card elevation="2" class="pa-4 bg-primary">
                <h2 class="text-h5 text-white">Gestión de Profesores</h2>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card title="Registro de Profesor" elevation="10">
                <template v-slot:append>
                    <ClearStorageButton @storage-cleared="resetApp" />
                </template>
                <v-card-text>
                    <TeacherForm :editing-data="teacherToEdit" @add-teacher="handleSaveTeacher" />
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card title="Listado de Profesores" elevation="10">
                <v-card-text>
                    <TeachersTable :teachers="teachersList" @delete-teacher="deleteTeacher" @edit-teacher="handleEditRequest" />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
