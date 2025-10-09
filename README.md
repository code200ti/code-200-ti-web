Proyecto [Next.js](https://nextjs.org) inicializado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Requisitos

- Node.js >= 18.x (recomendado 20.x)
- npm (o pnpm/yarn)

## Inicio rápido

Inicia el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la app.

Puedes empezar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente.

Este proyecto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar fuentes como [Geist](https://vercel.com/font).

## Scripts

- `dev`: Next dev con Turbopack
- `build`: Next build con Turbopack
- `start`: Next start
- `lint`: ESLint

## Tecnologías principales

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- ESLint 9
  
Consulta versiones exactas en `package.json`.

## Variables de entorno

Crea un archivo `.env.local` (no se sube a git) con las variables que uses, por ejemplo:

```
NEXT_PUBLIC_API_URL=
```

## Build y despliegue

Para generar build de producción:

```bash
npm run build
npm start
```

Despliegue recomendado: Vercel. Configura variables en el panel del proyecto.

## Más información

To learn more about Next.js, take a look at the following resources:

- [Documentación Next.js](https://nextjs.org/docs) - características y API.
- [Curso interactivo Next.js](https://nextjs.org/learn) - tutorial.

También puedes revisar el [repositorio de Next.js](https://github.com/vercel/next.js).

## Deploy en Vercel

La forma más sencilla de desplegar una app Next.js es usando [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Revisa la [documentación de despliegue](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
