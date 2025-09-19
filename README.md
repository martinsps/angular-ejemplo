# 📱 Angular Users CRUD App

Una aplicación Angular completa que implementa un sistema CRUD (Create, Read, Update, Delete) de usuarios conectándose a una API externa. La aplicación permite gestionar usuarios con un diseño moderno y responsivo usando Bootstrap.

## 🎯 Características Principales

- **Listado de usuarios** en formato grid con paginación
- **Vista detalle** de cada usuario individual
- **Formulario de creación** de nuevos usuarios
- **Formulario de actualización** reutilizable
- **Eliminación de usuarios** con confirmación
- **Validaciones completas** en formularios
- **Diseño responsivo** con Bootstrap 5
- **Conexión a API externa** (https://peticiones.online/api/users)

## 🏗️ Estructura del Proyecto

```
src/app/
├── components/
│   └── navbar/           # Componente de navegación
├── pages/
│   ├── home/            # Listado de usuarios (GRID)
│   ├── user/            # Detalle de usuario individual
│   └── new-user/        # Formulario (crear/actualizar)
├── services/
│   └── users.service.ts # Servicio para comunicación con API
├── types/
│   └── user.ts          # Interfaces TypeScript
├── app.routes.ts        # Configuración de rutas
└── app.config.ts        # Configuración de la aplicación
```

## 🚀 Cómo Ejecutar el Proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor de desarrollo

```bash
ng serve
```

### 3. Abrir en el navegador

Navega a `http://localhost:4200/` para ver la aplicación.

## 📋 Rutas Disponibles

- **`/home`** - Listado completo de usuarios
- **`/user/:id`** - Detalle de usuario específico
- **`/newuser`** - Formulario para crear usuario
- **`/updateuser/:id`** - Formulario para actualizar usuario

## 🛠️ Tecnologías Utilizadas

- **Angular 20+** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap 5.3.3** - Framework CSS
- **Bootstrap Icons** - Iconografía
- **RxJS** - Programación reactiva
- **Angular Forms** - Formularios reactivos

## 📦 Comandos Disponibles

### Desarrollo

```bash
ng serve          # Servidor de desarrollo
ng build          # Compilar para producción
ng test           # Ejecutar tests unitarios
```

### Generación de código

```bash
ng generate component nombre-componente
ng generate service nombre-servicio
ng generate interface nombre-interfaz
```
