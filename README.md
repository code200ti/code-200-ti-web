# Code 200 TI

Sitio web profesional desarrollado con Next.js.

## Requisitos

- Node.js >= 18.x (recomendado 20.x)
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts

- `dev`: Servidor de desarrollo
- `build`: Build de producción
- `start`: Servidor de producción
- `lint`: Ejecutar ESLint

## Tecnologías

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4

## Variables de entorno

Crea un archivo `.env.local` con las variables necesarias:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GOOGLE_VERIFICATION=
```

## Despliegue

Despliegue recomendado: [Vercel](https://vercel.com). Configura las variables de entorno en el panel del proyecto.
