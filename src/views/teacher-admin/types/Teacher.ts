export interface Teacher {
    id: number;
    name: string;
    lastName: string;
    dni: string;
    subjects: string;
    docReady: boolean;
}

// Para el formulario, no necesitamos el ID (se genera automáticamente)
export type TeacherFormModel = Omit<Teacher, 'id'>;
