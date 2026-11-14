import { useState, useMemo, useCallback, useRef } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Lightbox from "../components/Lightbox"
import {
  galleryCategories,
  galleryItems,
  transformations,
} from "../data/gallery"

const PAGE_SIZE = 9

const spanClasses = {
  normal: "",
  tall: "md:row-span-2",
  wide: "md:col-span-2",
}

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const triggerRef = useRef(null)

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  )

  const visible = filtered.slice(0, visibleCount)

  // Varied sizes only in the "All" view. Filtered views use uniform tiles
  // so no awkward gaps appear.
  const varied = activeCategory === "All"

  const handleCategory = (category) => {
    setActiveCategory(category)
    setVisibleCount(PAGE_SIZE)
  }

  const openLightbox = (index, e) => {
    triggerRef.current = e.currentTarget
    setLightboxIndex(index)
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  return (
    <main>

      {/* Hero */}
      <section className="relative min-h-105 bg-[#05050f]">
        <div className="absolute inset-0 bg-[url('/gallery-hero.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-[#05050f]/75"></div>

        <div className="relative z-10 mx-auto flex min-h-105 max-w-7xl items-center px-6 pt-20">
          <div>
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Inside Strivo
            </p>

            <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase text-white md:text-6xl">
              Gallery
            </h1>

            <p className="font-roboto mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
              Step inside our space, meet the coaches and see the
              community that keeps members coming back.
            </p>
          </div>
        </div>
      </section>


      {/* Filters + Grid */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 max-w-2xl">
            <p className="font-monst text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Life At Strivo
            </p>

            <h2 className="font-monst mt-4 text-3xl font-extrabold uppercase leading-tight text-[#05050f] md:text-5xl">
              Train. Connect. Progress.
            </h2>
          </div>

          {/* Filter tabs */}
          <div
            role="group"
            aria-label="Filter gallery by category"
            className="-mx-6 mb-10 flex gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
          >
            {galleryCategories.map((category) => {
              const active = category === activeCategory
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleCategory(category)}
                  className={`font-monst shrink-0 border px-6 py-3 text-xs font-bold uppercase tracking-wider transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${
                    active
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-[#05050f] text-[#05050f] hover:bg-[#05050f] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          {visible.length === 0 ? (
            <p className="font-roboto py-16 text-center text-gray-500">
              No photos in this category yet.
            </p>
          ) : (
            <ul className="grid auto-rows-70 grid-flow-dense grid-cols-1 gap-4 md:auto-rows-75 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((item, index) => (
                <li
                  key={item.id}
                  className={varied ? spanClasses[item.size] : ""}
                >
                  <button
                    type="button"
                    onClick={(e) => openLightbox(index, e)}
                    aria-label={`Open image: ${item.alt}`}
                    className="group relative block h-full w-full overflow-hidden bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hover overlay */}
                    <span className="absolute inset-0 bg-[#05050f]/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"></span>

                    {/* Category label: shown on hover, and always on touch screens */}
                    <span className="font-monst absolute bottom-4 left-4 border-l-4 border-red-500 bg-[#05050f] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                      {item.category}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Load more */}
          {filtered.length > 0 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <p
                aria-live="polite"
                className="font-roboto text-sm text-gray-500"
              >
                Showing {visible.length} of {filtered.length} photos
              </p>

              {visibleCount < filtered.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="font-monst border border-[#05050f] px-10 py-4 text-sm font-bold uppercase tracking-wide text-[#05050f] transition duration-300 hover:bg-[#05050f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  Load More
                </button>
              )}
            </div>
          )}

        </div>
      </section>


      {/* Member Transformations */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-widest text-red-500">
                Member Journeys
              </p>

              <h2 className="font-monst mt-4 max-w-xl text-3xl font-extrabold uppercase leading-tight text-[#05050f] md:text-5xl">
                Progress You Can See.
              </h2>
            </div>

            <p className="font-roboto max-w-xl text-lg leading-relaxed text-gray-600">
              Every fitness journey is different. These stories show what
              commitment, coaching and community can look like over time.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {transformations.map((t) => (
              <article key={t.id} className="border border-gray-200 bg-white">

                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <figure className="relative aspect-4/3 bg-gray-200 sm:aspect-3/4">
                    <img
                      src={t.before}
                      alt={t.beforeAlt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <figcaption className="font-monst absolute left-0 top-4 bg-[#05050f] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                      Before
                    </figcaption>
                  </figure>

                  <figure className="relative aspect-4/3 bg-gray-200 sm:aspect-3/4">
                    <img
                      src={t.after}
                      alt={t.afterAlt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <figcaption className="font-monst absolute left-0 top-4 bg-red-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                      After
                    </figcaption>
                  </figure>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-monst text-base font-bold uppercase text-[#05050f]">
                      {t.label}
                    </h3>
                    <span className="font-monst border border-gray-300 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Demo
                    </span>
                  </div>

                  <p className="font-roboto mt-3 leading-relaxed text-gray-600">
                    {t.caption}
                  </p>

                  {t.timeframe && (
                    <p className="font-monst mt-4 text-xs font-bold uppercase tracking-wider text-red-500">
                      {t.timeframe}
                    </p>
                  )}

                  {t.quote && (
                    <blockquote className="font-roboto mt-4 border-l-4 border-red-500 pl-4 italic text-gray-700">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  )}
                </div>

              </article>
            ))}
          </div>

          <p className="font-roboto mt-10 max-w-3xl text-sm leading-relaxed text-gray-500">
            Sample content for demonstration only. Individual results vary
            and depend on many factors. 
          </p>

        </div>
      </section>


      {/* CTA */}
      <section className="bg-[#05050f] px-6 pb-24 pt-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden bg-[#05050f]">
          <div className="absolute inset-0 bg-[url('/dumbbell.avif')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-[#05050f]/75"></div>

          <div className="relative z-10 px-8 py-20 text-center md:px-16 md:py-28">
            <p className="font-monst text-sm font-bold uppercase tracking-widest text-red-500">
              Your First Session Awaits
            </p>

            <h2 className="font-monst mx-auto mt-5 max-w-3xl text-3xl font-extrabold uppercase leading-tight text-white md:text-5xl">
              Come And Train With Us
            </h2>

            <p className="font-roboto mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Book a class, meet the coaches and see for yourself what
              training at Strivo feels like.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/booking"
                className="font-monst inline-flex items-center justify-center bg-red-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-600"
              >
                Book A Class
              </Link>

              <Link
                to="/contact"
                className="font-monst inline-flex items-center justify-center border border-white/60 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#05050f]"
              >
                Talk To Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox (uses the currently filtered photos) */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </main>
  )
}

export default Gallery