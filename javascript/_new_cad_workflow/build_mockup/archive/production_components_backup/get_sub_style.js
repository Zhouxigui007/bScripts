function getSubStyle(D,F){var W;log.l("::Beginning getSubStyle function with arguments: ::itemName = "+D+"::style = "+F);var S={1000:"FD-163",1001:"FD-163",1002:"FD-163",1003:"FD-163",1005:"FD-163",1006:"FD-163",1007:"FD-163",1009:"FD-163",1010:"FD-163",1011:"FD-163",1012:"FD-163",1013:"FD-163",1014:"FD-163",1015:"FD-163",1017:"FD-163",1018:"FD-163",1019:"FD-163",1020:"FD-163",1022:"FD-163",1023:"FD-163",1024:"FD-163",1025:"FD-163",1030:"FD-163",1035:"FD-163",1036:"FD-163",1037:"FD-163",1040:"FD-163",1041:"FD-163",1042:"FD-163",1043:"FD-163",1044:"FD-163",1045:"FD-163",1046:"FD-163",1047:"FD-163",1048:"FD-163",1049:"FD-163",1052:"FD-163",1053:"FD-163",1054:"FD-163",1056:"FD-163",1059:"FD-163",1062:"FD-163",1063:"FD-163",1064:"FD-163",1065:"FD-163",1066:"FD-163",1067:"FD-163",1068:"FD-163",1004:"FD-161",1008:"FD-161",1016:"FD-161",1021:"FD-161",1026:"FD-161",1029:"FD-161",1031:"FD-161",1032:"FD-161",1033:"FD-161",1034:"FD-161",1038:"FD-161",1039:"FD-161",1050:"FD-161",1055:"FD-161",1057:"FD-161",1058:"FD-161",1060:"FD-161",1061:"FD-161",1069:"FD-161",1070:"FD-161",1071:"FD-161"},e={1000:"FD-163W",1001:"FD-163W",1002:"FD-163W",1003:"FD-163W",1005:"FD-163W",1006:"FD-163W",1007:"FD-163W",1009:"FD-163W",1010:"FD-163W",1011:"FD-163W",1012:"FD-163W",1013:"FD-163W",1014:"FD-163W",1015:"FD-163W",1017:"FD-163W",1018:"FD-163W",1019:"FD-163W",1020:"FD-163W",1022:"FD-163W",1023:"FD-163W",1024:"FD-163W",1025:"FD-163W",1030:"FD-163W",1035:"FD-163W",1036:"FD-163W",1037:"FD-163W",1040:"FD-163W",1041:"FD-163W",1042:"FD-163W",1043:"FD-163W",1044:"FD-163W",1045:"FD-163W",1046:"FD-163W",1047:"FD-163W",1048:"FD-163W",1049:"FD-163W",1052:"FD-163W",1053:"FD-163W",1054:"FD-163W",1056:"FD-163W",1059:"FD-163W",1062:"FD-163W",1063:"FD-163W",1064:"FD-163W",1065:"FD-163W",1066:"FD-163W",1067:"FD-163W",1068:"FD-163W",1004:"FD-161W",1008:"FD-161W",1016:"FD-161W",1021:"FD-161W",1026:"FD-161W",1029:"FD-161W",1031:"FD-161W",1032:"FD-161W",1033:"FD-161W",1034:"FD-161W",1038:"FD-161W",1039:"FD-161W",1050:"FD-161W",1055:"FD-161W",1057:"FD-161W",1058:"FD-161W",1060:"FD-161W",1061:"FD-161W",1069:"FD-161W",1070:"FD-161W",1071:"FD-161W"},a={1000:"FD-260",1001:"FD-260",1002:"FD-260",1003:"FD-260",1004:"FD-260",1005:"FD-3007",1006:"FD-3007",1007:"FD-3007",1008:"FD-3007",1017:"FD-260",1018:"FD-260",1019:"FD-260",1020:"FD-3007",1021:"FD-3007",1022:"FD-3007"},c={1000:"FD-260",1001:"FD-260",1002:"FD-260",1003:"FD-260",1004:"FD-260",1005:"FD-3007",1006:"FD-3007",1007:"FD-3007",1008:"FD-3007",1017:"FD-260",1018:"FD-260",1019:"FD-260",1020:"FD-3007",1021:"FD-3007",1022:"FD-3007"},s={1000:"FD-3011W",1001:"FD-3047W",1002:"FD-3047W",1003:"FD-3047W",1004:"FD-3047W",1005:"FD-3047W",1006:"FD-3047W",1007:"FD-3047W",1008:"FD-3047W",1009:"FD-3011W",1010:"FD-3011W",1011:"FD-3011W",1012:"FD-3011W",1013:"FD-3011W",1014:"FD-3011W",1015:"FD-3011W",1016:"FD-3011W",1017:"FD-3011W"},r={1000:"FD-872",1001:"FD-692",1002:"FD-692",1003:"FD-692",1004:"FD-692",1006:"FD-872",1007:"FD-872",1008:"FD-872",1009:"FD-872",1010:"FD-872",1011:"FD-872",1012:"FD-872",1013:"FD-872",1014:"FD-872",1015:"FD-872",1016:"FD-872",1017:"FD-872",1018:"FD-872",1019:"FD-872",1022:"FD-872"},t={1001:"FD-163W",1003:"FD-163W",1004:"FD-139W",1007:"FD-163W",1008:"FD-139W",1012:"FD-163W",1015:"FD-163W",1043:"FD-163W",1065:"FD-163W",1066:"FD-163W"},b={1000:"FD-872W",1001:"FD-692W",1002:"FD-692W",1003:"FD-692W",1004:"FD-692W",1006:"FD-872W",1007:"FD-872W",1008:"FD-872W",1009:"FD-872W",1010:"FD-872W",1011:"FD-872W",1012:"FD-872W",1013:"FD-872W",1014:"FD-872W",1015:"FD-872W",1016:"FD-872W",1017:"FD-872W",1018:"FD-872W",1019:"FD-872W",1022:"FD-872W"},n={1000:"FD-500W",1001:"FD-500W",1002:"FD-500W",1003:"FD-500W",1004:"FD-500W",1005:"FD-500W",1006:"FD-500W",1007:"FD-500W",1008:"FD-500W",1009:"FD-500W",1010:"FD-500W",1011:"FD-500W",1012:"FD-500W",1013:"FD-500W",1014:"FD-500W",1015:"FD-500W",1016:"FD-500W",1017:"FD-500W",1018:"FD-500W",1019:"FD-500W",1020:"FD-500W",1021:"FD-500W",1022:"FD-500W",1023:"FD-500W",1024:"FD-500W",1025:"FD-500W",1026:"FD-500W",1027:"FD-500W",1052:"FD-500W",1053:"FD-500W",1054:"FD-500W",1055:"FD-500W",1057:"FD-500W",1058:"FD-500W",1059:"FD-500W",1060:"FD-500W",1061:"FD-500W",1062:"FD-500W",1062:"FD-500W",1063:"FD-500W",1064:"FD-500W",1065:"FD-500W",1066:"FD-500W",1067:"FD-500W"},k={1000:"FD-858",1001:"FD-858",1002:"FD-858",1003:"FD-858",1004:"FD-858",1005:"FD-3061",1006:"FD-3061",1007:"FD-3061",1008:"FD-3062",1009:"FD-3062",1010:"FD-3062",1011:"FD-3063",1012:"FD-3063",1013:"FD-3063",1014:"FD-3063",1015:"FD-3063",1016:"FD-3064",1017:"FD-3064",1018:"FD-3064",1019:"FD-3064",1020:"FD-3064"},i={1000:"FD-3037W",1001:"FD-3037W",1002:"FD-3037W",1003:"FD-3037W",1004:"FD-3048W",1005:"FD-3048W",1006:"FD-3048W",1007:"FD-3048W"};switch(D){case"FD-SLOW-SS":case"FD-SLOW-SS-DE":case"FD-SLOW-SS-MM":case"FD-BASE-SS":case"FD-SP-SS":case"FD-BASE-SS":W=S[F];break;case"FD-FAST":W=fdSlowwSS[F];break;case"FD-FAST-SS":W=e[F];break;case"FD-FAST-SL":W=n[F];break;case"FD-LAX-RSS":W=a[F];break;case"FD-LAX-SS":W=c[F];break;case"FD-LAXW-SS":W=s[F];break;case"FD-SP-HD":W=r[F];break;case"FD-SPW-SS":W=t[F];break;case"FD-SPW-HD":W=b[F];break;case"FD-SOC-SS":W=k[F];break;case"FD-SOCW-SS":W=i[F];break;default:W=void 0};return log.l("End of getSubStyle function returning "+W),W}