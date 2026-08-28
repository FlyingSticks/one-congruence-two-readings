/* ============================================================
   sixstep2.js — six-step duality check, corrected machinery.
   Reconstructed 28 Aug 2026 from the 18 Aug 2026 session record;
   source identical to the executed version.
   Bug found & fixed en route: the polarity sends every point of
   L to a plane CONTAINING L*, so "unique conjugate point" is
   degenerate (whole line). The induced transport must be read
   through a SECTION of the plane-pencil. Canonical section: the
   depth axis (the ghost normal). Robust polar-line meets added;
   seam sampling fixed (on-seam the congruence is the pencil
   through (0,0,Z), not two-slit-anchored spans).
   Rig (v2 convention): picture plane z=0; u-slit l1 = {(0,t,Z1)}
   (governs X), v-slit l2 = {(s,0,Z2)} (governs Y); Z1=-1/ru,
   Z2=-1/rv; scene at z>0.
   Anchor quadric family (slits mutually polar, derived):
     a12=a13=a14=a23=a24=0,  a33=1,
     a44 = -Z1*Z2 - a34*(Z1+Z2),  free: a11,a22,a34.
   a34=0, a11=a22=1  =>  sphere x^2+y^2+z^2 = Z1*Z2,
   radius = geometric mean of slit depths, center = principal pt.
   ============================================================ */
function A_of(Z1,Z2,a11,a22,a34){
  var a44=-Z1*Z2-a34*(Z1+Z2);
  return [[a11,0,0,0],[0,a22,0,0],[0,0,1,a34],[0,0,a34,a44]];
}
function mv(A,p){ var r=[0,0,0,0];
  for(var i=0;i<4;i++)for(var j=0;j<4;j++) r[i]+=A[i][j]*p[j]; return r; }
function dot(a,b){ return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]; }
function aff(p){ return [p[0]/p[3],p[1]/p[3],p[2]/p[3]]; }
function norm(v){ return Math.hypot(v[0],v[1],v[2],v[3]); }
function pointAtZ(L,z){
  var p=L[0],q=L[1];
  var t=(z*p[3]-p[2])/((q[2]-p[2])-z*(q[3]-p[3]));
  var r=[0,0,0,0]; for(var i=0;i<4;i++) r[i]=p[i]+t*(q[i]-p[i]);
  return r;
}
/* robust meet of the line (pi1 ^ pi2) with slit {dir}: returns point + residual */
function meetSlit(pi1,pi2,Z,which){ /* which: 1 -> (0,t,Z,1); 2 -> (s,0,Z,1) */
  function cd(pi){ return which===1 ? [pi[1], pi[2]*Z+pi[3]]
                                    : [pi[0], pi[2]*Z+pi[3]]; }
  var u=cd(pi1), v=cd(pi2), t, res, sc=Math.max(norm(pi1),norm(pi2));
  if(Math.abs(u[0])>=Math.abs(v[0])){ t=-u[1]/u[0]; res=Math.abs(v[0]*t+v[1]); }
  else                              { t=-v[1]/v[0]; res=Math.abs(u[0]*t+u[1]); }
  var P = which===1 ? [0,t,Z,1] : [t,0,Z,1];
  return {P:P, res:res/sc};
}
function polarLine(L,A,Z1,Z2){
  var pi1=mv(A,L[0]), pi2=mv(A,L[1]);
  var m1=meetSlit(pi1,pi2,Z1,1), m2=meetSlit(pi1,pi2,Z2,2);
  return {line:[m1.P,m2.P], res:Math.max(m1.res,m2.res)};
}
/* axis-section depth transport: plane A.P meets the depth axis */
function zdagger(A,P){
  var pl=mv(A,P); /* pl . (0,0,z',1) = pl[2] z' + pl[3] = 0 */
  return -pl[3]/pl[2];
}
/* on-line conjugacy: P' on L with (A P).P'(z') = 0 */
function conjOnLine(A,L,z){
  var P=pointAtZ(L,z), pl=mv(A,P);
  var p=aff(L[0]).concat(1), q=aff(L[1]).concat(1);
  function PofZ(zz){ var t=(zz-p[2])/(q[2]-p[2]);
    return [p[0]+t*(q[0]-p[0]), p[1]+t*(q[1]-p[1]), zz, 1]; }
  var f0=dot(pl,PofZ(0)), f1=dot(pl,PofZ(1));
  return -f0/(f1-f0);
}
var S3maps=[
 ['id',function(v){return v;}],['1-v',function(v){return 1-v;}],
 ['1/v',function(v){return 1/v;}],['1/(1-v)',function(v){return 1/(1-v);}],
 ['v/(v-1)',function(v){return v/(v-1);}],['(v-1)/v',function(v){return (v-1)/v;}]];
function classify(pairs){
  var out=[];
  S3maps.forEach(function(m){ var e=0;
    pairs.forEach(function(pr){ var w=m[1](pr[0]);
      e=Math.max(e,Math.abs(w-pr[1])/Math.max(1,Math.abs(pr[1]))); });
    out.push([m[0],e]); });
  out.sort(function(a,b){return a[1]-b[1];}); return out;
}
function stat(a){ var mn=Math.min.apply(0,a), mx=Math.max.apply(0,a);
  return [(mn+mx)/2, mx-mn]; }

function run(tag, ru, rv, a11, a22, a34){
  var Z1=-1/ru, Z2=-1/rv, seam=Math.abs(Z1-Z2)<1e-12;
  var Zs=Math.sqrt(Z1*Z2);   /* positive root — scene-side calibration */
  var A=A_of(Z1,Z2,a11,a22,a34);
  console.log('\n=== '+tag+' (ru,rv)=('+ru+','+rv+') Z1='+Z1.toFixed(4)+' Z2='+Z2.toFixed(4)+
              ' Z*=+'+Zs.toFixed(4)+' a34='+a34+' a11='+a11+' a22='+a22+' ===');

  /* S1 */
  var s1=0;
  [[0,0,Z1,1],[0,1,Z1,1]].forEach(function(p){
    [[0,0,Z2,1],[1,0,Z2,1]].forEach(function(q){
      s1=Math.max(s1,Math.abs(dot(mv(A,p),q))); });});
  var poleP=[0,0,A[3][3],-A[2][3]];
  console.log('S1 slits mutually polar (res '+s1.toExponential(1)+'); pole of PP: '+
    (Math.abs(poleP[3])<1e-12?'depth point at infinity':'z='+(poleP[2]/poleP[3]).toFixed(4))+
    '; quadric meets axis at z=\u00b1'+Zs.toFixed(4)+' (\u00b1 geometric mean)');

  /* sample lines: off-seam via slit anchors; on-seam via the pencil vertex */
  var lines=[];
  for(var k=0;k<12;k++){
    var L = seam
      ? [[0,0,Z1,1],[Math.cos(2*k+1)*1.5, Math.sin(3*k+1)*1.5, 0, 1]]
      : [[0,Math.sin(3*k+1)*2,Z1,1],[Math.cos(2*k+1)*2,0,Z2,1]];
    lines.push(L);
  }

  /* S2 */
  var s2=0, polars=[];
  lines.forEach(function(L){ var pr=polarLine(L,A,Z1,Z2);
    s2=Math.max(s2,pr.res); polars.push(pr.line); });
  console.log('S2 polar of congruence line is a congruence line: residual '+s2.toExponential(1));

  /* S3 — axis-section depth transport: line-independence */
  var dep=0, first=null;
  lines.forEach(function(L,li){
    var loc=[];
    [0.3,0.7,1.1,1.6,2.3].forEach(function(z){
      loc.push(zdagger(A,pointAtZ(L,z)));
    });
    if(li===0) first=loc;
    else for(var i=0;i<loc.length;i++) dep=Math.max(dep,Math.abs(loc[i]-first[i]));
  });
  console.log('S3 axis-section transport z->z\u2020: line-independence spread '+dep.toExponential(1)+
              '  (z=1 -> z\u2020='+zdagger(A,[0,0,1,1]).toFixed(6)+', Z1*Z2='+(Z1*Z2).toFixed(6)+')');

  /* S4 — element identification in three calibrations */
  var pM=[],pU=[],pXV=[],pXU=[];
  [0.3,0.7,1.1,1.6,2.3,3.1].forEach(function(z){
    var zd=zdagger(A,[0.7,0.4,z,1]);
    pM.push([z/Zs, zd/Zs]);
    pU.push([z/Z1, zd/Z1]);
    pXV.push([z/Z1, zd/Z2]);   /* cross-channel: nu_u -> nu_v-dagger */
    pXU.push([z/Z2, zd/Z1]);
  });
  [['same-channel  nu=z/Z*      ',pM],['same-channel  nu=z/Z1      ',pU],
   ['cross-channel nu_u -> nu_v\u2020',pXV],['cross-channel nu_v -> nu_u\u2020',pXU]]
  .forEach(function(c){
    var cl=classify(c[1]);
    console.log('S4 '+c[0]+': best '+cl[0][0]+' (err '+cl[0][1].toExponential(1)+
                '), next '+cl[1][0]+' ('+cl[1][1].toExponential(1)+')');
  });

  /* S5 — gauge scalars & trace transport on/off seam */
  var idres=0;
  [0.3,0.9,1.7].forEach(function(z){
    var zd=zdagger(A,[1,1,z,1]);
    idres=Math.max(idres, Math.abs((z/Z1)*(zd/Z2)-1), Math.abs((z/Z2)*(zd/Z1)-1));
  });
  console.log('S5 cross-channel gauge identity nu_u \u00b7 nu_v\u2020 = 1: residual '+idres.toExponential(1)+
              (a34!==0?'  [expected to fail: swap-variant anchor]':''));
  var cu=[],cv=[];
  lines.forEach(function(L,li){
    var T=aff(pointAtZ(L,0)), Ts=aff(pointAtZ(polars[li],0));
    cu.push(T[0]*Ts[0]); cv.push(T[1]*Ts[1]);
  });
  var su=stat(cu), sv=stat(cv);
  console.log('S5 trace transport X\u00b7X* = '+su[0].toFixed(6)+' (spread '+su[1].toExponential(1)+
              '), Y\u00b7Y* = '+sv[0].toFixed(6)+' (spread '+sv[1].toExponential(1)+')');
  console.log('   identify: a11\u00b7X\u00b7X* / (Z1\u00b7Z2) = '+(a11*su[0]/(Z1*Z2)).toFixed(6)+
              ' ; a22\u00b7Y\u00b7Y* / (Z1\u00b7Z2) = '+(a22*sv[0]/(Z1*Z2)).toFixed(6));

  /* S3b — on-line conjugacy: is the per-line involution line-independent? */
  var dep2=0, f2=null;
  lines.forEach(function(L,li){
    var loc=[0.4,1.0,1.9].map(function(z){ return conjOnLine(A,L,z); });
    if(li===0) f2=loc;
    else for(var i=0;i<loc.length;i++) dep2=Math.max(dep2,Math.abs(loc[i]-f2[i]));
  });
  console.log('S3b on-line conjugacy line-dependence: spread '+dep2.toExponential(1)+
              '  (0 would mean pointwise, not pencil-level)');
}

run('SEAM  \u00b7 sphere anchor', 0.6, 0.6, 1, 1, 0);
run('OFF   \u00b7 sphere anchor', 0.8, 0.3, 1, 1, 0);
run('OFF   \u00b7 sphere anchor, other rates', 0.9, 0.45, 1, 1, 0);
run('OFF   \u00b7 anisotropic a11=2 a22=0.5', 0.8, 0.3, 2, 0.5, 0);
run('OFF   \u00b7 swap variant a34=1', 0.8, 0.3, 1, 1, 1);

/* ---- tally, added on reconstruction (28 Aug 2026): the recorded
   verdict as pass/fail assertions, so the verdict is re-runnable ---- */
(function(){
  var T=[], eps=1e-12;
  function ok(name,cond){ T.push([name,!!cond]); }
  function ctx(ru,rv,a11,a22,a34){
    var Z1=-1/ru,Z2=-1/rv,A=A_of(Z1,Z2,a11,a22,a34),Zs=Math.sqrt(Z1*Z2);
    return {Z1:Z1,Z2:Z2,A:A,Zs:Zs};
  }
  function transportIs(c,cal){ /* best S3 element for a calibration pair fn */
    var pairs=[0.3,0.7,1.1,1.6,2.3,3.1].map(function(z){
      var zd=zdagger(c.A,[0.7,0.4,z,1]); return cal(z,zd,c); });
    return classify(pairs)[0];
  }
  var on=ctx(0.6,0.6,1,1,0), off=ctx(0.8,0.3,1,1,0), off2=ctx(0.9,0.45,1,1,0), sw=ctx(0.8,0.3,1,1,1);
  [on,off,off2].forEach(function(c,i){
    var tag=['seam','off','off2'][i];
    ok('S1 mutual polarity ('+tag+')', Math.abs(dot(mv(c.A,[0,1,c.Z1,1]),[1,0,c.Z2,1]))<eps);
    ok('S3 z\u2020 = Z1Z2/z ('+tag+')', Math.abs(zdagger(c.A,[0.7,0.4,1.7,1])-c.Z1*c.Z2/1.7)<eps);
    var m=transportIs(c,function(z,zd,c){return [z/c.Zs,zd/c.Zs];});
    ok('S4 geometric-mean calibration: 1/v at 1e-15 ('+tag+')', m[0]==='1/v' && m[1]<1e-15);
    var x=transportIs(c,function(z,zd,c){return [z/c.Z1,zd/c.Z2];});
    ok('S4 cross-channel: 1/v at 1e-15 ('+tag+')', x[0]==='1/v' && x[1]<1e-15);
    var id=0; [0.3,0.9,1.7].forEach(function(z){ var zd=zdagger(c.A,[1,1,z,1]);
      id=Math.max(id,Math.abs((z/c.Z1)*(zd/c.Z2)-1)); });
    ok('S5 nu_u\u00b7nu_v\u2020 = 1 at 1e-15 ('+tag+')', id<1e-15);
  });
  var sc=transportIs(off,function(z,zd,c){return [z/c.Z1,zd/c.Z1];});
  ok('S4 falsifier: single-channel off-seam fits NO element (best err > 0.5)', sc[1]>0.5);
  var sv=transportIs(sw,function(z,zd,c){return [z/c.Zs,zd/c.Zs];});
  ok('S4 falsifier: swap-variant anchor fits NO element (best err > 0.2)', sv[1]>0.2);
  /* S5 trace closed forms, off-seam */
  [off,off2].forEach(function(c,i){
    var L=[[0,1.3,c.Z1,1],[0.9,0,c.Z2,1]], Ls=polarLine(L,c.A,c.Z1,c.Z2).line;
    var T=aff(pointAtZ(L,0)),Ts=aff(pointAtZ(Ls,0));
    ok('S5 X\u00b7X* = Z1\u00b2Z2/(Z1\u2212Z2) (off'+(i?'2':'')+')', Math.abs(T[0]*Ts[0]-c.Z1*c.Z1*c.Z2/(c.Z1-c.Z2))<1e-12);
    ok('S5 Y\u00b7Y* = \u2212Z1Z2\u00b2/(Z1\u2212Z2) (off'+(i?'2':'')+')', Math.abs(T[1]*Ts[1]+c.Z1*c.Z2*c.Z2/(c.Z1-c.Z2))<1e-12);
  });
  /* S3b per-line conjugacy is line-dependent (the pointwise version is FALSE) */
  var sp=0, f0=null;
  for(var k=0;k<12;k++){
    var Lk=[[0,Math.sin(3*k+1)*2,off.Z1,1],[Math.cos(2*k+1)*2,0,off.Z2,1]];
    var loc=[0.4,1.0,1.9].map(function(z){ return conjOnLine(off.A,Lk,z); });
    if(k===0) f0=loc; else for(var i=0;i<3;i++) sp=Math.max(sp,Math.abs(loc[i]-f0[i]));
  }
  ok('S3b per-line conjugacy line-dependent (12-line spread > 1; recorded 3.5–8)', sp>1);
  var pass=T.filter(function(t){return t[1];}).length;
  console.log('\n---- sixstep2 tally: '+pass+'/'+T.length+' ----');
  T.forEach(function(t){ console.log((t[1]?'  ok   ':'  FAIL ')+t[0]); });
  if(pass!==T.length) process.exitCode=1;
})();
