import { useCallback, useEffect, useState } from "react";
import { IconChevron, IconClose } from "./ui";

export function Lightbox({ images, index, onClose, onIndex, alt }) {
  const n = images.length;
  const go = useCallback((d) => onIndex((index + d + n) % n), [index, n, onIndex]);
  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = prev; };
  }, [go, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${alt} image viewer`} onClick={onClose}>
      <div className="mono flex items-center justify-between px-5 py-3 text-white/70">
        <span>{String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        <button onClick={onClose} className="grid h-9 w-9 place-items-center border border-white/30 text-white hover:bg-white hover:text-black" aria-label="Close viewer"><IconClose /></button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6" onClick={(e) => e.stopPropagation()}>
        <img key={index} src={images[index]} alt={`${alt} screenshot ${index + 1}`} className="max-h-full max-w-full object-contain shadow-2xl" style={{ animation: "page-in .35s both" }} />
        {n > 1 && (
          <>
            <button onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/30 bg-black/50 text-white hover:bg-white hover:text-black" aria-label="Previous"><IconChevron dir="l" /></button>
            <button onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/30 bg-black/50 text-white hover:bg-white hover:text-black" aria-label="Next"><IconChevron dir="r" /></button>
          </>
        )}
      </div>
    </div>
  );
}

/** Main viewer + thumbnail rail. Click to open full-size lightbox. */
export function Gallery({ images, alt, portrait = false }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  if (!images.length) return null;
  const go = (d) => setActive((a) => (a + d + images.length) % images.length);

  return (
    <div>
      <div className="group relative overflow-hidden border border-line bg-card">
        <button onClick={() => setOpen(true)} className={`relative block w-full ${portrait ? "py-6" : ""}`} aria-label="Open image full size">
          {/* blurred backdrop keeps odd aspect ratios elegant */}
          <img src={images[active]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl" />
          <img
            key={active}
            src={images[active]}
            alt={`${alt} screenshot ${active + 1}`}
            className={`relative mx-auto block ${portrait ? "max-h-[560px] w-auto" : "max-h-[620px] w-full object-contain"}`}
            style={{ animation: "page-in .45s both" }}
          />
          <span className="mono absolute bottom-3 left-3 bg-ink px-2 py-1 text-paper opacity-0 transition-opacity group-hover:opacity-100">Click to enlarge</span>
        </button>
        {images.length > 1 && (
          <>
            <button onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-line bg-paper/90 opacity-0 transition-opacity hover:bg-ink hover:text-paper focus:opacity-100 group-hover:opacity-100" aria-label="Previous screenshot"><IconChevron dir="l" /></button>
            <button onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-line bg-paper/90 opacity-0 transition-opacity hover:bg-ink hover:text-paper focus:opacity-100 group-hover:opacity-100" aria-label="Next screenshot"><IconChevron dir="r" /></button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(images.length, portrait ? 6 : 6)}, minmax(0, 1fr))` }}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-[16/10] overflow-hidden border bg-card transition-all ${i === active ? "border-ink opacity-100" : "border-line opacity-60 hover:opacity-100"}`}
            >
              <img src={src} alt="" className={`h-full w-full ${portrait ? "object-contain" : "object-cover object-top"}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {open && <Lightbox images={images} index={active} onClose={() => setOpen(false)} onIndex={setActive} alt={alt} />}
    </div>
  );
}
