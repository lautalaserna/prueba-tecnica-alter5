# Prueba técnica para Alter5 de Lautaro Laserna
Este proyecto es una aplicación front-end desarrollada con el framework [**Next.js**](https://nextjs.org/) y tecnologías tales como [**TailwindCSS**](https://tailwindcss.com/), [**TypeScript**](https://www.typescriptlang.org/) o [**Zustand**](https://zustand-demo.pmnd.rs/). La aplicación interactúa con la API de [dummyJSON](https://dummyjson.com/) y maneja sesión utilizando la librería [js-cookie](https://github.com/js-cookie/js-cookie).

## Requisitos previos
- [**Node.js**](https://nodejs.org/) (versión 16 o superior).  
- [**npm**](https://www.npmjs.com/) o [**yarn**](https://yarnpkg.com/) como gestor de paquetes.

## Configuración del proyecto
Clona este repositorio:
```bash
git clone https://github.com/lautalaserna/prueba-tecnica-alter5.git
cd prueba-tecnica-alter5
```

Instala las dependencias:
```bash
npm install
# o
yarn install
``` 

Crea un archivo **.env** en la raíz del proyecto con las siguientes variables:
```
NEXT_PUBLIC_AUTH_BASE_URL = https://dummyjson.com/auth
NEXT_PUBLIC_PRODUCTS_BASE_URL = https://dummyjson.com/products
```

Ejecuta la aplicación en modo desarrollo:
```bash
npm run dev
# o
yarn dev
```

Una vez ejecutados estos pasos, la aplicación debería iniciar en la direccion: http://localhost:3000

## Autenticación
El proyecto utiliza la API de dummyJSON para realizar la autenticación. Esta misma API nos provee con usuarios para poder ingresar al sistema. Algunos usuarios válidos son:

| Usuario   | Contraseña    |
|-----------|---------------|
| emilys    | emilyspass    |
| noahh     | noahhpass     |
| jamesd    | jamesdpass    |
| emmaj     | emmajpass     |

## Decisiones de diseño
El proyecto utiliza **Next.js** como framework principal, el cual nos provee de funcionalidades como enrutamiento y soporte para renderizado del lado del servidor (SSR), lo que mejora el SEO y el rendimiento de la aplicación.

En esta implementación, el enfoque se centró en el manejo del estado en el cliente para cumplir con los requisitos de la prueba técnica. Por lo tanto, no se utilizó SSR en los componentes que dependen del estado ya que si o si deben estar del lado del cliente. Una posible mejora futura sería trasladar parte de la lógica al servidor y eliminar el manejo de estados en el cliente para aprovechar al máximo las ventajas de SSR que ofrece Next.js.

Debido a esto, se eligió **Zustand** como gestor del estado de la aplicación por las siguientes razones:

- El estado de la aplicación es lo suficientemente complejo como para utilizar un hook nativo de React como lo es useContext.
- La aplicación no tiene un estado muy grande, por lo que no se justifica la implementación de una solución mucho más compleja y robusta como lo es Redux.  

Zustand equilibra simplicidad y flexibilidad, permitiendo gestionar el estado de manera eficiente sin sobrecargar el proyecto con herramientas innecesarias.

## Funcionalidades provistas
- Autenticación de usuario con pantalla de login, manejo de sesión por cookies y rutas protegidas con middleware.
- Barra de navegación con información del usuario logeado y botón de logout.
- Listado de productos con fetching a la API.
- Funcionalidad de agregar un producto con validaciones en el formulario.
- Funcionalidad de eliminar un producto con cartel de confirmación.
- Búsqueda de productos por título, ordenamiento y paginación (requerimientos bonus).
- Aplicación de un debouncer al filtrado por título para no sobrecargar de peticiones a la API.
- Manejo de estados con zustand para productos y filtros.
- Interfaz 100% responsive desarrollada únicamente con tailwind.
- Manejo de errores con sentencias try/catch y renderizado condicional para mostrar los errores en la interfaz.

## Posibles mejoras
- Quitar lógica de estado y pasar funcionalidades al servidor con server actions o server-side props para implementar SSR.
- Implementar testing, tanto a componentes como a la store.