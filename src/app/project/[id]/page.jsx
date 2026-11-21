"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FALLBACK_PROJECTS } from "@/app/work/content";
import PageShell from "../../../components/PageShell";

function safeUrl(url) {
  if (!url) return url;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function ProjectPage() {
  const { id } = useParams();
  const router  = useRouter();
  const savedProject = FALLBACK_PROJECTS.find((entry) => entry.id === id);
  const [result, setResult] = useState(null);
  const loadedResult = result?.id === id ? result : null;
  const project = savedProject || loadedResult?.project;
  const loading = !savedProject && !loadedResult;
  const notFound = loadedResult?.status === 404;
  const loadError = loadedResult && !loadedResult.project && !notFound;

  useEffect(() => {
    if (savedProject) return;
    const controller = new AbortController();
    fetch(`/api/works/${encodeURIComponent(id)}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          setResult({ id, status: response.status });
          return;
        }
        setResult({ id, project: await response.json() });
      })
      .catch(() => {
        if (!controller.signal.aborted) setResult({ id, status: 500 });
      });

    return () => controller.abort();
  }, [id, savedProject]);

  // Parse tech/services into array safely
  const servicesData = project?.services || project?.tech;
  let services = [];
  if (Array.isArray(servicesData)) {
    services = servicesData;
  } else if (typeof servicesData === "string") {
    services = servicesData.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  }

  // Parse gallery safely
  let gallery = [];
  if (project?.gallery) {
    if (Array.isArray(project.gallery)) {
      gallery = project.gallery;
    } else if (typeof project.gallery === "string") {
      try {
        gallery = JSON.parse(project.gallery);
      } catch (e) {
        console.error("Failed to parse gallery:", e);
      }
    }
  }

  return (
    <PageShell>
      <div className="project-detail min-h-screen bg-[#080808] text-bone">

        {loading && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-6 h-6 border-2 border-bone/20 border-t-[#e1251b] rounded-full animate-spin" />
          </div>
        )}

        {(notFound || loadError) && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <p className="text-bone/20 text-sm tracking-widest uppercase">{notFound ? "Proyecto no encontrado" : "No se pudo cargar el proyecto"}</p>
            <Link href="/projects" className="text-[#e1251b] text-[11px] tracking-[0.4em] uppercase hover:opacity-70 transition-opacity">
              Volver a proyectos
            </Link>
          </div>
        )}

        {project && (
          <>
            <header className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-8 pt-28 md:grid-cols-2 md:px-16 md:pt-36">
              <div>
                {project.category && (
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#fb9a61]">
                    {project.label || project.category}
                  </p>
                )}
                <h1 className="text-4xl font-black leading-tight tracking-tighter text-bone md:text-6xl">
                  {project.title}
                </h1>
                {project.description && <p className="mt-4 max-w-prose text-base leading-relaxed text-bone/85">{project.description}</p>}
                {(project.client || project.year) && (
                  <p className="mt-3 text-sm text-bone/70">{[project.client, project.year].filter(Boolean).join(" · ")}</p>
                )}
                {project.link && (
                  <a href={safeUrl(project.link)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#e1251b] px-5 py-3 text-sm font-bold text-black hover:bg-[#f0463d] focus-visible:outline-2 focus-visible:outline-offset-4">
                    Visitar sitio <span className="ml-2" aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
              {project.image_url || project.mobile_image_url ? (
                <div className="overflow-hidden rounded-lg border border-bone/15 bg-[#101010]">
                  {/\.(mp4|webm|mov)([?#]|$)/i.test(project.image_url || "") ? (
                    <video src={project.image_url} className="aspect-[1200/630] w-full object-contain" muted loop playsInline autoPlay />
                  ) : (
                    <picture>
                      {project.mobile_image_url && <source media="(max-width: 767px)" srcSet={project.mobile_image_url} />}
                      <img src={project.image_url || project.mobile_image_url} alt="" className="aspect-[1200/630] w-full object-contain" />
                    </picture>
                  )}
                </div>
              ) : null}
            </header>

            {/* ── BODY ── */}
            <div className="px-6 md:px-16 pb-16 pt-5 md:pb-20 md:pt-10 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-[1fr_280px] gap-12 md:gap-20">

                {/* LEFT — description + gallery */}
                <div>
                  {project.context && (
                    <section className="mb-10">
                      <h2 className="mb-4 text-xl font-black tracking-tight text-bone">Contexto y enfoque</h2>
                      <p className="max-w-prose text-base leading-relaxed text-bone/80">{project.context}</p>
                    </section>
                  )}

                  {project.role && (
                    <p className="mb-8 text-sm font-semibold text-bone">Mi participación · {project.role}</p>
                  )}

                  {Array.isArray(project.details) && project.details.length > 0 && (
                    <section className="mb-12">
                      <h2 className="mb-5 text-xl font-black tracking-tight text-bone">Características</h2>
                      <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-bone/75">
                        {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                      </ul>
                    </section>
                  )}

                  {project.review && (
                    <blockquote className="border-l-2 border-[#e1251b]/40 pl-6 mb-12">
                      <p className="text-bone/50 italic text-base leading-relaxed font-serif">"{project.review}"</p>
                    </blockquote>
                  )}
                  {/* Responsive Vistas previas */}
                  {(project.desktop_view_url || project.phone_view_url) && (
                    <div className="mb-12">
                      <h2 className="font-black text-xl text-bone mb-6 tracking-tight">Vistas previas</h2>
                      <div className="flex flex-col gap-6">
                        {project.desktop_view_url && (
                          <div className="w-full rounded-2xl overflow-hidden bg-bone/5 border border-bone/10">
                            <img src={project.desktop_view_url} alt="Vista en escritorio" className="w-full object-cover" />
                          </div>
                        )}
                        {project.phone_view_url && (
                          <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-bone/5 border border-bone/10">
                            <img src={project.phone_view_url} alt="Vista en móvil" className="w-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Gallery */}
                  {gallery && gallery.length > 0 && (
                    <div>
                      <h2 className="font-black text-xl text-bone mb-6 tracking-tight">Galería</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {gallery.map((url, i) => (
                          <div key={i} className="aspect-video rounded-xl overflow-hidden bg-bone/5">
                            {url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') ? (
                              <video
                                src={url}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                muted loop playsInline autoPlay
                              />
                            ) : (
                              <img
                                src={url}
                                alt={`${project.title} ${i + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT — project details sidebar */}
                <div className="md:pt-1">
                  <div className="bg-[#111] border border-bone/5 rounded-2xl p-6 md:sticky md:top-28 flex flex-col gap-6">
                    <h3 className="font-bold text-bone text-base tracking-tight">Detalles del proyecto</h3>

                    {project.client && (
                      <div>
                        <p className="text-[9px] text-bone/30 tracking-[0.4em] uppercase mb-1.5">Cliente</p>
                        <p className="text-bone text-sm font-medium">{project.client}</p>
                      </div>
                    )}

                    {project.year && (
                      <div>
                        <p className="text-[9px] text-bone/30 tracking-[0.4em] uppercase mb-1.5">Año</p>
                        <p className="text-bone text-sm font-medium">{project.year}</p>
                      </div>
                    )}

                    {project.category && (
                      <div>
                        <p className="text-[9px] text-bone/30 tracking-[0.4em] uppercase mb-1.5">Categoría</p>
                        <p className="text-bone/70 text-sm">{project.label || project.category}</p>
                      </div>
                    )}

                    {services.length > 0 && (
                      <div>
                        <p className="text-[9px] text-bone/30 tracking-[0.4em] uppercase mb-2">Áreas del proyecto</p>
                        <ul className="flex flex-col gap-1.5">
                          {services.map((s) => (
                            <li key={s} className="flex items-center gap-2 text-bone/60 text-sm">
                              <span className="w-1 h-1 rounded-full bg-[#e1251b] shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}


                  </div>
                </div>

              </div>
            </div>

            {/* ── CTA ── */}
            <div className="border-t border-bone/5 py-24 px-6 md:px-16 text-center">
              <p className="text-[10px] text-[#e1251b] tracking-[0.5em] uppercase mb-5 font-medium">Hablemos</p>
              <h2 className="font-black tracking-tighter leading-[0.9] mb-8 text-bone" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                ¿Qué quieres<br />
                <span className="ghost-orange italic font-serif">construir?</span>
              </h2>
              <p className="text-bone/30 text-sm font-light mb-10 max-w-md mx-auto leading-relaxed">
                Cuéntame qué necesitas y qué te gustaría lograr con tu proyecto.
              </p>
              <Link
                href="/#contact-section"
                className="inline-flex items-center gap-3 bg-[#e1251b] text-black font-black px-8 py-4 rounded-full text-[11px] uppercase tracking-[0.25em] hover:bg-[#f0463d] transition-colors duration-300"
              >
                Contactar
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
            </div>
          </>
        )}

      </div>
    </PageShell>
  );
}
