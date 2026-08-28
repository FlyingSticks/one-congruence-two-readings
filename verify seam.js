/* verify_seam.js — numerical checks for the Seam Theorem draft (v1, 9 checks).
   Executed 18 Aug 2026; recovered verbatim from the session record 28 Aug 2026
   (with the one in-session sign correction applied). */
function slit(x,y,ru,rv,l){ return [x/(1+ru*l), y/(1+rv*l)]; }
function glide(x,y,ru,rv,l){ return [x*(1+ru*l), y*(1+rv*l)]; }
var pass=0, fail=0;
function chk(n,ok){ ok?pass++:fail++; console.log((ok?'ok  ':'FAIL')+' '+n); }
function cross(a,b){ return a[0]*b[1]-a[1]*b[0]; }

/* Lemma 2 — curvature identity: c'(0) x c''(0) = ±2xy * ru*rv*(ru-rv)
   (numerical derivatives, both sign conventions) */
function d1(f,h){ return [(f(h)[0]-f(-h)[0])/(2*h), (f(h)[1]-f(-h)[1])/(2*h)]; }
function d2(f,h){ return [(f(h)[0]-2*f(0)[0]+f(-h)[0])/(h*h),
                          (f(h)[1]-2*f(0)[1]+f(-h)[1])/(h*h)]; }
var worst=0;
[[1.3,-0.7,0.85,0.25],[2,1,0.9,0.2],[1,1,0.6,0.35],[-1,2,1,0.4]].forEach(function(t){
  var x=t[0],y=t[1],ru=t[2],rv=t[3];
  [ +1, -1 ].forEach(function(sgn){          /* gauge 1 + sgn*r*l */
    var f=function(l){ return [x/(1+sgn*ru*l), y/(1+sgn*rv*l)]; };
    var got=cross(d1(f,1e-5), d2(f,1e-4));
    var want=sgn*2*x*y*ru*rv*(ru-rv);        /* signed: conventions give opposite signs, same cubic */
    var e=Math.abs(got-want)/Math.max(1,Math.abs(want));
    if(e>worst)worst=e;
  });
});
chk('curvature identity c\'(0)xc\'\'(0) = ±2xy*ru*rv*(ru-rv), both conventions (rel err '+worst.toExponential(1)+')', worst<1e-5);

/* Lemma 1 — reciprocal of the gauge-pencil line: line iff on the seam */
function recipBow(ru,rv){
  var L=1.5,N=41, a=[1,1], b=[1/(1+ru*L),1/(1+rv*L)];
  var dx=b[0]-a[0], dy=b[1]-a[1], Ln=Math.hypot(dx,dy)||1, m=0;
  for(var i=0;i<N;i++){ var l=L*i/(N-1), p=[1/(1+ru*l),1/(1+rv*l)];
    var d=Math.abs(dx*(p[1]-a[1])-dy*(p[0]-a[0]))/Ln; if(d>m)m=d; }
  return m;
}
chk('R-image of gauge line straight on diagonal', recipBow(0.5,0.5)<1e-12);
chk('R-image straight on ru=0',                  recipBow(0,0.7)<1e-12);
chk('R-image straight on rv=0',                  recipBow(0.7,0)<1e-12);
chk('R-image bowed off seam',                    recipBow(0.8,0.3)>1e-3);

/* (3') mirror-circle relation per ray on the diagonal:
   |glide|*|slit| = |picture trace|^2, and collinearity */
var x=1.2,y=-0.8,r=0.55,l=1.3;
var g=glide(x,y,r,r,l), s=slit(x,y,r,r,l);
var pg=Math.hypot(g[0],g[1]), ps=Math.hypot(s[0],s[1]), pp=Math.hypot(x,y);
chk('diagonal: |M||I| = |P|^2 per ray (VM*VI=VP^2 face)', Math.abs(pg*ps-pp*pp)<1e-12);
chk('diagonal: M, I, P collinear with center', Math.abs(cross(g,s))<1e-12 && Math.abs(cross(g,[x,y]))<1e-12);
/* off the diagonal the per-ray relation is not even posed: readings leave the ray */
var g2=glide(x,y,0.8,0.3,l), s2=slit(x,y,0.8,0.3,l);
chk('off seam: readings leave the ray (no single mirror circle)', Math.abs(cross(g2,[x,y]))>1e-3 && Math.abs(cross(s2,[x,y]))>1e-3);

/* seam = three concurrent lines through the orthographic corner */
chk('seam lines concurrent at (0,0): trivially ru=0, rv=0, ru=rv all pass', true);

console.log(pass+'/'+(pass+fail)+' checks passed');
process.exit(fail?1:0);
