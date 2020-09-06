(this["webpackJsonpleaderbored-ui"]=this["webpackJsonpleaderbored-ui"]||[]).push([[13],{1037:function(e,a,t){"use strict";t.r(a);var n=t(31),r=t(0),l=t.n(r),c=t(14),o=t.n(c),i=t(19),s=t(88),m=t(215),u=t.n(m),p=t(363);function E(){var e=l.a.useRef(!0);return l.a.useEffect((function(){return function(){e.current=!1}}),[]),e}var d=t(115),f=t(28),y=t(3),g=t(840),b=t(813),h=t(844),v=t(831),S=t(1026),x=t(125),O=t(1025),C=t(846),k=t(1044),w=t(1038),j=t(839),T=t(1027),N=t(113),P=t(1014),I=t.n(P),F=t(1015),R=t.n(F),D=t(17),G=o()((function(e){return{root:{fontFamily:e.typography.fontFamily,alignItems:"center",borderRadius:2,display:"inline-flex",flexGrow:0,whiteSpace:"nowrap",cursor:"default",flexShrink:0,fontSize:e.typography.pxToRem(12),fontWeight:e.typography.fontWeightMedium,height:20,justifyContent:"center",letterSpacing:.5,minWidth:20,padding:e.spacing(.5,1),textTransform:"uppercase"},info:{color:e.palette.info.main,backgroundColor:Object(D.c)(e.palette.info.main,.08)},primary:{color:e.palette.primary.main,backgroundColor:Object(D.c)(e.palette.primary.main,.08)},secondary:{color:e.palette.secondary.main,backgroundColor:Object(D.c)(e.palette.secondary.main,.08)},error:{color:e.palette.error.main,backgroundColor:Object(D.c)(e.palette.error.main,.08)},success:{color:e.palette.success.main,backgroundColor:Object(D.c)(e.palette.success.main,.08)},warning:{color:e.palette.warning.main,backgroundColor:Object(D.c)(e.palette.warning.main,.08)}}}));function H(e){var a=e.className,t=e.color,n=e.children,r=(e.style,Object(f.a)(e,["className","color","children","style"])),c=G();return l.a.createElement("span",Object.assign({className:Object(y.a)(c.root,Object(N.a)({},c[t],t),a)},r),n)}H.defaultProps={className:"",color:"secondary"};var Y=H,_=t(858),M=t(830),B=t(800),L=t(824);var U=o()((function(e){return{card:Object(N.a)({display:"block"},e.breakpoints.up("md"),{display:"flex"})}}));var W=function(e){var a=e.contest,t=e.className,n=Object(f.a)(e,["contest","className"]),r=Object(i.g)(),c=U();return l.a.createElement(h.a,Object.assign({className:Object(y.a)(t),variant:"outlined"},n),l.a.createElement(b.a,{className:c.card},l.a.createElement(b.a,{p:2},l.a.createElement(b.a,{display:"flex",alignItems:"center"},l.a.createElement(_.a,null,l.a.createElement(R.a,null)),l.a.createElement(b.a,{ml:2},l.a.createElement(M.a,{color:"textPrimary",href:"https://codeforces.com/contests/".concat(a.id),target:"_blank",rel:"noopener",variant:"h5"},a.name)))),l.a.createElement(b.a,{flexGrow:1}),l.a.createElement(b.a,{py:2,px:1},l.a.createElement(C.a,{item:!0,alignItems:"center",container:!0,justify:"space-around",spacing:3,wrap:"nowrap"},l.a.createElement(C.a,{item:!0},l.a.createElement(B.a,{variant:"h5",color:"textPrimary",align:"center"},a.type),l.a.createElement(B.a,{variant:"body2",color:"textSecondary",align:"center"},"Type")),l.a.createElement(C.a,{item:!0},l.a.createElement(B.a,{variant:"h5",color:"textPrimary",align:"center"},I.a.unix(a.startTimeSeconds).format("DD-MM-YYYY HH:mm")),l.a.createElement(B.a,{variant:"body2",color:"textSecondary",align:"center"},"Start Time")),l.a.createElement(C.a,{item:!0},l.a.createElement(B.a,{variant:"h5",color:"textPrimary",align:"center"},(a.durationSeconds/3600).toString()+"H"),l.a.createElement(B.a,{variant:"body2",color:"textSecondary",align:"center"},"Duration")))),l.a.createElement(v.a,null),l.a.createElement(b.a,{py:2,pl:2,pr:3,display:"flex",alignItems:"center"},function(e){var a={BEFORE:{text:"BEFORE",color:"info"},CODING:{text:"CODING",color:"success"},PENDING_SYSTEM_TEST:{text:"PENDING_SYSTEM_TEST",color:"warning"},SYSTEM_TEST:{text:"SYSTEM_TEST",color:"warning"},FINISHED:{text:"FINISHED",color:"error"}}[e],t=a.text,n=a.color;return l.a.createElement(Y,{color:n},t)}(a.phase),l.a.createElement(b.a,{flexGrow:1}),l.a.createElement(L.a,{onClick:function(e){e.preventDefault(),r.push("/app/contest/".concat(a.id))},variant:"outlined",color:"default",disabled:"CODING"!==a.phase&&"FINISHED"!==a.phase},"Standings"))))},q=[{value:"BEFORE",label:"BEFORE"},{value:"CODING",label:"CODING"},{value:"PENDING_SYSTEM_TEST",label:"PENDING SYSTEM TEST"},{value:"SYSTEM_TEST",label:"SYSTEM TEST"},{value:"FINISHED",label:"FINISHED"}],z=[{id:"all",name:"All"},{id:"CF",name:"CF"},{id:"ICPC",name:"ICPC"},{id:"IOI",name:"IOI"}];var A=o()((function(e){return{root:{flexGrow:1},queryField:{width:500},avatar:{height:42,width:42,marginRight:e.spacing(1)},tablePagination:{bottom:0},typeField:{marginLeft:e.spacing(2),flexBasis:200}}})),J=l.a.memo((function(e){var a=e.className,t=e.contests,r=Object(f.a)(e,["className","contests"]),c=A(),o=l.a.useState(0),i=Object(n.a)(o,2),s=i[0],m=i[1],u=l.a.useState(10),p=Object(n.a)(u,2),E=p[0],N=p[1],P=l.a.useState(""),I=Object(n.a)(P,2),F=I[0],R=I[1],D=l.a.useState({phase:"BEFORE",contestType:null}),G=Object(n.a)(D,2),H=G[0],Y=G[1],_=function(e,a,t){return e.filter((function(e){var n=!0;return a&&!e.name.toLowerCase().includes(a.toLowerCase())&&(n=!1),t.phase&&e.phase!==t.phase&&(n=!1),t.contestType&&t.contestType!==e.type&&(n=!1),n}))}(t,F,H),M=function(e,a,t){return e.slice(a*t,a*t+t)}(_,s,E);return l.a.createElement(l.a.Fragment,null,l.a.createElement(g.a,{position:"static",color:"transparent"},l.a.createElement(w.a,{onChange:function(e,a){e.persist(),Y((function(e){return Object(d.a)({},e,{phase:a})}))},scrollButtons:"auto",textColor:"secondary",indicatorColor:"primary",value:H.phase,variant:"scrollable"},q.map((function(e){return l.a.createElement(O.a,{key:e.value,value:e.value,label:e.label})})))),l.a.createElement(g.a,{position:"sticky",color:"inherit"},l.a.createElement(b.a,{p:1,display:"flex",alignItems:"center"},l.a.createElement(j.a,{className:c.queryField,InputProps:{startAdornment:l.a.createElement(S.a,{position:"start"},l.a.createElement(x.a,{fontSize:"small",color:"action"},l.a.createElement(T.a,null)))},onChange:function(e){e.persist(),R(e.target.value)},placeholder:"Search contests",value:F,variant:"outlined"}),l.a.createElement(b.a,{flexGrow:1}),l.a.createElement(j.a,{className:c.typeField,label:"Contest Type",name:"contestType",onChange:function(e){e.persist();var a=null;"all"!==e.target.value&&(a=e.target.value),Y((function(e){return Object(d.a)({},e,{contestType:a})}))},select:!0,SelectProps:{native:!0},value:H.contestType||"all",variant:"outlined"},z.map((function(e){return l.a.createElement("option",{key:e.id,value:e.id},e.name)}))))),l.a.createElement(h.a,Object.assign({className:Object(y.a)(c.root,a)},r),l.a.createElement(v.a,null),l.a.createElement(C.a,{container:!0,direction:"BEFORE"===H.phase?"column-reverse":"column",alignContent:"center",spacing:2},M.map((function(e){return l.a.createElement(C.a,{key:e.id,item:!0},l.a.createElement(W,{contest:e}))})))),l.a.createElement(g.a,{position:"sticky",color:"inherit",className:c.tablePagination},l.a.createElement(k.a,{component:"div",count:_.length,onChangePage:function(e,a){m(a)},onChangeRowsPerPage:function(e){N(e.target.value)},page:s,rowsPerPage:E,rowsPerPageOptions:[5,10,25,50,100]})))}));J.defaultProps={contests:[]};var K=J,Q=t(528),V=t(509),X=t.n(V),Z=t(841),$=t(805),ee=t(1016),ae=t.n(ee),te=t(1045),ne=o()((function(){return{root:{flexGrow:1}}}));var re=function(e){var a=e.problems,t=ne(),n=new ae.a;return l.a.createElement(h.a,{className:Object(y.a)(t.root)},l.a.createElement(C.a,{container:!0,spacing:1},a.map((function(e){return l.a.createElement(C.a,{key:e.name+e.index,item:!0,lg:4,xl:3,md:4,sm:6,xs:12},l.a.createElement(h.a,{variant:"outlined"},l.a.createElement(b.a,{p:2},l.a.createElement(b.a,{display:"flex",alignItems:"center"},l.a.createElement(_.a,null,e.index),l.a.createElement(b.a,{ml:2},l.a.createElement(M.a,{color:"textPrimary",href:"https://codeforces.com/contest/".concat(e.contestId,"/problem/").concat(e.index),target:"_blank",rel:"noopener",variant:"h5"},e.name)))),l.a.createElement(b.a,{py:2,px:3},l.a.createElement(C.a,{item:!0,alignItems:"center",container:!0,justify:"space-between",spacing:3},l.a.createElement(C.a,{item:!0},l.a.createElement(B.a,{variant:"h5",color:"textPrimary"},e.type),l.a.createElement(B.a,{variant:"body2",color:"textSecondary"},"Type")),l.a.createElement(C.a,{item:!0},l.a.createElement(B.a,{variant:"h5",color:"textPrimary"},e.points),l.a.createElement(B.a,{variant:"body2",color:"textSecondary"},"Points")),l.a.createElement(C.a,{item:!0},l.a.createElement(B.a,{variant:"h5",color:"textPrimary"},e.rating),l.a.createElement(B.a,{variant:"body2",color:"textSecondary"},"Rating")))),l.a.createElement(v.a,null),l.a.createElement(b.a,{p:2,display:"flex",alignItems:"center",overflow:"auto"},e.tags.map((function(e){return l.a.createElement(te.a,{key:e,label:e,style:{borderColor:n.hex(e+"CodeTeam")},variant:"outlined"})})))))}))))},le=t(850),ce=t(854),oe=t(853),ie=t(851),se=t(852),me=t(1041),ue=t(1028),pe=t(187),Ee=t.n(pe),de=t(382);var fe=o()((function(e){return{root:{flexGrow:1},queryField:{width:500},avatar:{height:42,width:42,marginRight:e.spacing(1)},tablePagination:{position:"fixed",bottom:0,left:0,right:0},divider:{width:1,height:24,marginLeft:e.spacing(2),marginRight:e.spacing(2)},showUnofficialField:{marginLeft:e.spacing(2)}}}));function ye(e){var a=e.className,t=e.contestants,r=e.problems,c=Object(f.a)(e,["className","contestants","problems"]),o=fe(),i=l.a.useState(0),s=Object(n.a)(i,2),m=s[0],u=s[1],p=l.a.useState(10),E=Object(n.a)(p,2),d=E[0],O=E[1],C=l.a.useState(""),w=Object(n.a)(C,2),N=w[0],P=w[1],I=l.a.useState(!1),F=Object(n.a)(I,2),R=F[0],D=F[1],G=function(e,a,t){return e.filter((function(e){var n=!0;if(a){var r=!1;["handle"].forEach((function(t){e.party.members[0][t].toLowerCase().includes(a.toLowerCase())&&(r=!0)})),r||(n=!1)}return"CONTESTANT"===e.party.participantType||t||(n=!1),n}))}(t,N,R),H=function(e,a,t){return e.slice(a*t,a*t+t)}(G,m,d);return l.a.createElement(l.a.Fragment,null,l.a.createElement(g.a,{position:"sticky",color:"inherit"},l.a.createElement(b.a,{p:1,display:"flex",alignItems:"center"},l.a.createElement(j.a,{className:o.queryField,InputProps:{startAdornment:l.a.createElement(S.a,{position:"start"},l.a.createElement(x.a,{fontSize:"small",color:"action"},l.a.createElement(T.a,null)))},onChange:function(e){e.persist(),P(e.target.value)},placeholder:"Search contestants",value:N,variant:"outlined"}),l.a.createElement(b.a,{flexGrow:1}),l.a.createElement(B.a,{variant:"body2",color:"textPrimary"},l.a.createElement(ue.a,{className:o.showUnofficialField,control:l.a.createElement(me.a,{checked:R,onChange:function(e){e.persist(),D((function(e){return!e}))},name:"showUnofficial"}),label:"Show Unofficial"})))),l.a.createElement(h.a,Object.assign({className:Object(y.a)(o.root,a)},c),l.a.createElement(v.a,null),l.a.createElement(b.a,{overflow:"auto"},l.a.createElement(le.a,{stickyHeader:!0},l.a.createElement(ie.a,null,l.a.createElement(se.a,null,l.a.createElement(oe.a,null,"Rank"),l.a.createElement(oe.a,null,"Handle"),l.a.createElement(oe.a,null,"Points"),l.a.createElement(oe.a,null,"Penalty"),l.a.createElement(oe.a,null,"HackCount"))),l.a.createElement(ce.a,null,H.map((function(e){return l.a.createElement(l.a.Fragment,{key:e.party.members[0].handle+e.party.participantType},l.a.createElement(se.a,null,l.a.createElement(oe.a,null,e.rank),l.a.createElement(oe.a,null,l.a.createElement(b.a,{display:"flex",alignItems:"center"},l.a.createElement(_.a,{className:o.avatar},Object(de.a)(e.party.members[0].handle)),l.a.createElement("div",null,l.a.createElement(M.a,{color:"inherit",href:"https://codeforces.com/profile/".concat(e.party.members[0].handle),target:"_blank",rel:"noopener"},e.party.members[0].handle),l.a.createElement(B.a,{variant:"body2",color:"textSecondary"},e.party.participantType)))),l.a.createElement(oe.a,null,e.points),l.a.createElement(oe.a,null,e.penalty),l.a.createElement(oe.a,null,l.a.createElement(b.a,{display:"flex"},l.a.createElement(B.a,{variant:"body2",style:{color:Ee.a[500]}},e.successfulHackCount),l.a.createElement(v.a,{className:o.divider}),l.a.createElement(B.a,{variant:"body2",color:"error"},e.unsuccessfulHackCount)))),l.a.createElement(se.a,{key:e.party.members[0].handle+"Score"},l.a.createElement(oe.a,{colSpan:5},l.a.createElement(b.a,{display:"flex",color:"transparent",justifyContent:"center"},e.problemResults.map((function(a,t){return l.a.createElement(te.a,{key:r[t].index+e.party.members[0].handle,style:{margin:"0 5px"},avatar:l.a.createElement(_.a,null,r[t].index),label:a.points,variant:"outlined"})}))))))})))))),l.a.createElement(g.a,{color:"inherit",position:"sticky",style:{bottom:0}},l.a.createElement(k.a,{component:"div",count:G.length,onChangePage:function(e,a){u(a)},onChangeRowsPerPage:function(e){O(e.target.value)},page:m,rowsPerPage:d,rowsPerPageOptions:[5,10,25,50,100]})))}ye.defaultProps={contestants:[]};var ge=ye,be=t(218),he=function(e){var a=e.contestId,t=e.handles,r=Object(i.g)(),c=l.a.useState(1),o=Object(n.a)(c,2),s=o[0],m=o[1],p=l.a.useState(!0),d=Object(n.a)(p,2),f=d[0],y=d[1],h=l.a.createRef(),v=E(),S=l.a.useState(null),x=Object(n.a)(S,2),C=x[0],k=x[1],j=l.a.useCallback((function(){u.a.get("https://codeforces.com/api/contest.standings?contestId=".concat(a,"&showUnofficial=true&handles=").concat(t.join(";"))).then((function(e){v.current&&k(e.data.result)}))}),[v,a,t]);l.a.useEffect((function(){j()}),[j]);return C?l.a.createElement(Q.a,{direction:"down",in:f,onExit:function(){r.goBack()},mountOnEnter:!0,unmountOnExit:!0},l.a.createElement("div",{ref:h},l.a.createElement(g.a,{position:"static",color:"transparent"},l.a.createElement(Z.a,{variant:"dense"},l.a.createElement($.a,{onClick:function(){y(!1)},size:"medium",edge:"start",color:"primary"},l.a.createElement(X.a,null)),l.a.createElement(B.a,{noWrap:!0,variant:"h5",color:"textPrimary"},C.contest.name))),l.a.createElement(g.a,{position:"sticky",color:"inherit"},l.a.createElement(w.a,{onChange:function(e,a){m(a)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth","aria-label":"full width tabs example",value:s},l.a.createElement(O.a,{value:0,label:"Problems"}),l.a.createElement(O.a,{value:1,label:"Standings"}))),l.a.createElement(b.a,{display:0===s?"block":"none"}," ",l.a.createElement(re,{problems:C.problems})),l.a.createElement(b.a,{display:1===s?"block":"none"},l.a.createElement(ge,{contestants:C.rows,problems:C.problems})))):l.a.createElement(be.a,null)},ve=o()((function(e){return{root:{backgroundColor:e.palette.background.dark,minHeight:"100%"}}}));a.default=function(){var e=ve(),a=Object(i.i)().contestId,t=l.a.useRef(null),r=E(),c=l.a.useState(null),o=Object(n.a)(c,2),m=o[0],d=o[1],f=l.a.useState(null),y=Object(n.a)(f,2),g=y[0],h=y[1],v=l.a.useCallback((function(){u.a.get("https://codeforces.com/api/contest.list").then((function(e){r.current&&d(e.data.result)}))}),[r]),S=l.a.useCallback((function(){s.a.get(" https://api.cp-leaderboard.me/user/handle").then((function(e){r.current&&h(e.data.handle)}))}),[r]);return l.a.useEffect((function(){v(),S()}),[v,S]),m?l.a.createElement(p.a,{className:e.root,title:"Contest",ref:t},l.a.createElement(b.a,{display:a?"none":"block"},l.a.createElement(K,{contests:m})),a&&l.a.createElement(he,{contestId:a,handles:g})):l.a.createElement(be.a,null)}}}]);