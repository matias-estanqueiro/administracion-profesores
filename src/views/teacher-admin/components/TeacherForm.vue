<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { VForm } from 'vuetify/components';
import type { Teacher, TeacherFormModel } from '../types/Teacher';

const props = defineProps<{
    editingData: Teacher | null;
}>();

// Eventos para comunicar con el componente padre (TeachersView.vue)
const emit = defineEmits<{
    (e: 'add-teacher', teacher: TeacherFormModel): void;
    (e: 'saved'): void;
}>();

const initialState: TeacherFormModel = {
    name: '',
    lastName: '',
    dni: '',
    subjects: '',
    docReady: false
};

// Referencia al formulario para posibles validaciones
const formRef = ref<VForm | null>(null);
// Estado reactivo del formulario (v-model)
const form = ref<TeacherFormModel>({ ...initialState });

const resetForm = async () => {
    form.value = { ...initialState };
    // Esperamos a que el DOM se actualice antes de resetear validaciones
    await nextTick();
    // Limpiar validaciones (si el formulario está referenciado)
    if (formRef.value) {
        formRef.value.resetValidation();
    }
};

const submitForm = async () => {
    // Validación antes del envío
    const { valid } = await formRef.value.validate();

    if (valid) {
        emit('add-teacher', { ...form.value });
        resetForm();
        emit('saved');
    }
};

// WATCH: Observa cambios en la Prop 'editingData'
watch(
    () => props.editingData,
    (newData) => {
        if (newData) {
            form.value = { ...newData };
        } else {
            resetForm();
        }
    },
    { deep: true }
);

// Reglas de validación para los campos del formulario
const rules = {
    required: (value: string) => !!value || 'Este campo es obligatorio',
    dniFormat: (value: string) => !value || /^\d+$/.test(value) || 'Solo números',
    minChars: (value: string) => (value && value.length >= 3) || 'Mínimo 3 caracteres'
};
</script>

<template>
    <v-form ref="formRef" @submit.prevent="submitForm">
        <v-row>
            <v-col cols="12">
                <v-text-field
                    v-model="form.name"
                    label="Nombre"
                    :rules="[rules.required, rules.minChars]"
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field
                    v-model="form.lastName"
                    label="Apellido"
                    :rules="[rules.required, rules.minChars]"
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field v-model="form.dni" label="DNI" :rules="[rules.required, rules.dniFormat]" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-text-field v-model="form.subjects" label="Materias" :rules="[rules.required]" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-checkbox v-model="form.docReady" label="Documentación Completa"></v-checkbox>
            </v-col>

            <v-col cols="12">
                <v-btn color="primary" block type="submit"> {{ props.editingData ? 'Actualizar Profesor' : 'Registrar Profesor' }} </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
