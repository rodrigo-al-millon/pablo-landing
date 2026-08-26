import { lazy, Suspense } from "react";

// Envoltorio de isla: la landing es Astro puro, así que Agentation entra como
// el único componente React del sitio. El guard de import.meta.env.DEV va acá
// dentro (no solo en el layout) porque Astro compila toda isla con client:only
// aunque el layout no la renderice: así Vite elimina el import dinámico en el
// build y el bundle de producción no se lleva los 390K del paquete.
const Agentation = import.meta.env.DEV
  ? lazy(() => import("agentation").then((m) => ({ default: m.Agentation })))
  : null;

export default function AgentationDev() {
  if (!Agentation) return null;
  return (
    <Suspense fallback={null}>
      <Agentation />
    </Suspense>
  );
}
