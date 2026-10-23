"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FRAG = `
precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uScroll;uniform float uDissolve;uniform float uEmber;
vec3 hash3(vec2 p){vec3 q=vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9)));return fract(sin(q)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);
 float a=hash3(i).x,b=hash3(i+vec2(1.,0.)).x,c=hash3(i+vec2(0.,1.)).x,d=hash3(i+vec2(1.,1.)).x;
 return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float fbm(vec2 p){float v=0.;float a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;
 uv.y+=uScroll*.00035;
 vec2 m=(uMouse-.5*uRes)/uRes.y;
 float d=length(uv-m);
 vec2 warp=(uv-m)*exp(-d*d*9.)*.18;
 vec2 q=uv-warp;
 float t=uTime*.06;
 float n1=fbm(q*1.6+vec2(t,-t*.6));
 float n2=fbm(q*3.2+vec2(-t*.8,t*.4)+n1*1.5);
 float fil=smoothstep(.42,.5,n2)*smoothstep(.62,.5,n2);
 float fil2=smoothstep(.47,.5,n1)*smoothstep(.56,.5,n1);
 vec3 voidc=vec3(.043,.051,.102);
 vec3 ink=vec3(.075,.086,.169);
 vec3 lilac=vec3(.416,.424,.965);
 vec3 ember=vec3(1.,.416,.239);
 vec3 col=mix(voidc,ink,n1*.35);
 col+=lilac*fil*.5;
 col+=lilac*fil2*.08;
 float emberMask=smoothstep(.45,.95,gl_FragCoord.x/uRes.x)*smoothstep(.15,-.45,uv.y)*uEmber;
 float n3=fbm(q*2.2+vec2(3.1,-1.7)+vec2(-t*.5,t*.3));
 float emb=smoothstep(.47,.55,n3)*smoothstep(.70,.59,n3)*emberMask;
 col=mix(col,ember,clamp(emb,0.,1.));
 col+=ember*emberMask*n3*.08;
 col+=lilac*exp(-d*d*14.)*.12;
 float vig=1.-smoothstep(.5,1.15,length(uv));
 col*=.85+.15*vig;
 col=mix(col,voidc,.65*smoothstep(0.,900.,uScroll));
 col=mix(col,voidc,uDissolve);
 gl_FragColor=vec4(col,1.);}
`;

type Props = { ember?: number };

/** Living shader ground, cursor ring, loader count, section index and dissolve navigation. */
export default function PortalEffects({ ember = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const doc = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    const state = {
      mx: innerWidth * 0.62, my: innerHeight * 0.45, tx: innerWidth * 0.62, ty: innerHeight * 0.45,
      scroll: 0, scrollT: 0, dissolve: 0, dissolveT: 0, ember,
    };
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const start = performance.now();

    if (gl) {
      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
        return s;
      };
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      if (vs && fs) {
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
        const p = gl.getAttribLocation(prog, "p");
        gl.enableVertexAttribArray(p);
        gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
        const loc = Object.fromEntries(["uRes", "uTime", "uMouse", "uScroll", "uDissolve", "uEmber"].map((n) => [n, gl.getUniformLocation(prog, n)]));

        const resize = () => {
          const w = Math.floor(innerWidth * dpr), h = Math.floor(innerHeight * dpr);
          if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
        };
        const frame = (now: number) => {
          resize();
          state.mx += (state.tx - state.mx) * 0.08; state.my += (state.ty - state.my) * 0.08;
          state.scroll += (state.scrollT - state.scroll) * 0.06;
          state.dissolve += (state.dissolveT - state.dissolve) * 0.12;
          gl.useProgram(prog);
          gl.uniform2f(loc.uRes, canvas.width, canvas.height);
          gl.uniform1f(loc.uTime, reduced ? 40 : (now - start) / 1000);
          gl.uniform2f(loc.uMouse, state.mx * dpr, canvas.height - state.my * dpr);
          gl.uniform1f(loc.uScroll, state.scroll);
          gl.uniform1f(loc.uDissolve, state.dissolve);
          gl.uniform1f(loc.uEmber, state.ember);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          if (!reduced || state.dissolveT > 0) raf = requestAnimationFrame(frame);
          else raf = 0;
        };
        doc.classList.add("has-gl");
        raf = requestAnimationFrame(frame);
        window.addEventListener("resize", resize);
        cleanups.push(() => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); doc.classList.remove("has-gl"); });

        const startFrame = () => { if (!raf) raf = requestAnimationFrame(frame); };

        // dissolve before same-site navigation
        const onClick = (e: MouseEvent) => {
          const a = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
          if (!a || a.target === "_blank" || a.hasAttribute("download") || a.getAttribute("href")?.startsWith("#")) return;
          const url = new URL(a.href, location.href);
          if (url.origin !== location.origin || reduced) return;
          e.preventDefault();
          state.dissolveT = 1;
          doc.classList.add("is-leaving");
          startFrame();
          setTimeout(() => { doc.classList.remove("is-leaving"); router.push(url.pathname + url.search + url.hash); }, 420);
        };
        document.addEventListener("click", onClick);
        cleanups.push(() => document.removeEventListener("click", onClick));
      }
    }

    if (!reduced) {
      const onMove = (e: PointerEvent) => { state.tx = e.clientX; state.ty = e.clientY; };
      const onScroll = () => { state.scrollT = window.scrollY; doc.classList.toggle("past-hero", window.scrollY > innerHeight * 0.5); };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => { window.removeEventListener("pointermove", onMove); window.removeEventListener("scroll", onScroll); doc.classList.remove("past-hero"); });
    }

    // custom cursor ring (fine pointers only)
    if (fine && !reduced) {
      const ring = document.createElement("div");
      ring.className = "cursor";
      document.body.appendChild(ring);
      doc.classList.add("has-cursor");
      let rx = 0, ry = 0, cx = 0, cy = 0, id = 0;
      const onMove = (e: PointerEvent) => { cx = e.clientX; cy = e.clientY; ring.style.opacity = "1"; };
      const onLeave = () => { ring.style.opacity = "0"; };
      const onOver = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("a,button")) ring.classList.add("on"); };
      const onOut = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("a,button")) ring.classList.remove("on"); };
      const loop = () => { rx += (cx - rx) * 0.22; ry += (cy - ry) * 0.22; ring.style.transform = `translate(${rx}px,${ry}px)`; id = requestAnimationFrame(loop); };
      loop();
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("mouseover", onOver);
      document.addEventListener("mouseout", onOut);
      cleanups.push(() => {
        cancelAnimationFrame(id); ring.remove(); doc.classList.remove("has-cursor");
        window.removeEventListener("pointermove", onMove); document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("mouseover", onOver); document.removeEventListener("mouseout", onOut);
      });
    }

    // loader: count to 100
    const loader = document.querySelector<HTMLElement>("[data-loader]");
    if (loader) {
      if (reduced) loader.textContent = "100";
      else {
        let n = 0, id = 0;
        const t0 = performance.now(), dur = 1100;
        const count = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const v = Math.floor(100 * (1 - Math.pow(1 - p, 3)));
          if (v !== n) { n = v; loader.textContent = String(n).padStart(2, "0"); }
          if (p < 1) id = requestAnimationFrame(count); else loader.textContent = "100";
        };
        id = requestAnimationFrame(count);
        cleanups.push(() => cancelAnimationFrame(id));
      }
    }

    // section index: active dot
    const index = document.querySelectorAll<HTMLAnchorElement>("[data-index] a");
    if (index.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => {
        es.forEach((en) => {
          if (en.isIntersecting) index.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
        });
      }, { rootMargin: "-40% 0px -50% 0px" });
      index.forEach((a) => { const s = document.querySelector(a.getAttribute("href") || ""); if (s) io.observe(s); });
      cleanups.push(() => io.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [ember, router]);

  return (
    <>
      <canvas id="portal" ref={canvasRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
