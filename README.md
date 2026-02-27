# 🍎 Gestión de Profesores - Vue 3
Este proyecto es un módulo de práctica desarrollado dentro del ecosistema MaterialPro VueJs Admin Template. El objetivo es aplicar los fundamentos de Vue 3, TypeScript y Vuetify mediante un sistema de gestión de profesores.

## 🚀 Objetivo
Desarrollar una interfaz funcional que permita:
1.  **Capturar datos** a través de un formulario reactivo con validaciones.
2.  **Gestionar el estado** mediante componentes desacoplados y comunicación vía props/emits.
3.  **Visualizar la información** vanzada utilizando tablas inteligentes `(v-data-table)` con paginación, ordenamiento y formateo dinámico.

## 🛠️ Stack Tecnológico
*  **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API con `<script setup>`).
*  **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto para modelos de datos).
*  **Librería de Componentes:** [Vuetify 3](https://vuetifyjs.com/) (Material Design).
*  **Template Base:** MaterialPro VueJs Admin.
*  **Herramienta de Construcción:** Vite.

## 🌿 Control de Versiones (Ramas)
El proyecto está organizado en ramas que representan las diferentes etapas de maduración del código:
-  `main`: Versión final. Contiene la última funcionalidad implementada con persistencia en LocalStorage y visualización optimizada.
-  `local-storage-informacion`: Rama enfocada en la implementación de la persistencia de datos en el navegador y sincronización del estado.
-  `sin-persistencia-informacion`: Versión inicial con manejo de información volátil (estado local reactivo que se reinicia al refrescar).

## 📋 Requerimientos del Modelo
Cada registro de profesor cuenta con los siguientes campos definidos en la interfaz:
-  **Nombre y Apellido:** Strings (capturados por separado).
-  **DNI:** Identificador único (String).
-  **Materias:** Listado de materias que dicta (gestionado como string y visualizado mediante Chips dinámicos).
-  **Estado de Documentación:** Booleano (Checkbox) para verificar la entrega de papeles.

## 📂 Estructura de la Práctica
```
teacher-admin/
├── components/
│   ├── ClearStorageButton.vue  # Utilidad de limpieza de LocalStorage
│   ├── TeacherForm.vue         # Formulario de alta y edición
│   └── TeachersTable.vue       # Tabla con v-data-table y slots personalizados
├── types/
│   └── Teacher.ts              # Definición de la interfaz TypeScript
└── TeachersView.vue            # Componente orquestador (Vista principal)
```
---
*Nota: Este proyecto forma parte de un proceso de migración de conocimientos desde un entorno Monolítico (Laravel) hacia arquitecturas SPA modernas.*