import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Hand,
  Maximize2,
  MapPin,
  Minimize2,
} from "lucide-react";
import Images from "@/lib/imports";
import { appConfigs } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Section } from "./section";

type View = {
  label: string;
  src: string;
  alt: string;
  /** How far around the photo reaches, in degrees. Sets how curved it feels. */
  arcDeg: number;
  /** Pin on the photo, as fractions of its width and height (from the top). */
  pin?: { x: number; y: number; label: string };
};

const views: View[] = [
  {
    label: "Across the plot",
    src: Images.SitePanoramaWide,
    alt: "Panorama of the association's plot on Bangaie Road: open grassland with a stream running through it, a boundary wall on the left and the town beyond.",
    arcDeg: 150,
    pin: { x: 0.885, y: 0.62, label: "LADA plot marker" },
  },
  {
    label: "Along the wall",
    src: Images.SitePanoramaWall,
    alt: "The plot's boundary wall seen from inside the site, with banana trees behind it.",
    arcDeg: 120,
  },
];

const { lengthM, widthM } = appConfigs.site;
const plotArea = Math.round(lengthM * widthM).toLocaleString("en-NG");

/**
 * Full-bleed, cinematic panorama of the site. The photo is wrapped around the
 * inside of a cylinder and rendered with WebGL, so turning to look around
 * bends the scene like a real view rather than sliding a flat picture.
 */
export function SitePanorama() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-brand-ink text-brand-paper [&_.prose-lada]:text-brand-paper/70">
      <Section className="pb-10 pt-20 md:pb-12 md:pt-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">On the ground</p>
            <h3 className="display text-3xl md:text-5xl">Stand on the site</h3>
            <p className="prose-lada mt-4 text-pretty">
              The plot as you would see it standing in the middle of it. Drag
              or swipe to turn and look around.
            </p>
            <dl className="mt-8 grid max-w-md grid-cols-3 gap-6 border-t border-brand-paper/15 pt-6">
              {[
                ["Length", `${lengthM} m`],
                ["Width", `${widthM} m`],
                ["Area", `${plotArea} m²`],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-brand-paper/60">
                    {term}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl tabular-nums md:text-3xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex gap-2" role="tablist" aria-label="Panorama view">
            {views.map((v, i) => (
              <button
                key={v.label}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "h-9 rounded-sm border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-paper/60",
                  active === i
                    ? "border-brand-paper bg-brand-paper text-brand-ink"
                    : "border-brand-paper/25 text-brand-paper/80 hover:border-brand-paper/60 hover:text-brand-paper"
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Stage key={active} view={views[active]} />
    </div>
  );
}

const vertexShader = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// For each pixel, cast a ray from the camera and find where it meets the
// inside of the cylinder the photo is wrapped on. Then grade it like film.
const fragmentShader = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform float uYaw, uPitch, uTanV, uArc, uHMax, uTime, uFade, uGrain;

void main() {
  vec2 p = gl_FragCoord.xy / uRes * 2.0 - 1.0;
  float aspect = uRes.x / uRes.y;
  vec3 d = normalize(vec3(p.x * uTanV * aspect, p.y * uTanV, 1.0));
  float cp = cos(uPitch), sp = sin(uPitch);
  d = vec3(d.x, d.y * cp + d.z * sp, -d.y * sp + d.z * cp);

  float theta = atan(d.x, d.z) + uYaw;
  float h = d.y / length(d.xz);
  float u = theta / uArc + 0.5;
  float v = 0.5 + h / (2.0 * uHMax);
  vec3 col = texture2D(uTex, vec2(u, 1.0 - v)).rgb;

  // Fade out softly past the edges of the photo.
  col *= smoothstep(0.0, 0.015, u) * smoothstep(1.0, 0.985, u)
       * smoothstep(0.0, 0.02, v) * smoothstep(1.0, 0.98, v);

  // A gentle S-curve and a touch of warmth.
  col = mix(col, col * col * (3.0 - 2.0 * col), 0.3);
  col *= vec3(1.04, 1.0, 0.95);

  // Vignette.
  vec2 q = gl_FragCoord.xy / uRes - 0.5;
  q.x *= mix(1.0, aspect, 0.35);
  col *= clamp(1.0 - 0.9 * dot(q, q) * 1.6, 0.0, 1.0);

  // Film grain.
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 61.7, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - 0.5) * uGrain;

  gl_FragColor = vec4(col * uFade, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader failed");
  }
  return shader;
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Length of the opening shot, in seconds. */
const INTRO = 5;
/** Idle drift once the opening shot ends, in radians per second. */
const DRIFT = 0.03;

function Stage({ view }: { view: View }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pinEl = useRef<HTMLSpanElement>(null);
  const nudgeRef = useRef<(dir: 1 | -1) => void>(() => {});
  const touchedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [touched, setTouched] = useState(false);
  const [settled, setSettled] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const c = canvas.current;
    const w = wrap.current;
    if (!c || !w) return;

    const gl = (c.getContext("webgl2", { antialias: false, alpha: false }) ??
      c.getContext("webgl", { antialias: false, alpha: false })) as
      | WebGLRenderingContext
      | null;
    if (!gl) {
      setFailed(true);
      return;
    }
    const isGL2 =
      typeof WebGL2RenderingContext !== "undefined" &&
      gl instanceof WebGL2RenderingContext;

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexShader));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentShader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error();
    } catch {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    // One triangle that covers the screen.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u("uRes");
    const uYaw = u("uYaw");
    const uPitch = u("uPitch");
    const uTanV = u("uTanV");
    const uArc = u("uArc");
    const uHMax = u("uHMax");
    const uTime = u("uTime");
    const uFade = u("uFade");
    const uGrain = u("uGrain");

    const arc = (view.arcDeg * Math.PI) / 180;
    let hMax = 0.4;
    let baseTanV = 0.36;
    let ready = false;

    // Camera state.
    let yaw = 0;
    let pitch = 0;
    let vel = 0;
    let tween: number | null = null;
    let driftDir = 1;
    let fovScale = 1;
    let fade = 0;
    let introStart: number | null = null;
    let introDone = false;
    let time = 0;
    let hHalf = 0.6;
    let dragging = false;

    const img = new window.Image();
    img.src = view.src;
    img.onload = () => {
      const aspectImg = img.naturalWidth / img.naturalHeight;
      hMax = arc / (2 * aspectImg);
      baseTanV = hMax / 1.12;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      if (isGL2) {
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_MIN_FILTER,
          gl.LINEAR_MIPMAP_LINEAR
        );
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
      ready = true;
      if (reduceMotion) {
        fade = 1;
        introDone = true;
        setSettled(true);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
      gl.viewport(0, 0, c.width, c.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!ready) return;
      if (!reduceMotion) time += dt;

      const aspect = c.width / c.height;
      let tanV = baseTanV * fovScale;
      hHalf = Math.atan(tanV * aspect);
      let yawMax = Math.max(0, arc / 2 - hHalf);

      // Opening shot: fade up from black, push in and sweep across the plot.
      if (!introDone) {
        introStart ??= now;
        const t = clamp((now - introStart) / 1000 / INTRO, 0, 1);
        const e = easeInOutCubic(t);
        fade = clamp((now - introStart) / 1400, 0, 1);
        fovScale = 0.6 + 0.4 * e;
        tanV = baseTanV * fovScale;
        hHalf = Math.atan(tanV * aspect);
        yawMax = Math.max(0, arc / 2 - hHalf);
        if (!touchedRef.current) yaw = yawMax * (-0.85 + 1.15 * e);
        if (t >= 1) {
          introDone = true;
          setSettled(true);
        }
      } else if (!dragging) {
        if (tween !== null) {
          yaw += (tween - yaw) * (1 - Math.pow(0.003, dt));
          if (Math.abs(tween - yaw) < 0.0005) tween = null;
        } else if (Math.abs(vel) > 0.001) {
          yaw += vel * dt;
          vel *= Math.pow(0.03, dt);
        } else if (!touchedRef.current && !reduceMotion) {
          yaw += driftDir * DRIFT * dt;
          if (yaw >= yawMax) driftDir = -1;
          if (yaw <= -yawMax) driftDir = 1;
        }
        pitch *= Math.pow(0.15, dt);
      }

      const pitchMax = Math.max(0, Math.atan(hMax) - Math.atan(tanV));
      yaw = clamp(yaw, -yawMax, yawMax);
      pitch = clamp(pitch, -pitchMax, pitchMax);

      // A slight handheld sway.
      const swayYaw = reduceMotion ? 0 : Math.sin(time * 0.37) * 0.003;
      const swayPitch = reduceMotion ? 0 : Math.sin(time * 0.23 + 1) * 0.002;
      const drawYaw = clamp(yaw + swayYaw, -yawMax, yawMax);
      const drawPitch = clamp(pitch + swayPitch, -pitchMax, pitchMax);

      gl.uniform2f(uRes, c.width, c.height);
      gl.uniform1f(uYaw, drawYaw);
      gl.uniform1f(uPitch, drawPitch);
      gl.uniform1f(uTanV, tanV);
      gl.uniform1f(uArc, arc);
      gl.uniform1f(uHMax, hMax);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uFade, fade);
      gl.uniform1f(uGrain, reduceMotion ? 0 : 0.035);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Keep the pin stuck to its spot in the scene.
      const pin = view.pin;
      const el = pinEl.current;
      if (pin && el) {
        const d = (pin.x - 0.5) * arc - drawYaw;
        const hp = (0.5 - pin.y) * 2 * hMax;
        const cp = Math.cos(drawPitch);
        const sp = Math.sin(drawPitch);
        const x = Math.sin(d);
        const z0 = Math.cos(d);
        const y = hp * cp - z0 * sp;
        const z = hp * sp + z0 * cp;
        const sx = z > 0 ? x / z / (tanV * aspect) : 9;
        const sy = z > 0 ? y / z / tanV : 9;
        const W = c.clientWidth;
        const H = c.clientHeight;
        el.style.transform = `translate3d(${((sx + 1) / 2) * W}px, ${((1 - sy) / 2) * H}px, 0)`;
        el.style.opacity = String(Math.abs(sx) < 1.02 ? fade : 0);
      }
    };

    // Only render while the panorama is on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(c);

    const touch = () => {
      if (!touchedRef.current) {
        touchedRef.current = true;
        setTouched(true);
      }
    };

    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      touch();
      dragging = true;
      tween = null;
      vel = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = e.timeStamp;
      c.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const radPerPx = (2 * hHalf) / c.clientWidth;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dts = Math.max(0.001, (e.timeStamp - lastT) / 1000);
      yaw -= dx * radPerPx;
      pitch += dy * radPerPx;
      vel = vel * 0.6 + ((-dx * radPerPx) / dts) * 0.4;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = e.timeStamp;
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      // A pause before letting go means no fling.
      if (e.timeStamp - lastT > 80) vel = 0;
    };
    c.addEventListener("pointerdown", onDown);
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerup", onUp);
    c.addEventListener("pointercancel", onUp);

    nudgeRef.current = (dir) => {
      touch();
      vel = 0;
      tween = (tween ?? yaw) + dir * hHalf * 0.8;
    };

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerup", onUp);
      c.removeEventListener("pointercancel", onUp);
      // Not loseContext(): a canvas hands back the same context next time,
      // so React's dev double-mount would get a dead one. The browser frees
      // it with the canvas.
    };
  }, [view, reduceMotion]);

  useEffect(() => {
    const onChange = () =>
      setFullscreen(document.fullscreenElement === wrap.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrap.current?.requestFullscreen?.();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") nudgeRef.current(-1);
    else if (e.key === "ArrowRight") nudgeRef.current(1);
    else return;
    e.preventDefault();
  };

  const control =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

  return (
    <div
      ref={wrap}
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label={`${view.alt} Use the left and right arrow keys to look around.`}
      role="region"
      className={cn(
        "group relative w-full select-none overflow-hidden bg-black outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-paper/60",
        fullscreen ? "h-full" : "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
      )}
    >
      {failed ? (
        <img
          src={view.src}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <canvas
          ref={canvas}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
        />
      )}

      {view.pin && !failed && (
        <span
          ref={pinEl}
          className="pointer-events-none absolute left-0 top-0 opacity-0 will-change-transform"
        >
          <span className="flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="whitespace-nowrap rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-md">
              {view.pin.label}
            </span>
            <MapPin className="mt-1 h-6 w-6 fill-brand-red text-white drop-shadow" />
          </span>
        </span>
      )}

      {/* Lower third, in the manner of a film title. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
      <div
        className={cn(
          "pointer-events-none absolute bottom-6 left-4 max-w-[70%] transition-all duration-1000 ease-out sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-12",
          settled ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/70 sm:text-xs">
          {appConfigs.permanentSite}
        </p>
        <p className="mt-2 font-serif text-2xl leading-tight text-white sm:text-3xl lg:text-4xl">
          The LADA plot
        </p>
        <p className="mt-1 text-xs text-white/70 sm:text-sm">
          Permanent site of the association
        </p>
        <p className="mt-3 inline-flex rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs tabular-nums text-white/90 backdrop-blur-md">
          {lengthM} m × {widthM} m · about {plotArea} m²
        </p>
      </div>

      <span
        className={cn(
          "pointer-events-none absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-xs text-white backdrop-blur-md transition-opacity duration-700",
          settled && !touched ? "opacity-100" : "opacity-0"
        )}
      >
        <Hand className="h-3.5 w-3.5" />
        Drag to look around
      </span>

      <div className="absolute bottom-6 right-4 flex gap-2 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12">
        <button
          type="button"
          className={control}
          aria-label="Look left"
          onClick={() => nudgeRef.current(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={control}
          aria-label="Look right"
          onClick={() => nudgeRef.current(1)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={control}
          aria-label={fullscreen ? "Exit full screen" : "Full screen"}
          onClick={toggleFullscreen}
        >
          {fullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
