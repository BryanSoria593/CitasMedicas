# CitasMédicas Frontend

## Introducción

Este es la interfaz web del proyecto Citas Médicas desarrollada con Angular 14

## Requerimientos principales

- Node > 14
- npm

## Instalación

Para instalar las dependencias necesarias, ejecute los siguientes comandos:

```bash
npm install
```
## Configuración
Dentro de la ruta 'src\environments\' modificar los archivos 'environment.prod.ts' y 'environment.ts' según sea necesario de la siguiente manera:
```bash
export const environment = {
  production: true,
  api: URL of production API,
  apiCloudinay: URL of production Cloudinary API,
  uploadPresetNameCloudinary: name of the upload preset in Cloudinary,
};
```

## Ejecución

Para ejecutar la aplicación, tenga en cuenta los siguientes comandos:


Este comando ejecutará la aplicación en modo de desarrollo, lo que significa que se reiniciará cada vez que se realice un cambio en el código.

```bash
ng serve
```

Para especificar un puerto:
```bash
ng serve --port=4201
```

## Build

Ejecute ng build para construir el proyecto. Los artefactos de compilación se almacenarán en el directorio dist/.

## Running unit tests

Ejecute `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Ejecute `ng e2e` para ejecutar las pruebas de extremo a extremo a través de una plataforma de su elección. Para utilizar este comando, primero debe añadir un paquete que implemente capacidades de pruebas de extremo a extremo.
