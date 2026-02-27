<script setup lang="ts">
import { PencilIcon, TrashIcon } from 'vue-tabler-icons';
import type { Teacher } from '../types/Teacher';

const props = defineProps<{
    teachers: Teacher[];
}>();

const emit = defineEmits<{
    (e: 'delete-teacher', teacherId: number): void;
    (e: 'edit-teacher', teacher: Teacher): void;
}>();

const handleIdDelete = (id: number) => {
    emit('delete-teacher', id);
};

const handleEdit = (teacher: Teacher) => {
    emit('edit-teacher', teacher);
};

const headers = [
    { title: 'Nombre', key: 'name', sortable: true },
    { title: 'Apellido', key: 'lastName', sortable: true },
    { title: 'DNI', key: 'dni', sortable: true },
    { title: 'Materias', key: 'subjects', sortable: false },
    { title: 'Estado Doc.', key: 'docReady', align: 'center' as const },
    { title: 'Acciones', key: 'actions', sortable: false, align: 'center' as const }
];
</script>

<template>
    <v-data-table
        :headers="headers"
        :items="props.teachers"
        :items-per-page="10"
        items-per-page-text="Filas por página"
        no-data-text="No hay registros disponibles"
        class="border rounded-sm"
        hover
    >
        <template v-slot:[`item.subjects`]="{ item }">
            <div class="d-flex flex-wrap gap-1">
                <v-chip
                    v-for="(materia, index) in (item.raw.subjects || '').split(',').filter((s: string) => s.trim())"
                    :key="index"
                    size="x-small"
                    variant="tonal"
                    color="primary"
                    class="ma-1"
                >
                    {{ materia.trim() }}
                </v-chip>

                <span v-if="!item.raw.subjects" class="text-caption text-grey-lighten-1 italic"> Sin materias </span>
            </div>
        </template>
        <template v-slot:[`item.docReady`]="{ item }">
            <v-chip :color="item.raw.docReady ? 'success' : 'error'" dark>{{ item.raw.docReady ? 'Listo' : 'Pendiente' }}</v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="blue" text @click="handleEdit(item.raw)"><PencilIcon /></v-btn>
            <v-btn color="red" text @click="handleIdDelete(item.raw.id)"><TrashIcon /></v-btn>
        </template>
    </v-data-table>
</template>
