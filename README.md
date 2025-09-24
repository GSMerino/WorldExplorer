# Prueba tecnica Front

## Herramientas

Esta es una aplicación web para explorar diferentes banderas y su descripcion. Utiliza las siguientes librerias: w

* React + vite + Typescript: Utilizamos una combinacion que utiliza React, una biblioteca de JavaScript para construir interfaces de usuario, y Vite, una herramienta de compilacion y desarrollo web muy rápida.

* react-router-dom: Es una libreria que se usa en React para gestionar la navegacion y el enrutamiento en una aplicacion.

* zustand: Es una biblioteca minimalista y potente de gestión de estados para aplicaciones React y React Native, conocida por su simplicidad, API basada en ganchos y un tamaño muy pequeño.

* Tailwind css: Es un framework de CSS "utility-first" que proporciona un conjunto de clases predefinidas y de bajo nivel, permitiendo a los desarrolladores construir rápidamente interfaces de usuario personalizadas directamente en el HTML

* framer-motion: Es una libreria de animación para React donde nos permite crear animaciones fluidas y personalizadas en la aplicaciones web.

* Material UI: biblioteca de componentes de interfaz de usuario (UI) de código abierto para React, basada en los principios de diseño de Google Material Design.



## Instalación

1. Crea una carpeta

2. Clona este repositorio:

```
git clone https://github.com/GSMerino/WorldExplorer.git <NOMBRE_DEL_PROYECTO>
cd <NOMBRE_DEL_PROYECTO>

```

3. Instalacion de dependencias:

4. abre consola y en tu proyecto ejecuta el siguiente comando:


``` 
npm install 

```


## Modo de Desarrollo

Para ejecutar el servidor en modo de desarrollo, utiliza:

```
npm run dev

```

## Justificaciònes
La estructura de la aplicación se basa en una arquitectura modular y escalable, donde cada vista y componente tiene una responsabilidad clara. Se utilizó React Router para manejar rutas dinámicas como los detalles por país, lo que permite una navegación fluida sin recargar la página. El estado global se gestiona con Zustand, una solución ligera que evita la complejidad de Redux y facilita el acceso a los datos desde cualquier parte de la app.

El diseño visual se construyó con Tailwind CSS y Material UI, combinando velocidad de desarrollo con componentes accesibles y estilizados. Para mejorar la experiencia del usuario, se integraron animaciones con Framer Motion, haciendo que las transiciones entre vistas y elementos sean más fluidas.
La arquitectura está pensada para facilitar el mantenimiento, la reutilización de componentes y la incorporación de nuevas funcionalidades sin romper la estructura existente.




## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias para mejorar el template, no dudes en comunicarla.
