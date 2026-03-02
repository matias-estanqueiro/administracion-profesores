import { defineStore } from 'pinia';
//  ref = para crear variables reactivas,
// watch =  para observar cambios en esas variables
// computed = para crear propiedades computadas (que son recalculadas automáticamente cuando cambian las dependencias)
import { ref, watch, computed } from 'vue';
import type { Teacher, TeacherFormModel } from '@/views/teacher-admin/types/Teacher';

// ID del store = 'teacher'
export const useTeacherStore = defineStore('teacher', () => {
    // --- STATE (Estado) ---
    const teachers = ref<Teacher[]>([]);
    const STORAGE_KEY = 'lista_profesores_v1';

    // --- GETTERS (Propiedades Computadas) ---
    // Cantidad total de profesores
    const totalTeachers = computed(() => teachers.value.length);

    // Cantidad de profesores con documentación entregada
    const docsReadyCount = computed(() => teachers.value.filter((t: Teacher) => t.docReady).length);

    // Porcentaje de profesores con documentación entregada
    const docsReadyPercentage = computed(() => {
        if (totalTeachers.value === 0) return 0;
        return Math.round((docsReadyCount.value / totalTeachers.value) * 100);
    });

    // --- ACTIONS (Acciones / Métodos) ---
    // Cargar datos desde LocalStorage
    const loadFromStorage = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) teachers.value = JSON.parse(saved);
    };

    // Guardar o actualizar un profesor
    const saveTeacher = (data: TeacherFormModel, id?: number) => {
        if (id) {
            // Actualizar un profesor existente
            const index = teachers.value.findIndex((t: Teacher) => t.id === id);
            if (index !== -1) {
                teachers.value[index] = { ...data, id };
            }
        } else {
            // Crear un nuevo profesor (generamos un ID único usando Date.now())
            const newTeacher: Teacher = {
                ...data,
                id: Date.now()
            };
            teachers.value.push(newTeacher);
        }
    };

    // Eliminar un profesor por ID
    const deleteTeacher = (id: number) => {
        teachers.value = teachers.value.filter((t: Teacher) => t.id !== id);
    };

    // Limpiar toda la lista de profesores
    const clearAll = () => {
        teachers.value = [];
    };

    // Actualizar LocalStorage cada vez que se modifique la lista de profesores
    // o se edite un profesor (deep: true para detectar cambios dentro de objetos)
    watch(
        teachers,
        (newVal) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
        },
        { deep: true }
    );

    return {
        teachers,
        totalTeachers,
        docsReadyCount,
        docsReadyPercentage,
        loadFromStorage,
        saveTeacher,
        deleteTeacher,
        clearAll
    };
});
