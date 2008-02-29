/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.0
*/
(function(){var U=function(){};var E=YAHOO.util;var F={BEGIN:"^",END:"$",OR:"|",SP:"\\s+"};F.BEGIN_SPACE="(?:"+F.BEGIN+F.OR+F.SP+")";F.END_SPACE="(?:"+F.SP+F.OR+F.END+")";F.NTH_CHILD="^(?:([-]?\\d*)(n){1}|(odd|even)$)*([-+]?\\d*)$";U.prototype={document:window.document,attrAliases:{"for":"htmlFor"},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[class~=$1]"},operators:{"=":function(W,X){return W===X;},"!=":function(W,X){return W!==X;},"~=":function(W,Y){var X=" ";return(X+W+X).indexOf((X+Y+X))>-1;},"|=":function(W,X){return H(F.BEGIN+X+"[-]?").test(W);},"^=":function(W,X){return W.indexOf(X)===0;},"$=":function(W,X){return W.lastIndexOf(X)===W.length-X.length;},"*=":function(W,X){return W.indexOf(X)>-1;},"":function(W,X){return W;}},pseudos:{"root":function(W){return W===W.ownerDocument.documentElement;},"nth-child":function(W,X){return S(W,X);},"nth-last-child":function(W,X){return S(W,X,null,true);},"nth-of-type":function(W,X){return S(W,X,W.tagName);},"nth-last-of-type":function(W,X){return S(W,X,W.tagName,true);},"first-child":function(W){return G(W.parentNode)[0]===W;},"last-child":function(X){var W=G(X.parentNode);return W[W.length-1]===X;},"first-of-type":function(W,X){return G(W.parentNode,W.tagName.toLowerCase())[0];},"last-of-type":function(X,Y){var W=G(X.parentNode,X.tagName.toLowerCase());return W[W.length-1];},"only-child":function(X){var W=G(X.parentNode);return W.length===1&&W[0]===X;},"only-of-type":function(W){return G(W.parentNode,W.tagName.toLowerCase()).length===1;},"empty":function(W){return W.childNodes.length===0;},"not":function(W,X){return !U.test(W,X);},"contains":function(W,Y){var X=W.innerText||W.textContent||"";return X.indexOf(Y)>-1;},"checked":function(W){return W.checked===true;}},test:function(a,Y){a=U.document.getElementById(a)||a;var X=Y?Y.split(","):[];if(X.length){for(var Z=0,W=X.length;Z<W;++Z){if(V(a,X[Z])){return true;}}return false;}return V(a,Y);},filter:function(Z,Y){if(!Z||!Y){}var c,a=Z,X=[],d=C(Y);if(!a.item){for(var b=0,W=Z.length;b<W;++b){if(!Z[b].tagName){c=U.document.getElementById(Z[b]);if(c){a[a.length]=c;}else{}}}}X=R(a,C(Y)[0]);B();return X;},query:function(X,Y,Z){var W=I(X,Y,Z);return W;}};var I=function(c,h,j,a){if(!c){return[];}var k=[];var Y=c.split(",");if(Y.length>1){for(var d=0,e=Y.length;d<e;++d){k=k.concat(arguments.callee(Y[d],h,j,true));}J();return k;}if(h&&!h.tagName){h=U.document.getElementById(h);if(!h){return[];}}h=h||U.document;var g=C(c);var f=g[O(g)],W=[],Z,X,b=g.pop()||{};if(f){X=Q(f.attributes);}if(X){if(X===b.id){W=[U.document.getElementById(X)]||h;}else{Z=U.document.getElementById(X);if(h===U.document||M(Z,h)){if(Z&&V(Z,null,f)){h=Z;}}else{return[];}}}if(h&&!W.length){W=h.getElementsByTagName(b.tag);}if(W.length){k=R(W,b,j,a);}B();return k;};var M=function(){if(document.documentElement.contains&&!YAHOO.env.ua.webkit<422){return function(X,W){return W.contains(X);};}else{if(document.documentElement.compareDocumentPosition){return function(X,W){return !!(W.compareDocumentPosition(X)&16);};}else{return function(Y,X){var W=Y.parentNode;while(W){if(Y===W){return true;}W=W.parentNode;}return false;};}}}();var R=function(Z,b,c,Y){var X=[];for(var a=0,W=Z.length;a<W;++a){if(!V(Z[a],0,b)||(Y&&Z[a]._found)){continue;}if(c){return Z[a];}if(Y){Z[a]._found=true;N[N.length]=Z[a];}X[X.length]=Z[a];}return X;};var V=function(Y,b,a){a=a||C(b).pop()||{};if(!Y||Y._found||(a.tag!="*"&&Y.tagName.toLowerCase()!=a.tag)){return false;}var X=U.operators,W=U.pseudos,e=a.attributes,f=a.pseudos,Z=a.previous;if(e.length){for(var c=0,d=e.length;c<d;++c){if(X[e[c][1]]&&!X[e[c][1]](Y.getAttribute(e[c][0],2),e[c][2])){return false;}}}if(f.length){for(c=0,d=f.length;c<d;++c){if(W[f[c][0]]&&!W[f[c][0]](Y,f[c][1])){return false;}}}if(Z){if(Z.combinator!==","){return P[Z.combinator](Y,a);}}return true;};var N=[];var L=[];var T={};var J=function(){for(var X=0,W=N.length;X<W;++X){try{delete N[X]._found;}catch(Y){N[X].removeAttribute("_found");}}N=[];};var B=function(){if(!document.documentElement.children){return function(){for(var X=0,W=L.length;X<W;++X){delete L[X]._children;}L=[];};}else{return function(){};}}();var H=function(X,W){W=W||"";if(!T[X+W]){T[X+W]=new RegExp(X,W);}return T[X+W];};var P={" ":function(X,W){X=X.parentNode;while(X&&X.tagName){if(V(X,null,W.previous)){return true;}X=X.parentNode;}return false;},">":function(X,W){return V(X.parentNode,null,W.previous);},"+":function(Y,X){var W=Y.previousSibling;while(W&&W.nodeType!==1){W=W.previousSibling;}if(W&&V(W,null,X.previous)){return true;}return false;},"~":function(Y,X){var W=Y.previousSibling;while(W){if(W.nodeType===1&&V(W,null,X.previous)){return true;}W=W.previousSibling;}return false;}};var G=function(){if(document.documentElement.children){return function(X,W){return(W)?X.children.tags(W):X.children||[];};}else{return function(a,X){if(a._children){return a._children;}var Z=[],b=a.childNodes;for(var Y=0,W=b.length;Y<W;++Y){if(b[Y].tagName){if(!X||b[Y].tagName.toLowerCase()===X){Z[Z.length]=b[Y];}}}a._children=Z;L[L.length]=a;return Z;};}}();var S=function(X,h,l,c){if(l){l=l.toLowerCase();}var j=T[F.NTH_CHILD]=T[F.NTH_CHILD]||new RegExp(F.NTH_CHILD);j.test(h);var g=parseInt(RegExp.$1,10),W=RegExp.$2,d=RegExp.$3,e=parseInt(RegExp.$4,10)||0,k=[];var f=G(X.parentNode,l);if(d){g=2;op="+";W="n";e=(d==="odd")?1:0;}else{if(isNaN(g)){g=(W)?1:0;}}if(g===0){if(c){e=f.length-e+1;}if(f[e-1]===X){return true;}else{return false;}}else{if(g<0){c=!!c;g=Math.abs(g);}}if(!c){for(var Y=e-1,Z=f.length;Y<Z;Y+=g){if(Y>=0&&f[Y]===X){return true;}}}else{for(var Y=f.length-e,Z=f.length;Y>=0;Y-=g){if(Y<Z&&f[Y]===X){return true;}}}return false;};var Q=function(X){for(var Y=0,W=X.length;Y<W;++Y){if(X[Y][0]=="id"&&X[Y][1]==="="){return X[Y][2];}}};var O=function(Y){for(var X=0,W=Y.length;X<W;++X){if(Q(Y[X].attributes)){return X;}}return -1;};var D={tag:/^((?:-?[_a-z]+[\w-]*)|\*)/i,attributes:/^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*)['"]?\]*/i,pseudos:/^:([-\w]+)(?:\(['"]?(.+)['"]?\))*/i,combinator:/^\s*([>+~]|\s)\s*/};
var C=function(W){var Y={},b=[],c,a=false,X;W=A(W);do{a=false;for(var Z in D){if(Z!="tag"&&Z!="combinator"){Y[Z]=Y[Z]||[];}if(X=D[Z].exec(W)){a=true;if(Z!="tag"&&Z!="combinator"){if(Z==="attributes"&&X[1]==="id"){Y.id=X[3];}Y[Z].push(X.slice(1));}else{Y[Z]=X[1];}W=W.replace(X[0],"");if(Z==="combinator"||!W.length){Y.attributes=K(Y.attributes);Y.pseudos=Y.pseudos||[];Y.tag=Y.tag||"*";b.push(Y);Y={previous:Y};}}}}while(a);return b;};var K=function(X){var Y=U.attrAliases;X=X||[];for(var Z=0,W=X.length;Z<W;++Z){if(Y[X[Z][0]]){X[Z][0]=Y[X[Z][0]];}if(!X[Z][1]){X[Z][1]="";}}return X;};var A=function(X){var Y=U.shorthand;var Z=X.match(D.attributes);if(Z){X=X.replace(D.attributes,"REPLACED_ATTRIBUTE");}for(var b in Y){X=X.replace(H(b,"gi"),Y[b]);}if(Z){for(var a=0,W=Z.length;a<W;++a){X=X.replace("REPLACED_ATTRIBUTE",Z[a]);}}return X;};if(YAHOO.env.ua.ie){U.prototype.attrAliases["class"]="className";}U=new U();U.TOKENS=F;U.patterns=D;E.Selector=U;})();YAHOO.register("selector",YAHOO.util.Selector,{version:"2.5.0",build:"895"});