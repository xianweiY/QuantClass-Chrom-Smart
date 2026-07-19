(()=>{var _n=Object.defineProperty;var dt=(e,t)=>()=>(e&&(t=e(e=0)),t);var yn=(e,t)=>{for(var n in t)_n(e,n,{get:t[n],enumerable:!0})};var Te,we,Pn,Ue,$t,O,ze=dt(()=>{Te={backendUrl:"http://127.0.0.1:8700",apiBasePath:"/api",defaultModel:"claude-4.6-sonnet",defaultProvider:"anthropic",showRawDownload:!1,llmApiKeys:{openai:"",claude:"",kimi:"",qwen:""}},we={CONFIG:"quantclass_config",BOOKMARKS:"quantclass_bookmarks",SUMMARIES:"quantclass_summaries",CURRENT_SUMMARY:"quantclass_current_summary",LOCALE:"quantclass_locale"},Pn=[],Ue=[{id:"openai",name:"OpenAI",defaultBaseUrl:"https://api.openai.com/v1",models:["gpt-5","gpt-5.1","gpt-5.2","gpt-5.3","gpt-5.4","o1-preview","gpt-4o"]},{id:"anthropic",name:"Anthropic",defaultBaseUrl:"https://api.anthropic.com/v1",models:["claude-sonnet-4-6","claude-opus-4-6","claude-sonnet-4-6-thinking","claude-sonnet-4-5","claude-opus-4-5","claude-haiku-4-5"]},{id:"gemini",name:"Google Gemini",defaultBaseUrl:"https://generativelanguage.googleapis.com/v1beta/openai/",models:["gemini-3.1-pro","gemini-3.1-flash"]},{id:"deepseek",name:"DeepSeek",defaultBaseUrl:"https://api.deepseek.com",models:["deepseek-chat","deepseek-reasoner"]},{id:"moonshot",name:"Kimi (\u6708\u4E4B\u6697\u9762)",defaultBaseUrl:"https://api.moonshot.cn/v1",models:["kimi-k2.5","kimi-k2"]},{id:"qwen",name:"Qwen (\u901A\u4E49\u5343\u95EE)",defaultBaseUrl:"https://dashscope.aliyuncs.com/compatible-mode/v1",models:["qwen3.6-plus","qwen3.5-plus","qwen3-max"]},{id:"glm",name:"GLM (\u667A\u8C31 AI)",defaultBaseUrl:"https://open.bigmodel.cn/api/paas/v4",models:["glm-5.1","glm-4.7","glm-4-flash"]},{id:"minimax",name:"MiniMax",defaultBaseUrl:"https://api.minimax.chat/v1",models:["minimax-m2.7","abab7-chat"]}],$t=[...Pn,...Ue],O={GENERATE_SUMMARY:"GENERATE_SUMMARY",GET_SUMMARY:"GET_SUMMARY",SUMMARY_RESULT:"SUMMARY_RESULT",CREATE_BOOKMARK:"CREATE_BOOKMARK",GET_BOOKMARKS:"GET_BOOKMARKS",DELETE_BOOKMARK:"DELETE_BOOKMARK",SEARCH:"SEARCH",GET_CONFIG:"GET_CONFIG",UPDATE_CONFIG:"UPDATE_CONFIG",GET_HEALTH:"GET_HEALTH",POLISH_TEXT:"POLISH_TEXT",FORMAT_TEXT:"FORMAT_TEXT",CHECK_CODE:"CHECK_CODE",LIST_AGENTS:"LIST_AGENTS",AGENT_DISCUSS:"AGENT_DISCUSS",AGENT_CHAT_SINGLE:"AGENT_CHAT_SINGLE",EXTRACT_PDF:"EXTRACT_PDF",UPLOAD_PDF:"UPLOAD_PDF",CHAT:"CHAT",ADD_NOTE:"ADD_NOTE",GET_BOOKMARK_DETAIL:"GET_BOOKMARK_DETAIL",GET_CURRENT_PAGE:"GET_CURRENT_PAGE",SHOW_NOTIFICATION:"SHOW_NOTIFICATION",RECORD_READING:"RECORD_READING",CREATE_CHAT_SESSION:"CREATE_CHAT_SESSION",CHAT_IN_SESSION:"CHAT_IN_SESSION",GET_CHAT_SESSIONS:"GET_CHAT_SESSIONS",DELETE_CHAT_SESSION:"DELETE_CHAT_SESSION",SEARCH_CONVERSATIONS:"SEARCH_CONVERSATIONS",GET_MEMORY_ITEMS:"GET_MEMORY_ITEMS",ADD_MEMORY_ITEM:"ADD_MEMORY_ITEM",DELETE_MEMORY_ITEM:"DELETE_MEMORY_ITEM",GET_USER_PROFILE:"GET_USER_PROFILE",EXTRACT_STRATEGY:"EXTRACT_STRATEGY",GET_MEMORY_STATS:"GET_MEMORY_STATS"}});async function ln(){let e=chrome.runtime.id||"default-dev-id",t=await crypto.subtle.importKey("raw",new TextEncoder().encode(e),{name:"PBKDF2"},!1,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt:Un,iterations:1e5,hash:"SHA-256"},t,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function cn(e){if(!e)return"";let t=await ln(),n=crypto.getRandomValues(new Uint8Array(12)),r=new TextEncoder().encode(e),i=await crypto.subtle.encrypt({name:"AES-GCM",iv:n},t,r),s=new Uint8Array(n.byteLength+i.byteLength);return s.set(n,0),s.set(new Uint8Array(i),n.byteLength),btoa(String.fromCharCode(...s))}async function Tt(e){if(!e)return"";try{let t=await ln(),n=Uint8Array.from(atob(e),u=>u.charCodeAt(0)),r=n.slice(0,12),i=n.slice(12),s=await crypto.subtle.decrypt({name:"AES-GCM",iv:r},t,i);return new TextDecoder().decode(s)}catch(t){return console.warn("Decryption failed, returning empty string:",t.message),""}}var Un,dn=dt(()=>{Un=new TextEncoder().encode("quantclass-extension-v1-salt")});var xt={};yn(xt,{apiKeyStorage:()=>ct,bookmarkStorage:()=>Ve,configStorage:()=>Re,storage:()=>le,summaryStorage:()=>On});var le,Re,On,Ve,ct,He=dt(()=>{dn();ze();le={async get(e,t=null){try{let n=await chrome.storage.local.get(e);return n[e]!==void 0?n[e]:t}catch(n){return console.error("Storage get error:",n),t}},async set(e,t){try{return await chrome.storage.local.set({[e]:t}),!0}catch(n){return console.error("Storage set error:",n),!1}},async remove(e){try{return await chrome.storage.local.remove(e),!0}catch(t){return console.error("Storage remove error:",t),!1}},async clear(){try{return await chrome.storage.local.clear(),!0}catch(e){return console.error("Storage clear error:",e),!1}}},Re={async get(){return await le.get(we.CONFIG,null)},async set(e){return await le.set(we.CONFIG,e)}},On={async get(e){return(await le.get(we.SUMMARIES,{}))[e]||null},async set(e,t){let n=await le.get(we.SUMMARIES,{});return n[e]=t,await le.set(we.SUMMARIES,n)},async getAll(){return await le.get(we.SUMMARIES,{})}},Ve={async getAll(){return await le.get(we.BOOKMARKS,[])},async add(e){let t=await this.getAll();return e.id=Date.now().toString(),e.createdAt=new Date().toISOString(),t.unshift(e),await le.set(we.BOOKMARKS,t)},async update(e,t){let n=await this.getAll(),r=n.findIndex(i=>i.id===e);return r!==-1?(n[r]={...n[r],...t,updatedAt:new Date().toISOString()},await le.set(we.BOOKMARKS,n)):!1},async delete(e){let n=(await this.getAll()).filter(r=>r.id!==e);return await le.set(we.BOOKMARKS,n)},async search(e){let t=await this.getAll(),n=e.toLowerCase();return t.filter(r=>r.title&&r.title.toLowerCase().includes(n)||r.summary&&r.summary.toLowerCase().includes(n)||r.tags&&r.tags.some(i=>i.toLowerCase().includes(n)))}},ct={async set(e,t){if(!t)return le.remove(`quantclass_apikey_${e}`);let n=await cn(t);return le.set(`quantclass_apikey_${e}`,n)},async get(e){let t=await le.get(`quantclass_apikey_${e}`,"");return t?Tt(t):""},async getAll(){let e="quantclass_apikey_";try{let t=await chrome.storage.local.get(null),n={};for(let[r,i]of Object.entries(t)){if(!r.startsWith(e))continue;let s=r.slice(e.length);if(!i){n[s]="";continue}try{n[s]=await Tt(i)}catch(u){console.warn(`Failed to decrypt api key for ${s}:`,u),n[s]=""}}return n}catch(t){return console.error("apiKeyStorage.getAll error:",t),{}}},async remove(e){return le.remove(`quantclass_apikey_${e}`)}}});var st,K,Dt,bn,Pe,Et,Rt,It,Ut,mt,ut,pt,vn,tt={},nt=[],kn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ot=Array.isArray;function xe(e,t){for(var n in t)e[n]=t[n];return e}function ht(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function ft(e,t,n){var r,i,s,u={};for(s in t)s=="key"?r=t[s]:s=="ref"?i=t[s]:u[s]=t[s];if(arguments.length>2&&(u.children=arguments.length>3?st.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(s in e.defaultProps)u[s]===void 0&&(u[s]=e.defaultProps[s]);return et(e,u,r,i,null)}function et(e,t,n,r,i){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Dt,__i:-1,__u:0};return i==null&&K.vnode!=null&&K.vnode(s),s}function rt(e){return e.children}function We(e,t){this.props=e,this.context=t}function qe(e,t){if(t==null)return e.__?qe(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?qe(e):null}function wn(e){if(e.__P&&e.__d){var t=e.__v,n=t.__e,r=[],i=[],s=xe({},t);s.__v=t.__v+1,K.vnode&&K.vnode(s),_t(e.__P,s,t,e.__n,e.__P.namespaceURI,32&t.__u?[n]:null,r,n??qe(t),!!(32&t.__u),i),s.__v=t.__v,s.__.__k[s.__i]=s,Kt(r,s,i),t.__e=t.__=null,s.__e!=n&&Ot(s)}}function Ot(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),Ot(e)}function Mt(e){(!e.__d&&(e.__d=!0)&&Pe.push(e)&&!at.__r++||Et!=K.debounceRendering)&&((Et=K.debounceRendering)||Rt)(at)}function at(){try{for(var e,t=1;Pe.length;)Pe.length>t&&Pe.sort(It),e=Pe.shift(),t=Pe.length,wn(e)}finally{Pe.length=at.__r=0}}function Ht(e,t,n,r,i,s,u,_,m,d,k){var p,f,$,P,I,D,M,E=r&&r.__k||nt,H=t.length;for(m=$n(n,t,E,m,H),p=0;p<H;p++)($=n.__k[p])!=null&&(f=$.__i!=-1&&E[$.__i]||tt,$.__i=p,D=_t(e,$,f,i,s,u,_,m,d,k),P=$.__e,$.ref&&f.ref!=$.ref&&(f.ref&&yt(f.ref,null,$),k.push($.ref,$.__c||P,$)),I==null&&P!=null&&(I=P),(M=!!(4&$.__u))||f.__k===$.__k?m=Ft($,m,e,M):typeof $.type=="function"&&D!==void 0?m=D:P&&(m=P.nextSibling),$.__u&=-7);return n.__e=I,m}function $n(e,t,n,r,i){var s,u,_,m,d,k=n.length,p=k,f=0;for(e.__k=new Array(i),s=0;s<i;s++)(u=t[s])!=null&&typeof u!="boolean"&&typeof u!="function"?(typeof u=="string"||typeof u=="number"||typeof u=="bigint"||u.constructor==String?u=e.__k[s]=et(null,u,null,null,null):ot(u)?u=e.__k[s]=et(rt,{children:u},null,null,null):u.constructor===void 0&&u.__b>0?u=e.__k[s]=et(u.type,u.props,u.key,u.ref?u.ref:null,u.__v):e.__k[s]=u,m=s+f,u.__=e,u.__b=e.__b+1,_=null,(d=u.__i=Sn(u,n,m,p))!=-1&&(p--,(_=n[d])&&(_.__u|=2)),_==null||_.__v==null?(d==-1&&(i>k?f--:i<k&&f++),typeof u.type!="function"&&(u.__u|=4)):d!=m&&(d==m-1?f--:d==m+1?f++:(d>m?f--:f++,u.__u|=4))):e.__k[s]=null;if(p)for(s=0;s<k;s++)(_=n[s])!=null&&!(2&_.__u)&&(_.__e==r&&(r=qe(_)),Bt(_,_));return r}function Ft(e,t,n,r){var i,s;if(typeof e.type=="function"){for(i=e.__k,s=0;i&&s<i.length;s++)i[s]&&(i[s].__=e,t=Ft(i[s],t,n,r));return t}e.__e!=t&&(r&&(t&&e.type&&!t.parentNode&&(t=qe(e)),n.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Sn(e,t,n,r){var i,s,u,_=e.key,m=e.type,d=t[n],k=d!=null&&(2&d.__u)==0;if(d===null&&_==null||k&&_==d.key&&m==d.type)return n;if(r>(k?1:0)){for(i=n-1,s=n+1;i>=0||s<t.length;)if((d=t[u=i>=0?i--:s++])!=null&&!(2&d.__u)&&_==d.key&&m==d.type)return u}return-1}function Pt(e,t,n){t[0]=="-"?e.setProperty(t,n??""):e[t]=n==null?"":typeof n!="number"||kn.test(t)?n:n+"px"}function Je(e,t,n,r,i){var s,u;e:if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||Pt(e.style,t,"");if(n)for(t in n)r&&n[t]==r[t]||Pt(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")s=t!=(t=t.replace(Ut,"$1")),u=t.toLowerCase(),t=u in e||t=="onFocusOut"||t=="onFocusIn"?u.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+s]=n,n?r?n.u=r.u:(n.u=mt,e.addEventListener(t,s?pt:ut,s)):e.removeEventListener(t,s?pt:ut,s);else{if(i=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n))}}function Lt(e){return function(t){if(this.l){var n=this.l[t.type+e];if(t.t==null)t.t=mt++;else if(t.t<n.u)return;return n(K.event?K.event(t):t)}}}function _t(e,t,n,r,i,s,u,_,m,d){var k,p,f,$,P,I,D,M,E,H,B,J,Z,Y,ce,G=t.type;if(t.constructor!==void 0)return null;128&n.__u&&(m=!!(32&n.__u),s=[_=t.__e=n.__e]),(k=K.__b)&&k(t);e:if(typeof G=="function")try{if(M=t.props,E=G.prototype&&G.prototype.render,H=(k=G.contextType)&&r[k.__c],B=k?H?H.props.value:k.__:r,n.__c?D=(p=t.__c=n.__c).__=p.__E:(E?t.__c=p=new G(M,B):(t.__c=p=new We(M,B),p.constructor=G,p.render=Tn),H&&H.sub(p),p.state||(p.state={}),p.__n=r,f=p.__d=!0,p.__h=[],p._sb=[]),E&&p.__s==null&&(p.__s=p.state),E&&G.getDerivedStateFromProps!=null&&(p.__s==p.state&&(p.__s=xe({},p.__s)),xe(p.__s,G.getDerivedStateFromProps(M,p.__s))),$=p.props,P=p.state,p.__v=t,f)E&&G.getDerivedStateFromProps==null&&p.componentWillMount!=null&&p.componentWillMount(),E&&p.componentDidMount!=null&&p.__h.push(p.componentDidMount);else{if(E&&G.getDerivedStateFromProps==null&&M!==$&&p.componentWillReceiveProps!=null&&p.componentWillReceiveProps(M,B),t.__v==n.__v||!p.__e&&p.shouldComponentUpdate!=null&&p.shouldComponentUpdate(M,p.__s,B)===!1){t.__v!=n.__v&&(p.props=M,p.state=p.__s,p.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(F){F&&(F.__=t)}),nt.push.apply(p.__h,p._sb),p._sb=[],p.__h.length&&u.push(p);break e}p.componentWillUpdate!=null&&p.componentWillUpdate(M,p.__s,B),E&&p.componentDidUpdate!=null&&p.__h.push(function(){p.componentDidUpdate($,P,I)})}if(p.context=B,p.props=M,p.__P=e,p.__e=!1,J=K.__r,Z=0,E)p.state=p.__s,p.__d=!1,J&&J(t),k=p.render(p.props,p.state,p.context),nt.push.apply(p.__h,p._sb),p._sb=[];else do p.__d=!1,J&&J(t),k=p.render(p.props,p.state,p.context),p.state=p.__s;while(p.__d&&++Z<25);p.state=p.__s,p.getChildContext!=null&&(r=xe(xe({},r),p.getChildContext())),E&&!f&&p.getSnapshotBeforeUpdate!=null&&(I=p.getSnapshotBeforeUpdate($,P)),Y=k!=null&&k.type===rt&&k.key==null?Nt(k.props.children):k,_=Ht(e,ot(Y)?Y:[Y],t,n,r,i,s,u,_,m,d),p.base=t.__e,t.__u&=-161,p.__h.length&&u.push(p),D&&(p.__E=p.__=null)}catch(F){if(t.__v=null,m||s!=null)if(F.then){for(t.__u|=m?160:128;_&&_.nodeType==8&&_.nextSibling;)_=_.nextSibling;s[s.indexOf(_)]=null,t.__e=_}else{for(ce=s.length;ce--;)ht(s[ce]);gt(t)}else t.__e=n.__e,t.__k=n.__k,F.then||gt(t);K.__e(F,t,n)}else s==null&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):_=t.__e=An(n.__e,t,n,r,i,s,u,m,d);return(k=K.diffed)&&k(t),128&t.__u?void 0:_}function gt(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(gt))}function Kt(e,t,n){for(var r=0;r<n.length;r++)yt(n[r],n[++r],n[++r]);K.__c&&K.__c(t,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(s){s.call(i)})}catch(s){K.__e(s,i.__v)}})}function Nt(e){return typeof e!="object"||e==null||e.__b>0?e:ot(e)?e.map(Nt):xe({},e)}function An(e,t,n,r,i,s,u,_,m){var d,k,p,f,$,P,I,D=n.props||tt,M=t.props,E=t.type;if(E=="svg"?i="http://www.w3.org/2000/svg":E=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),s!=null){for(d=0;d<s.length;d++)if(($=s[d])&&"setAttribute"in $==!!E&&(E?$.localName==E:$.nodeType==3)){e=$,s[d]=null;break}}if(e==null){if(E==null)return document.createTextNode(M);e=document.createElementNS(i,E,M.is&&M),_&&(K.__m&&K.__m(t,s),_=!1),s=null}if(E==null)D===M||_&&e.data==M||(e.data=M);else{if(s=s&&st.call(e.childNodes),!_&&s!=null)for(D={},d=0;d<e.attributes.length;d++)D[($=e.attributes[d]).name]=$.value;for(d in D)$=D[d],d=="dangerouslySetInnerHTML"?p=$:d=="children"||d in M||d=="value"&&"defaultValue"in M||d=="checked"&&"defaultChecked"in M||Je(e,d,null,$,i);for(d in M)$=M[d],d=="children"?f=$:d=="dangerouslySetInnerHTML"?k=$:d=="value"?P=$:d=="checked"?I=$:_&&typeof $!="function"||D[d]===$||Je(e,d,$,D[d],i);if(k)_||p&&(k.__html==p.__html||k.__html==e.innerHTML)||(e.innerHTML=k.__html),t.__k=[];else if(p&&(e.innerHTML=""),Ht(t.type=="template"?e.content:e,ot(f)?f:[f],t,n,r,E=="foreignObject"?"http://www.w3.org/1999/xhtml":i,s,u,s?s[0]:n.__k&&qe(n,0),_,m),s!=null)for(d=s.length;d--;)ht(s[d]);_||(d="value",E=="progress"&&P==null?e.removeAttribute("value"):P!=null&&(P!==e[d]||E=="progress"&&!P||E=="option"&&P!=D[d])&&Je(e,d,P,D[d],i),d="checked",I!=null&&I!=e[d]&&Je(e,d,I,D[d],i))}return e}function yt(e,t,n){try{if(typeof e=="function"){var r=typeof e.__u=="function";r&&e.__u(),r&&t==null||(e.__u=e(t))}else e.current=t}catch(i){K.__e(i,n)}}function Bt(e,t,n){var r,i;if(K.unmount&&K.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||yt(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(s){K.__e(s,t)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&Bt(r[i],t,n||typeof e.type!="function");n||ht(e.__e),e.__c=e.__=e.__e=void 0}function Tn(e,t,n){return this.constructor(e,n)}function bt(e,t,n){var r,i,s,u;t==document&&(t=document.documentElement),K.__&&K.__(e,t),i=(r=typeof n=="function")?null:n&&n.__k||t.__k,s=[],u=[],_t(t,e=(!r&&n||t).__k=ft(rt,null,[e]),i||tt,tt,t.namespaceURI,!r&&n?[n]:i?null:t.firstChild?st.call(t.childNodes):null,s,!r&&n?n:i?i.__e:t.firstChild,r,u),Kt(s,e,u)}st=nt.slice,K={__e:function(e,t,n,r){for(var i,s,u;t=t.__;)if((i=t.__c)&&!i.__)try{if((s=i.constructor)&&s.getDerivedStateFromError!=null&&(i.setState(s.getDerivedStateFromError(e)),u=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,r||{}),u=i.__d),u)return i.__E=i}catch(_){e=_}throw e}},Dt=0,bn=function(e){return e!=null&&e.constructor===void 0},We.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=xe({},this.state),typeof e=="function"&&(e=e(xe({},n),this.props)),e&&xe(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),Mt(this))},We.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Mt(this))},We.prototype.render=rt,Pe=[],Rt=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,It=function(e,t){return e.__v.__b-t.__v.__b},at.__r=0,Ut=/(PointerCapture)$|Capture$/i,mt=0,ut=Lt(!1),pt=Lt(!0),vn=0;var Ye,W,vt,Gt,lt=0,Xt=[],Q=K,qt=Q.__b,zt=Q.__r,jt=Q.diffed,Wt=Q.__c,Yt=Q.unmount,Vt=Q.__;function wt(e,t){Q.__h&&Q.__h(W,e,lt||t),lt=0;var n=W.__H||(W.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function S(e){return lt=1,xn(Jt,e)}function xn(e,t,n){var r=wt(Ye++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):Jt(void 0,t),function(_){var m=r.__N?r.__N[0]:r.__[0],d=r.t(m,_);m!==d&&(r.__N=[d,r.__[1]],r.__c.setState({}))}],r.__c=W,!W.__f)){var i=function(_,m,d){if(!r.__c.__H)return!0;var k=r.__c.__H.__.filter(function(f){return f.__c});if(k.every(function(f){return!f.__N}))return!s||s.call(this,_,m,d);var p=r.__c.props!==_;return k.some(function(f){if(f.__N){var $=f.__[0];f.__=f.__N,f.__N=void 0,$!==f.__[0]&&(p=!0)}}),s&&s.call(this,_,m,d)||p};W.__f=!0;var s=W.shouldComponentUpdate,u=W.componentWillUpdate;W.componentWillUpdate=function(_,m,d){if(this.__e){var k=s;s=void 0,i(_,m,d),s=k}u&&u.call(this,_,m,d)},W.shouldComponentUpdate=i}return r.__N||r.__}function X(e,t){var n=wt(Ye++,3);!Q.__s&&Zt(n.__H,t)&&(n.__=e,n.u=t,W.__H.__h.push(n))}function ge(e){return lt=5,Cn(function(){return{current:e}},[])}function Cn(e,t){var n=wt(Ye++,7);return Zt(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function En(){for(var e;e=Xt.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(it),t.__h.some(kt),t.__h=[]}catch(n){t.__h=[],Q.__e(n,e.__v)}}}Q.__b=function(e){W=null,qt&&qt(e)},Q.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Vt&&Vt(e,t)},Q.__r=function(e){zt&&zt(e),Ye=0;var t=(W=e.__c).__H;t&&(vt===W?(t.__h=[],W.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(t.__h.some(it),t.__h.some(kt),t.__h=[],Ye=0)),vt=W},Q.diffed=function(e){jt&&jt(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Xt.push(t)!==1&&Gt===Q.requestAnimationFrame||((Gt=Q.requestAnimationFrame)||Mn)(En)),t.__H.__.some(function(n){n.u&&(n.__H=n.u),n.u=void 0})),vt=W=null},Q.__c=function(e,t){t.some(function(n){try{n.__h.some(it),n.__h=n.__h.filter(function(r){return!r.__||kt(r)})}catch(r){t.some(function(i){i.__h&&(i.__h=[])}),t=[],Q.__e(r,n.__v)}}),Wt&&Wt(e,t)},Q.unmount=function(e){Yt&&Yt(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.some(function(r){try{it(r)}catch(i){t=i}}),n.__H=void 0,t&&Q.__e(t,n.__v))};var Qt=typeof requestAnimationFrame=="function";function Mn(e){var t,n=function(){clearTimeout(r),Qt&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);Qt&&(t=requestAnimationFrame(n))}function it(e){var t=W,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),W=t}function kt(e){var t=W;e.__c=e.__(),W=t}function Zt(e,t){return!e||e.length!==t.length||t.some(function(n,r){return n!==e[r]})}function Jt(e,t){return typeof t=="function"?t(e):t}var tn=function(e,t,n,r){var i;t[0]=0;for(var s=1;s<t.length;s++){var u=t[s++],_=t[s]?(t[0]|=u?1:2,n[t[s++]]):t[++s];u===3?r[0]=_:u===4?r[1]=Object.assign(r[1]||{},_):u===5?(r[1]=r[1]||{})[t[++s]]=_:u===6?r[1][t[++s]]+=_+"":u?(i=e.apply(_,tn(e,_,n,["",null])),r.push(i),_[0]?t[0]|=2:(t[s-2]=0,t[s]=i)):r.push(_)}return r},en=new Map;function nn(e){var t=en.get(this);return t||(t=new Map,en.set(this,t)),(t=tn(this,t.get(e)||(t.set(e,t=function(n){for(var r,i,s=1,u="",_="",m=[0],d=function(f){s===1&&(f||(u=u.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?m.push(0,f,u):s===3&&(f||u)?(m.push(3,f,u),s=2):s===2&&u==="..."&&f?m.push(4,f,0):s===2&&u&&!f?m.push(5,0,!0,u):s>=5&&((u||!f&&s===5)&&(m.push(s,0,u,i),s=6),f&&(m.push(s,f,0,i),s=6)),u=""},k=0;k<n.length;k++){k&&(s===1&&d(),d(k));for(var p=0;p<n[k].length;p++)r=n[k][p],s===1?r==="<"?(d(),m=[m],s=3):u+=r:s===4?u==="--"&&r===">"?(s=1,u=""):u=r+u[0]:_?r===_?_="":u+=r:r==='"'||r==="'"?_=r:r===">"?(d(),s=1):s&&(r==="="?(s=5,i=u,u=""):r==="/"&&(s<5||n[k][p+1]===">")?(d(),s===3&&(m=m[0]),s=m,(m=m[0]).push(2,0,s),s=0):r===" "||r==="	"||r===`
`||r==="\r"?(d(),s=2):u+=r),s===3&&u==="!--"&&(s=4,m=m[0])}return d(),m}(e)),t),arguments,[])).length>1?t:t[0]}var b=nn.bind(ft);function an({tabs:e,activeTab:t,onChange:n}){function r(i,s){let u=s;if(i.key==="ArrowRight")u=(s+1)%e.length;else if(i.key==="ArrowLeft")u=(s-1+e.length)%e.length;else return;i.preventDefault(),n(e[u].id),i.target.parentElement.children[u]?.focus()}return b`
    <nav class="tabs" role="tablist">
      ${e.map((i,s)=>b`
        <button
          key=${i.id}
          role="tab"
          aria-selected=${t===i.id}
          tabindex=${t===i.id?0:-1}
          class="tab ${t===i.id?"active":""}"
          onClick=${()=>n(i.id)}
          onKeyDown=${u=>r(u,s)}
        >
          <span class="tab-icon">${i.icon}</span>
          <span class="tab-label">${i.label}</span>
        </button>
      `)}
    </nav>
  `}ze();var St={zh:{"tab.summary":"\u6458\u8981","tab.knowledge":"\u77E5\u8BC6\u5E93","tab.chat":"\u804A\u5929","tab.settings":"\u8BBE\u7F6E","common.popOut":"\u5F39\u51FA\u72EC\u7ACB\u7A97\u53E3\uFF08\u53EF\u81EA\u7531\u62D6\u62FD\u5927\u5C0F\uFF09","common.loading":"\u52A0\u8F7D\u4E2D...","common.save":"\u4FDD\u5B58","common.cancel":"\u53D6\u6D88","common.delete":"\u5220\u9664","common.open":"\u6253\u5F00","common.reset":"\u91CD\u7F6E","common.refresh":"\u91CD\u65B0\u751F\u6210","summary.notTopicPage":"\u5F53\u524D\u9875\u9762\u4E0D\u662F\u5E16\u5B50\u8BE6\u60C5\u9875","summary.notTopicHint":"\u6253\u5F00\u8BBA\u575B\u5E16\u5B50\u5373\u53EF\u67E5\u770B AI \u6458\u8981","summary.regenerate":"\u91CD\u65B0\u751F\u6210","summary.generating":"\u6B63\u5728\u751F\u6210\u6458\u8981...","summary.empty":"\u6682\u65E0\u6458\u8981","summary.generate":"\u751F\u6210\u6458\u8981","knowledge.searchPlaceholder":"\u641C\u7D22\u6536\u85CF...","knowledge.confirmDelete":"\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u6536\u85CF\u5417\uFF1F","knowledge.noMatch":"\u6CA1\u6709\u5339\u914D\u7684\u6536\u85CF","knowledge.empty":"\u77E5\u8BC6\u5E93\u4E3A\u7A7A","knowledge.emptyHint":"\u5728\u5E16\u5B50\u9875\u9762\u70B9\u51FB\u6536\u85CF\u6309\u94AE\u6DFB\u52A0","knowledge.sortLabel":"\u6392\u5E8F","knowledge.sortCreatedDesc":"\u6700\u65B0\u6536\u85CF","knowledge.sortCreatedAsc":"\u6700\u65E9\u6536\u85CF","knowledge.sortUpdatedDesc":"\u6700\u8FD1\u66F4\u65B0","knowledge.sortTitleAsc":"\u6807\u9898 A\u2192Z","knowledge.sortTitleDesc":"\u6807\u9898 Z\u2192A","knowledge.loadMore":"\u52A0\u8F7D\u66F4\u591A","knowledge.loadingMore":"\u52A0\u8F7D\u4E2D...","knowledge.loadedAll":"\u5DF2\u5168\u90E8\u52A0\u8F7D ({total})","knowledge.countLabel":"\u5171 {total} \u6761","knowledge.refresh":"\u5237\u65B0","knowledge.refreshing":"\u5237\u65B0\u4E2D","knowledge.refreshed":"\u2713 \u5DF2\u5237\u65B0\uFF0C\u5171 {total} \u6761","knowledge.backendUnreachable":"\u540E\u7AEF\u4E0D\u53EF\u8FBE","knowledge.loadFallbackWarning":"\u26A0\uFE0F \u540E\u7AEF\u52A0\u8F7D\u5931\u8D25\uFF0C\u663E\u793A\u7684\u662F\u672C\u5730\u7F13\u5B58\uFF1A{error}","knowledge.loadMoreFailed":"\u2717 \u52A0\u8F7D\u66F4\u591A\u5931\u8D25\uFF1A{error}","knowledge.tagEdit":"\u7BA1\u7406\u6807\u7B7E","knowledge.tagDone":"\u5B8C\u6210","knowledge.tagAddPlaceholder":"\u8F93\u5165\u65B0\u6807\u7B7E...","knowledge.deleteSuccess":"\u2713 \u5DF2\u5220\u9664","knowledge.deleteBackendFailed":"\u26A0\uFE0F \u672C\u5730\u5DF2\u5220\u9664\uFF0C\u4F46\u540E\u7AEF\u540C\u6B65\u5931\u8D25\uFF1A{error}","knowledge.openLink":"\u6253\u5F00\u94FE\u63A5","knowledge.copyPath":"\u590D\u5236\u8DEF\u5F84","knowledge.openOriginal":"\u6253\u5F00\u539F\u6587","knowledge.summaryLabel":"\u{1F4DD} AI \u6458\u8981","knowledge.notesLabel":"\u{1F4C4} \u4FDD\u5B58\u7684\u539F\u6587","search.placeholder":"\u641C\u7D22\u77E5\u8BC6\u5E93...","search.searching":"\u641C\u7D22\u4E2D...","search.button":"\u641C\u7D22","search.history":"\u641C\u7D22\u5386\u53F2","search.clearHistory":"\u6E05\u9664","search.noResults":"\u672A\u627E\u5230\u76F8\u5173\u7ED3\u679C","search.resultCount":"\u627E\u5230 {count} \u4E2A\u7ED3\u679C","search.relevance":"\u76F8\u5173\u5EA6: {score}%","search.errorGeneric":"\u641C\u7D22\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5","search.errorPrefix":"\u641C\u7D22\u5931\u8D25\uFF1A","settings.saved":"\u2713 \u8BBE\u7F6E\u5DF2\u4FDD\u5B58","settings.savedLocalOnly":"\u26A0\uFE0F \u672C\u5730\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u540E\u7AEF\u540C\u6B65\u5931\u8D25\uFF1A{error}","settings.saveFailed":"\u2717 \u4FDD\u5B58\u5931\u8D25\uFF1A{error}","settings.testNoResponse":"\u540E\u7AEF\u65E0\u54CD\u5E94","settings.language":"\u8BED\u8A00 / Language","settings.backend":"\u540E\u7AEF\u670D\u52A1","settings.backendUrl":"\u540E\u7AEF\u5730\u5740","settings.backendHint":"QuantClass \u540E\u7AEF\u670D\u52A1\u5730\u5740","settings.testConnection":"\u6D4B\u8BD5\u8FDE\u63A5","settings.testing":"\u6D4B\u8BD5\u4E2D...","settings.testOk":"\u8FDE\u63A5\u6B63\u5E38 ({model})","settings.testFail":"\u8FDE\u63A5\u5931\u8D25\uFF1A{error}","settings.agentManage":"Agent \u7BA1\u7406","settings.agentHint":"\u7BA1\u7406 AI \u8BA8\u8BBA\u89D2\u8272\uFF0C\u6BCF\u4E2A Agent \u6709\u72EC\u7ACB\u7684 .md \u6587\u4EF6\u5B58\u4E8E\u672C\u5730","settings.agentAdd":"\u6DFB\u52A0\u81EA\u5B9A\u4E49 Agent","settings.agentNamePrompt":"\u8F93\u5165 Agent \u540D\u79F0\uFF08\u5982\uFF1A\u4EA7\u54C1\u7ECF\u7406\uFF09","settings.agentIconPrompt":"\u8F93\u5165 Emoji \u56FE\u6807","settings.agentDescPrompt":"\u8F93\u5165\u4E00\u53E5\u8BDD\u63CF\u8FF0","settings.agentPromptPrompt":"\u8F93\u5165 Agent \u7684\u89D2\u8272\u8BBE\u5B9A\uFF08System Prompt\uFF09","settings.agentCreated":"\u2713 Agent \u5DF2\u521B\u5EFA","settings.storagePath":"\u77E5\u8BC6\u5E93\u5B58\u50A8","settings.storagePathLabel":"\u5B58\u50A8\u8DEF\u5F84","settings.storagePathHint":"MD \u6587\u4EF6\u4FDD\u5B58\u5728\u6B64\u76EE\u5F55\u4E0B\u7684 knowledge/ \u5B50\u6587\u4EF6\u5939\uFF08macOS/Linux: ~/.quantclass/data\uFF0CWindows: C:\\Users\\\u4F60\u7684\u7528\u6237\u540D\\.quantclass\\data\uFF09","settings.defaultModel":"\u9ED8\u8BA4\u6A21\u578B","settings.selectModel":"\u9009\u62E9\u6A21\u578B","settings.customModelLabel":"\u6216\u8F93\u5165\u81EA\u5B9A\u4E49\u6A21\u578B\u540D","settings.customModelPlaceholder":"\u5982 deepseek-chat, llama-3.1-70b...","settings.customModelApply":"\u5E94\u7528","settings.customModelHint":"\u8F93\u5165\u540E\u70B9\u5E94\u7528\u6216\u6309 Enter\uFF0C\u6A21\u578B\u540D\u5C06\u7528\u4E8E\u4E0B\u6B21 LLM \u8C03\u7528","settings.apiKeys":"LLM \u670D\u52A1\u5546","settings.apiKeysHint":"\u914D\u7F6E LLM \u670D\u52A1\u7684 Base URL \u4E0E API Key\uFF08Key \u52A0\u5BC6\u5B58\u50A8\u5728\u672C\u5730\uFF0CBase URL \u540C\u6B65\u5230\u540E\u7AEF\uFF09","settings.apiKeyLabel":"API Key","settings.apiKeyPlaceholder":"\u8F93\u5165 {provider} API Key","settings.apiKeyConfigured":"\u2713 \u5DF2\u914D\u7F6E\uFF08\u8F93\u5165\u65B0\u503C\u5C06\u8986\u76D6\uFF09","settings.customAdd":"\u6DFB\u52A0\u81EA\u5B9A\u4E49 LLM","settings.customCancel":"\u53D6\u6D88","settings.customName":"\u540D\u79F0","settings.customModels":"\u6A21\u578B\u540D\uFF08\u9017\u53F7\u5206\u9694\uFF09","settings.customConfirm":"\u786E\u8BA4\u6DFB\u52A0","settings.customAdded":"\u2713 \u81EA\u5B9A\u4E49 LLM \u5DF2\u6DFB\u52A0","settings.customDeleted":"\u2713 \u5DF2\u5220\u9664","settings.apiBaseUrlLabel":"Base URL","settings.apiBaseUrlPlaceholder":"\u4F8B\u5982 {url}\uFF08\u7559\u7A7A\u4FDD\u6301\u4E0D\u53D8\uFF09","settings.saving":"\u4FDD\u5B58\u4E2D...","settings.saveButton":"\u4FDD\u5B58\u8BBE\u7F6E","content.addedToKnowledge":"\u5DF2\u6DFB\u52A0\u5230\u77E5\u8BC6\u5E93","panel.aiSummary":"AI \u6458\u8981","panel.regenerate":"\u91CD\u65B0\u751F\u6210","panel.bookmark":"\u6536\u85CF","panel.generating":"\u6B63\u5728\u751F\u6210\u6458\u8981...","panel.emptySummary":"\u6682\u65E0\u6458\u8981\uFF0C\u70B9\u51FB\u5237\u65B0\u6309\u94AE\u751F\u6210","panel.generationFailed":"\u6458\u8981\u751F\u6210\u5931\u8D25\uFF1A{error}","panel.noResult":"\u540E\u7AEF\u672A\u8FD4\u56DE\u7ED3\u679C\uFF0C\u8BF7\u68C0\u67E5\u540E\u7AEF\u662F\u5426\u542F\u52A8\u3001API Key \u662F\u5426\u914D\u7F6E","chat.placeholder":"\u8F93\u5165\u95EE\u9898...","chat.error":"\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5","chat.contextLoaded":"\u5DF2\u52A0\u8F7D\u5F53\u524D\u5E16\u5B50\u5185\u5BB9","chat.welcomeTopic":"\u6211\u5DF2\u8BFB\u53D6\u4E86\u5F53\u524D\u9875\u9762\uFF0C\u4F60\u53EF\u4EE5\u95EE\u6211\u4EFB\u4F55\u5173\u4E8E\u8FD9\u7BC7\u6587\u7AE0\u7684\u95EE\u9898\u3002","chat.welcomeGeneral":"\u4F60\u597D\uFF01\u6709\u4EC0\u4E48\u91CF\u5316\u6216\u7F16\u7A0B\u95EE\u9898\u53EF\u4EE5\u5E2E\u4F60\uFF1F","chat.welcomePdf":"\u{1F4C4} \u68C0\u6D4B\u5230 PDF \u9875\u9762\u3002\u70B9\u51FB\u4E0A\u65B9 \u{1F4CE} PDF \u6309\u94AE\u7C98\u8D34 PDF \u4E0B\u8F7D\u94FE\u63A5\uFF0C\u5373\u53EF\u5206\u6790 PDF \u5185\u5BB9\u3002","chat.pdfUrlPlaceholder":"\u7C98\u8D34 PDF \u6587\u4EF6\u7684\u76F4\u63A5\u4E0B\u8F7D\u94FE\u63A5...","chat.pdfUrlHint":"\u7C98\u8D34\u94FE\u63A5\u6216\u4E0A\u4F20\u672C\u5730\u6587\u4EF6","chat.btnSaveSummary":"\u6536\u85CF","chat.btnSaveFull":"\u539F\u6587","chat.btnHistory":"\u5386\u53F2","chat.btnNew":"\u65B0\u5EFA","chat.savedSummary":"\u6458\u8981\u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","chat.savedFull":"\u539F\u6587\u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","agent.inviteTitle":"\u9080\u8BF7 Agent \u4E00\u8D77\u9605\u8BFB","agent.startReading":"\u5F00\u59CB\u9605\u8BFB \xB7 Agent \u5C06\u53C2\u4E0E\u8BA8\u8BBA","agent.defaultQuestion":"\u8BF7\u5404\u4F4D Agent \u4ECE\u5404\u81EA\u89D2\u5EA6\u5206\u6790\u4E00\u4E0B\u8FD9\u7BC7\u6587\u7AE0\u7684\u6838\u5FC3\u5185\u5BB9","agent.discussing":"Agent \u8BA8\u8BBA\u4E2D...","agent.saveToKb":"\u6536\u85CF","agent.saveToKbTitle":"\u628A\u6574\u4E2A\u8BA8\u8BBA\u5B58\u5165\u77E5\u8BC6\u5E93","agent.savedToKnowledge":"\u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","agent.savedWithoutNote":"\u4E66\u7B7E\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u7B14\u8BB0\u9644\u52A0\u5931\u8D25","agent.saveFailed":"\u4FDD\u5B58\u5931\u8D25","agent.saveEmpty":"\u6682\u65E0\u8BA8\u8BBA\u5185\u5BB9\u53EF\u4FDD\u5B58","agent.discussionTitle":"Agent \u5706\u684C\u8BA8\u8BBA","agent.inputPlaceholder":"\u8F93\u5165\u95EE\u9898\uFF0C\u6216 @agent\u540D \u5355\u72EC\u8FFD\u95EE...","chat.thinking":"\u601D\u8003","chat.thinkingHint":"\u5F00\u542F\u6DF1\u5EA6\u601D\u8003\u6A21\u5F0F\uFF08AI \u4F1A\u66F4\u4ED4\u7EC6\u5730\u5206\u6790\u540E\u56DE\u7B54\uFF09","chat.copyMd":"\u590D\u5236 Markdown","chat.saveMd":"\u53E6\u5B58\u4E3A .md \u6587\u4EF6","chat.pdfOr":"\u2014 \u6216 \u2014","chat.pdfUpload":"\u4E0A\u4F20\u672C\u5730 PDF","chat.pdfExtractFailed":"PDF \u89E3\u6790\u5931\u8D25\uFF0C\u8BF7\u786E\u8BA4\u6587\u4EF6\u53EF\u8BFB","chat.summarize":"\u6458\u8981","chat.summarizePrompt":"\u8BF7\u7528\u4E2D\u6587\u5BF9\u8FD9\u7BC7\u5E16\u5B50\u505A\u4E00\u4E2A\u7ED3\u6784\u5316\u6458\u8981","chat.keyPoints":"\u8981\u70B9","chat.keyPointsPrompt":"\u8FD9\u7BC7\u5E16\u5B50\u7684\u6838\u5FC3\u8981\u70B9\u548C\u5173\u952E\u7ED3\u8BBA\u662F\u4EC0\u4E48\uFF1F","chat.explain":"\u89E3\u91CA","chat.explainPrompt":"\u8BF7\u7528\u901A\u4FD7\u7684\u8BED\u8A00\u89E3\u91CA\u8FD9\u7BC7\u5E16\u5B50\u8BB2\u4E86\u4EC0\u4E48","chat.newSession":"\u65B0\u4F1A\u8BDD","chat.history":"\u5386\u53F2\u4F1A\u8BDD","chat.historyTitle":"\u5386\u53F2\u4F1A\u8BDD","chat.noHistory":"\u6682\u65E0\u5386\u53F2\u4F1A\u8BDD","chat.generalChat":"\u901A\u7528\u5BF9\u8BDD","chat.messages":"\u6761\u6D88\u606F","chat.saveToKb":"\u5B58\u5165\u77E5\u8BC6\u5E93","chat.savedToKnowledge":"\u2713 \u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","chat.saveEmpty":"\u6CA1\u6709\u5185\u5BB9\u53EF\u4FDD\u5B58","chat.clearAll":"\u6E05\u7A7A\u5168\u90E8","chat.clear7days":"\u6E05\u96647\u5929\u524D","chat.confirmClearAll":"\u786E\u5B9A\u8981\u6E05\u7A7A\u6240\u6709\u5386\u53F2\u4F1A\u8BDD\u5417\uFF1F","summary.systemPage":"\u5F53\u524D\u4E3A\u7CFB\u7EDF\u9875\u9762\uFF0C\u65E0\u6CD5\u5206\u6790","summary.systemPageHint":"\u8BF7\u6253\u5F00\u4E00\u4E2A\u7F51\u9875\u540E\u518D\u4F7F\u7528","summary.contentScriptUnavailable":"\u65E0\u6CD5\u8BFB\u53D6\u9875\u9762\u5185\u5BB9\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u540E\u91CD\u8BD5","summary.noContent":"\u9875\u9762\u5185\u5BB9\u4E3A\u7A7A\uFF0C\u8BF7\u786E\u8BA4\u5E16\u5B50\u5DF2\u5B8C\u5168\u52A0\u8F7D","summary.generateFailed":"\u6458\u8981\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5","summary.saveSummary":"\u6536\u85CF\u6458\u8981","summary.saveFullPost":"\u6536\u85CF\u539F\u6587","summary.savedToKnowledge":"\u2713 \u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93","summary.saveFailed":"\u5B58\u5165\u5931\u8D25","bookmark.bookmarked":"\u5DF2\u6536\u85CF","bookmark.bookmark":"\u6536\u85CF","bookmark.tagsLabel":"\u6807\u7B7E\uFF08\u7528\u9017\u53F7\u5206\u9694\uFF09","bookmark.tagsPlaceholder":"\u5982\uFF1A\u91CF\u5316, \u7B56\u7565, Python","bookmark.noteLabel":"\u5907\u6CE8","bookmark.notePlaceholder":"\u6DFB\u52A0\u5907\u6CE8\uFF08\u652F\u6301 Markdown \u683C\u5F0F\uFF09...","bookmark.saving":"\u4FDD\u5B58\u4E2D...","bookmark.savedBackend":"\u2713 \u5DF2\u6536\u85CF\u5230\u77E5\u8BC6\u5E93","bookmark.savedLocalOnly":"\u26A0\uFE0F \u540E\u7AEF\u4E0D\u53EF\u8FBE\uFF0C\u5DF2\u4FDD\u5B58\u5230\u672C\u5730\u7F13\u5B58\uFF08{error}\uFF09","bookmark.saveFailed":"\u2717 \u6536\u85CF\u5931\u8D25\uFF1A{error}","assist.toolbarTitle":"AI \u8F85\u52A9","assist.polish":"AI \u6DA6\u8272","assist.polishHint":"\u8BF7\u5148\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u8981\u6DA6\u8272\u7684\u6587\u5B57","assist.polishing":"\u6DA6\u8272\u4E2D...","assist.polishDone":"\u6DA6\u8272\u5B8C\u6210\uFF0C\u5DF2\u66FF\u6362\u9009\u4E2D\u6587\u5B57","assist.format":"\u683C\u5F0F\u5316","assist.formatting":"\u683C\u5F0F\u5316\u4E2D...","assist.formatDone":"\u5DF2\u683C\u5F0F\u5316\u4E3A Markdown","assist.checkCode":"\u68C0\u67E5\u4EE3\u7801","assist.checkCodeHint":"\u8BF7\u5148\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u4EE3\u7801","assist.checking":"\u68C0\u67E5\u4E2D...","assist.checkDone":"\u4EE3\u7801\u68C0\u67E5\u5B8C\u6210","assist.noIssues":"\u672A\u53D1\u73B0\u660E\u663E\u95EE\u9898","assist.issuesFound":"\u53D1\u73B0 {count} \u4E2A\u95EE\u9898","assist.callFailed":"\u8C03\u7528\u5931\u8D25\uFF1A{error}","assist.jumpToLine":"\u8DF3\u8F6C\u5230\u7B2C {line} \u884C","assist.jumpFailed":"\u65E0\u6CD5\u5B9A\u4F4D\u5230\u7B2C {line} \u884C\uFF08\u4EE3\u7801\u53EF\u80FD\u5DF2\u6539\u52A8\uFF09","assist.styleProfessional":"\u4E13\u4E1A","assist.styleCasual":"\u53E3\u8BED","assist.styleConcise":"\u7CBE\u7B80"},en:{"tab.summary":"Summary","tab.knowledge":"Knowledge","tab.chat":"Chat","tab.settings":"Settings","common.popOut":"Open in resizable window","common.loading":"Loading...","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.open":"Open","common.reset":"Reset","common.refresh":"Refresh","summary.notTopicPage":"This page is not a topic detail page","summary.notTopicHint":"Open a forum topic to view AI summary","summary.regenerate":"Regenerate","summary.generating":"Generating summary...","summary.empty":"No summary yet","summary.generate":"Generate Summary","knowledge.searchPlaceholder":"Search bookmarks...","knowledge.confirmDelete":"Are you sure you want to delete this bookmark?","knowledge.noMatch":"No matching bookmarks","knowledge.empty":"Knowledge base is empty","knowledge.emptyHint":"Click the bookmark button on a topic page to add","knowledge.sortLabel":"Sort","knowledge.sortCreatedDesc":"Newest first","knowledge.sortCreatedAsc":"Oldest first","knowledge.sortUpdatedDesc":"Recently updated","knowledge.sortTitleAsc":"Title A\u2192Z","knowledge.sortTitleDesc":"Title Z\u2192A","knowledge.loadMore":"Load more","knowledge.loadingMore":"Loading...","knowledge.loadedAll":"All loaded ({total})","knowledge.countLabel":"{total} total","knowledge.refresh":"Refresh","knowledge.refreshing":"Refreshing","knowledge.refreshed":"\u2713 Refreshed \u2014 {total} items","knowledge.backendUnreachable":"backend unreachable","knowledge.loadFallbackWarning":"\u26A0\uFE0F Backend load failed, showing local cache: {error}","knowledge.loadMoreFailed":"\u2717 Load more failed: {error}","knowledge.tagEdit":"Edit tags","knowledge.tagDone":"Done","knowledge.tagAddPlaceholder":"New tag...","knowledge.deleteSuccess":"\u2713 Deleted","knowledge.deleteBackendFailed":"\u26A0\uFE0F Deleted locally but backend sync failed: {error}","knowledge.openLink":"Open link","knowledge.copyPath":"Copy path","knowledge.openOriginal":"Open original","knowledge.summaryLabel":"\u{1F4DD} AI Summary","knowledge.notesLabel":"\u{1F4C4} Saved Content","search.placeholder":"Search knowledge base...","search.searching":"Searching...","search.button":"Search","search.history":"Search History","search.clearHistory":"Clear","search.noResults":"No results found","search.errorGeneric":"Search request failed, please try again","search.errorPrefix":"Search failed:","search.resultCount":"Found {count} results","search.relevance":"Relevance: {score}%","settings.saved":"\u2713 Settings saved","settings.savedLocalOnly":"\u26A0\uFE0F Saved locally but backend sync failed: {error}","settings.saveFailed":"\u2717 Save failed: {error}","settings.testNoResponse":"No response from backend","settings.language":"Language / \u8BED\u8A00","settings.backend":"Backend Service","settings.backendUrl":"Backend URL","settings.backendHint":"QuantClass backend service address","settings.testConnection":"Test Connection","settings.testing":"Testing...","settings.testOk":"Connected ({model})","settings.testFail":"Connection failed: {error}","settings.agentManage":"Agent Management","settings.agentHint":"Manage AI discussion roles. Each agent has its own .md file stored locally.","settings.agentAdd":"Add Custom Agent","settings.agentNamePrompt":"Enter agent name (e.g., Product Manager)","settings.agentIconPrompt":"Enter emoji icon","settings.agentDescPrompt":"Enter one-line description","settings.agentPromptPrompt":"Enter the agent system prompt","settings.agentCreated":"\u2713 Agent created","settings.storagePath":"Knowledge Storage","settings.storagePathLabel":"Storage Path","settings.storagePathHint":"MD files are saved under knowledge/ in this directory (macOS/Linux: ~/.quantclass/data, Windows: C:\\Users\\YourName\\.quantclass\\data)","settings.defaultModel":"Default Model","settings.selectModel":"Select Model","settings.customModelLabel":"Or enter custom model name","settings.customModelPlaceholder":"e.g. deepseek-chat, llama-3.1-70b...","settings.customModelApply":"Apply","settings.customModelHint":"Enter and click Apply or press Enter. Used for next LLM call.","settings.apiKeys":"LLM Providers","settings.apiKeysHint":"Configure Base URL and API Key for each provider (keys encrypted locally, URLs synced to backend)","settings.apiKeyLabel":"API Key","settings.apiKeyPlaceholder":"Enter {provider} API Key","settings.apiKeyConfigured":"\u2713 Configured (enter new value to override)","settings.customAdd":"Add custom LLM","settings.customCancel":"Cancel","settings.customName":"Name","settings.customModels":"Models (comma separated)","settings.customConfirm":"Add","settings.customAdded":"\u2713 Custom LLM added","settings.customDeleted":"\u2713 Deleted","settings.apiBaseUrlLabel":"Base URL","settings.apiBaseUrlPlaceholder":"e.g. {url} (leave blank to keep current)","settings.saving":"Saving...","settings.saveButton":"Save Settings","content.addedToKnowledge":"Added to knowledge base","panel.aiSummary":"AI Summary","panel.regenerate":"Regenerate","panel.bookmark":"Bookmark","panel.generating":"Generating summary...","panel.emptySummary":"No summary yet. Click refresh to generate.","panel.generationFailed":"Summary generation failed: {error}","panel.noResult":"No response from backend \u2014 check that the server is running and the API key is configured","chat.placeholder":"Ask a question...","chat.error":"Request failed, please try again","chat.contextLoaded":"Current post content loaded","chat.welcomeTopic":"I've read the current page. Ask me anything about this article.","chat.welcomeGeneral":"Hi! How can I help with quant or coding questions?","chat.welcomePdf":"\u{1F4C4} PDF page detected. Click \u{1F4CE} PDF above to paste the download URL for analysis.","chat.pdfUrlPlaceholder":"Paste the direct PDF download URL...","chat.pdfUrlHint":"Paste a URL or upload a local file","chat.btnSaveSummary":"Save","chat.btnSaveFull":"Full","chat.btnHistory":"History","chat.btnNew":"New","chat.savedSummary":"Summary saved to knowledge base","chat.savedFull":"Full content saved to knowledge base","agent.inviteTitle":"Invite Agents to Read Together","agent.startReading":"Start Reading \xB7 Agents Will Join","agent.defaultQuestion":"Please analyze the core content of this article from your respective perspectives","agent.discussing":"Agents discussing...","agent.saveToKb":"Save","agent.saveToKbTitle":"Save this whole discussion to the knowledge base","agent.savedToKnowledge":"Saved to knowledge base","agent.savedWithoutNote":"Bookmark saved, but note attachment failed","agent.saveFailed":"Save failed","agent.saveEmpty":"Nothing to save yet","agent.discussionTitle":"Agent Roundtable Discussion","agent.inputPlaceholder":"Ask a question, or @agent for single follow-up...","chat.thinking":"Think","chat.thinkingHint":"Enable deep thinking mode (AI will analyze more carefully)","chat.copyMd":"Copy Markdown","chat.saveMd":"Save as .md file","chat.pdfOr":"\u2014 or \u2014","chat.pdfUpload":"Upload local PDF","chat.pdfExtractFailed":"PDF extraction failed. Check the file is readable.","chat.summarize":"Summarize","chat.summarizePrompt":"Please summarize this post in a structured way","chat.keyPoints":"Key Points","chat.keyPointsPrompt":"What are the key takeaways and conclusions from this post?","chat.explain":"Explain","chat.explainPrompt":"Please explain what this post is about in simple terms","chat.newSession":"New Chat","chat.history":"History","chat.historyTitle":"Chat History","chat.noHistory":"No chat history","chat.generalChat":"General Chat","chat.messages":"messages","chat.saveToKb":"Save to Knowledge","chat.savedToKnowledge":"\u2713 Saved to knowledge base","chat.saveEmpty":"Nothing to save","chat.clearAll":"Clear all","chat.clear7days":"Clear older than 7 days","chat.confirmClearAll":"Clear all chat history?","summary.systemPage":"System page \u2014 cannot analyze","summary.systemPageHint":"Open a web page to use this feature","summary.contentScriptUnavailable":"Cannot read page content. Please refresh the page and try again.","summary.noContent":"Page content is empty. Make sure the post is fully loaded.","summary.generateFailed":"Summary generation failed. Please try again.","summary.saveSummary":"Save Summary","summary.saveFullPost":"Save Full Post","summary.savedToKnowledge":"\u2713 Saved to knowledge base","summary.saveFailed":"Save failed","bookmark.bookmarked":"Bookmarked","bookmark.bookmark":"Bookmark","bookmark.tagsLabel":"Tags (comma-separated)","bookmark.tagsPlaceholder":"e.g.: quantitative, strategy, Python","bookmark.noteLabel":"Note","bookmark.notePlaceholder":"Add a note (Markdown supported)...","bookmark.saving":"Saving...","bookmark.savedBackend":"\u2713 Saved to knowledge base","bookmark.savedLocalOnly":"\u26A0\uFE0F Backend unreachable, saved locally only ({error})","bookmark.saveFailed":"\u2717 Bookmark failed: {error}","assist.toolbarTitle":"AI Assist","assist.polish":"AI Polish","assist.polishHint":"Please select the text you want to polish first","assist.polishing":"Polishing...","assist.polishDone":"Polished. Selection replaced.","assist.format":"Format","assist.formatting":"Formatting...","assist.formatDone":"Formatted as Markdown","assist.checkCode":"Check Code","assist.checkCodeHint":"Please select a code block first","assist.checking":"Checking...","assist.checkDone":"Code check complete","assist.noIssues":"No issues found","assist.issuesFound":"Found {count} issues","assist.callFailed":"Request failed: {error}","assist.jumpToLine":"Jump to line {line}","assist.jumpFailed":"Could not locate line {line} (code may have changed)","assist.styleProfessional":"Professional","assist.styleCasual":"Casual","assist.styleConcise":"Concise"}},je="zh",At=new Set;function c(e,t){let r=(St[je]||St.zh)[e]??St.zh[e]??e;if(t)for(let[i,s]of Object.entries(t))r=r.replace(`{${i}}`,s);return r}async function sn(){try{je=(await chrome.storage.local.get("quantclass_locale")).quantclass_locale||"zh"}catch{je="zh"}return je}async function on(e){je=e,await chrome.storage.local.set({quantclass_locale:e});for(let t of At)t(e)}function $e(){return je}function rn(e){return At.add(e),()=>At.delete(e)}var Ln=[[/\*\*\*(.+?)\*\*\*/g,"<strong><em>$1</em></strong>"],[/\*\*(.+?)\*\*/g,"<strong>$1</strong>"],[/\*(.+?)\*/g,"<em>$1</em>"],[/`([^`]+)`/g,"<code>$1</code>"],[/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" style="max-width:100%;border-radius:4px;margin:4px 0">'],[/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>']];function Oe(e){let t=e;for(let[n,r]of Ln)t=t.replace(n,r);return t}function Le(e){if(!e)return"";let n=e.replace(/\r\n/g,`
`).split(`
`),r=[],i=0;for(;i<n.length;){let s=n[i];if(s.trim().startsWith("```")){let m=s.trim().slice(3).trim(),d=[];for(i++;i<n.length&&!n[i].trim().startsWith("```");)d.push(n[i]),i++;i++,r.push(`<pre><code class="language-${m}">${Rn(d.join(`
`))}</code></pre>`);continue}let u=s.match(/^(#{1,6})\s+(.+)$/);if(u){let m=u[1].length,d=`h${Math.min(m+1,6)}`;r.push(`<${d}>${Oe(u[2].trim())}</${d}>`),i++;continue}if(/^---+$/.test(s.trim())){r.push("<hr>"),i++;continue}if(s.trim().startsWith("|")&&s.trim().endsWith("|")){let m=[];for(;i<n.length&&n[i].trim().startsWith("|")&&n[i].trim().endsWith("|");)m.push(n[i].trim()),i++;r.push(Dn(m));continue}if(s.startsWith(">")){let m=[];for(;i<n.length&&(n[i].startsWith(">")||n[i].trim()&&m.length>0&&!n[i].startsWith("#"));)m.push(n[i].replace(/^>\s?/,"")),i++;r.push(`<blockquote>${Le(m.join(`
`))}</blockquote>`);continue}if(/^[*\-+]\s+/.test(s)){let m=[];for(;i<n.length&&/^[*\-+]\s+/.test(n[i]);)m.push(n[i].replace(/^[*\-+]\s+/,"")),i++;r.push("<ul>"+m.map(d=>`<li>${Oe(d)}</li>`).join("")+"</ul>");continue}if(/^\d+\.\s+/.test(s)){let m=[];for(;i<n.length&&/^\d+\.\s+/.test(n[i]);)m.push(n[i].replace(/^\d+\.\s+/,"")),i++;r.push("<ol>"+m.map(d=>`<li>${Oe(d)}</li>`).join("")+"</ol>");continue}if(!s.trim()){i++;continue}let _=[];for(;i<n.length&&n[i].trim()&&!n[i].match(/^#{1,6}\s/)&&!n[i].trim().startsWith("|")&&!n[i].startsWith(">")&&!n[i].trim().startsWith("```")&&!/^[*\-+]\s+/.test(n[i])&&!/^\d+\.\s+/.test(n[i])&&!/^---+$/.test(n[i].trim());)_.push(n[i]),i++;_.length&&r.push(`<p>${Oe(_.join("<br>"))}</p>`)}return r.join(`
`)}function Dn(e){if(e.length<2)return e.map(s=>`<p>${Oe(s)}</p>`).join("");let t=s=>s.split("|").slice(1,-1).map(u=>u.trim()),n=t(e[0]),r=1;e[1]&&/^[\s|:-]+$/.test(e[1])&&(r=2);let i="<table><thead><tr>";n.forEach(s=>{i+=`<th>${Oe(s)}</th>`}),i+="</tr></thead><tbody>";for(let s=r;s<e.length;s++){let u=t(e[s]);i+="<tr>",u.forEach(_=>{i+=`<td>${Oe(_)}</td>`}),i+="</tr>"}return i+="</tbody></table>",i}function Rn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function De({timeoutMs:e=5e3}={}){try{let[t]=await chrome.tabs.query({active:!0,currentWindow:!0});if(!t?.id)return null;let n=chrome.scripting.executeScript({target:{tabId:t.id},func:In}).then(i=>i?.[0]?.result||null),r=new Promise(i=>setTimeout(()=>i(null),e));return await Promise.race([n,r])}catch(t){return console.warn("getPageContent failed:",t),null}}function In(){let e=["h1.topic-title","h1.post-title",".topic-header h1",".post-header h1","h1",'[data-testid="topic-title"]'],t="";for(let d of e){let k=document.querySelector(d);if(k){t=k.textContent.trim();break}}if(!t){let d=document.title.match(/(.+?)\s*[-|]/);t=d?d[1].trim():document.title}let n=document.querySelectorAll(".textLayer span, .pdfViewer .page .textLayer span, [data-text-layer] span, .text-layer span, .react-pdf__Page__textContent span");if(n.length>10){let d=Array.from(n).map(k=>k.textContent).join(" ").replace(/\s+/g," ").trim();if(d.length>100)return{title:t,content:d,markdown:`# ${t}

${d}`,pdfUrl:r()}}function r(){for(let p of["embed","iframe","object"]){let f=document.querySelector(`${p}[src*=".pdf"], ${p}[data*=".pdf"]`);if(f)return f.src||f.data||f.getAttribute("src")||f.getAttribute("data")}let d=document.querySelector('a[download][href*=".pdf"], a[href$=".pdf"]');if(d)return d.href;let k=document.querySelector('meta[content*=".pdf"]');return k?k.content:null}let i=[".post-content",".topic-content",".post-body",'[data-testid="post-content"]',"article",".thread-content",".entry-content",".rich_media_content",".post_body",".message-body"],s=null;for(let d of i){let k=document.querySelector(d);if(k&&k.innerText.trim().length>50){s=k;break}}if(!s){let d=document.querySelector("main")||document.querySelector("#app")||document.body,k=null,p=0;for(let f of d.querySelectorAll("div, section, article")){let $=f.innerText?.trim().length||0;$>p&&$>100&&(k=f,p=$)}s=k||d}function u(d){if(d.nodeType===Node.TEXT_NODE)return d.textContent.replace(/\n\s+/g," ");if(d.nodeType!==Node.ELEMENT_NODE)return"";let k=d.tagName.toLowerCase(),p=()=>Array.from(d.childNodes).map(u).join("");switch(k){case"h1":return`
# ${d.textContent.trim()}

`;case"h2":return`
## ${d.textContent.trim()}

`;case"h3":return`
### ${d.textContent.trim()}

`;case"h4":return`
#### ${d.textContent.trim()}

`;case"p":return`${p().trim()}

`;case"br":return`
`;case"hr":return`
---

`;case"strong":case"b":return`**${p().trim()}**`;case"em":case"i":return`*${p().trim()}*`;case"code":return d.parentElement?.tagName==="PRE"?d.textContent:`\`${d.textContent}\``;case"pre":{let f=d.querySelector("code");return`
\`\`\`${f?.className?.match(/language-(\w+)/)?.[1]||""}
${(f||d).textContent.trim()}
\`\`\`

`}case"a":{let f=d.getAttribute("href");if(!f||f.startsWith("javascript:"))return d.textContent.trim();let $=f.startsWith("http")?f:new URL(f,location.origin).href;return`[${d.textContent.trim()}](${$})`}case"img":{let f=d.getAttribute("src")||d.getAttribute("data-src")||"";if(!f||f.startsWith("data:"))return"";let $=f.startsWith("http")?f:new URL(f,location.origin).href;return`
![${d.getAttribute("alt")||"\u56FE\u7247"}](${$})

`}case"ul":return`
`+Array.from(d.querySelectorAll(":scope > li")).map(f=>`- ${u(f).trim()}`).join(`
`)+`

`;case"ol":return`
`+Array.from(d.querySelectorAll(":scope > li")).map((f,$)=>`${$+1}. ${u(f).trim()}`).join(`
`)+`

`;case"li":return p();case"blockquote":return`
${p().trim().split(`
`).map(f=>`> ${f}`).join(`
`)}

`;case"table":{let f=Array.from(d.querySelectorAll("tr"));if(!f.length)return"";let $=Array.from(f[0].querySelectorAll("th, td"));return`
| ${$.map(P=>P.textContent.trim()).join(" | ")} |
| ${$.map(()=>"---").join(" | ")} |
`+f.slice(1).map(P=>"| "+Array.from(P.querySelectorAll("td, th")).map(I=>I.textContent.trim()).join(" | ")+" |").join(`
`)+`

`}case"script":case"style":case"noscript":case"svg":return"";default:return p()}}let _=s.innerText.trim(),m=`# ${t}

${u(s)}`.replace(/\n{3,}/g,`

`).trim();return{title:t,content:_,markdown:m,pdfUrl:r()}}He();var Fe="quantclass_agent_history",Qe="quantclass_agent_session";function un({currentPage:e}){let[t,n]=S([]),[r,i]=S(new Set),[s,u]=S(!1),[_,m]=S([]),[d,k]=S(""),[p,f]=S(!1),[$,P]=S(null),[I,D]=S(!1),[M,E]=S([]),[H,B]=S(!1),[J,Z]=S(!1),[Y,ce]=S(""),[G,F]=S(!1),[de,he]=S(!1),[N,ue]=S(()=>Date.now().toString()),[ne,ae]=S(null),ve=ge(null),pe=ge(null);function fe(l,a=5e3){ae(l),setTimeout(()=>{ae(o=>o===l?null:o)},a)}let ee=ge({url:null,title:null});function z(l,a){if(!l||!a)return!1;let o=l.match(/\/(thread|topic|t|d)\/(\d+)/)?.[2],g=a.match(/\/(thread|topic|t|d)\/(\d+)/)?.[2];if(o&&g)return o===g;try{let w=new URL(l),T=new URL(a);return w.origin+w.pathname===T.origin+T.pathname}catch{return l===a}}X(()=>{Ce()},[]),X(()=>{let l=e?.url,a=e?.title||"";if(!l)return;if(ee.current.url&&z(ee.current.url,l)){ee.current.title=a;return}let o=ee.current.url,g=ee.current.title;(async()=>{o&&_.length>0&&(clearTimeout(te.current),await re({id:N,rounds:_,context:$,pageUrl:o,pageTitle:g,selected:[...r],updatedAt:new Date().toISOString()}));let w=await chrome.storage.local.get([Qe,Fe]),T=w[Qe],v=null;if(T?.rounds?.length>0&&z(T.pageUrl,l))v=T;else{let R=(w[Fe]||[]).find(j=>z(j.pageUrl,l));R&&(v=R)}v?(m(v.rounds||[]),u((v.rounds||[]).length>0),P(v.context||null),Array.isArray(v.selected)&&i(new Set(v.selected)),v.id&&ue(v.id)):(m([]),u(!1),P(null),ue(Date.now().toString())),o&&!(v&&v===T)&&await chrome.storage.local.remove(Qe),ee.current={url:l,title:a}})()},[e?.url,e?.title]),X(()=>{e?.isAnalyzable&&De().then(l=>{l?.content?.length>50&&P(l.content)}).catch(()=>{})},[e?.url]);async function Ce(){try{let l=await chrome.runtime.sendMessage({type:O.LIST_AGENTS});l?.success&&Array.isArray(l.data)&&(n(l.data),i(new Set(l.data.filter(a=>a.enabled).map(a=>a.id))))}catch{}}let te=ge(null);X(()=>{if(_.length!==0)return clearTimeout(te.current),te.current=setTimeout(()=>{let l={id:N,rounds:_,context:$,pageUrl:e?.url,pageTitle:e?.title,selected:[...r],updatedAt:new Date().toISOString()};chrome.storage.local.set({[Qe]:l}),re(l)},500),()=>clearTimeout(te.current)},[_,N]);async function re(l){let o=(await chrome.storage.local.get([Fe]))[Fe]||[],g=o.findIndex(w=>w.id===l.id);g>=0?o[g]=l:o.unshift(l),await chrome.storage.local.set({[Fe]:o.slice(0,20)})}async function se(l){F(!0);try{let a=null;if(l.url){let o=await chrome.runtime.sendMessage({type:O.EXTRACT_PDF,payload:{url:l.url}});o?.success&&o.data?.text?.length>100&&(a=o.data.text)}else if(l.file){let{configStorage:o}=await Promise.resolve().then(()=>(He(),xt)),w=((await o.get())?.backendUrl||"http://127.0.0.1:8700")+"/api",T=new FormData;T.append("file",l.file);let C=await(await fetch(`${w}/pdf/upload`,{method:"POST",body:T})).json();C.code===0&&C.data?.text?.length>100&&(a=C.data.text)}a&&(P(a.substring(0,6e4)),Z(!1),ce(""),s||(u(!0),setTimeout(()=>y(c("agent.defaultQuestion")),100)))}catch{}finally{F(!1)}}function V(){setTimeout(()=>{pe.current&&(pe.current.scrollTop=pe.current.scrollHeight)},50)}async function y(l){let a=(l||d).trim();if(!a||p)return;k(""),f(!0),u(!0),V();let o=$;if(!o&&e?.isAnalyzable)try{o=(await De())?.content?.substring(0,6e4)||null,o&&P(o)}catch{}let g=$e()==="en"?"English":"\u4E2D\u6587";await L({question:a,context:o,agentIds:[...r],language:g,type:"all"}),f(!1),V()}async function x(l,a){f(!0),B(!1),V();let o=$e()==="en"?"English":"\u4E2D\u6587",g=t.find(w=>w.id===l);await L({question:a,context:$,agentIds:[l],language:o,type:"single",target:g?{id:g.id,name:g.name,icon:g.icon}:{id:l,name:l,icon:"\u{1F916}"}}),f(!1),V()}async function L({question:l,context:a,agentIds:o,language:g,type:w,target:T}){let R=`${(await Re.get())?.backendUrl||Te.backendUrl}${Te.apiBasePath}/agents/discuss`,j=ee.current.url,oe=N,U=()=>ee.current.url===j&&N===oe,ye=_e=>{let be={question:l,responses:_e,type:w};return T&&(be.target=T),be},Se=_e=>ye(o.map(be=>{let Ct=t.find(fn=>fn.id===be);return{agent_id:be,name:Ct?.name||be,icon:Ct?.icon||"\u{1F916}",content:`\u26A0\uFE0F ${_e}`}})),Ae;try{Ae=await fetch(R,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:l,context:a,agents:o,language:g})})}catch(_e){if(!U())return;m(be=>[...be,Se(_e.message||"network error")]);return}if(!U())return;if(!Ae.ok){let _e=await Ae.text().catch(()=>"");if(!U())return;m(be=>[...be,Se(`HTTP ${Ae.status}: ${_e.substring(0,120)||Ae.statusText}`)]);return}let Me;try{Me=await Ae.json()}catch(_e){if(!U())return;m(be=>[...be,Se(`Invalid response: ${_e.message}`)]);return}if(U()){if(!Me||Me.code!==0||!Array.isArray(Me.data?.responses)){m(_e=>[..._e,Se(Me?.message||"empty response")]);return}m(_e=>[..._e,ye(Me.data.responses)]),V()}}function q(l){if(l.key==="Enter"&&!l.shiftKey){l.preventDefault();let o=d.trim().match(/^@(\w+)\s+(.*)/s);o?(x(o[1],o[2]),k("")):y()}l.key==="@"||d.endsWith("@")&&l.key!=="Backspace"?B(!0):H&&l.key==="Escape"&&B(!1)}function ie(l){k(l.target.value),l.target.value.endsWith("@")?B(!0):l.target.value.includes("@")||B(!1)}function ke(l){k(a=>{let o=a.endsWith("@")?a.slice(0,-1):a;return`@${l} ${o}`}),B(!1)}async function Ee(){clearTimeout(te.current),_.length>0&&await re({id:N,rounds:_,context:$,pageUrl:e?.url,pageTitle:e?.title,selected:[...r],updatedAt:new Date().toISOString()}),m([]),u(!1),ue(Date.now().toString()),await chrome.storage.local.remove(Qe)}async function Ne(){clearTimeout(te.current),_.length>0&&await re({id:N,rounds:_,context:$,pageUrl:e?.url,pageTitle:e?.title,selected:[...r],updatedAt:new Date().toISOString()});let l=await chrome.storage.local.get([Fe]);E(l[Fe]||[]),D(!0)}function Ie(l){l.id&&ue(l.id),m(l.rounds||[]),P(l.context||null),l.selected&&i(new Set(l.selected)),u(!0),D(!1)}function Be(){let l=`# Agent \u5706\u684C\u8BA8\u8BBA

`;l+=`> \u9875\u9762\uFF1A${e?.title||""}

`;for(let a of _){l+=`## Q: ${a.question}

`;for(let o of a.responses)l+=`### ${o.icon} ${o.name}

${o.content}

---

`}return l}function Ge(){let l=Be(),a=new Blob([l],{type:"text/markdown"}),o=URL.createObjectURL(a),g=document.createElement("a");g.href=o,g.download=`agent_discussion_${new Date().toISOString().slice(0,10)}.md`,g.click(),URL.revokeObjectURL(o)}async function h(){if(!de){if(_.length===0){fe({type:"warning",text:c("agent.saveEmpty")||"\u6682\u65E0\u8BA8\u8BBA\u5185\u5BB9\u53EF\u4FDD\u5B58"});return}he(!0);try{let l=Be(),a=(e?.url||"").match(/\/(thread|topic|t|d)\/(\d+)/),o=Date.now().toString(36),g=a?`agent-${a[2]}-${o}`:`agent-${o}`,w=`\u{1F916} ${e?.title||c("agent.discussionTitle")||"Agent \u5706\u684C\u8BA8\u8BBA"}`,T=await chrome.runtime.sendMessage({type:O.CREATE_BOOKMARK,payload:{thread_id:g,title:w,url:e?.url||"",summary:l.substring(0,500),tags:["Agent \u8BA8\u8BBA"]}});if(!T?.success){fe({type:"error",text:`\u274C ${T?.error||c("agent.saveFailed")||"\u4FDD\u5B58\u5931\u8D25"}`});return}let v=T.data?.bookmark_id||T.data?.id;if(v&&!(await chrome.runtime.sendMessage({type:O.ADD_NOTE,payload:{bookmarkId:v,content:l}}))?.success){fe({type:"warning",text:`\u26A0\uFE0F ${c("agent.savedWithoutNote")||"\u4E66\u7B7E\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u7B14\u8BB0\u9644\u52A0\u5931\u8D25"}`});return}fe({type:"success",text:`\u2705 ${c("agent.savedToKnowledge")||"\u5DF2\u5B58\u5165\u77E5\u8BC6\u5E93"}`})}catch(l){fe({type:"error",text:`\u274C ${l.message||"save failed"}`})}finally{he(!1)}}}let A=l=>{if(!l)return"";let a=new Date(l);return`${a.getMonth()+1}/${a.getDate()} ${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`};return s?b`
    <div class="agent-tab">
      <div class="agent-toolbar">
        <span class="agent-toolbar-info">🤖 ${r.size} agents · ${_.length} rounds</span>
        <div class="chat-toolbar-right">
          <button class="chat-tool-btn" onClick=${h} disabled=${de||_.length===0} title="${c("agent.saveToKbTitle")||"\u628A\u6574\u4E2A\u8BA8\u8BBA\u5B58\u5165\u77E5\u8BC6\u5E93"}">
            ${de?"\u23F3":"\u{1F4DA}"} ${c("agent.saveToKb")||"\u6536\u85CF"}
          </button>
          <button class="chat-tool-btn" onClick=${Ge}>💾 MD</button>
          <button class="chat-tool-btn" onClick=${Ne}>📋 ${c("chat.btnHistory")}</button>
          <button class="chat-tool-btn" onClick=${Ee}>✨ ${c("chat.btnNew")}</button>
        </div>
      </div>

      ${ne&&b`
        <div class="message ${ne.type}">${ne.text}</div>
      `}

      ${I&&b`
        <div class="chat-history-panel">
          <div class="chat-history-header">
            <span>${c("chat.historyTitle")}</span>
            <button class="chat-hist-action" onClick=${()=>D(!1)}>✕</button>
          </div>
          ${M.length===0&&b`<div class="chat-history-empty">${c("chat.noHistory")}</div>`}
          ${M.map(l=>b`
            <div key=${l.id} class="chat-history-item" onClick=${()=>Ie(l)}>
              <div class="chat-history-body">
                <div class="chat-history-title">${l.pageTitle||"Discussion"}</div>
                <div class="chat-history-meta">${l.rounds?.length||0} rounds · ${A(l.updatedAt)}</div>
              </div>
            </div>
          `)}
        </div>
      `}

      <div class="agent-discussion" ref=${pe}>
        ${_.map((l,a)=>b`
          <div key=${a} class="agent-round">
            <div class="agent-question">
              <span class="agent-q-label">${l.target?`@${l.target.icon}`:"Q"}</span>
              ${l.target?b`<span class="agent-q-target">@${l.target.name}</span> `:""}${l.question}
            </div>
            ${l.responses.map(o=>b`
              <div key=${o.agent_id} class="agent-response" onClick=${()=>{k(`@${o.agent_id} `)}}>
                <div class="agent-response-header">
                  <span class="agent-icon-sm">${o.icon}</span>
                  <span class="agent-name-sm">${o.name}</span>
                  <button class="bubble-action-btn" onClick=${g=>{g.stopPropagation(),navigator.clipboard.writeText(o.content),g.target.textContent="\u2713",setTimeout(()=>{g.target.textContent="\u{1F4CB}"},1500)}}>📋</button>
                </div>
                <div class="markdown-body" dangerouslySetInnerHTML=${{__html:Le(o.content)}}></div>
              </div>
            `)}
          </div>
        `)}

        ${p&&b`
          <div class="agent-loading">
            <div class="spinner"></div>
            <span>${c("agent.discussing")}</span>
          </div>
        `}
      </div>

      <div class="chat-input-area" style="position:relative">
        ${H&&b`
          <div class="mention-popup">
            ${t.filter(l=>r.has(l.id)).map(l=>b`
              <div key=${l.id} class="mention-item" onClick=${()=>ke(l.id)}>
                ${l.icon} ${l.name}
              </div>
            `)}
          </div>
        `}
        <div class="chat-input-bar">
          <textarea
            class="chat-input"
            value=${d}
            onInput=${ie}
            onKeyDown=${q}
            placeholder=${c("agent.inputPlaceholder")}
            rows="1"
            disabled=${p}
          ></textarea>
          <button class="chat-send-btn" onClick=${()=>{let a=d.trim().match(/^@(\w+)\s+(.*)/s);a?(x(a[1],a[2]),k("")):y()}} disabled=${p||!d.trim()}>➤</button>
        </div>
      </div>
    </div>
  `:b`
      <div class="agent-tab">
        <div class="agent-select-header">${c("agent.inviteTitle")}</div>

        <div class="agent-list">
          ${t.map(l=>b`
            <label key=${l.id} class="agent-card ${r.has(l.id)?"selected":""}">
              <input type="checkbox"
                checked=${r.has(l.id)}
                onChange=${()=>i(a=>{let o=new Set(a);return o.has(l.id)?o.delete(l.id):o.add(l.id),o})}
              />
              <span class="agent-icon">${l.icon}</span>
              <span class="agent-name">${l.name}</span>
              <span class="agent-desc">${l.description}</span>
            </label>
          `)}
        </div>

        <button class="agent-start-btn" onClick=${()=>y(c("agent.defaultQuestion"))} disabled=${r.size===0||p}>
          🚀 ${c("agent.startReading")}
        </button>

        <div class="agent-toolbar-bottom">
          <button class="chat-tool-btn" onClick=${()=>Z(l=>!l)}>📎 PDF</button>
          <button class="chat-tool-btn" onClick=${Ne}>📋 ${c("chat.btnHistory")}</button>
          <button class="chat-tool-btn" onClick=${Ee}>✨ ${c("chat.btnNew")}</button>
        </div>

        ${J&&b`
          <div class="pdf-input-panel" style="margin-top:8px">
            <div class="pdf-input-row">
              <input type="text" class="pdf-url-input" value=${Y}
                onInput=${l=>ce(l.target.value)}
                onKeyDown=${l=>l.key==="Enter"&&se({url:Y.trim()})}
                placeholder="粘贴 PDF 下载链接..."
                disabled=${G} />
              <button class="pdf-load-btn" onClick=${()=>se({url:Y.trim()})} disabled=${G||!Y.trim()}>
                ${G?"\u23F3":"\u{1F4E5}"}
              </button>
            </div>
            <div class="pdf-input-divider">— 或 —</div>
            <button class="pdf-upload-btn" onClick=${()=>ve.current?.click()} disabled=${G}>
              📁 上传本地 PDF
            </button>
            <input ref=${ve} type="file" accept=".pdf" style="display:none"
              onChange=${l=>{se({file:l.target.files[0]}),l.target.value=""}} />
          </div>
        `}

        ${I&&b`
          <div class="chat-history-panel">
            <div class="chat-history-header">
              <span>${c("chat.historyTitle")}</span>
              <button class="chat-hist-action" onClick=${()=>D(!1)}>✕</button>
            </div>
            ${M.length===0&&b`<div class="chat-history-empty">${c("chat.noHistory")}</div>`}
            ${M.map(l=>b`
              <div key=${l.id} class="chat-history-item" onClick=${()=>Ie(l)}>
                <div class="chat-history-body">
                  <div class="chat-history-title">${l.pageTitle||"Discussion"}</div>
                  <div class="chat-history-meta">${l.rounds?.length||0} rounds · ${A(l.updatedAt)}</div>
                </div>
              </div>
            `)}
          </div>
        `}
      </div>
    `}ze();He();var pn=20,Xe=[{key:"created_desc",sortBy:"created",sortOrder:"desc",labelKey:"knowledge.sortCreatedDesc"},{key:"created_asc",sortBy:"created",sortOrder:"asc",labelKey:"knowledge.sortCreatedAsc"},{key:"updated_desc",sortBy:"updated",sortOrder:"desc",labelKey:"knowledge.sortUpdatedDesc"},{key:"title_asc",sortBy:"title",sortOrder:"asc",labelKey:"knowledge.sortTitleAsc"},{key:"title_desc",sortBy:"title",sortOrder:"desc",labelKey:"knowledge.sortTitleDesc"}];function gn(){let[e,t]=S([]),[n,r]=S(!0),[i,s]=S(!1),[u,_]=S(""),[m,d]=S([]),[k,p]=S([]),[f,$]=S("created_desc"),[P,I]=S({page:1,total:0,totalPages:1}),[D,M]=S(null);function E(y,x=5e3){M(y),setTimeout(()=>{M(L=>L===y?null:L)},x)}let H=ge(!1);async function B(){H.current=!0,await J()}X(()=>{J()},[f,m.join(",")]);async function J(){r(!0);try{let y=Xe.find(ie=>ie.key===f)||Xe[0],x=await chrome.runtime.sendMessage({type:O.GET_BOOKMARKS,payload:{page:1,page_size:pn,sort_by:y.sortBy,sort_order:y.sortOrder,...m.length===1?{tag:m[0]}:{}}}),L=Y(x),q=ce(x);if(L){if(t(L),I(q),H.current?(E({type:"success",text:c("knowledge.refreshed",{total:q.total})||`\u2713 \u5DF2\u5237\u65B0\uFF0C\u5171 ${q.total} \u6761`},3e3),H.current=!1):M(null),m.length===0){let ie=new Set;L.forEach(ke=>(ke.tags||[]).forEach(Ee=>ie.add(Ee))),p(Array.from(ie))}}else{let ie=await Ve.getAll();t(ie),I({page:1,total:ie.length,totalPages:1}),E({type:"warning",text:c("knowledge.loadFallbackWarning",{error:x?.error||c("knowledge.backendUnreachable")})},6e3)}}catch(y){console.error("Failed to load bookmarks:",y);let x=await Ve.getAll();t(x),I({page:1,total:x.length,totalPages:1}),E({type:"warning",text:c("knowledge.loadFallbackWarning",{error:y.message})},6e3)}finally{r(!1)}}async function Z(){if(!i&&!(P.page>=P.totalPages)){s(!0);try{let y=Xe.find(ke=>ke.key===f)||Xe[0],x=P.page+1,L=await chrome.runtime.sendMessage({type:O.GET_BOOKMARKS,payload:{page:x,page_size:pn,sort_by:y.sortBy,sort_order:y.sortOrder,...m.length===1?{tag:m[0]}:{}}}),q=Y(L),ie=ce(L);q&&q.length>0?(t(ke=>[...ke,...q]),I(ie)):L?.success||E({type:"error",text:c("knowledge.loadMoreFailed",{error:L?.error||c("knowledge.backendUnreachable")})})}catch(y){console.error("Failed to load more bookmarks:",y),E({type:"error",text:c("knowledge.loadMoreFailed",{error:y.message})})}finally{s(!1)}}}function Y(y){if(!y||!y.success)return null;let x=y.data;return x?Array.isArray(x)?x:Array.isArray(x.items)?x.items:null:null}function ce(y){let x=y?.data,L=x?.pagination;return L?{page:L.page||1,total:L.total||0,totalPages:L.total_pages||1}:{page:1,total:Array.isArray(x)?x.length:x?.items?.length||0,totalPages:1}}let G=e.filter(y=>{if(u){let x=u.toLowerCase();if(!(y.title?.toLowerCase().includes(x)||y.summary?.toLowerCase().includes(x)||y.tags?.some(q=>q.toLowerCase().includes(x))))return!1}return!(m.length>0&&(!y.tags||!m.some(x=>y.tags.includes(x))))});async function F(y){if(!confirm(c("knowledge.confirmDelete")))return;let x=!1,L=null;try{let q=await chrome.runtime.sendMessage({type:O.DELETE_BOOKMARK,payload:{id:y}});q?.success?x=!0:L=q?.error||c("knowledge.backendUnreachable")}catch(q){L=q.message||c("knowledge.backendUnreachable")}await Ve.delete(y),await J(),x?E({type:"success",text:c("knowledge.deleteSuccess")},3e3):E({type:"warning",text:c("knowledge.deleteBackendFailed",{error:L})},6e3)}let[de,he]=S(null),[N,ue]=S(null),[ne,ae]=S(!1);async function ve(y){if(de===y){he(null),ue(null);return}he(y),ue(null),ae(!0);try{let x=await chrome.runtime.sendMessage({type:O.GET_BOOKMARK_DETAIL,payload:{id:y}});x?.success&&x.data&&ue(x.data)}catch{}ae(!1)}let[pe,fe]=S(!1),[ee,z]=S("");function Ce(y){pe||d(x=>x.includes(y)?x.filter(L=>L!==y):[...x,y])}async function te(y){try{let x=await chrome.runtime.sendMessage({type:O.SEARCH,payload:{query:y}})}catch{}p(x=>x.filter(L=>L!==y)),d(x=>x.filter(L=>L!==y))}async function re(){let y=ee.trim();!y||k.includes(y)||(p(x=>[...x,y]),z(""))}function se(y){chrome.tabs.create({url:y})}if(n)return b`
      <div class="loading-state">
        <div class="spinner"></div>
        <span>${c("common.loading")}</span>
      </div>
    `;let V=P.page<P.totalPages;return b`
    <div class="knowledge-tab">
      ${D&&b`
        <div class="message ${D.type}" role="alert">${D.text}</div>
      `}
      <div class="search-bar">
        <input
          type="text"
          class="search-input"
          placeholder=${c("knowledge.searchPlaceholder")}
          value=${u}
          onInput=${y=>_(y.target.value)}
        />
        <button class="search-btn" onClick=${B} disabled=${n} title="${c("knowledge.refresh")||"\u5237\u65B0"}">
          <span class=${n?"spin":""}>🔄</span>
        </button>
      </div>

      <div class="knowledge-toolbar">
        <label class="sort-selector">
          <span class="sort-label">${c("knowledge.sortLabel")}</span>
          <select
            value=${f}
            onChange=${y=>$(y.target.value)}
            class="sort-select"
          >
            ${Xe.map(y=>b`
              <option key=${y.key} value=${y.key}>${c(y.labelKey)}</option>
            `)}
          </select>
        </label>
        <button class="kb-refresh-btn" onClick=${B} disabled=${n} title="${c("knowledge.refresh")||"\u5237\u65B0\u77E5\u8BC6\u5E93"}">
          <span class=${n?"spin":""}>🔄</span>
          ${n?c("knowledge.refreshing")||"\u5237\u65B0\u4E2D":c("knowledge.refresh")||"\u5237\u65B0"}
        </button>
        <span class="total-count">
          ${c("knowledge.countLabel",{total:P.total})}
        </span>
      </div>

      <div class="tag-filter-section">
        <div class="tag-filter-header">
          <button class="tag-edit-toggle" onClick=${()=>fe(y=>!y)}>
            ${pe?"\u2713 "+c("knowledge.tagDone"):"\u270F\uFE0F "+c("knowledge.tagEdit")}
          </button>
        </div>

        ${k.length>0&&b`
          <div class="tag-filter">
            ${k.map(y=>b`
              <span key=${y} class="filter-tag ${m.includes(y)?"active":""}" onClick=${()=>Ce(y)}>
                ${y}
                ${pe&&b`
                  <button class="tag-remove" onClick=${x=>{x.stopPropagation(),te(y)}}>×</button>
                `}
              </span>
            `)}
          </div>
        `}

        ${pe&&b`
          <div class="tag-add-row">
            <input
              type="text"
              class="tag-add-input"
              value=${ee}
              onInput=${y=>z(y.target.value)}
              onKeyDown=${y=>y.key==="Enter"&&re()}
              placeholder=${c("knowledge.tagAddPlaceholder")}
            />
            <button class="tag-add-btn" onClick=${re}>+</button>
          </div>
        `}
      </div>

      <div class="bookmarks-list">
        ${G.length===0&&b`
          <div class="empty-state">
            <div class="empty-icon">📚</div>
            <p>${u||m.length>0?c("knowledge.noMatch"):c("knowledge.empty")}</p>
            <p class="empty-hint">${c("knowledge.emptyHint")}</p>
          </div>
        `}

        ${G.map(y=>{let x=de===(y.bookmark_id||y.id);return b`
            <div key=${y.bookmark_id||y.id} class="bookmark-card ${x?"expanded":""}">
              <div class="bookmark-header" onClick=${()=>ve(y.bookmark_id||y.id)}>
                <h4 class="bookmark-title">${y.title}</h4>
                <span class="bookmark-expand-icon">${x?"\u25B2":"\u25BC"}</span>
              </div>

              ${!x&&y.summary&&b`
                <p class="bookmark-summary">${y.summary.substring(0,100)}...</p>
              `}

              ${x&&b`
                <div class="bookmark-detail">
                  ${ne&&b`
                    <div class="loading-state"><div class="spinner"></div></div>
                  `}

                  ${!ne&&b`
                    <div class="detail-meta">
                      <span class="bookmark-date">${Hn(y.created_at||y.createdAt)}</span>
                      <a class="detail-link" href=${y.url} onClick=${L=>{L.preventDefault(),se(y.url)}}>
                        ${c("knowledge.openOriginal")} ↗
                      </a>
                    </div>

                    ${(N?.summary||y.summary)&&b`
                      <div class="detail-section">
                        <div class="detail-label">${c("knowledge.summaryLabel")}</div>
                        <div class="markdown-body"
                             dangerouslySetInnerHTML=${{__html:Le(N?.summary||y.summary)}}
                        ></div>
                      </div>
                    `}

                    ${N?.notes?.length>0&&b`
                      <div class="detail-section">
                        <div class="detail-label">${c("knowledge.notesLabel")}</div>
                        ${N.notes.map(L=>b`
                          <div key=${L.id} class="detail-note markdown-body"
                               dangerouslySetInnerHTML=${{__html:Le(L.content)}}
                          ></div>
                        `)}
                      </div>
                    `}
                  `}
                </div>
              `}

              ${y.tags?.length>0&&b`
                <div class="bookmark-tags">
                  ${y.tags.map(L=>b`
                    <span class="tag-small" key=${L}>${L}</span>
                  `)}
                </div>
              `}

              <div class="bookmark-actions">
                <button class="action-btn" onClick=${()=>se(y.url)}>↗ ${c("knowledge.openLink")}</button>
                <button class="action-btn" onClick=${L=>{let q="~/.quantclass/data/knowledge/summaries/"+(y.thread_id||y.bookmark_id||y.id)+".md";navigator.clipboard.writeText(q),L.target.textContent="\u2713 \u5DF2\u590D\u5236",setTimeout(()=>{L.target.textContent="\u{1F4C2} "+c("knowledge.copyPath")},1500)}}>📂 ${c("knowledge.copyPath")}</button>
                <button class="action-btn danger" onClick=${()=>F(y.bookmark_id||y.id)}>${c("common.delete")}</button>
              </div>
            </div>
          `})}

        ${e.length>0&&b`
          <div class="load-more-container">
            ${V&&b`
              <button
                class="load-more-btn"
                onClick=${Z}
                disabled=${i}
              >
                ${i?c("knowledge.loadingMore"):c("knowledge.loadMore")}
              </button>
            `}
            ${!V&&P.total>0&&b`
              <div class="load-more-end">
                ${c("knowledge.loadedAll",{total:P.total})}
              </div>
            `}
          </div>
        `}
      </div>
    </div>
  `}function Hn(e){if(!e)return"";let t=new Date(e),n=$e()==="en"?"en-US":"zh-CN";return t.toLocaleDateString(n,{month:"short",day:"numeric"})}ze();He();var Ke="quantclass_chat_session",me="quantclass_chat_history";function mn({currentPage:e}){let[t,n]=S([]),[r,i]=S(""),[s,u]=S(!1),[_,m]=S(null),d=Te.showRawDownload,[k,p]=S(!1),[f,$]=S([]),[P,I]=S(!1),[D,M]=S(""),[E,H]=S(!1),[B,J]=S(null),[Z,Y]=S(!1),[ce,G]=S(null),[F,de]=S(!1),he=ge(null),N=ge({url:null,title:null});function ue(h,A){if(!h||!A)return!1;let l=h.match(/\/(thread|topic|t|d)\/(\d+)/)?.[2],a=A.match(/\/(thread|topic|t|d)\/(\d+)/)?.[2];if(l&&a)return l===a;try{let o=new URL(h),g=new URL(A);return o.origin+o.pathname===g.origin+g.pathname}catch{return h===A}}X(()=>{let h=e?.url,A=e?.title||"";if(!h)return;if(N.current.url&&ue(N.current.url,h)){N.current.title=A;return}let l=N.current.url,a=N.current.title;(async()=>{l&&t.length>0&&(clearTimeout(se.current),clearTimeout(ne.current),await V(te,{messages:t,context:_,pageUrl:l,pageTitle:a,updatedAt:new Date().toISOString()}));let o=await chrome.storage.local.get([Ke,me]),g=o[Ke],w=null;if(g?.messages?.length>0&&ue(g.pageUrl,h))w=g;else{g?.messages?.length>0&&l===null&&y(g);let v=(o[me]||[]).find(C=>ue(C.pageUrl,h));v&&(w=v)}w?(n(w.messages||[]),m(w.context||null),w.id&&re(w.id)):(n([]),m(null),re(Date.now().toString())),l&&!(w&&w===g)&&await chrome.storage.local.remove(Ke),N.current={url:h,title:A}})()},[e?.url,e?.title]);let ne=ge(null);X(()=>{if(t.length!==0)return clearTimeout(ne.current),ne.current=setTimeout(()=>{chrome.storage.local.set({[Ke]:{messages:t,context:_,pageUrl:e?.url,pageTitle:e?.title,updatedAt:new Date().toISOString()}})},500),()=>clearTimeout(ne.current)},[t]),X(()=>{e?.isAnalyzable&&!_&&De().then(h=>{h?.content?.length>50&&m(h.content)}).catch(()=>{})},[e?.url]);function ae(){setTimeout(()=>{he.current&&(he.current.scrollTop=he.current.scrollHeight)},50)}async function ve(h){let A=(h||r).trim();if(!A||s)return;let l={role:"user",content:A};n(a=>[...a,l]),i(""),u(!0),ae();try{let a=$e()==="en"?"English":"\u4E2D\u6587",o=t.map(v=>({role:v.role,content:v.content})),g=_;if(!g&&e?.isAnalyzable)try{let v=await De();if(g=v?.content?.substring(0,6e4)||null,v?.pdfUrl&&(!g||g.length<200))try{let R=await chrome.runtime.sendMessage({type:O.EXTRACT_PDF,payload:{url:v.pdfUrl}});R?.success&&R.data?.text?.length>g?.length&&(g=R.data.text.substring(0,6e4))}catch{}let C=e.url||"";if((!g||g.length<200)&&C.toLowerCase().endsWith(".pdf"))try{let R=await chrome.runtime.sendMessage({type:O.EXTRACT_PDF,payload:{url:C}});R?.success&&R.data?.text?.length>100&&(g=R.data.text.substring(0,6e4))}catch{}g&&m(g)}catch{}let w,T=ce;if(!T)try{let v=(e?.url||"").match(/\/(thread|topic|t|d)\/(\d+)/),C=await chrome.runtime.sendMessage({type:O.CREATE_CHAT_SESSION,payload:{thread_id:v?v[2]:null,page_url:e?.url||null,page_title:e?.title||null}});C?.success&&C.data?.id&&(T=C.data.id,G(T))}catch{}if(T){if(!await pe({sid:T,message:Z?`[\u8BF7\u6DF1\u5EA6\u601D\u8003\u540E\u56DE\u7B54] ${A}`:A,context:g,language:a}))return}else w=await chrome.runtime.sendMessage({type:O.CHAT,payload:{message:Z?`[\u8BF7\u6DF1\u5EA6\u601D\u8003\u540E\u56DE\u7B54] ${A}`:A,context:g,images:B||void 0,history:o,language:a,thinking:Z}}),w?.success&&w.data?.reply?n(v=>[...v,{role:"assistant",content:w.data.reply}]):n(v=>[...v,{role:"assistant",content:`\u26A0\uFE0F ${w?.error||c("chat.error")}`}])}catch(a){n(o=>[...o,{role:"assistant",content:`\u26A0\uFE0F ${a.message}`}])}finally{u(!1),ae()}}async function pe({sid:h,message:A,context:l,language:a}){let w=`${(await Re.get())?.backendUrl||Te.backendUrl}${Te.apiBasePath}/chat/sessions/${encodeURIComponent(h)}/messages`,T=N.current.url,v=te,C=()=>N.current.url===T&&te===v,R;try{R=await fetch(w,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:A,context:l,language:a})})}catch(oe){return C()&&n(U=>[...U,{role:"assistant",content:`\u26A0\uFE0F ${oe.message||"network error"}`}]),!1}if(!C())return!1;if(!R.ok){let oe=await R.text().catch(()=>"");return C()&&n(U=>[...U,{role:"assistant",content:`\u26A0\uFE0F HTTP ${R.status}: ${oe.substring(0,200)||R.statusText}`}]),!1}let j;try{j=await R.json()}catch(oe){return C()&&n(U=>[...U,{role:"assistant",content:`\u26A0\uFE0F Invalid response: ${oe.message}`}]),!1}return C()?!j||j.code!==0||!j.data?.reply?(n(oe=>[...oe,{role:"assistant",content:`\u26A0\uFE0F ${j?.message||"empty reply"}`}]),!1):(j.data.memory_active&&de(!0),n(oe=>[...oe,{role:"assistant",content:j.data.reply}]),ae(),!0):!1}let fe=ge(null);async function ee(h){if(!h||!h.name.toLowerCase().endsWith(".pdf")){alert("\u8BF7\u9009\u62E9 PDF \u6587\u4EF6");return}H(!0),I(!1);try{let{configStorage:A}=await Promise.resolve().then(()=>(He(),xt)),a=((await A.get())?.backendUrl||"http://127.0.0.1:8700")+"/api",o=new FormData;o.append("file",h),o.append("max_pages","50");let w=await(await fetch(`${a}/pdf/upload`,{method:"POST",body:o})).json();if(w.code===0&&w.data?.text?.length>100){let T=w.data.text.substring(0,6e4);m(T),w.data.images?.length>0&&J(w.data.images);let v=w.data.title||h.name;n(j=>[...j,{role:"user",content:`\u{1F4C4} \u5DF2\u4E0A\u4F20 PDF\uFF1A${v} (${w.data.pages} \u9875)`}]),u(!0),ae();let C=$e()==="en"?"English":"\u4E2D\u6587",R=await chrome.runtime.sendMessage({type:O.CHAT,payload:{message:"\u8BF7\u7528\u4E2D\u6587\u5BF9\u8FD9\u7BC7PDF\u505A\u4E00\u4E2A\u7ED3\u6784\u5316\u6458\u8981",context:T,history:[],language:C}});R?.success&&R.data?.reply?n(j=>[...j,{role:"assistant",content:R.data.reply}]):n(j=>[...j,{role:"assistant",content:`\u26A0\uFE0F ${R?.error||"Failed"}`}]),u(!1),ae()}else alert(w.message||c("chat.pdfExtractFailed"))}catch(A){alert(A.message)}finally{H(!1)}}async function z(){let h=D.trim();if(h){H(!0);try{let A=await chrome.runtime.sendMessage({type:O.EXTRACT_PDF,payload:{url:h}});if(A?.success&&A.data?.text?.length>100){m(A.data.text.substring(0,6e4)),I(!1),M("");let l=A.data.title||"PDF";n(g=>[...g,{role:"user",content:`\u8BF7\u5206\u6790\u8FD9\u7BC7 PDF\uFF1A${l}`}]),u(!0),ae();let a=$e()==="en"?"English":"\u4E2D\u6587",o=await chrome.runtime.sendMessage({type:O.CHAT,payload:{message:"\u8BF7\u7528\u4E2D\u6587\u5BF9\u8FD9\u7BC7PDF\u505A\u4E00\u4E2A\u7ED3\u6784\u5316\u6458\u8981\uFF0C\u5305\u542B\u6838\u5FC3\u89C2\u70B9\u3001\u5173\u952E\u8981\u70B9\u548C\u9002\u7528\u573A\u666F",context:A.data.text.substring(0,6e4),history:[],language:a}});o?.success&&o.data?.reply?n(g=>[...g,{role:"assistant",content:o.data.reply}]):n(g=>[...g,{role:"assistant",content:`\u26A0\uFE0F ${o?.error||"Failed"}`}]),u(!1),ae()}else alert(A?.error||c("chat.pdfExtractFailed"))}catch(A){alert(A.message)}finally{H(!1)}}}function Ce(h){h.key==="Enter"&&!h.shiftKey&&(h.preventDefault(),ve())}let[te,re]=S(()=>Date.now().toString()),se=ge(null);X(()=>{if(t.length!==0)return clearTimeout(se.current),se.current=setTimeout(()=>{V(te,{messages:t,context:_,pageUrl:e?.url,pageTitle:e?.title,updatedAt:new Date().toISOString()})},500),()=>clearTimeout(se.current)},[t]);async function V(h,A){let a=(await chrome.storage.local.get([me]))[me]||[],o=a.findIndex(w=>w.id===h),g={id:h,pageTitle:A.pageTitle||"",pageUrl:A.pageUrl||"",preview:A.messages?.[0]?.content?.substring(0,60)||"",messageCount:A.messages?.length||0,createdAt:o>=0?a[o].createdAt:new Date().toISOString(),updatedAt:A.updatedAt||new Date().toISOString(),messages:A.messages,context:A.context};o>=0?a[o]=g:a.unshift(g),await chrome.storage.local.set({[me]:a.slice(0,50)})}async function y(h){h?.messages?.length&&(await V(Date.now().toString(),h),await chrome.storage.local.remove(Ke))}async function x(){clearTimeout(se.current),clearTimeout(ne.current),t.length>0&&await V(te,{messages:t,context:_,pageUrl:e?.url,pageTitle:e?.title,updatedAt:new Date().toISOString()}),n([]),m(null),re(Date.now().toString()),await chrome.storage.local.remove(Ke),e?.isAnalyzable&&De().then(h=>{h?.content&&m(h.content)}).catch(()=>{})}async function L(){clearTimeout(se.current),t.length>0&&await V(te,{messages:t,context:_,pageUrl:e?.url,pageTitle:e?.title,updatedAt:new Date().toISOString()});let h=await chrome.storage.local.get([me]);$(h[me]||[]),p(!0)}function q(h){h.id&&re(h.id),n(h.messages||[]),m(h.context||null),p(!1),chrome.storage.local.set({[Ke]:{messages:h.messages,context:h.context,pageUrl:h.pageUrl,pageTitle:h.pageTitle,updatedAt:new Date().toISOString()}})}async function ie(h){let l=((await chrome.storage.local.get([me]))[me]||[]).filter(a=>a.id!==h);await chrome.storage.local.set({[me]:l}),$(l)}async function ke(h){let A=(h.pageUrl||"").match(/\/(thread|topic|t|d)\/(\d+)/),l=A?A[2]:"web",a=h.id||Date.now().toString(),o=Date.now().toString(36),g=`chat-${l}-${a}-${o}`,w=(h.messages||[]).map(v=>v.role==="user"?`**Q:** ${v.content}`:`**A:** ${v.content}`).join(`

---

`);if(!w){n(v=>[...v,{role:"assistant",content:`\u26A0\uFE0F ${c("chat.saveEmpty")||"Nothing to save"}`}]);return}let T=(v,C)=>{let R=v?"\u2705":"\u26A0\uFE0F",j=v?c("chat.savedToKnowledge")||"Saved to knowledge base":C;n(oe=>[...oe,{role:"assistant",content:`${R} ${j}`}]),ae()};try{let v=await chrome.runtime.sendMessage({type:O.CREATE_BOOKMARK,payload:{thread_id:g,title:h.pageTitle||c("chat.generalChat"),url:h.pageUrl||"",summary:w.substring(0,500),tags:["\u804A\u5929\u8BB0\u5F55"]}});if(!v?.success){T(!1,v?.error||"save failed");return}let C=v.data?.bookmark_id||v.data?.id;if(C){let R=await chrome.runtime.sendMessage({type:O.ADD_NOTE,payload:{bookmarkId:C,content:w}});if(!R?.success){T(!1,`saved without note: ${R?.error||"note attach failed"}`);return}}T(!0)}catch(v){T(!1,v.message||"save failed")}}async function Ee(){confirm(c("chat.confirmClearAll"))&&(await chrome.storage.local.set({[me]:[]}),$([]))}async function Ne(h){let A=new Date(Date.now()-h*864e5).toISOString(),a=((await chrome.storage.local.get([me]))[me]||[]).filter(o=>(o.updatedAt||o.createdAt)>A);await chrome.storage.local.set({[me]:a}),$(a)}function Ie(h){if(!h)return"";let A=new Date(h),l=a=>String(a).padStart(2,"0");return`${A.getFullYear()}/${l(A.getMonth()+1)}/${l(A.getDate())} ${l(A.getHours())}:${l(A.getMinutes())}`}let Be=e?.url&&(e.url.toLowerCase().endsWith(".pdf")||e.url.includes("/pdf")||e.url.includes("smallpdf.com")||e.url.includes("drive.google.com/file")),Ge=e?.isAnalyzable?[{label:"\u{1F4DD} "+c("chat.summarize"),prompt:c("chat.summarizePrompt")},{label:"\u{1F511} "+c("chat.keyPoints"),prompt:c("chat.keyPointsPrompt")},{label:"\u{1F4A1} "+c("chat.explain"),prompt:c("chat.explainPrompt")}]:[];return b`
    <div class="chat-tab">
      <div class="chat-toolbar">
        <div class="chat-toolbar-left">
          ${_&&b`<span class="chat-context-dot" title="${c("chat.contextLoaded")}">🔗</span>`}
          ${F&&b`<span class="chat-context-dot" title="记忆已激活" style="margin-left:2px">🧠</span>`}
          ${t.length>0&&b`
            <span class="chat-msg-count">${t.length} ${c("chat.messages")}</span>
          `}
        </div>
        <div class="chat-toolbar-right">
          ${d&&b`<button class="chat-tool-btn" onClick=${async()=>{try{let h=await De(),A=h?.markdown||h?.content||"";if(!A)return;let l=(h?.title||"page").replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g,"_").substring(0,40),a=new Blob([A],{type:"text/markdown"}),o=URL.createObjectURL(a),g=document.createElement("a");g.href=o,g.download=`${l}.md`,g.click(),URL.revokeObjectURL(o)}catch{}}}>📄 ${c("chat.btnSaveFull")}</button>`}
          <button class="chat-tool-btn" onClick=${()=>I(h=>!h)}>📎 PDF</button>
          <button class="chat-tool-btn" onClick=${L}>📋 ${c("chat.btnHistory")}</button>
          <button class="chat-tool-btn" onClick=${x}>✨ ${c("chat.btnNew")}</button>
        </div>
      </div>

      ${P&&b`
        <div class="pdf-input-panel">
          <div class="pdf-input-row">
            <input
              type="text"
              class="pdf-url-input"
              value=${D}
              onInput=${h=>M(h.target.value)}
              onKeyDown=${h=>h.key==="Enter"&&z()}
              placeholder=${c("chat.pdfUrlPlaceholder")}
              disabled=${E}
            />
            <button class="pdf-load-btn" onClick=${z} disabled=${E||!D.trim()}>
              ${E?"\u23F3":"\u{1F4E5}"}
            </button>
          </div>
          <div class="pdf-input-divider">${c("chat.pdfOr")}</div>
          <button class="pdf-upload-btn" onClick=${()=>fe.current?.click()} disabled=${E}>
            📁 ${c("chat.pdfUpload")}
          </button>
          <input
            ref=${fe}
            type="file"
            accept=".pdf"
            style="display:none"
            onChange=${h=>{ee(h.target.files[0]),h.target.value=""}}
          />
          <div class="pdf-input-hint">${c("chat.pdfUrlHint")}</div>
        </div>
      `}

      ${k&&b`
        <div class="chat-history-panel">
          <div class="chat-history-header">
            <span>${c("chat.historyTitle")} (${f.length})</span>
            <div class="chat-history-actions">
              <button class="chat-hist-action" onClick=${()=>Ne(7)} title="${c("chat.clear7days")}">🗓️</button>
              <button class="chat-hist-action" onClick=${Ee} title="${c("chat.clearAll")}">🗑️</button>
              <button class="chat-hist-action" onClick=${()=>p(!1)}>✕</button>
            </div>
          </div>
          ${f.length===0&&b`
            <div class="chat-history-empty">${c("chat.noHistory")}</div>
          `}
          ${f.map(h=>b`
            <div key=${h.id} class="chat-history-item">
              <div class="chat-history-body" onClick=${()=>q(h)}>
                <div class="chat-history-title">${h.pageTitle||c("chat.generalChat")}</div>
                <div class="chat-history-preview">${h.preview}</div>
                <div class="chat-history-meta">
                  ${h.messageCount} ${c("chat.messages")} · ${Ie(h.updatedAt||h.createdAt)}
                </div>
              </div>
              <div class="chat-history-btns">
                <button class="chat-hist-action" onClick=${()=>ke(h)} title="${c("chat.saveToKb")}">📚</button>
                <button class="chat-hist-action" onClick=${()=>ie(h.id)} title="${c("common.delete")}">🗑️</button>
              </div>
            </div>
          `)}
        </div>
      `}

      <div class="chat-messages" ref=${he}>
        ${t.length===0&&b`
          <div class="chat-welcome">
            <div class="chat-welcome-icon">💬</div>
            <p>${Be?c("chat.welcomePdf"):e?.isAnalyzable?c("chat.welcomeTopic"):c("chat.welcomeGeneral")}</p>

            ${Ge.length>0&&b`
              <div class="chat-quick-actions">
                ${Ge.map(h=>b`
                  <button
                    key=${h.label}
                    class="chat-quick-btn"
                    onClick=${()=>ve(h.prompt)}
                  >
                    ${h.label}
                  </button>
                `)}
              </div>
            `}
          </div>
        `}

        ${t.map((h,A)=>b`
          <div key=${A} class="chat-msg chat-msg-${h.role}">
            <div class="chat-bubble chat-bubble-${h.role}">
              ${h.role==="assistant"?b`<div class="markdown-body" dangerouslySetInnerHTML=${{__html:Le(h.content)}}></div>`:h.content}
            </div>
            ${h.role==="assistant"&&h.content&&b`
              <div class="bubble-actions">
                <button class="bubble-action-btn" onClick=${l=>{navigator.clipboard.writeText(h.content),l.target.textContent="\u2713",setTimeout(()=>{l.target.textContent="\u{1F4CB}"},1500)}} title="${c("chat.copyMd")}">📋</button>
                <button class="bubble-action-btn" onClick=${()=>{let l=new Blob([h.content],{type:"text/markdown"}),a=URL.createObjectURL(l),o=document.createElement("a");o.href=a,o.download=`chat_${new Date().toISOString().slice(0,16).replace(/[T:]/g,"-")}.md`,o.click(),URL.revokeObjectURL(a)}} title="${c("chat.saveMd")}">💾</button>
              </div>
            `}
          </div>
        `)}

        ${s&&b`
          <div class="chat-msg chat-msg-assistant">
            <div class="chat-bubble chat-bubble-assistant chat-typing">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        `}
      </div>

      <div class="chat-input-area">
        <div class="chat-input-bar">
          <textarea
            class="chat-input"
            value=${r}
            onInput=${h=>i(h.target.value)}
            onKeyDown=${Ce}
            placeholder=${c("chat.placeholder")}
            rows="1"
            disabled=${s}
          ></textarea>
          <button
            class="chat-send-btn"
            onClick=${()=>ve()}
            disabled=${s||!r.trim()}
          >
            ➤
          </button>
        </div>
        <div class="chat-input-tools">
          <button
            class="thinking-toggle ${Z?"active":""}"
            onClick=${()=>Y(h=>!h)}
            title="${c("chat.thinkingHint")}"
          >
            🧠 ${c("chat.thinking")}
          </button>
        </div>
      </div>
    </div>
  `}ze();He();var Ze=Ue.map(e=>e.id);function hn(){let[e,t]=S(Te),[n,r]=S({}),[i,s]=S({}),[u,_]=S({}),[m,d]=S({}),[k,p]=S(""),[f,$]=S([]),[P,I]=S([]),[D,M]=S(!1),[E,H]=S({name:"",icon:"\u{1F916}",description:"",prompt:""}),[B,J]=S(null),[Z,Y]=S({}),[ce,G]=S(!1),[F,de]=S({name:"",baseUrl:"",apiKey:"",models:""}),[he,N]=S(!1),[ue,ne]=S(0),[ae,ve]=S(!0),[pe,fe]=S(!1),[ee,z]=S(null),[Ce,te]=S($e()),[re,se]=S(!1),[V,y]=S("checking");X(()=>{L(),x(),chrome.storage.local.get("_qc_dev",a=>{N(a._qc_dev===!0)})},[]);async function x(){y("checking");try{let a=await chrome.runtime.sendMessage({type:O.GET_HEALTH});y(a?.success?"connected":"disconnected")}catch{y("disconnected")}}async function L(){ve(!0);try{let a=await Re.get(),o={...Te,...a||{}};delete o.llmApiKeys,t(o);let g=await ct.getAll();r(g);let w={};for(let[T,v]of Object.entries(g))w[T]=!!(v&&v.trim());s(w);try{let T=await chrome.runtime.sendMessage({type:O.GET_CONFIG});if(T?.success&&T.data){t(U=>({...U,defaultModel:T.data.default_model||U.defaultModel,defaultProvider:T.data.default_provider||U.defaultProvider}));let v=T.data.providers||{};s(U=>{let ye={...U};for(let Se of Ze)v[Se]?.has_api_key&&(ye[Se]=!0);return ye});let C={},R={};for(let U of Ze){let ye=v[U]?.base_url,Se=Ue.find(Me=>Me.id===U);C[U]=ye||Se?.defaultBaseUrl||"";let Ae=v[U]?.models;R[U]=Array.isArray(Ae)&&Ae.length>0?[...Ae]:[...Se?.models||[]]}_(C),d(R),T.data.data_dir&&p(T.data.data_dir);try{let U=await chrome.runtime.sendMessage({type:O.LIST_AGENTS});U?.success&&Array.isArray(U.data)&&I(U.data)}catch{}let j=new Set([...Ue.map(U=>U.id),"builtin_claude","builtin_gpt"]),oe=[];for(let[U,ye]of Object.entries(v))j.has(U)||oe.push({id:U,name:ye.name||U,base_url:ye.base_url,models:ye.models||[],has_api_key:ye.has_api_key});$(oe)}}catch{}}catch(a){console.error("Failed to load config:",a)}finally{ve(!1)}}async function q(){fe(!0),z(null);try{let a={backendUrl:e.backendUrl,apiBasePath:e.apiBasePath,defaultModel:e.defaultModel,defaultProvider:e.defaultProvider};await Re.set(a);let o={};for(let v of Ze){let C=n[v];C!=null&&C!==""&&(await ct.set(v,C),o[v]=C)}let g={default_model:e.defaultModel,default_provider:e.defaultProvider,data_dir:k||void 0},w={};for(let[v,C]of Object.entries(o))w[v]={...w[v]||{},api_key:C};for(let v of Ze){let C=(u[v]||"").trim();C&&(w[v]={...w[v]||{},base_url:C})}for(let v of Ze){let C=m[v];Array.isArray(C)&&(w[v]={...w[v]||{},models:C})}Object.keys(w).length>0&&(g.providers=w);let T=null;try{let v=await chrome.runtime.sendMessage({type:O.UPDATE_CONFIG,payload:g});v?.success||(T=v?.error||"Backend update rejected")}catch(v){T=v.message||String(v)}s(v=>{let C={...v};for(let R of Object.keys(o))C[R]=!0;return C}),T?(z({type:"warning",text:c("settings.savedLocalOnly",{error:T})}),setTimeout(()=>z(null),6e3)):(z({type:"success",text:c("settings.saved")}),setTimeout(()=>z(null),5e3))}catch(a){z({type:"error",text:c("settings.saveFailed",{error:a.message})}),setTimeout(()=>z(null),6e3)}finally{fe(!1)}}async function ie(){se(!0),z(null);let a=Date.now(),o;try{let w=await chrome.runtime.sendMessage({type:O.GET_HEALTH});if(w?.success&&w.data){let T=w.data.default_model||e.defaultModel;o={type:"success",text:c("settings.testOk",{model:T})}}else throw new Error(w?.error||c("settings.testNoResponse"))}catch(w){o={type:"error",text:c("settings.testFail",{error:w.message})}}let g=Date.now()-a;g<400&&await new Promise(w=>setTimeout(w,400-g)),z(o),se(!1),setTimeout(()=>z(null),5e3)}function ke(a,o){t(g=>({...g,[a]:o}))}function Ee(a,o){r(g=>({...g,[a]:o}))}function Ne(a,o){_(g=>({...g,[a]:o}))}function Ie(a,o){let g=(o||"").trim();g&&d(w=>{let T=w[a]||[];return T.includes(g)?w:{...w,[a]:[...T,g]}})}function Be(a,o){d(g=>{let w=g[a]||[];return{...g,[a]:w.filter(T=>T!==o)}})}async function Ge(){let a=F.name.toLowerCase().replace(/[^a-z0-9]/g,"_");if(!a||!F.baseUrl)return;let o=F.models.split(",").map(g=>g.trim()).filter(Boolean);try{await chrome.runtime.sendMessage({type:O.UPDATE_CONFIG,payload:{providers:{[a]:{name:F.name,base_url:F.baseUrl,api_key:F.apiKey,models:o}}}}),$(g=>[...g,{id:a,name:F.name,base_url:F.baseUrl,models:o,has_api_key:!!F.apiKey}]),de({name:"",baseUrl:"",apiKey:"",models:""}),G(!1),A({type:"success",text:c("settings.customAdded")})}catch(g){A({type:"error",text:g.message})}}async function h(a){try{await chrome.runtime.sendMessage({type:O.UPDATE_CONFIG,payload:{delete_providers:[a]}}),$(o=>o.filter(g=>g.id!==a)),A({type:"success",text:c("settings.customDeleted")})}catch(o){A({type:"error",text:o.message})}}function A(a){z(a),setTimeout(()=>z(null),4e3)}async function l(a){await on(a),te(a)}return ae?b`
      <div class="loading-state">
        <div class="spinner"></div>
        <span>${c("common.loading")}</span>
      </div>
    `:b`
    <div class="settings-tab">
      ${ee&&b`
        <div class="message ${ee.type}">${ee.text}</div>
      `}

      <div class="settings-section">
        <h4>${c("settings.language")}</h4>
        <div class="form-group">
          <div class="language-switcher">
            <button
              class="btn-lang ${Ce==="zh"?"active":""}"
              onClick=${()=>l("zh")}
            >中文</button>
            <button
              class="btn-lang ${Ce==="en"?"active":""}"
              onClick=${()=>l("en")}
            >English</button>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h4>${c("settings.backend")}</h4>
        <div class="form-group">
          <label>${c("settings.backendUrl")}</label>
          <div style="display:flex;align-items:center;gap:8px;">
            <input
              type="text"
              value=${e.backendUrl}
              onInput=${a=>ke("backendUrl",a.target.value)}
              placeholder="http://127.0.0.1:8700"
              style="flex:1"
            />
            <span title=${V==="connected"?c("settings.backendConnected")||"\u540E\u7AEF\u5DF2\u8FDE\u63A5":V==="disconnected"?c("settings.backendDisconnected")||"\u540E\u7AEF\u672A\u8FDE\u63A5":c("settings.backendChecking")||"\u68C0\u6D4B\u4E2D..."} style="font-size:10px;line-height:1;flex-shrink:0;cursor:help">${V==="connected"?"\u{1F7E2}":V==="disconnected"?"\u{1F534}":"\u{1F7E1}"}</span>
          </div>
          <span class="hint">${V==="disconnected"?c("settings.backendDisconnectedHint")||"\u65E0\u6CD5\u8FDE\u63A5\u540E\u7AEF\uFF0C\u8BF7\u786E\u8BA4 python main.py \u5DF2\u542F\u52A8":c("settings.backendHint")}</span>
        </div>
        <div class="form-group">
          <button class="btn-secondary" onClick=${()=>{ie(),x()}} disabled=${re}>
            ${re?c("settings.testing"):c("settings.testConnection")}
          </button>
        </div>
      </div>

      <div class="settings-section">
        <h4>${c("settings.storagePath")}</h4>
        <div class="form-group">
          <label>${c("settings.storagePathLabel")}</label>
          <input
            type="text"
            value=${k}
            onInput=${a=>p(a.target.value)}
            placeholder=${k||"~/.quantclass/data"}
            spellcheck="false"
            style="font-family:monospace;font-size:11px"
          />
          <span class="hint">${c("settings.storagePathHint")}</span>
        </div>
      </div>

      <div class="settings-section">
        <h4>${c("settings.defaultModel")}</h4>
        <div class="form-group">
          <label>${c("settings.selectModel")}</label>
          <select
            value=${e.defaultModel}
            onChange=${a=>{let o=a.target.value,w=Ue.find(T=>T.models.includes(o))||$t.find(T=>T.models.includes(o));t(T=>({...T,defaultModel:o,defaultProvider:w?.id||T.defaultProvider}))}}
          >
            ${$t.map(a=>b`
              <optgroup key=${a.id} label=${a.name}>
                ${a.models.map(o=>b`
                  <option key=${o} value=${o}>${o}</option>
                `)}
              </optgroup>
            `)}
            ${f.map(a=>b`
              <optgroup key=${a.id} label=${a.name}>
                ${(a.models||[]).map(o=>b`
                  <option key=${o} value=${o}>${o}</option>
                `)}
              </optgroup>
            `)}
          </select>
        </div>
      </div>

      <div class="settings-section">
        <h4>${c("settings.apiKeys")}</h4>
        <p class="section-hint">${c("settings.apiKeysHint")}</p>

        ${Ue.map(a=>b`
          <div class="provider-block" key=${a.id}>
            <div class="provider-name">${a.name}</div>

            <div class="form-group">
              <label class="sub-label">${c("settings.apiBaseUrlLabel")}</label>
              <input
                type="text"
                value=${u[a.id]||""}
                onInput=${o=>Ne(a.id,o.target.value)}
                placeholder=${c("settings.apiBaseUrlPlaceholder",{url:a.defaultBaseUrl})}
                spellcheck="false"
                autocomplete="off"
              />
            </div>

            <div class="form-group">
              <label class="sub-label">${c("settings.apiKeyLabel")}</label>
              <input
                type="password"
                value=${n[a.id]||""}
                onInput=${o=>Ee(a.id,o.target.value)}
                placeholder=${c("settings.apiKeyPlaceholder",{provider:a.name})}
                autocomplete="off"
              />
              ${i[a.id]&&!n[a.id]&&b`
                <span class="hint">${c("settings.apiKeyConfigured")}</span>
              `}
            </div>

            <div class="form-group">
              <label class="sub-label">MODELS</label>
              <div style="display:flex;gap:4px;margin-bottom:4px">
                <select id="test-model-${a.id}" style="flex:1;font-size:11px;padding:4px 8px;font-family:monospace">
                  ${(m[a.id]||[]).map(o=>b`<option key=${o} value=${o}>${o}</option>`)}
                </select>
                <button class="btn-secondary" style="padding:4px 8px;font-size:10px;white-space:nowrap" onClick=${async o=>{let g=o.target,w=document.getElementById("test-model-"+a.id),T=m[a.id]||[],v=w?.value||T[0];if(!v){A({type:"error",text:`\u274C ${a.name}: no model configured`});return}g.textContent="\u23F3",g.disabled=!0;try{let C=await chrome.runtime.sendMessage({type:"TEST_PROVIDER",payload:{provider:a.id,model:v}});C?.success?A({type:"success",text:`\u2705 ${a.name}/${C.data?.model}: ${C.data?.response||"OK"}`}):A({type:"error",text:`\u274C ${a.name}: ${C?.error||"failed"}`})}catch(C){A({type:"error",text:`\u274C ${C.message}`})}finally{g.textContent="\u{1F50D} \u6D4B\u8BD5",g.disabled=!1}}}>🔍 测试</button>
              </div>
              <div style="display:flex;gap:4px;margin-bottom:4px">
                <input type="text" id="add-model-${a.id}" placeholder="添加模型名，回车或点 ➕" style="flex:1;font-size:11px;padding:4px 8px;font-family:monospace" onKeyDown=${o=>{o.key==="Enter"&&(Ie(a.id,o.target.value),o.target.value="")}} />
                <button class="btn-secondary" style="padding:4px 6px;font-size:10px" onClick=${()=>{let o=document.getElementById("add-model-"+a.id);Ie(a.id,o?.value),o&&(o.value="")}}>➕</button>
              </div>
              ${(m[a.id]||[]).length>0&&b`
                <div style="display:flex;flex-wrap:wrap;gap:4px">
                  ${(m[a.id]||[]).map(o=>b`
                    <span key=${o} style="display:inline-flex;align-items:center;gap:4px;font-size:10px;padding:2px 6px;background:#f0f0f0;border-radius:10px;font-family:monospace">
                      ${o}
                      <button
                        style="background:none;border:none;cursor:pointer;color:#888;padding:0;font-size:11px;line-height:1"
                        title="删除"
                        onClick=${()=>Be(a.id,o)}
                      >×</button>
                    </span>
                  `)}
                </div>
              `}
            </div>
          </div>
        `)}

        ${f.map(a=>b`
          <div class="provider-block" key=${a.id}>
            <div class="provider-name">
              ${a.name}
              <button class="provider-delete" onClick=${()=>h(a.id)} title="${c("common.delete")}">🗑️</button>
            </div>
            <div class="form-group">
              <label class="sub-label">Base URL</label>
              <input type="text" value=${a.base_url} disabled class="input-disabled" />
            </div>
            <div class="form-group">
              <label class="sub-label">Models</label>
              <span class="hint">${a.models.join(", ")||"none"}</span>
            </div>
          </div>
        `)}

        <button class="btn-add-custom" onClick=${()=>G(a=>!a)}>
          ${ce?"\u2715 "+c("settings.customCancel"):"\u2795 "+c("settings.customAdd")}
        </button>

        ${ce&&b`
          <div class="custom-form">
            <div class="form-group">
              <label class="sub-label">${c("settings.customName")}</label>
              <input type="text" value=${F.name} onInput=${a=>de(o=>({...o,name:a.target.value}))} placeholder="My LLM" />
            </div>
            <div class="form-group">
              <label class="sub-label">Base URL</label>
              <input type="text" value=${F.baseUrl} onInput=${a=>de(o=>({...o,baseUrl:a.target.value}))} placeholder="https://api.example.com/v1" />
            </div>
            <div class="form-group">
              <label class="sub-label">API Key</label>
              <input type="password" value=${F.apiKey} onInput=${a=>de(o=>({...o,apiKey:a.target.value}))} placeholder="sk-..." />
            </div>
            <div class="form-group">
              <label class="sub-label">${c("settings.customModels")}</label>
              <input type="text" value=${F.models} onInput=${a=>de(o=>({...o,models:a.target.value}))} placeholder="model-a, model-b" />
            </div>
            <button class="btn-primary" style="width:100%" onClick=${Ge} disabled=${!F.name||!F.baseUrl}>
              ${c("settings.customConfirm")}
            </button>
          </div>
        `}
      </div>

      <div class="settings-section">
        <h4>${c("settings.agentManage")}</h4>
        <p class="section-hint">${c("settings.agentHint")}</p>

        ${P.map(a=>b`
          <div class="provider-block" key=${a.id} style="margin-bottom:6px;padding:8px 12px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:18px">${a.icon}</span>
              <div style="flex:1;min-width:0">
                <div style="font-size:12px;font-weight:600">${a.name}</div>
                <div style="font-size:10px;color:var(--text-muted)">${a.description}</div>
              </div>
              <button class="chat-hist-action" onClick=${()=>{B===a.id?J(null):(J(a.id),Y({name:a.name,icon:a.icon,description:a.description,prompt:a.prompt}))}} title="编辑">${B===a.id?"\u25B2":"\u270F\uFE0F"}</button>
              <button class="chat-hist-action" onClick=${async()=>{if(confirm("\u5220\u9664 "+a.name+"?"))try{await chrome.runtime.sendMessage({type:"DELETE_AGENT",payload:{id:a.id}}),I(o=>o.filter(g=>g.id!==a.id)),A({type:"success",text:"\u2713 \u5DF2\u5220\u9664"})}catch(o){A({type:"error",text:o.message})}}} title="删除">🗑️</button>
            </div>

            ${B===a.id&&b`
              <div class="custom-form" style="margin-top:8px">
                <div class="form-group">
                  <label class="sub-label">名称</label>
                  <input type="text" value=${Z.name} onInput=${o=>Y(g=>({...g,name:o.target.value}))} />
                </div>
                <div class="form-group">
                  <label class="sub-label">图标</label>
                  <input type="text" value=${Z.icon} onInput=${o=>Y(g=>({...g,icon:o.target.value}))} style="width:60px" />
                </div>
                <div class="form-group">
                  <label class="sub-label">描述</label>
                  <input type="text" value=${Z.description} onInput=${o=>Y(g=>({...g,description:o.target.value}))} />
                </div>
                <div class="form-group">
                  <label class="sub-label">System Prompt</label>
                  <textarea style="width:100%;min-height:100px;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:12px;font-family:inherit;resize:vertical" value=${Z.prompt} onInput=${o=>Y(g=>({...g,prompt:o.target.value}))}></textarea>
                </div>
                <button class="btn-primary" style="width:100%" onClick=${async()=>{try{await chrome.runtime.sendMessage({type:"UPDATE_AGENT",payload:{id:a.id,...Z}});let o=await chrome.runtime.sendMessage({type:O.LIST_AGENTS});o?.success&&I(o.data),J(null),A({type:"success",text:"\u2713 \u5DF2\u66F4\u65B0"})}catch(o){A({type:"error",text:o.message})}}}>保存</button>
              </div>
            `}
          </div>
        `)}

        ${P.length===0&&b`<div style="color:var(--text-muted);font-size:12px;padding:8px">加载中...</div>`}

        <button class="btn-add-custom" onClick=${()=>M(a=>!a)}>
          ${D?"\u2715 \u53D6\u6D88":"\u2795 "+c("settings.agentAdd")}
        </button>

        ${D&&b`
          <div class="custom-form">
            <div class="form-group">
              <label class="sub-label">${c("settings.agentNamePrompt")}</label>
              <input type="text" value=${E.name} onInput=${a=>H(o=>({...o,name:a.target.value}))} placeholder="产品经理" />
            </div>
            <div class="form-group">
              <label class="sub-label">Emoji 图标</label>
              <input type="text" value=${E.icon} onInput=${a=>H(o=>({...o,icon:a.target.value}))} placeholder="🤖" style="width:60px" />
            </div>
            <div class="form-group">
              <label class="sub-label">一句话描述</label>
              <input type="text" value=${E.description} onInput=${a=>H(o=>({...o,description:a.target.value}))} placeholder="从产品角度分析" />
            </div>
            <div class="form-group">
              <label class="sub-label">System Prompt（角色设定）</label>
              <textarea style="width:100%;min-height:80px;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:12px;font-family:inherit;resize:vertical" value=${E.prompt} onInput=${a=>H(o=>({...o,prompt:a.target.value}))} placeholder="你是一个..."></textarea>
            </div>
            <button class="btn-primary" style="width:100%" disabled=${!E.name||!E.prompt} onClick=${async()=>{let a=E.name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g,"_").substring(0,30);try{await chrome.runtime.sendMessage({type:"CREATE_AGENT",payload:{id:a,...E}});let o=await chrome.runtime.sendMessage({type:O.LIST_AGENTS});o?.success&&I(o.data),H({name:"",icon:"\u{1F916}",description:"",prompt:""}),M(!1),A({type:"success",text:c("settings.agentCreated")})}catch(o){A({type:"error",text:o.message})}}}>
              ${c("settings.customConfirm")}
            </button>
          </div>
        `}
      </div>

      <div class="settings-section" style="text-align:center;border-bottom:none">
        <span style="font-size:11px;color:var(--text-muted);cursor:default;user-select:none" onClick=${()=>{let a=ue+1;if(ne(a),a>=5){let o=!he;chrome.storage.local.set({_qc_dev:o}),N(o),ne(0),A({type:"success",text:o?"\u{1F513} \u5F00\u53D1\u8005\u6A21\u5F0F\u5DF2\u6FC0\u6D3B":"\u{1F512} \u5F00\u53D1\u8005\u6A21\u5F0F\u5DF2\u5173\u95ED"})}setTimeout(()=>ne(0),3e3)}}>
          QuantClass Smart v0.2.0
        </span>
        ${he&&b`
          <div style="margin-top:6px">
            <span style="font-size:10px;color:var(--success)">🔓 开发者模式</span>
            <button class="chat-hist-action" onClick=${()=>{chrome.storage.local.set({_qc_dev:!1}),N(!1),A({type:"success",text:"\u{1F512} \u5DF2\u9000\u51FA\u5F00\u53D1\u8005\u6A21\u5F0F"})}} style="font-size:10px;margin-left:8px">退出</button>
          </div>
        `}
      </div>

      <div class="settings-actions">
        <button class="btn-primary" onClick=${q} disabled=${pe}>
          ${pe?c("settings.saving"):c("settings.saveButton")}
        </button>
        <button class="btn-secondary" onClick=${L}>${c("common.reset")}</button>
      </div>
    </div>
  `}function Fn({onDismiss:e}){return b`
    <div class="onboarding-card">
      <h3 style="margin:0 0 12px;font-size:15px">👋 欢迎使用 QuantClass Smart</h3>
      <ol style="margin:0;padding-left:20px;font-size:13px;line-height:1.8">
        <li><strong>启动后端</strong> — 在终端运行 <code>bash scripts/start.sh</code></li>
        <li><strong>打开论坛帖子</strong> — 访问 <a href="https://bbs.quantclass.cn" target="_blank">bbs.quantclass.cn</a> 任意帖子</li>
        <li><strong>生成摘要</strong> — 点击上方「摘要」页签，点击生成按钮</li>
      </ol>
      <button class="btn-secondary" style="margin-top:10px;font-size:12px" onClick=${e}>
        我知道了，不再显示
      </button>
    </div>
  `}function Kn(){let[e,t]=S("chat"),[n,r]=S(null),[i,s]=S(!0),[,u]=S(0),[_,m]=S(!1);X(()=>(sn().then(()=>u(f=>f+1)),rn(()=>u(f=>f+1))),[]),X(()=>{chrome.storage.local.get("quantclass_onboarding_done",f=>{f.quantclass_onboarding_done||m(!0)})},[]);function d(){chrome.storage.local.set({quantclass_onboarding_done:!0}),m(!1)}X(()=>{function f(D){return D?{url:D.url,title:D.title,isTopicPage:/\/(thread|topic|t|d)\//.test(D.url||""),isAnalyzable:!/^(chrome|about|edge|brave|file|devtools):/.test(D.url||"")}:null}async function $(){try{let[D]=await chrome.tabs.query({active:!0,currentWindow:!0}),M=f(D);M&&r(M)}catch(D){console.warn("refreshActiveTab failed:",D)}finally{s(!1)}}$();let P=()=>{$()};chrome.tabs.onActivated.addListener(P);let I=(D,M,E)=>{if(E?.active&&(M.url||M.title||M.status==="complete")){let H=f(E);H&&r(H)}};return chrome.tabs.onUpdated.addListener(I),()=>{chrome.tabs.onActivated.removeListener(P),chrome.tabs.onUpdated.removeListener(I)}},[]);let k=[{id:"chat",label:c("tab.chat"),icon:"\u{1F4AC}"},{id:"agent",label:"Agent",icon:"\u{1F916}"},{id:"knowledge",label:c("tab.knowledge"),icon:"\u{1F4DA}"},{id:"settings",label:c("tab.settings"),icon:"\u2699\uFE0F"}];function p(){switch(e){case"chat":return b`<${mn} currentPage=${n} />`;case"agent":return b`<${un} currentPage=${n} />`;case"knowledge":return b`<${gn} />`;case"settings":return b`<${hn} />`;default:return null}}return i?b`
      <div class="loading-container">
        <div class="spinner"></div>
      </div>
    `:b`
    <div class="app">
      <div class="app-main">

        ${_&&b`<${Fn} onDismiss=${d} />`}

        <main class="tab-content">
          ${p()}
        </main>
      </div>

      <${an}
        tabs=${k}
        activeTab=${e}
        onChange=${t}
      />
    </div>
  `}bt(b`<${Kn} />`,document.getElementById("app"));})();
