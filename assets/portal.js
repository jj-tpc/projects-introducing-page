/* shader portal: WebGL background, cursor displacement, loader, scroll drift, dissolve navigation */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) document.documentElement.classList.add('is-loading');
  var fine = window.matchMedia('(pointer: fine)').matches;
  var canvas = document.getElementById('portal');
  var doc = document.documentElement;

  var VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FRAG = [
    'precision highp float;',
    'uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uScroll;uniform float uDissolve;uniform float uEmber;',
    'vec3 hash3(vec2 p){vec3 q=vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9)));return fract(sin(q)*43758.5453);}',
    'float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);',
    ' float a=hash3(i).x,b=hash3(i+vec2(1.,0.)).x,c=hash3(i+vec2(0.,1.)).x,d=hash3(i+vec2(1.,1.)).x;',
    ' return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}',
    'float fbm(vec2 p){float v=0.;float a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}',
    'void main(){',
    ' vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;',
    ' uv.y+=uScroll*.00035;',
    ' vec2 m=(uMouse-.5*uRes)/uRes.y;',
    ' float d=length(uv-m);',
    ' vec2 warp=(uv-m)*exp(-d*d*9.)*.18;',
    ' vec2 q=uv-warp;',
    ' float t=uTime*.06;',
    ' float n1=fbm(q*1.6+vec2(t,-t*.6));',
    ' float n2=fbm(q*3.2+vec2(-t*.8,t*.4)+n1*1.5);',
    ' float fil=smoothstep(.42,.5,n2)*smoothstep(.62,.5,n2);',
    ' float fil2=smoothstep(.47,.5,n1)*smoothstep(.56,.5,n1);',
    ' vec3 voidc=vec3(.043,.051,.102);',
    ' vec3 ink=vec3(.075,.086,.169);',
    ' vec3 lilac=vec3(.416,.424,.965);',
    ' vec3 ember=vec3(1.,.416,.239);',
    ' vec3 col=mix(voidc,ink,n1*.35);',
    ' col+=lilac*fil*.5;',
    ' col+=lilac*fil2*.08;',
    ' float emberMask=smoothstep(.45,.95,gl_FragCoord.x/uRes.x)*smoothstep(.15,-.45,uv.y)*uEmber;',
    ' float n3=fbm(q*2.2+vec2(3.1,-1.7)+vec2(-t*.5,t*.3));',
    ' float emb=smoothstep(.47,.55,n3)*smoothstep(.70,.59,n3)*emberMask;',
    ' col=mix(col,ember,clamp(emb,0.,1.));',
    ' col+=ember*emberMask*n3*.08;',
    ' col+=lilac*exp(-d*d*14.)*.12;',
    ' float vig=1.-smoothstep(.5,1.15,length(uv));',
    ' col*=.85+.15*vig;',
    ' col=mix(col,voidc,.65*smoothstep(0.,900.,uScroll));',
    ' col=mix(col,voidc,uDissolve);',
    ' gl_FragColor=vec4(col,1.);}'
  ].join('\n');

  var gl = canvas && (canvas.getContext('webgl', { antialias: false, alpha: false }) || canvas.getContext('experimental-webgl'));
  var state = { mx: -9999, my: -9999, tx: -9999, ty: -9999, scroll: 0, scrollT: 0, dissolve: 0, dissolveT: 0, ember: parseFloat(canvas && canvas.dataset.ember || '1') };
  state.scroll = state.scrollT = parseFloat(canvas && canvas.dataset.scroll || '0');

  function compile(type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }

  var prog, loc = {}, start = performance.now(), raf = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  function resize() {
    if (!gl) return;
    var w = Math.floor(innerWidth * dpr), h = Math.floor(innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
  }

  function frame(now) {
    resize();
    var k = 0.08;
    state.mx += (state.tx - state.mx) * k; state.my += (state.ty - state.my) * k;
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
  }

  if (gl) {
    var vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (vs && fs) {
      prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
      var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      var p = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(p); gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
      ['uRes', 'uTime', 'uMouse', 'uScroll', 'uDissolve', 'uEmber'].forEach(function (n) { loc[n] = gl.getUniformLocation(prog, n); });
      doc.classList.add('has-gl');
      state.tx = state.mx = innerWidth * 0.62; state.ty = state.my = innerHeight * 0.45;
      raf = requestAnimationFrame(frame);
      window.addEventListener('resize', resize);
    }
  }

  if (!reduced) {
    window.addEventListener('pointermove', function (e) { state.tx = e.clientX; state.ty = e.clientY; }, { passive: true });
    window.addEventListener('scroll', function () { state.scrollT = window.scrollY; doc.classList.toggle('past-hero', window.scrollY > innerHeight * 0.5); }, { passive: true });
  }

  /* custom cursor ring (fine pointers only) */
  if (fine && !reduced) {
    var ring = document.createElement('div'); ring.className = 'cursor'; document.body.appendChild(ring);
    doc.classList.add('has-cursor');
    var rx = 0, ry = 0, cx = 0, cy = 0;
    window.addEventListener('pointermove', function (e) { cx = e.clientX; cy = e.clientY; ring.style.opacity = '1'; }, { passive: true });
    document.addEventListener('mouseleave', function () { ring.style.opacity = '0'; });
    (function loop() { rx += (cx - rx) * 0.22; ry += (cy - ry) * 0.22; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', function (e) { if (e.target.closest('a,button')) ring.classList.add('on'); });
    document.addEventListener('mouseout', function (e) { if (e.target.closest('a,button')) ring.classList.remove('on'); });
  }

  /* loader: count to 100, then reveal */
  var loader = document.querySelector('[data-loader]');
  function reveal() { doc.classList.remove('is-loading'); doc.classList.add('is-ready'); }
  if (loader && !reduced) {
    setTimeout(reveal, 1600);
    var n = 0, t0 = performance.now(), dur = 1100;
    (function count(now) {
      var p = Math.min(1, (now - t0) / dur);
      var v = Math.floor(100 * (1 - Math.pow(1 - p, 3)));
      if (v !== n) { n = v; loader.textContent = String(n).padStart(2, '0'); }
      if (p < 1) requestAnimationFrame(count); else { loader.textContent = '100'; reveal(); }
    })(t0);
  } else { if (loader) loader.textContent = '100'; reveal(); }

  /* section index: active dot */
  var index = document.querySelectorAll('[data-index] a');
  if (index.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { index.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id); }); } });
    }, { rootMargin: '-40% 0px -50% 0px' });
    index.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) io.observe(s); });
  }

  /* dissolve before same-site navigation */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download') || a.getAttribute('href').charAt(0) === '#') return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin && url.protocol !== 'file:') return;
    if (reduced || !gl) return;
    e.preventDefault();
    state.dissolveT = 1; doc.classList.add('is-leaving');
    if (!raf) raf = requestAnimationFrame(frame);
    setTimeout(function () { location.href = a.href; }, 420);
  });
})();
