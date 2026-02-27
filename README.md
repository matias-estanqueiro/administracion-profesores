# 🍎 Gestión de Profesores - Vue 3
Este proyecto es un módulo de práctica desarrollado dentro del ecosistema **MaterialPro VueJs Admin Template**. El objetivo es aplicar los fundamentos de Vue 3, TypeScript y Vuetify mediante un sistema de registro de profesores con datos volátiles.

## 🚀 Objetivo
Desarrollar una interfaz funcional que permita:
1.  **Capturar datos** a través de un formulario reactivo.
2.  **Gestionar el estado** local de una lista de objetos (Profesores).
3.  **Visualizar la información** de manera organizada en una tabla de componentes UI.

## 🛠️ Stack Tecnológico

*  **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API con `<script setup>`).
*  **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto para modelos de datos).
*  **Librería de Componentes:** [Vuetify 3](https://vuetifyjs.com/) (Material Design).
*  **Template Base:** MaterialPro VueJs Admin.
*  **Herramienta de Construcción:** Vite.

## 📋 Requerimientos del Modelo

Cada registro de profesor cuenta con los siguientes campos:

-  **Nombre y Apellido:** Strings.
-  **DNI:** Identificador único (String/Number).
-  **Materias:** Listado de materias que dicta.
-  **Estado de Documentación:** Booleano (Checkbox) para verificar la entrega de papeles.

## 📂 Estructura de la Práctica

-  **Vista:**  `src/views/gestion-profesores/ProfesoresView.vue`
-  **Ruta:** Configurada en el Router central para acceso desde el sidebar.
-  **Estado:** Reactividad local mediante `ref()` (Sin persistencia en base de datos por el momento).

---
*Nota: Este proyecto forma parte de un proceso de migración de conocimientos desde un entorno Monolítico (Laravel) hacia arquitecturas SPA modernas.*