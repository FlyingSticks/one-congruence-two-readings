/* verify_seam_v1_1.js — checks added for the v1.1 repricing (6 checks).
   Executed 18 Aug 2026; recovered verbatim from the session record 28 Aug 2026. */
function slit(x,y,ru,rv,l){ return [x/(1+ru*l), y/(1+rv*l)]; }
function bowOf(x,y,ru,rv,L,N){
  N=N||81; var a=slit(x,y,ru,rv,0), b=slit(x,y,ru,rv,L);
  var dx=b[0]-a[0], dy=b[1]-a[1], Ln=Math.hypot(dx,dy)||1, m=0;
  for(var i=0;i<N;i++){ var l=L*i/(N-1), p=slit(x,y,ru,rv,l);
    var d=Math.abs(dx*(p[1]-a[1])-dy*(p[0]-a[0]))/Ln; if(d>m)m=d; }
  return m;
}
var pass=0, fail=0;
function chk(n,ok){ ok?pass++:fail++; console.log((ok?'ok  ':'FAIL')+' '+n); }

/* D0.1 support — tangency at the picture plane is automatic:
   c'(0) parallel to the glide direction (x*ru, y*rv) */
var worst=0;
[[1.3,-0.7,0.85,0.25],[2,1,0.9,0.2],[-1,2,1,0.4],[0.5,3,0.3,0.95]].forEach(function(t){
  var x=t[0],y=t[1],ru=t[2],rv=t[3], h=1e-6;
  var c1=[(slit(x,y,ru,rv,h)[0]-slit(x,y,ru,rv,-h)[0])/(2*h),
          (slit(x,y,ru,rv,h)[1]-slit(x,y,ru,rv,-h)[1])/(2*h)];
  var cr=Math.abs(c1[0]*(y*rv)-c1[1]*(x*ru));
  if(cr>worst)worst=cr;
});
chk('tangency automatic: camera curve tangent to glide line at lambda=0 (worst '+worst.toExponential(1)+')', worst<1e-6);

/* Remark — axis rulings are fused everywhere, even off-seam */
chk('axis ruling (x,0) straight off-seam', bowOf(1.4,0,0.9,0.2,1.5)<1e-12);
chk('axis ruling (0,y) straight off-seam', bowOf(0,-2,0.9,0.2,1.5)<1e-12);
chk('generic ruling bowed off-seam',       bowOf(1,1,0.9,0.2,1.5)>1e-3);

/* Section 4 repriced — order-one vanishing is a checked property:
   bow/|Delta| tends to a finite nonzero limit approaching the seam */
function Delta(ru,rv){ return ru*rv*Math.abs(rv-ru); }
var r0=0.6, L=1.5;
var q3=bowOf(1,1,r0,r0+1e-3,L)/Delta(r0,r0+1e-3);
var q4=bowOf(1,1,r0,r0+1e-4,L)/Delta(r0,r0+1e-4);
chk('bow vanishes to order one: bow/|D| stable and nonzero ('+q3.toFixed(4)+' vs '+q4.toFixed(4)+')',
    q3>1e-3 && Math.abs(q3-q4)/q3<1e-2);

/* ...whereas an order-two diagnostic exists (D^2): ratio to |D| dies */
var p3=Delta(r0,r0+1e-3)*Delta(r0,r0+1e-3)/Delta(r0,r0+1e-3);
var p4=Delta(r0,r0+1e-4)*Delta(r0,r0+1e-4)/Delta(r0,r0+1e-4);
chk('D^2 diagnostic vanishes to order two (ratio to |D| -> 0)', p4<p3/5);

console.log(pass+'/'+(pass+fail)+' checks passed');
process.exit(fail?1:0);
