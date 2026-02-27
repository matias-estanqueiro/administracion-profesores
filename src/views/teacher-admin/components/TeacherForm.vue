<script setup lang="ts">
import { ref, watch } from 'vue';
import type { VForm } from 'vuetify/components';
import type { Teacher, TeacherFormModel } from '../types/Teacher';

const props = defineProps<{
    editingData: Teacher | null;
}>();

// Eventos para comunicar con el componente padre (TeachersView.vue)
const emit = defineEmits<{
    (e: 'add-teacher', teacher: TeacherFormModel): void;
}>();

// Referencia al formulario para posibles validaciones
const formRef = ref<VForm | null>(null);

// Estado reactivo del formulario (v-model)
const form = ref<TeacherFormModel>({
    name: '',
    lastName: '',
    dni: '',
    subjects: '',
    docReady: false
});

// WATCH: Observa cambios en la Prop 'editingData'
watch(
    // La fuente: la Prop que llega del padre para inspeccionar
    () => props.editingData,
    // El callback que se ejecuta cuando 'editingData' cambia
    (newValue) => {
        if (newValue) {
            // Si llega un profesor para editar, llenamos el formulario local
            form.value = { ...newValue };
        }
    },
    // Opciones del watch: 'deep' para observar cambios profundos en objetos
    // (aunque en este caso no es estrictamente necesario)
    { deep: true }
);

// Reglas de validación para los campos del formulario
const rules = {
    required: (value: string) => !!value || 'Este campo es obligatorio',
    minChars: (value: string) => (value && value.length >= 3) || 'Mínimo 3 caracteres',
    dniFormat: (value: string) => /^\d+$/.test(value) || 'El DNI debe contener solo números'
};

// Envío del formulario
const submitForm = async () => {
    const { valid } = (await formRef.value?.validate()) ?? { valid: false };

    if (valid) {
        // Emitimos los datos (si es edición, el objeto ya tendrá el ID incluido en el spread)
        emit('add-teacher', { ...form.value });
        resetForm();
    }
};

const resetForm = () => {
    // Reset a través de Vuetify
    formRef.value.reset();
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
                <v-text-field v-model="form.lastName" label="Apellido" :rules="[rules.required]" variant="outlined"></v-text-field>
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
