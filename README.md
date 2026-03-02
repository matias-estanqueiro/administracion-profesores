# 🍎 Gestión de Profesores - Vue 3
Este proyecto es un módulo de práctica avanzado desarrollado dentro del ecosistema **MaterialPro VueJs Admin Template**. El objetivo principal fue evolucionar desde los fundamentos de Vue 3 hacia una arquitectura escalable utilizando Pinia y persistencia de datos.

## 🚀 Objetivo
Desarrollar una SPA (Single Page Application) robusta que permita:
1.  **Capturar datos** mediante formularios reactivos con validaciones asíncronas.
2.  **Gestionar el estado global** centralizando la lógica de negocio en un Store.
3.  **Visualizar métricas en tiempo real** mediante Getters computados (Dashboard de estadísticas).
4. **Persistir información** de manera local para garantizar la continuidad de los datos.

## 🛠️ Stack Tecnológico
*  **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API con `<script setup>`).
*  **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto para modelos de datos).
*  **Librería de Componentes:** [Vuetify 3](https://vuetifyjs.com/) (Material Design).
*  **Template Base:** MaterialPro VueJs Admin.
*  **Herramienta de Construcción:** Vite.

## 🌿 Control de Versiones (Ramas)
El proyecto está organizado en ramas que representan las diferentes etapas de maduración del código:
-  `main`: Versión final. Contiene la última funcionalidad implementada con persistencia en LocalStorage, visualización optimizada y utilización de estados globales (pinia).
-  `local-storage-informacion`: Rama enfocada en la implementación de la persistencia de datos en el navegador y sincronización del estado.
-  `sin-persistencia-informacion`: Versión inicial con manejo de información volátil (estado local reactivo que se reinicia al refrescar).
-  `utilizacion-estados-pinia`: Implementación de la gestión de estado global utilizando Pinia, centralizando la lógica de negocio y creando el dashboard de estadísticas.

## 📋 Requerimientos del Modelo
Cada registro de profesor cuenta con los siguientes campos definidos en la interfaz:
-  **Nombre y Apellido:** Strings (Manejados de forma independiente para mayor flexibilidad.).
-  **DNI:** Identificador único validado para formato numérico (String).
-  **Materias:** Listado de materias que dicta (gestionado como string y visualizado mediante Chips dinámicos).
-  **Estado de Documentación:** Booleano (Checkbox) visualizado con semántica de colores (Éxito/Error).

## 📂 Estructura de la Práctica
```
teacher-admin/
├── components/
│   ├── ClearStorageButton.vue  # Acción global para resetear el almacén
│   ├── TeacherForm.vue         # Lógica de captura y validación (Reset con nextTick)
│   └── TeachersTable.vue       # Visualización avanzada con v-data-table y slots
├── stores/
│   └── teacherStore.ts         # Central de Inteligencia (State, Actions, Getters)
├── types/
│   └── Teacher.ts              # Contratos de datos (Interfaces)
└── TeachersView.vue            # Orquestador principal del módulo
```
---
*Nota: Este proyecto forma parte de un proceso de migración de conocimientos desde un entorno Monolítico (Laravel) hacia arquitecturas SPA modernas.*