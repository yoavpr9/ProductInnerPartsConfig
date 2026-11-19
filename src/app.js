(function(){
'use strict';
var $=function(s){return document.querySelector(s);},PI=Math.PI;
function el(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
function uid(p){return (p||'x')+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function clone(o){return JSON.parse(JSON.stringify(o));}
function num(v,d){v=Number(v);return isFinite(v)?v:d;}
function fmt(n){var v=Math.round(n*10)/10;return Math.abs(v-Math.round(v))<0.05?String(Math.round(v)):v.toFixed(1);}
function kg(m){return m>=0.1?m.toFixed(2)+' kg':(m>0?fmt(m*1000)+' g':'0 g');}

/* ================= i18n ================= */
var L={
tagline:['סטודיו לקונפיגורציית רכיבים','Component layout studio'],project:['פרויקט','Project'],example:['נתוני דוגמה','Example data'],
projName:['שם הפרויקט','Project name'],newProj:['פרויקט חדש','New project'],exportProj:['שמור קובץ פרויקט','Save project file'],importProj:['פתח קובץ פרויקט','Open project file'],delProj:['מחק','Delete'],
refTitle:['נקודת ייחוס לאיזון','Balance reference point'],refLabel:['שם הנקודה (למשל: ציר גלגלים, מרכז רוטורים)','Name (e.g. wheel axle, rotor centre)'],refX:['X, מ"מ','X, mm'],refZ:['Z, מ"מ','Z, mm'],
tol:['סטייה מותרת של מרכז הכובד, מ"מ (החלטה שלך)','Allowed centre-of-gravity offset, mm (your call)'],
refNote:['אם רכיב מסומן בכלל "מגדיר נקודת ייחוס", הנקודה מחושבת מהמיקום שלו ולא מהמספרים כאן.','If a part carries the rule "defines the reference point", the point is taken from its position instead of these numbers.'],
files:['קבצי תלת-ממד','3D files'],dropTitle:['גרור לכאן קבצים, או לחץ לבחירה','Drop files here, or click to choose'],dropSub:['STL · OBJ · STEP, אפשר כמה קבצים יחד','STL · OBJ · STEP, several at once'],
shSettings:['הגדרות המעטפת הנבחרת','Selected shell settings'],name:['שם','Name'],units:['יחידות בקובץ','File units'],upAxis:['ציר עליון','Up axis'],turn:['סיבוב','Turn'],under:['גובה מעל הרצפה, מ"מ','Height above floor, mm'],
kind:['סוג המודל','Model type'],kindHollow:['חלול (דפנות עם עובי)','Hollow (walls with thickness)'],kindSolid:['מלא (נפח אטום)','Solid volume'],removeShell:['הסר מעטפת','Remove shell'],
parts:['רכיבים','Parts'],openTable:['טבלת רכיבים','Parts table'],ruleBank:['בנק כללים','Rule bank'],
vFront:['חזית','Front'],vSide:['צד','Side'],vTop:['מבט על','Top'],undo:['בטל','Undo'],redo:['בצע שוב','Redo'],auto:['סידור אוטומטי','Auto-arrange'],exportPng:['ייצוא PNG','Export PNG'],
shell:['מעטפת','Shell'],mGlass:['זכוכית','Glass'],mCut:['חתך','Cutaway'],mSolid:['אטום','Solid'],mOff:['כבוי','Off'],mDetail:['מודל','Model'],mBlock:['בלוקים','Blocks'],
labels:['תוויות','Labels'],grid:['הצמדה 5 מ"מ','Snap 5 mm'],magnet:['מגנט','Magnet'],
hint:['גרור רכיב כדי להזיז · Shift+גרירה למעלה/למטה · R סיבוב · Del חזרה לרשימה · גרירת רקע מסובבת את המבט','Drag a part to move · Shift-drag up/down · R rotate · Del back to list · drag empty space to orbit'],
cogTitle:['מרכז כובד מנקודת הייחוס','Centre of gravity from reference'],fill:['מסה משתנה','Variable mass'],full:['מלא','Full'],empty:['ריק','Empty'],
mass:['מסה שהונחה','Mass placed'],placed:['רכיבים שהונחו','Parts placed'],collisions:['התנגשויות','Collisions'],outside:['מחוץ למעטפת','Outside shell'],issues:['בדיקות','Checks'],
saved:['קונפיגורציות שמורות','Saved configurations'],save:['שמור','Save'],emptyLayout:['סידור ריק','Empty layout'],
tableTitle:['טבלת רכיבים','Parts table'],template:['הורד תבנית Excel','Download Excel template'],importTable:['ייבוא Excel / CSV','Import Excel / CSV'],paste:['הדבקה מגיליון','Paste from sheet'],addRow:['+ שורה','+ Row'],done:['סיום','Done'],
tableNote:['מידות במ"מ, מסה בק"ג. X = אורך, Y = גובה, Z = רוחב. בעמודת "מקור" כתוב מאיפה הנתון, כדי לדעת מה מדוד ומה הערכה.','Sizes in mm, mass in kg. X = length, Y = height, Z = width. Use "Source" to record where each number came from.'],
pasteGo:['הוסף שורות','Add rows'],replaceAll:['להחליף את הטבלה הקיימת','Replace the current table'],
fileTitle:['מה כל קובץ?','What is each file?'],fileNote:['לכל קובץ בחר אם הוא מעטפת חיצונית או מודל של רכיב מהטבלה. ההתאמה לרכיב נעשתה לפי שם הקובץ, בדוק אותה.','For each file choose whether it is an outer shell or the model of a part from the table. Matches were guessed from file names, check them.'],
cancel:['ביטול','Cancel'],addFiles:['הוסף','Add'],confirm:['אישור','Confirm'],close:['סגור','Close'],
imgNote:['אם ההורדה לא התחילה: לחיצה ימנית על התמונה ושמירה.','If the download did not start: right-click the image and save it.'],
newRule:['כלל חדש','New rule'],ruleName:['שם הכלל','Rule name'],ruleDesc:['הסבר','Explanation'],ruleBase:['איך לבדוק אותו','How to check it'],ruleDist:['מרחק ברירת מחדל, מ"מ','Default distance, mm'],addRule:['הוסף לבנק','Add to bank'],
fRole:['תפקיד','Role'],fShell:['מעטפת חיצונית','Outer shell'],fPart:['מודל לרכיב','Model for part'],fFile:['קובץ','File'],fStatus:['מצב','Status'],
cId:['מזהה','ID'],cName:['שם','Name'],cModel:['דגם','Model'],cCat:['קטגוריה','Category'],cQty:['כמות','Qty'],cX:['X אורך','X length'],cY:['Y גובה','Y height'],cZ:['Z רוחב','Z width'],cMass:['מסה ק"ג','Mass kg'],cMassE:['מסה ריק ק"ג','Empty mass kg'],cShape:['צורה','Shape'],cRules:['כללים','Rules'],cNotes:['הערות','Notes'],cSrc:['מקור הנתון','Source'],
shBox:['תיבה','Box'],shCylX:['גליל לאורך X','Cylinder along X'],shCylY:['גליל לאורך Y','Cylinder along Y'],shCylZ:['גליל לאורך Z','Cylinder along Z'],
selPart:['רכיב נבחר','Selected part'],selEmpty:['לחץ על רכיב בתצוגה או ברשימה כדי לראות מידות, מסה, כללים ולמה הוא יושב איפה שהוא יושב.','Click a part in the view or the list to see its size, mass, rules and why it sits where it does.'],
place:['הנח במודל','Place in model'],back:['חזרה לרשימה','Back to list'],lock:['נעל','Lock'],unlock:['שחרר','Unlock'],turnA:['סובב ','Turn '],skipShell:['לדלג על בדיקת המעטפת לרכיב הזה (רכיב חיצוני בכוונה)','Skip the shell check for this part (external on purpose)'],
size:['מידות','Size'],weight:['מסה','Mass'],group:['קטגוריה','Category'],logic:['היגיון המיקום','Placement logic'],manual:['לבדיקה ידנית','Check by hand'],editRules:['ערוך כללים','Edit rules'],
none:['אין','None'],noParts:['עוד אין רכיבים. פתח את טבלת הרכיבים כדי להוסיף.','No parts yet. Open the parts table to add some.'],noShell:['עוד אין מעטפת. אפשר לעבוד גם בלעדיה.','No shell yet. You can work without one.'],
noCog:['הנח רכיבים כדי לראות איפה יושב המשקל.','Place parts to see where the weight sits.'],
balOk:['מרכז הכובד בתוך הסטייה המותרת.','The centre of gravity is within the allowed offset.'],balOff:['מרכז הכובד חורג מהסטייה המותרת. הזז רכיבים כבדים לכיוון נקודת הייחוס.','The centre of gravity is outside the allowed offset. Move heavy parts toward the reference point.'],
height:['גובה','Height'],dirX:['בציר X','along X'],dirZ:['בציר Z','along Z'],
and:[' ו-',' and '],theShell:['המעטפת','the shell'],isOut:[' מחוץ למעטפת',' is outside the shell'],
locSaved:['נשמר בדפדפן הזה. כדי לעבור מחשב: "שמור קובץ פרויקט".','Saved in this browser. To move to another computer use "Save project file".'],
remSaved:['נשמר בחשבון שלך, כולל במחשבים אחרים.','Saved to your account, across your devices.'],
remPartial:['נשמר בחשבון שלך. קבצי תלת-ממד גדולים נשארים רק בדפדפן הזה.','Saved to your account. Large 3D files stay in this browser only.'],
tSaved:['נשמר','Saved'],tStep:['טוען את קורא ה-STEP, זה יכול לקחת חצי דקה…','Loading the STEP reader, this can take half a minute…'],tStepFail:['לא ניתן לקרוא STEP כאן. ייצא את הקובץ ל-STL מתוכנת ה-CAD.','STEP cannot be read here. Export the file to STL from your CAD program.'],
tBad:['קובץ לא נקרא: ','Could not read: '],tXt:['קובצי X_T לא נתמכים. ייצא ל-STEP או STL.','X_T files are not supported. Export to STEP or STL.'],tLocked:['הרכיב נעול. שחרר אותו בלוח מימין.','This part is locked. Unlock it in the right panel.'],
tAuto:['סודרו {a} רכיבים. {b} לא נמצא להם מקום.','{a} parts arranged. {b} could not be placed.'],tRows:['נוספו {a} שורות','{a} rows added'],tNoRows:['לא נמצאו שורות. ודא ששורת הכותרות תואמת לתבנית.','No rows found. Make sure the header row matches the template.'],
qDelProj:['למחוק את הפרויקט "{a}" וכל מה שבתוכו?','Delete project "{a}" and everything in it?'],qDelCfg:['למחוק את הקונפיגורציה "{a}"?','Delete configuration "{a}"?'],
load:['טען','Load'],del:['מחק','Delete'],cfg:['קונפיגורציה','Configuration'],exName:['פרויקט לדוגמה','Example project'],
whyDefault:['הוצב במקום הפנוי שמשאיר את מרכז הכובד הכי קרוב לנקודת הייחוס.','Placed in the free spot that keeps the centre of gravity closest to the reference point.'],
whyRules:['הוצב לפי הכללים: ','Placed by the rules: '],target:['ביחס ל','Relative to'],dist:['מ"מ','mm'],forPart:['כללים לרכיב: ','Rules for part: '],bankOnly:['כל הכללים הזמינים. כדי לשייך כלל לרכיב, פתח את הבנק מתוך טבלת הרכיבים או מהרכיב הנבחר.','All available rules. To assign a rule to a part, open the bank from the parts table or from the selected part.'],
custom:['כלל שלי','My rule'],links:['חיבורים','Connections'],k_mech:['מכני','mechanical'],mode:['אופן','How'],m_cable:['כבל או צינור גמיש','flexible cable or hose'],m_rigid:['צינור קשיח, קו ישר','rigid, straight'],m_via:['דרך נקודה','through a point'],m_beside:['לצד (נוגע בדופן)','beside (touches its side)'],m_axis:['על אותו ציר','on the same axis'],m_inside:['בתוך (בתוך הקופסה)','inside (in the box)'],w_sticksOut:['בולט מחוץ לרכיב המכיל','sticks out of the container'],shRole:['תפקיד המודל','Model role'],roleShell:['מעטפת חיצונית (הרכיבים בפנים)','Outer shell (parts inside)'],roleFrame:['שלד מרכזי (הרכיבים מולבשים עליו)','Central frame (parts mount on it)'],shMass:['משקל המודל (ק"ג)','Model mass (kg)'],shPart:['שורת השלד בטבלה','Frame row in the table'],noneOpt:['אף אחת','None'],frameModel:['מוצג כמודל השלד','shown as the frame model'],tFrameRow:['השורה הזאת היא השלד ומוצגת כמודל. לחיצה כפולה לעריכה.','This row is the frame and is shown as the model. Double-click to edit.'],massFromRow:['משקל מהשורה בטבלה: {a}','Mass from the table row: {a}'],dblEdit:['לחיצה כפולה: פרטי הרכיב והחיבורים','Double-click: part details and connections'],editPart:['פרטי הרכיב והחיבורים','Part details and connections'],pmLinks:['החיבורים של הרכיב','This part\'s connections'],pmNoLinks:['אין חיבורים לרכיב הזה.','No connections for this part.'],pmRulesHint:['כללים בקוד, מופרדים ב־; (למשל link:box_1554s:2:mech:inside). שינוי כאן מעדכן את הטבלה.','Rules as codes, separated by ; (e.g. link:box_1554s:2:mech:inside). Changes here update the table.'],tBadRules:['לא זוהו: {a}. הכללים לא נשמרו.','Not recognised: {a}. Rules not saved.'],snap:['הצמד חיבורים','Snap connections'],snapOne:['הצמד','Snap'],tSnap:['הוצמדו {a} חיבורים. עדיין חורגים: {b}.','Snapped {a} connections. Still failing: {b}.'],tSnapNone:['אין חיבור חורג להצמדה','No failing connection to snap'],behave:['התנהגות','Behaviour'],hideShow:['הצג / הסתר','Hide / show'],vPts:['נקודות על השלדה ושמותיהן','Points on the frame + names'],vLtags:['אורכי חיבורים','Connection lengths'],vMarks:['מרכז כובד ונקודת ייחוס','Centre of gravity + reference'],vFloor:['רצפה (רשת)','Floor grid'],hideAll:['הסתר את כל ההערות','Hide all annotations'],showAll:['הצג את כל ההערות','Show all annotations'],catAll:['פרוס / קפל הכל','Expand / collapse all'],rotT:['סיבוב (מעלות)','Rotation (degrees)'],rotStep:['צעד','Step'],ledNone:['אין מה לבדוק','Nothing to check'],ledOk:['הכל תקין','All good'],ledWarn:['יש דברים לשים לב אליהם','Things to look at'],ledBad:['יש בעיות','Problems'],whyMount:['יושב לפי החיבור המכני: ','Sits by its mechanical connection: '],tTryFrame:['המודל מוגדר כקופסה סגורה. אם זו שלדה, בחר "שלדה" בהגדרות המודל.','The model is set as a closed box. If it is a frame, choose "frame" in the model settings.'],m_at:['בדיוק על הנקודה','exactly on the point'],mWhere:['איפה הוא יושב','Where it sits'],mCableT:['סוג הכבל','Cable type'],limGap:['מרווח מותר (מ"מ)','Allowed gap (mm)'],limLen:['אורך מרבי (מ"מ)','Max length (mm)'],onlyLinked:['רק מחוברים','Connected only'],tOnlyOn:['מוצגים רק רכיבים שיש להם חיבור. רכיב שמחברים מופיע ונצמד לבד.','Only parts with a connection are shown. A part you connect appears and snaps by itself.'],tOnlyOff:['כל הרכיבים זמינים להצבה','All parts available to place'],tShown:['נוספו לתלת-ממד: {a}. הוסתרו: {b}.','Added to 3D: {a}. Hidden: {b}.'],pageGraph:['גרף חיבורים','Connection graph'],pageSketch:['סקיצה 2D','2D sketch'],skPull:['העתק מהתלת־ממד','Copy from 3D'],skSend:['העבר לתלת־ממד ←','Send to 3D →'],skLock:['נעל את המיקומים בתלת־ממד','Lock the positions in 3D'],skGhostB:['הצג מוסתרים במקווקו','Show hidden dashed'],skFitB:['התאם גודל','Fit'],skClearB:['נקה סקיצה','Clear sketch'],skQClear:['להוציא את כל הרכיבים מהסקיצה?','Take all parts out of the sketch?'],skBack:['החזר לבנק','Back to bank'],skAllIn:['כל הרכיבים בסקיצה','All parts are in the sketch'],skHint:['גרור רכיב מהבנק אל אחד ההיטלים. כל היטל מזיז רק את שני הצירים שהוא מראה, וכולם מתעדכנים יחד. גלגלת = זום, גרירת רקע = הזזת התצוגה.','Drag a part from the bank onto a view. Each view moves only the two axes it shows; all update together. Wheel = zoom, drag the background = pan.'],skScaled:['מוקטן כדי להיכנס לבנק','shrunk to fit the bank'],skBankT:['בנק רכיבים זמינים','Available parts bank'],skBankHint:['גרור אל אחד ההיטלים · גרור לכאן כדי להוציא','Drag onto a view · drag here to take out'],skZoomT:['זום','Zoom'],cfgIn:['ייבא קונפיגורציות מקובץ','Import configurations from a file'],cfgInHint:['כדי לשתף: "ייצא" בכרטיס הפרויקט יוצר קובץ. מי שמקבל אותו פותח אותו ב"ייבא" כפרויקט נפרד משלו, ומחזיר לך קובץ. כאן מוסיפים את הקונפיגורציות שלו לפרויקט שלך בלי לגעת בשלך.','To share: "Export" on the project card makes a file. The other person opens it with "Import" as their own separate project and sends you a file back. Here you add their configurations to your project without touching yours.'],tCfgIn:['נוספו {a} קונפיגורציות מ{b}','{a} configurations added from {b}'],tCfgMiss:['{a} רכיבים בקובץ לא קיימים בפרויקט הזה ודולגו','{a} parts in the file are not in this project and were skipped'],skModeB:['בלוקים','Blocks'],skModeD:['קבצי STEP','STEP models'],skColCat:['צבע לפי קטגוריה','Colour by category'],skColPart:['צבע לכל רכיב','Colour per part'],skLegendT:['מקרא','Legend'],skWhyT:['למה הקונפיגורציה הזו עדיפה','Why this configuration'],skTitleL:['כותרת הדף','Sheet title'],skNoteL:['הסבר: למה הקונפיגורציה הזו עדיפה','Explanation: why this configuration is better'],skA4B:['ייצא תמונה A4','Export A4 image'],skSheetT:['דף להדפסה','Print sheet'],skScaleT:['קנה מידה בהדפסה A4','Scale printed on A4'],skPulled:['הועתקו {a} רכיבים מהתלת־ממד','{a} parts copied from 3D'],skSent:['{a} רכיבים הועברו לתלת־ממד','{a} parts sent to 3D'],skEmpty:['אין רכיבים בסקיצה','No parts in the sketch'],whySketch:['מוקם בסקיצה 2D.','Placed in the 2D sketch.'],skIntro:['סקיצה חופשית בלי הלוגיקה: מה שתמקם כאן לא משנה את התלת־ממד עד שתלחץ "העבר לתלת־ממד".','Free sketch without the logic: nothing here changes the 3D until you press "Send to 3D".'],gIntro:['גרור מנקודה צבעונית בצד ימין של כרטיס (סוג החיבור) אל כרטיס אחר, אל נקודת חיבור שלו, או אל נקודה על השלד. לחיצה על חוט: עריכה ומחיקה. לחיצה כפולה על כרטיס: פרטי הרכיב. גלגלת: זום, גרירה ברקע: הזזה.','Drag from a coloured dot on the right of a card (the connection type) to another card, one of its ports, or a point on the frame. Click a wire to edit or delete it. Double-click a card for the part details. Wheel zooms, dragging the background pans.'],gLayoutBtn:['סדר את הגרף','Tidy the graph'],gFitBtn:['התאם למסך','Fit to screen'],gExpAllBtn:['פרוס / קבץ עותקים','Expand / group copies'],gWide:['הרחב / הצר','Widen / narrow'],gExpand:['פרוס לכרטיס לכל עותק','One card per copy'],gCollapse:['קבץ לכרטיס אחד','Group into one card'],gCentre:['מרכז השלד','Frame centre'],gAddPort:['+ נקודת חיבור','+ Port'],gAddPt:['+ נקודה על המודל','+ Point on the model'],gDragHint:['גרור לרכיב אחר כדי לחבר','Drag to another part to connect'],gNeedPt:['בלי שורת שלד בטבלה צריך לגרור אל נקודה מסוימת על המודל','Without a frame row, drop on a specific point of the model'],gUpdated:['החיבור הקיים עודכן','Existing connection updated'],gFromPort:['מנקודה','From point'],gToPort:['אל נקודה','To point'],units:['איזו יחידה לאיזו','Which unit to which'],unitAuto:['אוטומטי','Auto'],unitHint:['כשמספר העותקים שווה, עותק 1 מתחבר ליעד 1, עותק 2 ליעד 2 וכן הלאה. אחרת לקרוב ביותר. אפשר לשנות כאן לכל עותק.','When the counts match, copy 1 connects to target 1, copy 2 to target 2 and so on; otherwise to the nearest. You can change it here for each copy.'],nearest:['הקרוב ביותר','nearest'],pattern:['תבנית לעותקים','Pattern for the copies'],patCirc:['סביב ציר','Around an axis'],patLin:['בשורה','In a row'],patAround:['סביב','Around'],patRef:['נקודת הייחוס','Reference point'],patModel:['מרכז המודל','Model centre'],patAxis:['ציר','Axis'],patR:['רדיוס (מ"מ)','Radius (mm)'],patA0:['זווית התחלה (°)','Start angle (°)'],patStep:['מרווח (מ"מ)','Spacing (mm)'],patRot:['סובב כל עותק עם התבנית','Turn each copy with the pattern'],patGo:['סדר בתבנית','Arrange in pattern'],patHint:['הגובה לאורך הציר נלקח מעותק 1. רכיבים שמחוברים לעותקים (למשל מדחף צמוד למנוע) זזים איתם.','The position along the axis comes from copy 1. Parts fixed to the copies (e.g. a prop touching a motor) move with them.'],tPat:['{a} עותקים סודרו בתבנית','{a} copies arranged'],delPart:['מחק רכיב','Delete part'],qDelPart:['למחוק את "{a}" מהרשימה? החיבורים אליו יימחקו גם.','Delete "{a}" from the list? Connections to it are deleted too.'],w_blocked:['רכיב חוסם את הקו הישר','a part blocks the straight line'],w_notLevel:['לא באותו גובה','not at the same height'],w_noWay:['נקודת המעבר לא נמצאה','waypoint not found'],mapWay:['דרך נקודה','Through point'],tWay:['בחר נקודת מעבר','Pick a waypoint'],tHeld:['חיבור מגביל את התנועה. Alt בזמן גרירה עוקף, או כבה "אכוף חיבורים".','A connection limits this move. Hold Alt while dragging to override, or turn off "Enforce connections".'],enforce:['אכוף חיבורים','Enforce connections'],tEnfOn:['גרירה מוגבלת לפי החיבורים','Dragging is limited by connections'],tEnfOff:['גרירה חופשית','Free dragging'],m_touch:['צמוד','touching'],m_above:['מעל (יושב עליו)','on top (sits on it)'],m_below:['מתחת (תלוי מתחתיו)','below (hangs under it)'],w_wrongSide:['בצד הלא נכון','on the wrong side'],w_noOverlap:['לא אחד מעל השני','not over each other'],port:['נקודת חיבור','Port'],centre:['מרכז הרכיב','Part centre'],mapPort:['נקודה','Point'],mapPickBtn:['סמן בתלת-ממד','Mark in 3D'],tPort:['נקודת חיבור נוספה ל: {a}','Port added to: {a}'],tPortPick:['לחץ על הרכיב במקום שבו נמצא המחבר','Click the part where the connector is'],tPortPart:['צריך ללחוץ על רכיב, לא על המעטפת','Click on a part, not the shell'],mapMaxHint:['מגבלה (מ"מ): אורך לכבל, מרווח לצמוד / מעל / מתחת','Limit (mm): length for a cable, gap for touching / above / below'],page3d:['תלת-ממד','3D'],pageMap:['מפת חיבורים','Connection map'],mapAll:['הכול','All'],mapBad:['חורגים','failing'],mapLinks:['חיבורים','links'],mapRoot:['מתחיל מ','Start from'],mapLone:['רכיבים בלי חיבור','Parts with no connection'],mapAlso:['מחובר גם ל','Also connected to '],mapDel:['מחק את החיבור','Delete this connection'],mapAdd:['הוסף חיבור','Add connection'],mapFrom:['מ','From'],mapTo:['אל','To'],mapMax:['מגבלה (מ"מ)','Limit (mm)'],mapPick:['בחר שני רכיבים שונים','Pick two different parts'],mapAdded:['החיבור נוסף','Connection added'],mapIntro:['כל מערכת מוצגת כעץ נפרד: מתחילים מהרכיב המרכזי ויורדים לפי סדר החיבור. ליד כל רכיב: האורך בפועל מול המותר. ירוק בתוך המותר, אדום חורג, אפור כשהרכיבים עוד לא הוצבו. ↺ = חיבור שסוגר מעגל.','Each system is its own tree, from the central part down in connection order. Beside each part: actual length vs. allowed. Green within the limit, red over it, grey when the parts are not placed yet. ↺ = a link that closes a loop.'],linksTog:['חיבורים','Connections'],linkNone:['אין חיבורים. תן לרכיב את הכלל "מחובר ל", או הוסף חיבור בעמוד מפת החיבורים.','No connections. Give a part the rule "Connected to", or add one on the connection map page.'],notPlaced:['היעד לא הוצב','target not placed'],linkMissing:[' · היעד לא הוצב או לא נמצא',' · target not placed or not found'],kind:['סוג','Type'],k_data:['נתונים','data'],k_power:['חשמל','power'],k_water:['מים','water'],k_other:['אחר','other'],helpTitle:['איך משתמשים','How to use'],openExample:['פרויקט לדוגמה','Example project'],feedback:['מצאת תקלה או שיש לך הצעה?','Found a problem or have a suggestion?'],feedbackLink:['כתוב ב-GitHub','Write on GitHub'],version:['גרסה','Version'],updated:['עודכן','updated'],points:['נקודות על המודל','Points on the model'],addPoint:['+ סמן נקודה','+ Mark a point'],pointsNote:['לחץ על "סמן נקודה" ואז על המקום במודל. אחר כך אפשר לכוון אליה כללים כמו "קרוב ל" ו"רחוק מ".','Press "Mark a point", then click the spot on the model. Rules such as "close to" and "away from" can then target it.'],point:['נקודה','Point'],tPick:['לחץ על המקום במודל. Esc לביטול.','Click the spot on the model. Esc cancels.'],optParts:['רכיבים','Parts'],optPoints:['נקודות','Points'],optCats:['קטגוריות','Categories'],cogLine:['X: {a} מ"מ, Z: {b} מ"מ.','X: {a} mm, Z: {b} mm.'],cogH:['גובה: {a} מ"מ.','Height: {a} mm.'],fillLine:['מלא {a}, ריק {b}.','Full {a}, empty {b}.'],fillShift:['בין מלא לריק מרכז הכובד זז {a} מ"מ אופקית ו-{b} מ"מ בגובה.','Between full and empty the centre of gravity moves {a} mm sideways and {b} mm in height.'],sheetCog:['מרכז כובד','Centre of gravity'],sheetChecks:['בדיקות','Checks'],date:['תאריך','Date']
};
var lang='he',VERSION='1.20',UPDATED='2026-11-17';
function t(k,a,b){var s=(L[k]||[k,k])[lang==='he'?0:1];if(a!==undefined)s=s.replace('{a}',a);if(b!==undefined)s=s.replace('{b}',b);return s;}
function applyLang(){
  document.documentElement.lang=lang;document.documentElement.dir=lang==='he'?'rtl':'ltr';
  document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=t(e.dataset.t);});
  setSeg('segLang',lang);
  $('#verTxt').textContent=t('version')+' '+VERSION+' · '+t('updated')+' '+UPDATED;$('#verBrand').textContent='v'+VERSION;
}

/* ================= rule bank ================= */
/* base behaviours: how a rule is checked and how auto-arrange scores it */
var BASES={link:1,low:1,high:1,near:1,far:1,center:1,wall:1,clear:1,top:1,sym:1,trim:1,ref:1,manual:1};
var BANK=[
 {id:'link',base:'link',tg:1,ds:300,n:['מחובר ל','Connected to'],d:['חיבור בין שני רכיבים, למשל מחשב ל-GPS. סוג: data, power, water, mech. אופן: כבל או צינור (נבדק אורך הקו הישר), צמוד (נבדק המרווח), מעל או מתחת (נבדק שהרכיב יושב על השני). אפשר למדוד מנקודות חיבור שסימנת על הרכיבים.','A connection between two parts, e.g. computer to GPS. Type: data, power, water, mech. How: cable or hose (straight-line length is checked), touching (gap is checked), above or below (one part sits on the other). Can be measured from ports marked on the parts.']},
 {id:'low',base:'low',n:['נמוך ככל האפשר','As low as possible'],d:['לרכיבים כבדים: מוריד את מרכז הכובד. נבדק: מרכז הרכיב בשליש התחתון של הגובה.','For heavy parts: lowers the centre of gravity. Checked: part centre in the lower third of the height.']},
 {id:'high',base:'high',n:['גבוה ככל האפשר','As high as possible'],d:['לאנטנות, GPS ומצלמות שצריכות שדה ראייה. נבדק: מרכז הרכיב בשליש העליון.','For antennas, GPS and cameras that need a clear view. Checked: part centre in the upper third.']},
 {id:'near',base:'near',tg:1,ds:50,n:['קרוב לרכיב אחר','Close to another part'],d:['לקיצור חיווט או צנרת, למשל בקר ליד המנוע שלו. נבדק: המרווח קטן מהמרחק שהוגדר.','Keeps wiring or piping short, e.g. a controller beside its motor. Checked: gap below the set distance.']},
 {id:'far',base:'far',tg:1,ds:30,n:['רחוק מרכיב אחר','Away from another part'],d:['מפני חום, רעש חשמלי או רטיבות, למשל סוללה מול לוח בקרה. נבדק: המרווח גדול מהמרחק שהוגדר.','Against heat, electrical noise or moisture, e.g. battery vs. control board. Checked: gap above the set distance.']},
 {id:'center',base:'center',ds:20,n:['מעל נקודת הייחוס','Over the reference point'],d:['לרכיב כבד או רכיב שהמסה שלו משתנה (מיכל), כדי שהאיזון לא ישתנה. נבדק: מרחק אופקי מנקודת הייחוס.','For a heavy part or one whose mass changes (a tank), so balance stays put. Checked: horizontal distance from the reference.']},
 {id:'wall',base:'wall',ds:10,n:['צמוד לדופן חיצונית','Against an outer wall'],d:['לחיישנים, מצלמות, מחברי טעינה ופתחי אוורור. נבדק: מרחק מגבול המעטפת.','For sensors, cameras, charge connectors and vents. Checked: distance from the shell boundary.']},
 {id:'clear',base:'clear',ds:15,n:['מרווח אוורור סביב','Clearance around'],d:['לרכיבים שמתחממים: בקרי מנוע, מעבדים, ממירים. נבדק: אין רכיב אחר בתוך המרווח.','For parts that heat up: motor controllers, processors, converters. Checked: no other part inside the gap.']},
 {id:'top',base:'top',n:['נגיש מלמעלה','Reachable from above'],d:['לרכיבים שמחליפים או ממלאים: סוללה, מיכל. נבדק: אין רכיב אחר מעליו.','For parts that get swapped or refilled: battery, tank. Checked: nothing sits above it.']},
 {id:'sym',base:'sym',n:['סימטרי סביב נקודת הייחוס','Symmetric about the reference'],d:['לרכיבים שמופיעים בזוגות או יותר: מנועים, גלגלים. נבדק: סכום ההיסטים של כל היחידות מתאפס.','For parts that come in pairs or more: motors, wheels. Checked: the offsets of all units cancel out.']},
 {id:'trim',base:'trim',n:['משקל איזון','Trim weight'],d:['רכיב שאין לו דרישת מיקום ולכן מוזז לאן שמאזן את מרכז הכובד. מוצב אחרון בסידור האוטומטי.','A part with no position demand, moved wherever it balances the centre of gravity. Placed last by auto-arrange.']},
 {id:'ref',base:'ref',n:['מגדיר נקודת ייחוס','Defines the reference point'],d:['נקודת האיזון של הפרויקט נלקחת מהמיקום של הרכיב הזה (ממוצע אם יש כמה יחידות). הסידור האוטומטי לא מזיז אותו.','The project balance point is taken from this part (the average if there are several units). Auto-arrange does not move it.']},
 {id:'dry',base:'far',tg:1,ds:40,n:['רחוק ממים','Away from water'],d:['לאלקטרוניקה במוצר שיש בו מיכל, משאבה או צנרת. בחר את רכיב המים כיעד.','For electronics in a product with a tank, pump or piping. Pick the water part as the target.']},
 {id:'emi',base:'far',tg:1,ds:50,n:['רחוק מרעש חשמלי','Away from electrical noise'],d:['למצפן, GPS ומקלטים, שמושפעים ממנועים, בקרים וכבלי הספק. בחר את מקור הרעש כיעד.','For compass, GPS and receivers, which are disturbed by motors, controllers and power leads. Pick the noise source as the target.']},
 {id:'los',base:'manual',n:['שדה ראייה פנוי','Clear field of view'],d:['למצלמות, לידאר ורדאר: שום דבר לא חוסם את כיוון המבט. לא נבדק אוטומטית.','For cameras, lidar and radar: nothing blocks the viewing direction. Not checked automatically.']},
 {id:'svc',base:'manual',n:['גישה לתחזוקה','Service access'],d:['אפשר להגיע לרכיב ולהחליף אותו בלי לפרק רכיבים אחרים. לא נבדק אוטומטית.','The part can be reached and replaced without removing others. Not checked automatically.']},
 {id:'vib',base:'manual',n:['בידוד מרעידות','Vibration isolation'],d:['לחיישני תנועה ומצלמות: לא מחוברים ישירות למקור רעידות. לא נבדק אוטומטית.','For motion sensors and cameras: not mounted straight onto a vibration source. Not checked automatically.']}
];
function bank(){return BANK.concat((P&&P.customRules)||[]);}
function ruleDef(id){return bank().filter(function(r){return r.id===id;})[0];}
function ruleName(r){var d=ruleDef(r.r);if(!d)return r.r;var s=d.n[lang==='he'?0:1]||d.n[0];if(d.tg&&r.t){var pq=P&&(P.points||[]).filter(function(q){return q.id===r.t;})[0];s+=' · '+(pq?pq.name:r.t);}if(d.ds!==undefined&&d.base!=='manual')s+=' · '+(d.base==='link'?'≤ '+linkMax(r):num(r.d,d.ds))+' '+t('dist');if(r.m&&r.m!=='cable')s+=' · '+t('m_'+r.m);if(r.k)s+=' · '+t('k_'+r.k);return s;}
function parseRules(txt){var out=[];String(txt||'').split(/[;\n]/).forEach(function(s){s=s.trim();if(!s)return;var a=s.split(':').map(function(x){return x.trim();}),d=ruleDef(a[0]);if(!d)return;
  var r={r:d.id};if(d.tg){r.t=a[1]||'';if(a[2]!==undefined&&a[2]!=='')r.d=num(a[2],d.ds);if(d.base==='link'){if(a[3])r.k=LKIND(a[3]);if(a[4])r.m=LMODE(a[4]);if(a[5])r.pa=a[5];if(a[6])r.pb=a[6];if(a[7])r.w=a[7];if(a[8]){var um=a[8].replace(/^u\s*=\s*/i,'').split(',').map(function(x){return Math.max(0,Math.round(num(x,0)));});if(um.some(function(x){return x>0;}))r.u=um;}}}else if(a[1]!==undefined&&d.ds!==undefined)r.d=num(a[1],d.ds);out.push(r);});return out;}
function rulesText(rs){return (rs||[]).map(function(r){var d=ruleDef(r.r),s=r.r;if(d&&d.base==='link'){var f=[r.t||'',r.d!==undefined?r.d:'',r.k||'',r.m&&r.m!=='cable'?r.m:'',r.pa?portName(r.pa):'',r.pb?portName(r.pb):'',r.w?portName(r.w):'',r.u&&r.u.some(function(x){return x>0;})?'u='+r.u.join(','):''];while(f.length>1&&f[f.length-1]==='')f.pop();return s+':'+f.join(':');}if(d&&d.tg)s+=':'+(r.t||'')+(r.d!==undefined||r.k?':'+(r.d!==undefined?r.d:d.ds):'')+(r.k?':'+r.k:'');else if(r.d!==undefined)s+=':'+r.d;return s;}).join('; ');}

var KINDS=['data','power','water','mech','other'],KCOL={data:'#2f6fd0',power:'#d08a12',water:'#1a9aa8',mech:'#6b6f66',other:'#7a5d74'};
var MODES=['cable','rigid','via','at','above','below','beside','inside','touch','axis'],FOLLOW={touch:1,above:1,below:1,axis:1,inside:1,at:1,beside:1};
/* two kinds of connection: mechanical = where the part sits (it jumps there and stays), everything else = a cable (only drawn and length-checked) */
var MOUNTS=['at','above','below','beside','inside'],MOUNT={at:1,above:1,below:1,beside:1,inside:1,touch:1,axis:1},CABLES=['cable','rigid','via'];
function modeOpts(kind,cur){var L=kind==='mech'?MOUNTS.slice():CABLES.slice();if(cur&&L.indexOf(cur)<0)L.push(cur);return L;}
function ptTarget(rl){if(!P)return false;var k=nk(rl.t),fp=framePart();if(fp&&(k===nk(fp.id)||k===nk(fp.name)))return true;return activePoints().some(function(q){return nk(q.id)===k||nk(q.name)===k;});}
function normLink(rl){var m=rl.m||'cable';
  if(MOUNT[m]){rl.k='mech';if(m==='touch'||m==='axis')rl.m=(rl.pb||rl.pa||ptTarget(rl))?'at':'beside';}
  else if((rl.k||'data')==='mech'){rl.m=(rl.pb||ptTarget(rl))?'at':'above';delete rl.d;delete rl.w;}
  return rl;}
function setKind(rl,v){var was=rl.k||'data';rl.k=v;if(v==='mech'&&was!=='mech'){rl.m=(rl.pb||ptTarget(rl))?'at':'above';delete rl.d;delete rl.w;}else if(v!=='mech'&&MOUNT[rl.m||'cable']){delete rl.m;delete rl.d;}}
function normAll(){var sh={};(P.shells||[]).forEach(function(S){sh[S.id]=1;});autoFrameRole();
  P.parts.forEach(function(p){p.rules=(p.rules||[]).filter(function(rl){var d=ruleDef(rl.r);if(!d||d.base!=='link')return true;var q=(P.points||[]).filter(function(x){return x.id===rl.t;})[0];return !(q&&q.shellId&&!sh[q.shellId]);});
    p.rules.forEach(function(rl){var d=ruleDef(rl.r);if(!d||d.base!=='link')return;normLink(rl);if(rl.u&&rl.u.every(function(v){return v<=1;})){var k=nk(rl.pb||rl.t),one=activePoints().filter(function(q){return nk(q.id)===k||nk(q.name)===k;});if(one.length===1&&ptFamily(one,rl).length>1)delete rl.u;}});});}
/* a model that was never given a role, with a "frame" row in the table, is a frame (an open structure), not a closed box */
function autoFrameRole(){var S=(P.shells||[]).filter(function(s){return s.id===P.work.shellId;})[0];if(!S||S.role)return;var g=guessFramePart();if(g){S.role='frame';S.part=g;if(shell.n){rebuildInst();buildRuntime();rebuildShell();syncAll();}}}
function LMODE(x){x=String(x||'').toLowerCase().trim();var al={inside:'inside',in:'inside',within:'inside','בתוך':'inside',cable:'cable',flex:'cable',hose:'cable','כבל':'cable','גמיש':'cable',rigid:'rigid','קשיח':'rigid',via:'via',through:'via','דרך':'via',beside:'beside',side:'beside','לצד':'beside',axis:'axis',coaxial:'axis','ציר':'axis',touch:'touch',contact:'touch',flush:'touch','צמוד':'touch',above:'above',on:'above','מעל':'above',below:'below',under:'below','מתחת':'below'};return al[x]||'cable';}
/* default limit per mode: cable = length, touch = allowed gap, above/below = allowed vertical gap */
function linkMax(rl){if(rl.d!==undefined&&rl.d!==''&&rl.d!==null)return num(rl.d,300);var m=rl.m||'cable';if(m==='inside')return 0;if(m==='at')return 1;return m==='cable'||m==='rigid'?300:m==='via'?400:m==='touch'||m==='axis'?2:5;}
/* ports: points marked on a part; stored in the part's own frame so they move and turn with it */
function portsOf(pid){return (P.points||[]).filter(function(q){return q.part===pid;});}
function portByKey(key,pid){var k=nk(key);if(!k)return null;return (P.points||[]).filter(function(q){return q.part&&(!pid||q.part===pid)&&(nk(q.id)===k||nk(q.name)===k);})[0]||null;}
function portName(key){var q=(P.points||[]).filter(function(x){return x.id===key;})[0];return q?q.name:key;}
function portWorld(q,iid){var it=P.work.items[iid];_v.set(q.lp[0],q.lp[1],q.lp[2]).applyQuaternion(_q.set(it.q[0],it.q[1],it.q[2],it.q[3]));return [it.p[0]+_v.x,it.p[1]+_v.y,it.p[2]+_v.z];}
function LKIND(x){x=String(x||'').toLowerCase().trim();var al={mech:'mech',mount:'mech','מכני':'mech',signal:'data',data:'data','נתונים':'data','תקשורת':'data',power:'power','חשמל':'power','מתח':'power',water:'water','מים':'water',hose:'water',fluid:'water'};return al[x]||(KINDS.indexOf(x)>=0?x:'other');}
/* ================= project model ================= */
var CAT_COL=['#3d4a63','#8a6f4d','#5d7a66','#9a9f93','#7a5d74','#b08a3c','#4f7f8a','#2b2c29'];
var projects=[],P=null,geo={};   /* geo[id]=Float32Array of triangle positions (raw file units) */
function freshProject(name){return {id:uid('p'),name:name||t('project'),example:false,updatedAt:Date.now(),ref:{label:'',x:0,z:0},tol:10,parts:[],shells:[],customRules:[],points:[],configs:[],
  work:{name:t('cfg')+' 1',shellId:null,items:{}}};}
function exampleProject(){
  var p=freshProject(t('exName'));p.example=true;p.ref.label=lang==='he'?'מרכז הבסיס':'Base centre';
  var src=lang==='he'?'דוגמה, לא נתון אמיתי':'example, not real data';
  p.parts=[
   {id:'base',name:lang==='he'?'יחידת הנעה':'Drive unit',model:'',cat:lang==='he'?'הנעה':'Drive',qty:2,size:[120,120,40],mass:1.5,shape:'cylz',rules:[{r:'ref'},{r:'sym'}],notes:'',src:src},
   {id:'battery',name:lang==='he'?'סוללה':'Battery',model:'',cat:lang==='he'?'חשמל':'Power',qty:1,size:[200,50,120],mass:2,shape:'box',rules:[{r:'low'},{r:'top'}],notes:'',src:src},
   {id:'tank',name:lang==='he'?'מיכל':'Tank',model:'',cat:lang==='he'?'נוזלים':'Fluid',qty:1,size:[160,200,160],mass:4.5,massE:0.5,shape:'cyly',rules:[{r:'center',d:20}],notes:'',src:src},
   {id:'ctrl',name:lang==='he'?'לוח בקרה':'Control board',model:'',cat:lang==='he'?'בקרה':'Control',qty:1,size:[100,25,80],mass:0.2,shape:'box',rules:[{r:'dry',t:'tank',d:40},{r:'clear',d:15},{r:'link',t:'cam',d:400,k:'data'},{r:'link',t:'aux',d:250,k:'power'}],notes:'',src:src},
   {id:'cam',name:lang==='he'?'מצלמה':'Camera',model:'',cat:lang==='he'?'חישה':'Sensing',qty:1,size:[60,40,30],mass:0.1,shape:'box',rules:[{r:'high'},{r:'wall',d:10},{r:'los'}],notes:'',src:src},
   {id:'aux',name:lang==='he'?'ממיר מתח':'Converter',model:'',cat:lang==='he'?'חשמל':'Power',qty:1,size:[80,30,60],mass:0.4,shape:'box',rules:[{r:'trim'},{r:'link',t:'battery',d:250,k:'power'}],notes:'',src:src}
  ];
  var sid='exshell';geo[sid]=boxShellGeo(420,520,260,6);
  p.shells=[{id:sid,name:lang==='he'?'מעטפת לדוגמה':'Example shell',unit:'1',up:'y',turn:'0',under:0,kind:'hollow',gen:[420,520,260,6]}];
  p.work.shellId=sid;
  p.work.items={'base#1':{on:true,p:[0,70,90],q:[0,0,0,1],lock:true,ext:false,why:null},'base#2':{on:true,p:[0,70,-90],q:[0,0,0,1],lock:true,ext:false,why:null}};
  return p;
}
/* hollow open-top box, wall thickness w: outer + inner surfaces as triangles */
function boxShellGeo(X,Y,Z,w){
  var a=[];
  function quad(p,q,r,s){a.push(p[0],p[1],p[2],q[0],q[1],q[2],r[0],r[1],r[2],p[0],p[1],p[2],r[0],r[1],r[2],s[0],s[1],s[2]);}
  function shellBox(x,y0,y1,z,bottom){var x0=-x/2,x1=x/2,z0=-z/2,z1=z/2;
    quad([x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0]);quad([x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]);
    quad([x0,y0,z0],[x0,y0,z1],[x0,y1,z1],[x0,y1,z0]);quad([x1,y0,z0],[x1,y0,z1],[x1,y1,z1],[x1,y1,z0]);
    if(bottom)quad([x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1]);}
  shellBox(X,0,Y,Z,true);shellBox(X-2*w,w,Y,Z-2*w,true);
  /* rim */
  var xo=X/2,zo=Z/2,xi=xo-w,zi=zo-w;
  quad([-xo,Y,-zo],[xo,Y,-zo],[xi,Y,-zi],[-xi,Y,-zi]);quad([-xo,Y,zo],[xo,Y,zo],[xi,Y,zi],[-xi,Y,zi]);
  quad([-xo,Y,-zo],[-xo,Y,zo],[-xi,Y,zi],[-xi,Y,-zi]);quad([xo,Y,-zo],[xo,Y,zo],[xi,Y,zi],[xi,Y,-zi]);
  return new Float32Array(a);
}
var INST=[],INST_BY={};
function framePartId(){var S=P&&(P.shells||[]).filter(function(s){return s.id===P.work.shellId;})[0];return S&&S.role==='frame'&&S.part&&P.parts.some(function(p){return p.id===S.part;})?S.part:null;}
function framePart(){var id=framePartId();return id?P.parts.filter(function(p){return p.id===id;})[0]:null;}
function guessFramePart(){var c=P.parts.filter(function(p){return /frame|chassis|שלד/i.test(p.id+' '+p.name);});return c.length===1?c[0].id:'';}
function rebuildInst(){
  INST=[];INST_BY={};var fid=framePartId();
  P.parts.forEach(function(p,ci){if(p.id===fid)return;var n=Math.max(1,Math.round(num(p.qty,1)));
    for(var i=1;i<=n;i++){var iid=n>1?p.id+'#'+i:p.id;var o={iid:iid,part:p,label:n>1?p.name+' '+i:p.name};INST.push(o);INST_BY[iid]=o;}});
  var it=P.work.items,keep={};
  INST.forEach(function(i){keep[i.iid]=it[i.iid]&&Array.isArray(it[i.iid].p)?it[i.iid]:{on:false,p:[0,0,0],q:[0,0,0,1],lock:false,ext:false,why:null};});
  P.work.items=keep;
}
function cats(){var c=[];P.parts.forEach(function(p){var k=p.cat||'—';if(c.indexOf(k)<0)c.push(k);});return c;}
function catColor(c){var i=cats().indexOf(c||'—');return CAT_COL[(i<0?0:i)%CAT_COL.length];}
function psize(p){return [Math.max(0.5,num(p.size[0],10)),Math.max(0.5,num(p.size[1],10)),Math.max(0.5,num(p.size[2],10))];}
function cylAxis(p){return p.shape==='cylx'?0:p.shape==='cyly'?1:p.shape==='cylz'?2:-1;}
function pmass(p){return fill==='empty'&&p.massE!==undefined&&p.massE!==''&&p.massE!==null?num(p.massE,0):num(p.mass,0);}
var fill='full';

/* ================= three.js scene ================= */
var vp=$('#viewport'),canvas=$('#gl');
var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,preserveDrawingBuffer:true});
renderer.localClippingEnabled=true;renderer.outputEncoding=THREE.sRGBEncoding;
var scene=new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xffffff,0x8e98a3,0.9));
var sun=new THREE.DirectionalLight(0xffffff,0.75);sun.position.set(400,1800,700);scene.add(sun);
var persp=new THREE.PerspectiveCamera(30,1,10,40000),ortho=new THREE.OrthographicCamera(-600,600,600,-600,1,40000),camera=persp;
var controls=new THREE.OrbitControls(persp,canvas);controls.enableDamping=false;controls.addEventListener('change',requestRender);
var theme={viewport:'#e9ece4',grid:'#b7bcb1',ink:'#1b1c1a',accent:'#1c3f8f',warn:'#a86a05',crit:'#c5432c'},gridH=null;
function readTheme(){
  var cs=getComputedStyle(document.documentElement);
  Object.keys(theme).forEach(function(k){var v=cs.getPropertyValue('--'+k).trim();if(v)theme[k]=v;});
  renderer.setClearColor(new THREE.Color(theme.viewport),1);
  if(gridH)scene.remove(gridH);
  gridH=new THREE.GridHelper(3000,30,new THREE.Color(theme.grid),new THREE.Color(theme.grid));gridH.material.transparent=true;gridH.material.opacity=0.5;gridH.position.y=0.3;gridH.visible=ui.floor;scene.add(gridH);
  edgeMat.color.set(theme.ink);requestRender();
}
var shellGroup=new THREE.Group();scene.add(shellGroup);
var cutPlane=new THREE.Plane(new THREE.Vector3(0,0,-1),0);
var shellMat=new THREE.MeshStandardMaterial({color:'#c9cdc4',roughness:0.6,metalness:0.02,side:THREE.DoubleSide});
var edgeMat=new THREE.LineBasicMaterial({color:0x1b1c1a});
var ui={view:'iso',shell:'glass',mode:'detail',labels:false,grid:true,magnet:true,links:true,enforce:true,onlyLinked:true,pts:true,ltags:true,marks:true,floor:true,rotStep:90};
/* per-viewer view preferences (fold state, hidden items) */
var PREF=(function(){try{return JSON.parse(localStorage.getItem('cs.pref')||'{}')||{};}catch(e){return {};}})();function savePref(){try{localStorage.setItem('cs.pref',JSON.stringify(PREF));}catch(e){}}
['pts','ltags','marks','floor','labels','links'].forEach(function(k){if(typeof PREF[k]==='boolean')ui[k]=PREF[k];});
var shell={n:0,T:null,box:new THREE.Box3(),idx:null,kind:'hollow',ver:0};
var partsGroup=new THREE.Group();scene.add(partsGroup);
var RT={},selected=null,pointsGroup=new THREE.Group(),pickMode=false;scene.add(pointsGroup);
function renderPoints(){
  while(pointsGroup.children.length)pointsGroup.remove(pointsGroup.children[0]);document.querySelectorAll('.ptag').forEach(function(e){e.remove();});
  var ul=$('#points');ul.textContent='';if(!P.points)P.points=[];
  activePoints().forEach(function(q){var m=new THREE.Mesh(new THREE.SphereGeometry(7,16,12),new THREE.MeshBasicMaterial({color:theme.accent,depthTest:false}));m.position.set(q.p[0],q.p[1],q.p[2]);m.renderOrder=45;pointsGroup.add(m);
    var tg=el('div','ptag',q.name);tg.dataset.pid=q.id;$('#tags').appendChild(tg);
    var li=el('li','row');li.style.flexWrap='nowrap';var inp=el('input');inp.type='text';inp.id='pt_'+q.id;inp.maxLength=30;inp.value=q.name;inp.onchange=function(){var old=q.name,nv=inp.value.trim()||old;q.name=nv;
      P.parts.forEach(function(p){(p.rules||[]).forEach(function(r){if(r.t===old)r.t=q.id;});});renderPoints();runChecks();refreshUI();touch();};li.appendChild(inp);
    li.appendChild(el('span','mono',q.p.map(function(n){return Math.round(n);}).join(', ')));
    li.appendChild(btn('small danger','✕',function(){P.points=P.points.filter(function(x){return x!==q;});renderPoints();runChecks();refreshUI();touch();}));ul.appendChild(li);});
  (P.points||[]).filter(function(q){return q.part;}).forEach(function(q){var pp=P.parts.filter(function(x){return x.id===q.part;})[0];if(!pp)return;
    var li=el('li','row');li.style.flexWrap='nowrap';var inp=el('input');inp.type='text';inp.id='pt_'+q.id;inp.maxLength=30;inp.value=q.name;inp.onchange=function(){q.name=inp.value.trim()||q.name;renderPoints();runChecks();refreshUI();touch();};li.appendChild(inp);
    li.appendChild(el('span','mono',pp.name.slice(0,18)));
    li.appendChild(btn('small danger','✕',function(){P.points=P.points.filter(function(x){return x!==q;});P.parts.forEach(function(p){(p.rules||[]).forEach(function(r){if(r.pa===q.id)delete r.pa;if(r.pb===q.id)delete r.pb;});});renderPoints();runChecks();refreshUI();touch();}));ul.appendChild(li);});
  requestRender();
}
function applyVis(){if(gridH)gridH.visible=ui.floor;pointsGroup.visible=ui.pts;refGroup.visible=ui.marks;if(!ui.marks)cogGroup.visible=false;else if(checks&&checks.cog)cogGroup.visible=true;
  var ann=ui.pts||ui.labels||ui.links||ui.ltags||ui.marks||ui.floor;$('#viewport').classList.toggle('noann',!ann);var b=$('#btnHideAll');if(b)b.textContent=ann?t('hideAll'):t('showAll');
  ['pts','labels','links','ltags','marks','floor'].forEach(function(k){PREF[k]=ui[k];});savePref();requestRender();}
function setPick(on){pickMode=on;vp.classList.toggle('picking',on);$('#btnPoint').setAttribute('aria-pressed',String(on));if(on)toast(t('tPick'));}
function pickPoint(e){setRay(e);var objs=[];shellGroup.children.forEach(function(c){if(c.isMesh)objs.push(c);});INST.forEach(function(i){if(P.work.items[i.iid].on){var r=RT[i.iid];objs.push(r.detail.visible?r.detail:r.block);}});
  var hits=ray.intersectObjects(objs,true).filter(function(x){return x.object.isMesh;}),pt=hits.length?hits[0].point:ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),new THREE.Vector3());
  if(!pt)return;var n=1;
  var hp=hits.length?(function(){var o=hits[0].object;while(o&&o.parent!==partsGroup)o=o.parent;for(var id in RT)if(o&&RT[id].root===o)return id;return null;})():null;
  if(hp){var inst=INST_BY[hp],it=P.work.items[hp];_v.set(pt.x-it.p[0],pt.y-it.p[1],pt.z-it.p[2]).applyQuaternion(_q.set(it.q[0],it.q[1],it.q[2],it.q[3]).invert());
    while(P.points.some(function(q){return q.part===inst.part.id&&q.name===t('port')+' '+n;}))n++;
    var np={id:uid('pt'),name:t('port')+' '+n,part:inst.part.id,lp:[Math.round(_v.x*10)/10,Math.round(_v.y*10)/10,Math.round(_v.z*10)/10]};P.points.push(np);setPick(false);renderPoints();runChecks();refreshUI();touch();toast(t('tPort',inst.part.name));
    if(gPickFor){gPickFor=null;showPage('graph');return;}
    if(mapPickFor){var side=mapPickFor;mapPickFor=null;showPage('map');$(side==='a'?'#mfFrom':'#mfTo').value=inst.part.id;renderMapForm();$(side==='a'?'#mfPa':'#mfPb').value=np.id;}return;}
  if(mapPickFor){mapPickFor=null;toast(t('tPortPart'));return;}
  while(P.points.some(function(q){return q.name===t('point')+' '+n;}))n++;
  P.points.push({id:uid('pt'),name:t('point')+' '+n,p:[Math.round(pt.x*10)/10,Math.round(pt.y*10)/10,Math.round(pt.z*10)/10],shellId:shell.n?P.work.shellId:null});setPick(false);renderPoints();touch();if(gPickFor){gPickFor=null;showPage('graph');}}
var cogGroup=new THREE.Group(),refGroup=new THREE.Group();
(function(){
  var c=document.createElement('canvas');c.width=128;c.height=64;var x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,128,64);x.fillStyle='#111';x.fillRect(0,0,32,32);x.fillRect(64,0,32,32);x.fillRect(32,32,32,32);x.fillRect(96,32,32,32);
  var s=new THREE.Mesh(new THREE.SphereGeometry(11,24,16),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));s.renderOrder=40;cogGroup.add(s);
  var line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(0,-1,0)]),new THREE.LineDashedMaterial({color:0x1b1c1a,dashSize:14,gapSize:8,depthTest:false,transparent:true}));line.name='drop';line.renderOrder=39;cogGroup.add(line);
  var ring=new THREE.Mesh(new THREE.RingGeometry(14,18,32),new THREE.MeshBasicMaterial({color:0x1b1c1a,depthTest:false,side:THREE.DoubleSide}));ring.rotation.x=-PI/2;ring.name='ring';ring.renderOrder=39;cogGroup.add(ring);
  cogGroup.visible=false;scene.add(cogGroup);
  /* reference marker: cross on the floor + vertical line */
  var m=new THREE.LineBasicMaterial({color:0x1c3f8f,depthTest:false,transparent:true});
  var g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-40,0,0),new THREE.Vector3(40,0,0),new THREE.Vector3(0,0,-40),new THREE.Vector3(0,0,40),new THREE.Vector3(0,0,0),new THREE.Vector3(0,1,0)]);
  var ls=new THREE.LineSegments(g,m);ls.renderOrder=38;ls.name='cross';refGroup.add(ls);scene.add(refGroup);
})();

function transformGeo(raw,S,center3){
  var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(raw),3));
  var k=Number(S.unit)||1;g.scale(k,k,k);if(S.up==='z')g.rotateX(-PI/2);var tn=Number(S.turn)||0;if(tn)g.rotateY(tn*PI/2);
  g.computeBoundingBox();var b=g.boundingBox;
  if(center3)g.translate(-(b.min.x+b.max.x)/2,-(b.min.y+b.max.y)/2,-(b.min.z+b.max.z)/2);
  else g.translate(-(b.min.x+b.max.x)/2,-b.min.y+num(S.under,0),-(b.min.z+b.max.z)/2);
  g.computeVertexNormals();g.computeBoundingBox();return g;
}
function curShell(){return P.shells.filter(function(s){return s.id===P.work.shellId&&geo[s.id];})[0]||null;}
function rebuildShell(){
  while(shellGroup.children.length){var c=shellGroup.children.pop();if(c.geometry)c.geometry.dispose();}
  var S=curShell();shell.ver++;
  if(!S){shell.n=0;shell.T=null;shell.idx=null;shell.box.makeEmpty();shell.role='shell';shell.mass=0;return;}
  var g=transformGeo(geo[S.id],S,false),Pp=g.attributes.position.array,n=Pp.length/9;
  shell.T=Pp;shell.n=n;shell.box.copy(g.boundingBox);shell.kind=S.kind||'hollow';shell.role=S.role||'shell';shell.mass=Math.max(0,num(S.mass,0));var fp=framePart();if(!shell.mass&&fp)shell.mass=pmass(fp)*Math.max(1,Math.round(num(fp.qty,1)));
  /* centre of the model's surface (area weighted): where the frame/shell mass is taken to sit */
  var ca=0,cc=[0,0,0];for(var ti=0;ti<n;ti++){var to=ti*9,ux=Pp[to+3]-Pp[to],uy=Pp[to+4]-Pp[to+1],uz=Pp[to+5]-Pp[to+2],vx=Pp[to+6]-Pp[to],vy=Pp[to+7]-Pp[to+1],vz=Pp[to+8]-Pp[to+2],ar=Math.hypot(uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx)/2;ca+=ar;for(var k3=0;k3<3;k3++)cc[k3]+=ar*(Pp[to+k3]+Pp[to+3+k3]+Pp[to+6+k3])/3;}
  shell.cen=ca>0?[cc[0]/ca,cc[1]/ca,cc[2]/ca]:[0,0,0];
  /* spatial index: for each axis a 2D bucket grid of triangle ids on the plane perpendicular to it */
  var bb=shell.box,sz=bb.getSize(new THREE.Vector3()),cell=Math.max(8,Math.max(sz.x,sz.y,sz.z)/60);
  shell.cell=cell;shell.idx=[{},{},{}];
  var mn=[bb.min.x,bb.min.y,bb.min.z];shell.mn=mn;
  for(var i=0;i<n;i++){var o=i*9;
    for(var ax=0;ax<3;ax++){var u=(ax+1)%3,v=(ax+2)%3;
      var u0=Math.min(Pp[o+u],Pp[o+3+u],Pp[o+6+u]),u1=Math.max(Pp[o+u],Pp[o+3+u],Pp[o+6+u]),v0=Math.min(Pp[o+v],Pp[o+3+v],Pp[o+6+v]),v1=Math.max(Pp[o+v],Pp[o+3+v],Pp[o+6+v]);
      var a0=Math.floor((u0-mn[u])/cell),a1=Math.floor((u1-mn[u])/cell),b0=Math.floor((v0-mn[v])/cell),b1=Math.floor((v1-mn[v])/cell);
      if((a1-a0+1)*(b1-b0+1)>4000)continue; /* huge flat triangle guard handled below */
      for(var a=a0;a<=a1;a++)for(var b=b0;b<=b1;b++){var key=a+','+b,m=shell.idx[ax];(m[key]||(m[key]=[])).push(i);}
    }}
  var mesh=new THREE.Mesh(g,shellMat);mesh.renderOrder=10;shellGroup.add(mesh);
  if(n<200000)shellGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(g,30),edgeMat));
  applyShellMode();
}
function applyShellMode(){
  var m=ui.shell;shellGroup.visible=m!=='off';
  shellMat.transparent=m==='glass';shellMat.opacity=m==='glass'?0.22:1;shellMat.depthWrite=m!=='glass';
  var clip=m==='cut'?[cutPlane]:[];shellMat.clippingPlanes=clip;edgeMat.clippingPlanes=clip;
  if(shell.n)cutPlane.constant=(shell.box.min.z+shell.box.max.z)/2;
  shellMat.needsUpdate=true;edgeMat.needsUpdate=true;requestRender();
}
/* crossings of the axis-parallel line through point p with the shell; returns coordinates along `ax` */
function crossings(p,ax){
  if(!shell.n)return [];
  var u=(ax+1)%3,v=(ax+2)%3,pu=p[u]+0.0113,pv=p[v]+0.0071,key=Math.floor((pu-shell.mn[u])/shell.cell)+','+Math.floor((pv-shell.mn[v])/shell.cell);
  var list=shell.idx[ax][key],out=[],T=shell.T;if(!list)return out;
  for(var k=0;k<list.length;k++){var o=list[k]*9,au=T[o+u],av=T[o+v],bu=T[o+3+u],bv=T[o+3+v],cu=T[o+6+u],cv=T[o+6+v];
    var d=(bv-cv)*(au-cu)+(cu-bu)*(av-cv);if(Math.abs(d)<1e-9)continue;
    var w0=((bv-cv)*(pu-cu)+(cu-bu)*(pv-cv))/d,w1=((cv-av)*(pu-cu)+(au-cu)*(pv-cv))/d,w2=1-w0-w1;
    if(w0<0||w1<0||w2<0)continue;out.push(w0*T[o+ax]+w1*T[o+3+ax]+w2*T[o+6+ax]);}
  return out;
}
/* is a point in the usable space? solid model: inside the volume. hollow model: surrounded by walls and not inside wall material */
function pointState(p){
  var dirs=0,odd=false;
  for(var ax=0;ax<3;ax++){var c=crossings(p,ax),pos=0,neg=0;for(var i=0;i<c.length;i++){if(c[i]>p[ax])pos++;else neg++;}
    if(pos)dirs++;if(neg)dirs++;if(ax===1)odd=(pos&1)===1;}
  if(shell.kind==='solid')return odd?'in':'out';
  if(odd)return 'wall';
  return dirs>=4?'in':'out';
}
/* frame mode: the model is a central structure that parts mount on. Only parts that cut into its material collide; nothing is "outside". */
function frameTest(r){var n=[0,1,2].map(function(a){return Math.max(2,Math.min(5,Math.ceil((r.max[a]-r.min[a])/40)+1));}),e=0.6;
  for(var i=0;i<n[0];i++)for(var j=0;j<n[1];j++)for(var k=0;k<n[2];k++){var p=[r.min[0]+e+(r.max[0]-r.min[0]-2*e)*i/(n[0]-1),r.min[1]+e+(r.max[1]-r.min[1]-2*e)*j/(n[1]-1),r.min[2]+e+(r.max[2]-r.min[2]-2*e)*k/(n[2]-1)];
    var c=crossings(p,1),pos=0;for(var q=0;q<c.length;q++)if(c[q]>p[1])pos++;if(pos&1){r.sHit=true;return;}}}
function shellTest(r){
  r.sHit=false;r.sOut=false;if(!shell.n)return;if(shell.role==='frame'){frameTest(r);return;}
  var mn=r.min,mx=r.max,e=0.6,pts=[[(mn[0]+mx[0])/2,(mn[1]+mx[1])/2,(mn[2]+mx[2])/2]];
  for(var i=0;i<8;i++)pts.push([i&1?mx[0]-e:mn[0]+e,i&2?mx[1]-e:mn[1]+e,i&4?mx[2]-e:mn[2]+e]);
  var nOut=0,nWall=0;pts.forEach(function(p){var s=pointState(p);if(s==='out')nOut++;else if(s==='wall')nWall++;});
  if(nWall||(nOut&&nOut<pts.length))r.sHit=true;else if(nOut)r.sOut=true;
}

/* ---------- parts ---------- */
var unitEdges=new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1));
var _m4=new THREE.Matrix4(),_q=new THREE.Quaternion(),_v=new THREE.Vector3();
function halfExtents(size,q){_q.set(q[0],q[1],q[2],q[3]);var e=_m4.makeRotationFromQuaternion(_q).elements,a=size[0]/2,b=size[1]/2,c=size[2]/2;
  return [Math.abs(e[0])*a+Math.abs(e[4])*b+Math.abs(e[8])*c,Math.abs(e[1])*a+Math.abs(e[5])*b+Math.abs(e[9])*c,Math.abs(e[2])*a+Math.abs(e[6])*b+Math.abs(e[10])*c];}
function buildRuntime(){
  Object.keys(RT).forEach(function(k){var r=RT[k];partsGroup.remove(r.root);scene.remove(r.outline);r.tag.remove();r.root.traverse(function(o){if(o.geometry&&o.geometry!==unitEdges)o.geometry.dispose();});});
  RT={};
  INST.forEach(function(inst){
    var p=inst.part,s=psize(p),ca=cylAxis(p),root=new THREE.Group(),block=new THREE.Group(),detail=new THREE.Group();
    var bm=new THREE.MeshStandardMaterial({color:catColor(p.cat),roughness:0.7}),bg;
    if(ca>=0){var rad=s[(ca+1)%3]/2;bg=new THREE.CylinderGeometry(rad,rad,s[ca],40);if(ca===0)bg.rotateZ(PI/2);else if(ca===2)bg.rotateX(PI/2);}
    else bg=new THREE.BoxGeometry(s[0],s[1],s[2]);
    block.add(new THREE.Mesh(bg,bm));block.add(new THREE.LineSegments(new THREE.EdgesGeometry(bg,30),new THREE.LineBasicMaterial({color:0x10151c,transparent:true,opacity:0.7})));
    var hasMesh=p.mesh&&geo[p.mesh.id];
    if(hasMesh){var mg=transformGeo(geo[p.mesh.id],p.mesh,true);detail.add(new THREE.Mesh(mg,new THREE.MeshStandardMaterial({color:catColor(p.cat),roughness:0.55,metalness:0.1,side:THREE.DoubleSide})));
      if(mg.attributes.position.count<300000)detail.add(new THREE.LineSegments(new THREE.EdgesGeometry(mg,35),new THREE.LineBasicMaterial({color:0x10151c,transparent:true,opacity:0.5})));}
    root.add(block);root.add(detail);partsGroup.add(root);
    var outline=new THREE.LineSegments(unitEdges,new THREE.LineBasicMaterial({color:0x1c3f8f,depthTest:false,transparent:true}));outline.renderOrder=30;outline.visible=false;scene.add(outline);
    var tag=el('div','tag',inst.label);tag.hidden=true;$('#tags').appendChild(tag);
    RT[inst.iid]={inst:inst,root:root,block:block,detail:detail,hasMesh:!!hasMesh,outline:outline,tag:tag,min:[0,0,0],max:[0,0,0],cyl:-1,hit:false,out:false};
  });
}
function syncItem(iid){
  var r=RT[iid],it=P.work.items[iid],p=r.inst.part;
  r.root.visible=it.on;r.root.position.set(it.p[0],it.p[1],it.p[2]);r.root.quaternion.set(it.q[0],it.q[1],it.q[2],it.q[3]);
  var det=ui.mode==='detail'&&r.hasMesh;r.detail.visible=det;r.block.visible=!det;
  var h=halfExtents(psize(p),it.q);for(var i=0;i<3;i++){r.min[i]=it.p[i]-h[i];r.max[i]=it.p[i]+h[i];}
  r.cyl=-1;var ca=cylAxis(p);
  if(ca>=0){_v.set(ca===0?1:0,ca===1?1:0,ca===2?1:0).applyQuaternion(_q.set(it.q[0],it.q[1],it.q[2],it.q[3]));var a=[Math.abs(_v.x),Math.abs(_v.y),Math.abs(_v.z)];r.cyl=a.indexOf(Math.max.apply(null,a));}
}
/* a part that collides or sits outside glows red / orange instead of getting a box; the box is only for the selected part */
function tintPart(r){var c=r.hit?theme.crit:r.out?theme.warn:null;r.root.traverse(function(o){if(o.isMesh&&o.material&&o.material.emissive){if(c){o.material.emissive.set(c);o.material.emissiveIntensity=0.55;}else o.material.emissive.setRGB(0,0,0);}});}
function syncAll(){INST.forEach(function(i){syncItem(i.iid);});runChecks();requestRender();}

/* ================= checks ================= */
var checks={placed:0,mass:0,cog:null,ref:[0,0],pairs:[],outs:[],rules:[],links:[]};
var linkGroup=new THREE.Group();scene.add(linkGroup);linkGroup.renderOrder=25;
function drawLinks(){
  while(linkGroup.children.length){var c=linkGroup.children.pop();c.geometry.dispose();c.material.dispose();}
  document.querySelectorAll('.ltag').forEach(function(e){e.remove();});
  linkGroup.visible=ui.links;if(!ui.links)return;var sb=sceneBounds(),LSPAN=sb.isEmpty()?500:sb.getSize(new THREE.Vector3()).length();
  onList().forEach(function(i){portsOf(i.part.id).forEach(function(q){var w=portWorld(q,i.iid),pm=new THREE.Mesh(new THREE.SphereGeometry(Math.max(2.5,LSPAN*0.004),12,8),new THREE.MeshBasicMaterial({color:theme.accent,depthTest:false}));pm.position.set(w[0],w[1],w[2]);pm.renderOrder=27;linkGroup.add(pm);});});
  checks.links.forEach(function(l,n){if(l.missing)return;var a=l.a,b=l.pt,hot=selected&&(l.from===selected||l.to===selected);
    /* a thin tube sized to the scene, so connections stay visible at any zoom; drawn over the parts */
    var rad=Math.max(1.2,LSPAN*0.0025)*(hot?1.6:1),m=new THREE.MeshBasicMaterial({color:l.ok?(KCOL[l.kind]||KCOL.other):theme.crit,depthTest:false,transparent:true,opacity:selected&&!hot?0.3:0.95});
    var pts=(l.path||[a,b]).map(function(x){return new THREE.Vector3(x[0],x[1],x[2]);}),A=pts[0],B=pts[pts.length-1];
    for(var si=0;si<pts.length-1;si++){var S0=pts[si],S1=pts[si+1],sl=S0.distanceTo(S1);if(sl<0.5)continue;var ln=new THREE.Mesh(new THREE.CylinderGeometry(rad,rad,sl,8,1,false),m);ln.position.copy(S0).add(S1).multiplyScalar(0.5);ln.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),S1.clone().sub(S0).normalize());ln.renderOrder=25;linkGroup.add(ln);}
    if(pts.length>2){var wm=new THREE.Mesh(new THREE.BoxGeometry(rad*5,rad*5,rad*5),m.clone());wm.position.copy(pts[1]);wm.renderOrder=26;linkGroup.add(wm);}
    [A,B].forEach(function(P0){var e=new THREE.Mesh(new THREE.SphereGeometry(rad*2,10,8),m.clone());e.position.copy(P0);e.renderOrder=26;linkGroup.add(e);});
    if(hot||!l.ok){var tg=el('div','ltag'+(l.ok?'':' bad'));if(l.mode!=='cable')tg.appendChild(el('span','',t('m_'+l.mode)+' '));var tn=el('span','',fmt(l.len)+' / '+fmt(l.max));tn.dir='ltr';tg.appendChild(tn);tg.dataset.n=n;$('#tags').appendChild(tg);}});
}
function updateLtags(){var w=vp.clientWidth,h=vp.clientHeight;document.querySelectorAll('.ltag').forEach(function(e){var l=checks.links[+e.dataset.n];if(!ui.ltags||!ui.links||!l||l.missing||!P.work.items[l.from]){e.hidden=true;return;}e.hidden=false;var a=l.a,b=l.pt;_v.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2).project(camera);e.style.left=((_v.x+1)/2*w)+'px';e.style.top=((1-_v.y)/2*h)+'px';});}
function cylBox(c,b){var ax=c.cyl,u=(ax+1)%3,v=(ax+2)%3,cu=(c.min[u]+c.max[u])/2,cv=(c.min[v]+c.max[v])/2,r=(c.max[u]-c.min[u])/2-0.3;
  var du=Math.max(b.min[u]-cu,0,cu-b.max[u]),dv=Math.max(b.min[v]-cv,0,cv-b.max[v]);return du*du+dv*dv<r*r;}
function collide(a,b){var e=0.3;for(var i=0;i<3;i++)if(a.max[i]-e<=b.min[i]||b.max[i]-e<=a.min[i])return false;
  if(a.cyl>=0&&b.cyl<0)return cylBox(a,b);if(b.cyl>=0&&a.cyl<0)return cylBox(b,a);return true;}
function gap(a,b){var s=0;for(var i=0;i<3;i++){var d=Math.max(a.min[i]-b.max[i],b.min[i]-a.max[i],0);s+=d*d;}return Math.sqrt(s);}
function onList(){return INST.filter(function(i){return P.work.items[i.iid].on;});}
function activePoints(){return (P.points||[]).filter(function(q){return !q.part&&(!q.shellId||q.shellId===P.work.shellId);});}
/* ids typed in a sheet may use _ where the site stored - (or the reverse); compare loosely */
function nk(x){return String(x||'').toLowerCase().trim().replace(/[\s_\-]+/g,'-');}
function targets(tg,self){var k=nk(tg);if(!k)return [];
  var pts=activePoints().filter(function(q){return nk(q.id)===k||nk(q.name)===k;}).map(function(q){return {min:q.p,max:q.p,cyl:-1};});if(pts.length)return pts;
  return onList().filter(function(i){return i.iid!==self&&(nk(i.part.id)===k||nk(i.part.name)===k||nk(i.part.cat)===k);}).map(function(i){return RT[i.iid];});}
/* connections: each link rule joins a part to its nearest placed target (part, category or marked point) */
function linkOf(inst,rl){var D=linkMax(rl),m=rl.m||'cable',k=nk(rl.t),o={rl:rl,from:inst.iid,to:null,pt:null,a:null,name:rl.t||'—',max:D,kind:rl.k||'data',mode:m,len:0,ok:false,missing:true,why:''};
  var pa=rl.pa?portByKey(rl.pa,inst.part.id):null,A=pa?portWorld(pa,inst.iid):P.work.items[inst.iid].p;o.a=A;
  if(!k)return o;var C=linkCands(rl),tpb=null,ch=pairPick(rl,inst,C);
  function where(c){if(c.inst){if(c.inst.iid===inst.iid||!P.work.items[c.inst.iid].on)return null;var pb=rl.pb?portByKey(rl.pb,c.inst.part.id):null;return {p:pb?portWorld(pb,c.inst.iid):P.work.items[c.inst.iid].p,pb:pb};}if(c.pt)return {p:c.pt.p,pb:c.frame?c.pt:null};return shell.n?{p:shell.cen,pb:null}:null;}
  if(ch<0){var best=Infinity;C.forEach(function(c,ix){var w=where(c);if(!w)return;var L=dist3(A,w.p);if(L<best){best=L;ch=ix;}});}
  var cw=ch>=0?where(C[ch]):null;if(cw){var cc=C[ch];o.pt=cw.p;tpb=cw.pb;o.to=cc.inst?cc.inst.iid:null;o.name=cc.label+(cc.inst&&cw.pb?' · '+cw.pb.name:'');}
  if(!o.pt)return o;o.missing=false;
  var ra=RT[inst.iid],rb=o.to?RT[o.to]:{min:o.pt,max:o.pt,cyl:-1},W=m==='via'?wayPoint(rl.w,A,o.pt):null;if(m==='via'&&!W){o.missing=true;o.why='noWay';o.path=[A,o.pt];return o;}
  /* without a port, a connection starts and ends on the surface of the parts' boxes, not at their centres */
  var SA=pa?A:clampBox(ra,W||(o.to&&!tpb?boxCen(rb):o.pt)),SB=tpb||!o.to?o.pt:clampBox(rb,W||SA);
  var flex=m==='cable'||m==='rigid'||m==='via',EA=flex?SA:A,EB=flex?SB:o.pt,B00=o.pt;
  if(m==='at'){EA=pa?A:[(ra.min[0]+ra.max[0])/2,ra.min[1],(ra.min[2]+ra.max[2])/2];EB=tpb||!o.to?B00:[(rb.min[0]+rb.max[0])/2,rb.max[1],(rb.min[2]+rb.max[2])/2];SA=EA;SB=EB;B00=EB;}
  o.a=SA;o.pt=SB;o.path=W?[SA,W,SB]:[SA,SB];
  var ev=relEval(ra,rb,m,D,EA,EB,!!(pa||tpb),W,[inst.iid,o.to]);o.len=ev.len;o.ok=ev.ok;o.why=ev.why;o.exc=ev.ok?0:ev.exc;o.ports=!!(pa||tpb);o.A0=EA;o.B0=flex?EB:B00;return o;}
/* everything a link rule can land on, in a stable order: marked points, units of parts, or the frame model (its points, else its centre) */
/* "arm 2" on a part with 6 copies = the whole family arm 1..arm 6, in number order */
function ptFamily(pts,rl){if(pts.length!==1)return pts;var own=P.parts.filter(function(p){return (p.rules||[]).indexOf(rl)>=0;})[0];if(!own||unitCount(own)<2)return pts;
  var m=String(pts[0].name).trim().match(/^(.*?)[\s_-]*(\d+)$/);if(!m||!m[1])return pts;var base=nk(m[1]);
  var fam=activePoints().filter(function(q){var mm=String(q.name).trim().match(/^(.*?)[\s_-]*(\d+)$/);return mm&&nk(mm[1])===base;});
  if(fam.length<2)return pts;return fam.sort(function(a,b){return +a.name.match(/(\d+)\s*$/)[1]-(+b.name.match(/(\d+)\s*$/)[1]);});}
function linkCands(rl){var k=nk(rl.t);if(!k)return [];
  var pts=ptFamily(activePoints().filter(function(q){return nk(q.id)===k||nk(q.name)===k;}),rl);if(pts.length)return pts.map(function(q,i){return {pt:q,label:'◎ '+q.name+(pts.length>1?' '+(i+1):'')};});
  var ins=INST.filter(function(i){return nk(i.part.id)===k||nk(i.part.name)===k||nk(i.part.cat)===k;});if(ins.length)return ins.map(function(i){return {inst:i,label:i.label};});
  var fp=framePart();if(fp&&(k===nk(fp.id)||k===nk(fp.name))){var fq=rl.pb?ptFamily(activePoints().filter(function(q){return nk(q.id)===nk(rl.pb)||nk(q.name)===nk(rl.pb);}),rl):[];
    return fq.length?fq.map(function(q,i){return {pt:q,frame:fp,label:'◎ '+q.name+(fq.length>1?' '+(i+1):'')};}):[{frame:fp,label:fp.name}];}
  return [];}
function unitIx(iid){var x=String(iid).split('#')[1];return x?+x:1;}
function unitCount(p){return Math.max(1,Math.round(num(p.qty,1)));}
/* a part with several copies: copy i goes to target i when the counts match, or where the unit map says; -1 = nearest */
function pairPick(rl,inst,C){var n=unitCount(inst.part),ux=unitIx(inst.iid);if(n<2||C.length<2)return -1;var mp=rl.u&&rl.u[ux-1];if(mp)return mp<=C.length?mp-1:-1;return C.length===n?ux-1:-1;}
function boxCen(r){return [(r.min[0]+r.max[0])/2,(r.min[1]+r.max[1])/2,(r.min[2]+r.max[2])/2];}
function clampBox(r,p){return [0,1,2].map(function(a){return Math.max(r.min[a],Math.min(r.max[a],p[a]));});}
/* a waypoint is a marked point, or a port on whichever unit of its part is closest to the route */
function wayPoint(key,A,B){if(!key)return null;var k=nk(key),q=(P.points||[]).filter(function(x){return nk(x.id)===k||nk(x.name)===k;})[0];if(!q)return null;if(!q.part)return q.p;
  var best=null,bd=Infinity;onList().forEach(function(i){if(i.part.id!==q.part)return;var w=portWorld(q,i.iid),d=Math.hypot(w[0]-A[0],w[1]-A[1],w[2]-A[2])+Math.hypot(w[0]-B[0],w[1]-B[1],w[2]-B[2]);if(d<bd){bd=d;best=w;}});return best;}
/* does the straight segment A-B pass through a placed part other than the two it joins */
function segBlocked(A,B,skip){return onList().some(function(i){if(skip.indexOf(i.iid)>=0)return false;var r=RT[i.iid],t0=0,t1=1;
  for(var a=0;a<3;a++){var d=B[a]-A[a],lo=r.min[a]+0.5,hi=r.max[a]-0.5;if(lo>hi)return false;if(Math.abs(d)<1e-9){if(A[a]<lo||A[a]>hi)return false;}else{var u=(lo-A[a])/d,v=(hi-A[a])/d;if(u>v){var tt=u;u=v;v=tt;}t0=Math.max(t0,u);t1=Math.min(t1,v);if(t0>t1)return false;}}return true;});}
/* how well two parts meet a connection mode; ra = the part that owns the rule */
function dist3(A,B){return Math.hypot(B[0]-A[0],B[1]-A[1],B[2]-A[2]);}
function relEval(ra,rb,m,D,A,B,usePorts,W,skip){
  if(m==='cable'){var L=dist3(A,B);return {len:L,ok:L<=D+0.5,why:'',exc:Math.max(0,L-D)};}
  if(m==='via'){var Lv=dist3(A,W)+dist3(W,B);return {len:Lv,ok:Lv<=D+0.5,why:'',exc:Math.max(0,Lv-D)};}
  if(m==='rigid'){var Lr=dist3(A,B),bl=segBlocked(A,B,skip||[]);return {len:Lr,ok:Lr<=D+0.5&&!bl,why:bl?'blocked':'',exc:Math.max(0,Lr-D)+(bl?40:0)};}
  if(m==='at'){var La=dist3(A,B);return {len:La,ok:La<=D+0.5,why:'',exc:Math.max(0,La-D)};}
  if(m==='touch'){var g=usePorts?dist3(A,B):gap(ra,rb);return {len:g,ok:g<=D+0.5,why:'',exc:Math.max(0,g-D)};}
  if(m==='inside'){var cl=Infinity;for(var ax=0;ax<3;ax++)cl=Math.min(cl,ra.min[ax]-rb.min[ax],rb.max[ax]-ra.max[ax]);return {len:cl,ok:cl>=D-0.5,why:cl<D-0.5?'sticksOut':'',exc:Math.max(0,D-cl)};}
  if(m==='axis'){var df=[Math.abs(B[0]-A[0]),Math.abs(B[1]-A[1]),Math.abs(B[2]-A[2])].sort(function(x,y){return x-y;}),off=Math.hypot(df[0],df[1]);return {len:off,ok:off<=D+0.5,why:'',exc:Math.max(0,off-D)};}
  if(m==='beside'){var gb=gap(ra,rb),vo=Math.min(ra.max[1],rb.max[1])-Math.max(ra.min[1],rb.min[1]);return {len:gb,ok:gb<=D+0.5&&vo>0.5,why:vo>0.5?'':'notLevel',exc:Math.max(0,gb-D)+(vo>0.5?0:20-vo)};}
  var up=m==='above'?ra:rb,dn=m==='above'?rb:ra,dy=up.min[1]-dn.max[1],ov=up.min[0]<dn.max[0]-0.5&&up.max[0]>dn.min[0]+0.5&&up.min[2]<dn.max[2]-0.5&&up.max[2]>dn.min[2]+0.5;
  var why=dy<-0.5?'wrongSide':!ov?'noOverlap':'',hx=Math.hypot((up.min[0]+up.max[0])/2-(dn.min[0]+dn.max[0])/2,(up.min[2]+up.max[2])/2-(dn.min[2]+dn.max[2])/2);
  return {len:Math.max(dy,0),ok:dy>=-0.5&&dy<=D+0.5&&ov,why:why,dy:dy,ov:ov,exc:(dy<-0.5?20-dy:Math.max(0,dy-D))+(ov?0:20+hx*0.5)};}
function relScore(ra,rb,m,D,A,B,W,skip){var ev=relEval(ra,rb,m,D,A,B,false,W,skip);
  if(m==='cable'||m==='via'||m==='rigid')return ev.exc*3+ev.len*0.2;if(m==='touch'||m==='axis'||m==='beside')return ev.exc*3+ev.len*0.5;if(m==='inside')return ev.exc*6+Math.hypot((ra.min[0]+ra.max[0]-rb.min[0]-rb.max[0])/2,(ra.min[2]+ra.max[2]-rb.min[2]-rb.max[2])/2)*0.05;
  var h=Math.hypot((ra.min[0]+ra.max[0])/2-(rb.min[0]+rb.max[0])/2,(ra.min[2]+ra.max[2])/2-(rb.min[2]+rb.max[2])/2);
  return (ev.dy<-0.5?300-ev.dy*3:Math.max(0,ev.dy-D)*3)+(ev.ov?0:200)+h*0.3;}
function insideRule(a,b){return (a.rules||[]).some(function(rl){var d=ruleDef(rl.r),k=nk(rl.t);return d&&d.base==='link'&&rl.m==='inside'&&k&&(k===nk(b.id)||k===nk(b.name)||k===nk(b.cat));});}
function nested(a,b){return insideRule(a,b)||insideRule(b,a);}
function allLinks(){var out=[];onList().forEach(function(i){(i.part.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(d&&d.base==='link')out.push(linkOf(i,rl));});});return out;}
function refPoint(){
  var xs=[],zs=[];onList().forEach(function(i){if((i.part.rules||[]).some(function(r){var d=ruleDef(r.r);return d&&d.base==='ref';})){var it=P.work.items[i.iid];xs.push(it.p[0]);zs.push(it.p[2]);}});
  if(xs.length)return [xs.reduce(function(a,b){return a+b;},0)/xs.length,zs.reduce(function(a,b){return a+b;},0)/zs.length,true];
  return [num(P.ref.x,0),num(P.ref.z,0),false];
}
function envelope(){
  if(shell.n)return {y0:shell.box.min.y,y1:shell.box.max.y,x0:shell.box.min.x,x1:shell.box.max.x,z0:shell.box.min.z,z1:shell.box.max.z};
  var e={y0:Infinity,y1:-Infinity,x0:Infinity,x1:-Infinity,z0:Infinity,z1:-Infinity};
  onList().forEach(function(i){var r=RT[i.iid];e.x0=Math.min(e.x0,r.min[0]);e.x1=Math.max(e.x1,r.max[0]);e.y0=Math.min(e.y0,r.min[1]);e.y1=Math.max(e.y1,r.max[1]);e.z0=Math.min(e.z0,r.min[2]);e.z1=Math.max(e.z1,r.max[2]);});
  return isFinite(e.y0)?e:null;
}
function cogOf(mode){var m=0,cx=0,cy=0,cz=0,keep=fill;fill=mode;if(shell.n&&shell.mass>0){m=shell.mass;cx=m*shell.cen[0];cy=m*shell.cen[1];cz=m*shell.cen[2];}onList().forEach(function(i){var it=P.work.items[i.iid],k=pmass(i.part);m+=k;cx+=k*it.p[0];cy+=k*it.p[1];cz+=k*it.p[2];});fill=keep;return m>0?[cx/m,cy/m,cz/m,m]:null;}
/* rule violations for one placed instance; returns array of text */
function ruleIssues(inst,env,ref){
  var out=[],r=RT[inst.iid],it=P.work.items[inst.iid],c=it.p;
  (inst.part.rules||[]).forEach(function(rl){
    var d=ruleDef(rl.r);if(!d)return;var D=num(rl.d,d.ds||0),bad=false;
    if(d.base==='low'&&env)bad=c[1]>env.y0+(env.y1-env.y0)/3+0.5;
    else if(d.base==='high'&&env)bad=c[1]<env.y1-(env.y1-env.y0)/3-0.5;
    else if(d.base==='near'){var ts=targets(rl.t,inst.iid);if(ts.length)bad=Math.min.apply(null,ts.map(function(x){return gap(r,x);}))>D+0.5;}
    else if(d.base==='far'){var tf=targets(rl.t,inst.iid);if(tf.length)bad=Math.min.apply(null,tf.map(function(x){return gap(r,x);}))<D-0.5;}
    else if(d.base==='link'){var lk=linkOf(inst,rl);if(lk.missing){out.push(ruleName(rl)+t('linkMissing'));return;}if(!lk.ok){out.push(ruleName(rl)+(lk.why?' · '+t('w_'+lk.why):' ('+fmt(lk.len)+' '+t('dist')+')'));return;}}
    else if(d.base==='center')bad=Math.hypot(c[0]-ref[0],c[2]-ref[1])>D+0.5;
    else if(d.base==='wall'&&shell.n)bad=Math.min(r.min[0]-env.x0,env.x1-r.max[0],r.min[2]-env.z0,env.z1-r.max[2],r.min[1]-env.y0,env.y1-r.max[1])>D+0.5;
    else if(d.base==='clear')bad=onList().some(function(o){return o.iid!==inst.iid&&!nested(inst.part,o.part)&&gap(r,RT[o.iid])<D-0.5;});
    else if(d.base==='top')bad=onList().some(function(o){var q=RT[o.iid];return o.iid!==inst.iid&&q.min[1]>=r.max[1]-0.5&&q.min[0]<r.max[0]&&q.max[0]>r.min[0]&&q.min[2]<r.max[2]&&q.max[2]>r.min[2];});
    else if(d.base==='sym'){var sib=onList().filter(function(o){return o.part===inst.part;});if(sib.length>1&&sib[0]===inst){var sx=0,sz=0;sib.forEach(function(o){var q=P.work.items[o.iid].p;sx+=q[0]-ref[0];sz+=q[2]-ref[1];});bad=Math.hypot(sx,sz)>5;}}
    if(bad)out.push(ruleName(rl));
  });
  return out;
}
function runChecks(){
  var on=onList();INST.forEach(function(i){RT[i.iid].hit=false;RT[i.iid].out=false;});
  var cg=cogOf(fill);checks.placed=on.length;checks.mass=cg?cg[3]:0;checks.cog=cg;checks.ref=refPoint();
  checks.pairs=[];checks.outs=[];checks.rules=[];
  var env=envelope();
  for(var a=0;a<on.length;a++){var ra=RT[on[a].iid];
    for(var b=a+1;b<on.length;b++){var rb=RT[on[b].iid];if(!nested(on[a].part,on[b].part)&&collide(ra,rb)){ra.hit=rb.hit=true;checks.pairs.push([on[a].iid,on[b].iid]);}}
    if(!P.work.items[on[a].iid].ext&&shell.n){shellTest(ra);if(ra.sHit){ra.hit=true;checks.pairs.push([on[a].iid,null]);}else if(ra.sOut){ra.out=true;checks.outs.push(on[a].iid);}}
    ruleIssues(on[a],env,checks.ref).forEach(function(tx){checks.rules.push([on[a].iid,tx]);});
  }
  checks.links=allLinks();drawLinks();
  INST.forEach(function(i){var r=RT[i.iid],it=P.work.items[i.iid],show=it.on&&selected===i.iid;r.outline.visible=show;tintPart(r);
    if(show){r.outline.material.color.set(r.hit?theme.crit:r.out?theme.warn:theme.accent);
      r.outline.position.set((r.min[0]+r.max[0])/2,(r.min[1]+r.max[1])/2,(r.min[2]+r.max[2])/2);r.outline.scale.set(Math.max(r.max[0]-r.min[0],1),Math.max(r.max[1]-r.min[1],1),Math.max(r.max[2]-r.min[2],1));}});
  if(cg){cogGroup.visible=true;cogGroup.position.set(cg[0],cg[1],cg[2]);var d=cogGroup.getObjectByName('drop');d.scale.set(1,Math.max(cg[1],1),1);d.computeLineDistances();cogGroup.getObjectByName('ring').position.y=-cg[1]+1;}else cogGroup.visible=false;if(!ui.marks)cogGroup.visible=false;
  var top=env?env.y1+60:400;refGroup.position.set(checks.ref[0],0.6,checks.ref[1]);var cr=refGroup.getObjectByName('cross');cr.geometry.attributes.position.setY(5,top);cr.geometry.attributes.position.needsUpdate=true;cr.material.color.set(theme.accent);
}

/* ================= UI rendering ================= */
function setSeg(id,val){document.querySelectorAll('#'+id+' button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.v===val));});}
function btn(cls,text,fn){var b=el('button','btn '+cls,text);b.type='button';b.onclick=fn;return b;}
var toastT;function toast(msg){var e=$('#toast');e.textContent=msg;e.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){e.classList.remove('show');},3200);}
function confirmBox(msg,fn){$('#confirmTxt').textContent=msg;$('#confirmModal').hidden=false;$('#btnYes').onclick=function(){$('#confirmModal').hidden=true;fn();};$('#btnNo').onclick=function(){$('#confirmModal').hidden=true;};}
function renderProjects(){
  var s=$('#selProject');s.textContent='';projects.forEach(function(p){var o=el('option','',p.name);o.value=p.id;s.appendChild(o);});s.value=P.id;
  $('#projName').value=P.name;$('#refLabel').value=P.ref.label||'';$('#refX').value=num(P.ref.x,0);$('#refZ').value=num(P.ref.z,0);$('#tol').value=num(P.tol,10);
  $('#exBadge').hidden=!P.example;
}
function renderShells(){
  if(P)setTimeout(renderPoints,0);
  var ul=$('#shells');ul.textContent='';
  if(!P.shells.length)ul.appendChild(el('li','fine',t('noShell')));
  P.shells.forEach(function(S){var li=el('li','item'+(S.id===P.work.shellId?' sel':''));li.appendChild(el('span','nm',S.name));
    if(!geo[S.id])li.appendChild(el('span','mono','?'));
    li.onclick=function(){P.work.shellId=S.id;rebuildInst();buildRuntime();rebuildShell();syncAll();commit();renderShells();setView(ui.view);};ul.appendChild(li);});
  var S=curShell();$('#shSet').hidden=!S;
  if(S){$('#shName').value=S.name;$('#shUnit').value=S.unit;$('#shUp').value=S.up;$('#shTurn').value=S.turn;$('#shUnder').value=num(S.under,0);$('#shKind').value=S.kind||'hollow';$('#shRole').value=S.role||'shell';$('#shMass').value=num(S.mass,0)||'';var sp=$('#shPart');sp.textContent='';var o0=el('option','',t('noneOpt'));o0.value='';sp.appendChild(o0);P.parts.forEach(function(p){var o=el('option','',p.name);o.value=p.id;sp.appendChild(o);});sp.value=S.part||'';$('#shPartL').hidden=S.role!=='frame';var fp=framePart();$('#shMass').placeholder=fp?String(pmass(fp)):'0';
    var z=shell.box.getSize(new THREE.Vector3());$('#shSize').textContent=fmt(z.x)+' × '+fmt(z.y)+' × '+fmt(z.z)+' mm · '+shell.n+' △'+(fp&&!num(S.mass,0)?' · '+t('massFromRow',kg(shell.mass)):'');}
}
var trayT=null,trayLast=null;
/* the list is redrawn on each click, so a double click is detected by hand: two clicks on the same part within 450 ms */
function trayDbl(p){var n=Date.now(),hit=trayLast&&trayLast.id===p.id&&n-trayLast.t<450;trayLast=hit?null:{id:p.id,t:n};if(hit){clearTimeout(trayT);openPart(p);}return hit;}
function renderTray(){
  var box=$('#tray');box.textContent='';var fp=framePart();
  if(fp){var ful=el('ul','plain'),fli=el('li','item on');fli.dataset.pid=fp.id;fli.title=t('dblEdit');fli.appendChild(el('span','sw'));fli.lastChild.style.background=theme.accent;fli.appendChild(el('span','nm',fp.name+' · '+t('frameModel')));fli.appendChild(el('span','mono',kg(shell.mass||0)));fli.onclick=function(){if(!trayDbl(fp))toast(t('tFrameRow'));};ful.appendChild(fli);box.appendChild(ful);}
  if(!INST.length){box.appendChild(el('p','fine',t('noParts')));$('#trayCount').textContent='';return;}
  PREF.cat=PREF.cat||{};
  cats().forEach(function(c){
    var mem=INST.filter(function(i){return (i.part.cat||'—')===c;}),onN=mem.filter(function(i){return P.work.items[i.iid].on;}).length,bad=mem.some(function(i){return checks.pairs.some(function(pp){return pp[0]===i.iid||pp[1]===i.iid;});}),fo=!!PREF.cat[c];
    var hd=el('button','cath'+(fo?' folded':''));hd.type='button';hd.setAttribute('aria-expanded',String(!fo));hd.appendChild(el('span','fchev','▾'));var sw0=el('span','sw');sw0.style.background=catColor(c);hd.appendChild(sw0);hd.appendChild(el('b','',c));
    if(bad){var lb=el('span','led bad');lb.title=t('ledBad');hd.appendChild(lb);}hd.appendChild(el('span','ledn',onN+' / '+mem.length));
    hd.onclick=function(){PREF.cat[c]=!PREF.cat[c];savePref();renderTray();};box.appendChild(hd);if(fo)return;var ul=el('ul','plain');
    mem.forEach(function(i){
      var it=P.work.items[i.iid],li=el('li','item'+(it.on?' on':'')+(selected===i.iid?' sel':''));
      var sw=el('span','sw');sw.style.background=catColor(c);li.appendChild(sw);li.appendChild(el('span','nm',i.label));li.appendChild(el('span','mono',kg(num(i.part.mass,0))));
      if(it.on)li.appendChild(el('span','mono','✓'));
      li.dataset.pid=i.part.id;li.title=t('dblEdit');li.onclick=function(){if(trayDbl(i.part))return;if(it.on){select(i.iid);return;}clearTimeout(trayT);trayT=setTimeout(function(){placeAtHome(i.iid);selected=i.iid;runChecks();snapMounts();commit();},280);};ul.appendChild(li);});
    box.appendChild(ul);});
  $('#trayCount').textContent=checks.placed+' / '+INST.length;
}
function renderStatus(){
  var c=checks,cg=c.cog,dx=cg?cg[0]-c.ref[0]:0,dz=cg?cg[2]-c.ref[1]:0,a=Math.hypot(dx,dz),tol=num(P.tol,10);
  $('#cogNum').textContent=cg?fmt(a):'—';
  $('#cogSub').textContent=cg?t('cogLine',fmt(dx),fmt(dz))+' '+t('cogH',fmt(cg[1]))+(P.ref.label?' ('+P.ref.label+')':''):'';
  $('#balTxt').textContent=!cg?t('noCog'):a<=tol?t('balOk'):t('balOff');$('#balTxt').style.color=!cg?'':a<=tol?'var(--ok)':'var(--crit)';
  var hasVar=P.parts.some(function(p){return p.massE!==undefined&&p.massE!==''&&p.massE!==null;});$('#fillRow').hidden=!hasVar;setSeg('segFill',fill);
  if(hasVar&&cg){var f=cogOf('full'),e=cogOf('empty');$('#fillTxt').textContent=f&&e?t('fillLine',kg(f[3]),kg(e[3]))+' '+t('fillShift',fmt(Math.hypot(f[0]-e[0],f[2]-e[2])),fmt(Math.abs(f[1]-e[1]))):'';}else $('#fillTxt').textContent='';
  $('#massNum').textContent=c.mass.toFixed(2)+' kg';$('#partsNum').textContent=c.placed+' / '+INST.length;
  $('#colNum').textContent=c.pairs.length;$('#stCol').className='stat'+(c.pairs.length?' bad':'');
  $('#outNum').textContent=c.outs.length;$('#stOut').className='stat'+(c.outs.length?' warn':'');
  var ul=$('#issues');ul.textContent='';
  function add(cls,iid,text){var b=el('button');b.type='button';b.appendChild(el('span','dot '+cls));b.appendChild(el('span','',text));b.onclick=function(){select(iid);};var li=el('li');li.appendChild(b);ul.appendChild(li);}
  c.pairs.forEach(function(p){add('',p[0],INST_BY[p[0]].label+t('and')+(p[1]?INST_BY[p[1]].label:t('theShell')));});
  c.outs.forEach(function(i){add('w',i,INST_BY[i].label+t('isOut'));});
  c.rules.forEach(function(r){add('r',r[0],INST_BY[r[0]].label+': '+r[1]);});
  if(!ul.children.length)ul.appendChild(el('li','fine',t('none')));
  var lu=$('#links');lu.textContent='';var nb=c.links.filter(function(l){return !l.ok;}).length;$('#linkCount').textContent=c.links.length?(c.links.length-nb)+' / '+c.links.length:'';
  c.links.forEach(function(l){var b=el('button');b.type='button';var dt=el('span','dot');dt.style.background=l.ok?(KCOL[l.kind]||KCOL.other):'var(--crit)';b.appendChild(dt);
    b.appendChild(el('span','',INST_BY[l.from].label+' → '+l.name+' · '+(l.mode!=='cable'?t('m_'+l.mode)+' · ':'')+t('k_'+l.kind)));var nm=el('span','mono',l.missing?t('notPlaced'):fmt(l.len)+' / '+fmt(l.max)+' mm');if(!l.ok)nm.style.color='var(--crit)';nm.style.marginInlineStart='auto';b.appendChild(nm);
    b.onclick=function(){select(l.from);};var li=el('li');li.appendChild(b);lu.appendChild(li);});
  if(!c.links.length)lu.appendChild(el('li','fine',t('linkNone')));
  $('#chipName').textContent=P.work.name+(curShell()?' · '+curShell().name:'');
  $('#trayCount').textContent=c.placed+' / '+INST.length;
}
function renderInspector(){
  var box=$('#inspector');box.textContent='';
  if(!selected||!INST_BY[selected]){box.appendChild(el('p','fine',t('selEmpty')));return;}
  var inst=INST_BY[selected],p=inst.part,it=P.work.items[selected],s=psize(p);
  var nm=el('p','',inst.label);nm.style.cssText='margin:0;font-weight:600;font-size:15px';box.appendChild(nm);
  if(p.model)box.appendChild(el('p','fine',p.model));
  if(it.on&&it.why){var w=el('div','why');w.appendChild(el('span','lab',t('logic')));w.appendChild(el('p','',it.why));w.lastChild.style.margin='2px 0 0';box.appendChild(w);}
  var dl=el('dl','kv');[[t('size'),fmt(s[0])+' × '+fmt(s[1])+' × '+fmt(s[2])+' mm'],[t('weight'),kg(num(p.mass,0))+(p.massE!==undefined&&p.massE!==''&&p.massE!==null?' / '+kg(num(p.massE,0)):'')],[t('group'),p.cat||'—']].forEach(function(r){dl.appendChild(el('dt','',r[0]));dl.appendChild(el('dd','',r[1]));});box.appendChild(dl);
  var rw=el('div');(p.rules||[]).forEach(function(r){var d=ruleDef(r.r),sp=el('span','pill',(d&&d.base==='manual'?'☐ ':'')+ruleName(r));rw.appendChild(sp);});
  rw.appendChild(btn('small',t('editRules'),function(){openDrawer(p);}));rw.appendChild(btn('small',t('editPart'),function(){openPart(p);}));box.appendChild(rw);
  if(p.notes)box.appendChild(el('p','fine',p.notes));if(p.src)box.appendChild(el('p','fine',t('cSrc')+': '+p.src));
  if(!it.on){box.appendChild(btn('solid',t('place'),function(){placeAtHome(selected);commit();}));return;}
  var xyz=el('div','xyz');['X','Y','Z'].forEach(function(lab,i){var l=el('label','f');l.appendChild(el('span','',lab));var inp=el('input');inp.type='number';inp.step=ui.grid?5:1;inp.id='pos'+i;inp.value=fmt(it.p[i]);inp.disabled=it.lock;
    inp.addEventListener('change',function(){var v=Number(inp.value);if(!isFinite(v))return;if(!enforceOk(selected,function(){it.p[i]=v;})){inp.value=fmt(it.p[i]);return;}it.why=null;syncItem(selected);commit();});l.appendChild(inp);xyz.appendChild(l);});box.appendChild(xyz);
  /* rotation: drag the slider to turn by hand, type a number to be exact (degrees about X, Y, Z of the model) */
  var rh=el('div','row');rh.appendChild(el('span','lab',t('rotT')));box.appendChild(rh);
  var eu=new THREE.Euler().setFromQuaternion(new THREE.Quaternion(it.q[0],it.q[1],it.q[2],it.q[3]),'XYZ'),deg=[eu.x,eu.y,eu.z].map(function(v){var d=Math.round(v*1800/PI)/10;return d===-0?0:d;}),q0=null;
  var rg=el('div','rotg');rg.dir='ltr';var sl=[],nu=[];
  function setRot(i,v,live){var d=deg.slice();d[i]=v;if(!q0)q0=it.q.slice();var q=new THREE.Quaternion().setFromEuler(new THREE.Euler(d[0]*PI/180,d[1]*PI/180,d[2]*PI/180,'XYZ'));
    var nq=[q.x,q.y,q.z,q.w].map(function(n){return Math.round(n*1e6)/1e6;});
    if(live){it.q=nq;deg=d;syncItem(selected);runChecks();renderStatus();requestRender();return;}
    q0=null;it.q=nq;deg=d;it.why=null;syncItem(selected);resnapOwn(selected);commit();}
  ['X','Y','Z'].forEach(function(a,i){rg.appendChild(el('span','mono',a));var r=el('input');r.type='range';r.min='-180';r.max='180';r.step='1';r.value=String(deg[i]);r.disabled=it.lock;r.id='rot'+a;r.setAttribute('aria-label',t('rotT')+' '+a);
    var n=el('input');n.type='number';n.step='0.1';n.value=String(deg[i]);n.disabled=it.lock;n.id='rotN'+a;n.setAttribute('aria-label',t('rotT')+' '+a);
    r.oninput=function(){n.value=r.value;setRot(i,+r.value,true);};r.onchange=function(){setRot(i,+r.value,false);};
    n.onchange=function(){var v=Number(n.value);if(!isFinite(v))return;v=((v+180)%360+360)%360-180;setRot(i,Math.round(v*10)/10,false);};rg.appendChild(r);rg.appendChild(n);});box.appendChild(rg);
  var rr=el('div','row');['X','Y','Z'].forEach(function(a,i){var b=btn('small','90° '+a,function(){rotateSel(i);});b.disabled=it.lock;rr.appendChild(b);});
  rr.appendChild(btn('small',it.lock?t('unlock'):t('lock'),function(){it.lock=!it.lock;commit();}));rr.appendChild(btn('small danger',t('back'),function(){removeItem(selected);}));box.appendChild(rr);
  var ck=el('label','row fine');ck.style.flexWrap='nowrap';var cb=el('input');cb.type='checkbox';cb.id='extChk';cb.style.width='auto';cb.checked=it.ext;cb.onchange=function(){it.ext=cb.checked;commit();};ck.appendChild(cb);ck.appendChild(el('span','',t('skipShell')));box.appendChild(ck);
}
/* every card can fold; its light says whether something inside needs a look */
var FOLD_DEF={proj:1,files:1,cog:1,links:1,saved:1};
function initFolds(){PREF.fold=PREF.fold||{};document.querySelectorAll('section[data-fold]').forEach(function(sec){var k=sec.dataset.fold,hd=sec.querySelector(':scope>.head');if(!hd)return;hd.classList.add('fh');
    var lab=hd.querySelector('.lab'),fl=el('span','fl');fl.appendChild(el('span','fchev','▾'));var led=el('span','led');led.id='led_'+k;fl.appendChild(led);hd.insertBefore(fl,hd.firstChild);fl.appendChild(lab);var ln=el('span','ledn');ln.id='ledn_'+k;fl.appendChild(ln);
    hd.setAttribute('role','button');hd.tabIndex=0;var fo=PREF.fold[k]!==undefined?PREF.fold[k]:!!FOLD_DEF[k];sec.classList.toggle('folded',fo);hd.setAttribute('aria-expanded',String(!fo));
    function tog(){var f=!sec.classList.contains('folded');sec.classList.toggle('folded',f);hd.setAttribute('aria-expanded',String(!f));PREF.fold[k]=f;savePref();if(k==='parts'||k==='insp')requestRender();}
    hd.addEventListener('click',function(e){if(e.target.closest('button,input,select,a')&&!e.target.closest('.fl'))return;tog();});hd.addEventListener('keydown',function(e){if(e.target===hd&&(e.key==='Enter'||e.key===' ')){e.preventDefault();tog();}});});}
function setLed(k,st,n,tip){var l=document.getElementById('led_'+k);if(!l)return;l.className='led'+(st?' '+st:'');l.title=tip||t(st==='bad'?'ledBad':st==='warn'?'ledWarn':st==='ok'?'ledOk':'ledNone');var nn=document.getElementById('ledn_'+k);if(nn)nn.textContent=n===undefined||n===null?'':String(n);}
function updateLeds(){if(!P||!checks)return;var c=checks,sel=selected&&INST_BY[selected];
  setLed('proj',remote&&remote.partial?'warn':'',null);
  setLed('files',shell.n?'ok':'',activePoints().length||null);
  setLed('parts',c.pairs.length?'bad':c.outs.length?'warn':c.placed?'ok':'',null);
  var cg=c.cog,a=cg?Math.hypot(cg[0]-c.ref[0],cg[2]-c.ref[1]):0;setLed('cog',!cg?'':a<=num(P.tol,10)?'ok':'bad',null);
  var ni=c.pairs.length+c.outs.length+c.rules.length;setLed('issues',c.pairs.length?'bad':ni?'warn':(c.placed?'ok':''),ni||null);
  var lb=c.links.filter(function(l){return !l.ok&&!l.missing;}).length,lm=c.links.filter(function(l){return l.missing;}).length;setLed('links',lb?'bad':lm?'warn':c.links.length?'ok':'',null);
  setLed('insp',!sel?'':c.pairs.some(function(pp){return pp[0]===selected||pp[1]===selected;})?'bad':c.outs.indexOf(selected)>=0?'warn':'ok',null);
  setLed('saved','',P.configs.length||null);}
function refreshPos(){if(!selected)return;var it=P.work.items[selected];for(var i=0;i<3;i++){var e=document.getElementById('pos'+i);if(e&&document.activeElement!==e)e.value=fmt(it.p[i]);}}
function summary(){var c=checks;return c.placed+'/'+INST.length+' · '+c.mass.toFixed(2)+' kg'+(c.cog?' · CoG '+fmt(Math.hypot(c.cog[0]-c.ref[0],c.cog[2]-c.ref[1]))+' mm':'')+' · '+c.pairs.length+'✕ '+c.outs.length+'△ '+c.rules.length+'●';}
function renderSaved(){
  var ul=$('#saved');ul.textContent='';$('#savedCount').textContent=P.configs.length||'';$('#cfgName').value=P.work.name;
  P.configs.forEach(function(c){var li=el('li','item');var d=el('span','nm');d.appendChild(el('b','',c.name));d.appendChild(el('div','mono',c.summary||''));d.style.whiteSpace='normal';li.appendChild(d);
    li.appendChild(btn('small',t('load'),function(e){e.stopPropagation();P.work=clone(c.state);P.work.name=c.name;P.work.cfgId=c.id;selected=null;rebuildInst();buildRuntime();rebuildShell();syncAll();commit();refreshUI();setView(ui.view);}));
    li.appendChild(btn('small danger','✕',function(e){e.stopPropagation();confirmBox(t('qDelCfg',c.name),function(){P.configs=P.configs.filter(function(x){return x!==c;});touch();renderSaved();});}));ul.appendChild(li);});
}
function refreshUI(){renderTray();renderInspector();renderStatus();renderSaved();renderMap();renderGraph();$('#btnUndo').disabled=histIdx<=0;$('#btnRedo').disabled=histIdx>=hist.length-1;
  ['togLabels','togGrid','togMagnet','togLinks','togEnforce','togOnly','togPts','togLtags','togMarks','togFloor'].forEach(function(id,i){$('#'+id).setAttribute('aria-pressed',String([ui.labels,ui.grid,ui.magnet,ui.links,ui.enforce,ui.onlyLinked,ui.pts,ui.ltags,ui.marks,ui.floor][i]));});applyVis();updateLeds();
  setSeg('segView',ui.view);setSeg('segShell',ui.shell);setSeg('segMode',ui.mode);}

/* ================= history ================= */
var hist=[],histIdx=-1;
function snap(){return JSON.stringify({w:P.work,p:P.parts,pt:P.points||[]});}
function histPush(){var s=snap();if(hist[histIdx]!==s){hist=hist.slice(0,histIdx+1);hist.push(s);if(hist.length>80)hist.shift();histIdx=hist.length-1;}}
var histT=null;function histLater(){clearTimeout(histT);histT=setTimeout(function(){if(!P)return;histPush();$('#btnUndo').disabled=histIdx<=0;$('#btnRedo').disabled=histIdx>=hist.length-1;},250);}
function commit(){histPush();runChecks();refreshUI();requestRender();touch();}
function restore(s){var o=JSON.parse(s);if(!o.w)o={w:o};P.work=o.w;if(o.p)P.parts=o.p;if(o.pt)P.points=o.pt;rebuildInst();buildRuntime();if(selected&&!INST_BY[selected])selected=null;rebuildShell();syncAll();renderPoints();runChecks();refreshUI();renderShells();if(!$('#partModal').hidden)renderPart();touch();}
function undo(){if(histIdx>0){histIdx--;restore(hist[histIdx]);}}
function redo(){if(histIdx<hist.length-1){histIdx++;restore(hist[histIdx]);}}

/* ================= selection, placing, dragging ================= */
function select(iid){selected=iid;runChecks();refreshUI();requestRender();}
function freeAt(iid){var r=RT[iid];syncItem(iid);if(INST.some(function(o){return o.iid!==iid&&P.work.items[o.iid].on&&!nested(INST_BY[iid].part,o.part)&&collide(r,RT[o.iid]);}))return false;if(P.work.items[iid].ext||!shell.n)return true;shellTest(r);return !r.sHit&&!r.sOut;}
function placeAtHome(iid){
  var it=P.work.items[iid],p=INST_BY[iid].part;it.on=true;it.q=[0,0,0,1];it.why=null;
  var h=halfExtents(psize(p),it.q),x,z,y0,y1;
  if(shell.n){x=(shell.box.min.x+shell.box.max.x)/2;z=(shell.box.min.z+shell.box.max.z)/2;y0=shell.box.min.y;y1=shell.box.max.y;}else{x=checks.ref[0];z=checks.ref[1];y0=0;y1=3000;}
  var found=false;for(var y=Math.ceil((y0+h[1])/5)*5;y<=y1;y+=5){it.p=[x,y,z];if(freeAt(iid)){found=true;break;}}
  if(!found){it.p=[x,Math.round(y0+h[1]),z];syncItem(iid);}
}
function removeItem(iid){var it=P.work.items[iid];it.on=false;it.lock=false;if(selected===iid)selected=null;syncItem(iid);commit();}
function rotateSel(axis){if(!selected)return;var it=P.work.items[selected];if(!it.on||it.lock)return;
  var q=new THREE.Quaternion(it.q[0],it.q[1],it.q[2],it.q[3]),r=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(axis===0?1:0,axis===1?1:0,axis===2?1:0),PI/2);
  q.premultiply(r);it.q=[q.x,q.y,q.z,q.w].map(function(n){return Math.round(n*1e6)/1e6;});it.why=null;syncItem(selected);resnapOwn(selected);commit();}
/* after turning a part, its mechanical mounts put it back on its point (turning never breaks a mount) */
function resnapOwn(iid){var p=INST_BY[iid]&&INST_BY[iid].part;if(!p)return;var rs=(p.rules||[]).filter(function(rl){var d=ruleDef(rl.r);return d&&d.base==='link'&&MOUNT[rl.m];});P.parts.forEach(function(o){(o.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(d&&d.base==='link'&&MOUNT[rl.m]&&linkCands(rl).some(function(c){return c.inst&&c.inst.part===p;}))rs.push(rl);});});
  if(!rs.length)return;runChecks();var tt=toast,cm=commit;toast=function(){};commit=function(){};try{snapAll(rs);}finally{toast=tt;commit=cm;}}
var ray=new THREE.Raycaster(),ndc=new THREE.Vector2(),drag=null,downAt=null,tmpHit=new THREE.Vector3();
function setRay(e){var r=canvas.getBoundingClientRect();ndc.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ndc,camera);}
function pick(e){setRay(e);var objs=[];INST.forEach(function(i){if(P.work.items[i.iid].on){var r=RT[i.iid];objs.push(r.detail.visible?r.detail:r.block);}});
  var hits=ray.intersectObjects(objs,true);for(var k=0;k<hits.length;k++){if(!hits[k].object.isMesh)continue;var o=hits[k].object;while(o&&o.parent!==partsGroup)o=o.parent;if(!o)continue;
    for(var id in RT)if(RT[id].root===o)return {iid:id,point:hits[k].point.clone()};}return null;}
function dominant(v){var a=[Math.abs(v.x),Math.abs(v.y),Math.abs(v.z)];return a.indexOf(Math.max.apply(null,a));}
function startDrag(iid,e,point){
  var dir=camera.getWorldDirection(new THREE.Vector3()),n,free;
  if(e.shiftKey){var hdir=new THREE.Vector3(dir.x,0,dir.z);if(hdir.lengthSq()<1e-6)hdir.set(0,0,1);n=dominant(hdir);free=[1];}
  else{n=dominant(dir);free=[0,1,2].filter(function(i){return i!==n;});}
  var nv=new THREE.Vector3(n===0?1:0,n===1?1:0,n===2?1:0);
  drag={iid:iid,plane:new THREE.Plane().setFromNormalAndCoplanarPoint(nv,point),grab:point.clone(),start:P.work.items[iid].p.slice(),free:free,moved:false,d:[0,0,0],warned:false};
  drag.group=followers(iid).map(function(g){return {iid:g,s:P.work.items[g].p.slice()};});drag.set=drag.group.map(function(g){return g.iid;});drag.v=groupViol(drag.set);
  controls.enabled=false;canvas.setPointerCapture&&canvas.setPointerCapture(e.pointerId);
}
/* parts fixed onto the dragged one (their rule points at it: touching, above, below, same axis) move with it; the part that owns such a rule is held instead */
/* move a part so a failing connection is met: the part that owns the rule moves (with what is fixed onto it); if it is locked, the target moves */
function snapDelta(l){var ra=RT[l.from],rb=l.to?RT[l.to]:{min:l.B0,max:l.B0},m=l.mode,D=l.max,A=l.A0,B=l.B0,d=[0,0,0],a;
  if(m==='cable'||m==='rigid'||m==='via'){var T=l.path.length>2?l.path[1]:B,v=[T[0]-A[0],T[1]-A[1],T[2]-A[2]],n=Math.hypot(v[0],v[1],v[2]),mv=Math.min(n,(l.len-D)+1);if(n<1e-6||mv<=0)return null;return v.map(function(x){return x/n*mv;});}
  if(m==='at'||(m==='touch'&&l.ports))return [B[0]-A[0],B[1]-A[1],B[2]-A[2]];
  if(m==='axis'){var df=[0,1,2].sort(function(x,y){return Math.abs(B[x]-A[x])-Math.abs(B[y]-A[y]);});d[df[0]]=B[df[0]]-A[df[0]];d[df[1]]=B[df[1]]-A[df[1]];return d;}
  if(m==='inside'){for(a=0;a<3;a++){var lo=rb.min[a]+D,hi=rb.max[a]-D;if(ra.max[a]-ra.min[a]>hi-lo)d[a]=(lo+hi)/2-(ra.min[a]+ra.max[a])/2;else if(ra.min[a]<lo)d[a]=lo-ra.min[a];else if(ra.max[a]>hi)d[a]=hi-ra.max[a];}return d;}
  function ov(a){return ra.min[a]<rb.max[a]-0.5&&ra.max[a]>rb.min[a]+0.5;}
  function centre(a){return (rb.min[a]+rb.max[a])/2-(ra.min[a]+ra.max[a])/2;}
  if(m==='above'||m==='below'){d[1]=m==='above'?rb.max[1]-ra.min[1]:rb.min[1]-ra.max[1];if(!(ov(0)&&ov(2))){d[0]=centre(0);d[2]=centre(2);}return d;}
  var axs=m==='beside'?[0,2]:[0,1,2];if(m==='beside'&&!ov(1))d[1]=centre(1);
  axs.forEach(function(a){if(rb.min[a]>ra.max[a])d[a]=rb.min[a]-ra.max[a];else if(ra.min[a]>rb.max[a])d[a]=rb.max[a]-ra.min[a];});return d;}
function snapLink(l){if(!l||l.missing||l.ok||l.why==='blocked'||!MOUNT[l.mode])return false;var d=snapDelta(l);if(!d||Math.hypot(d[0],d[1],d[2])<0.01)return false;
  var mover=l.from,sg=1;if(P.work.items[l.from].lock){if(!l.to||P.work.items[l.to].lock)return false;mover=l.to;sg=-1;}
  var keep=ui.enforce;ui.enforce=true;var grp=followers(mover);ui.enforce=keep;if(sg<0&&grp.indexOf(l.from)>=0)return false;
  grp.forEach(function(g){var it=P.work.items[g];it.p=[0,1,2].map(function(a){return Math.round((it.p[a]+sg*d[a])*100)/100;});it.why=null;syncItem(g);});return true;}
function linkKey(l){return l.from+'|'+(l.from&&INST_BY[l.from]?(INST_BY[l.from].part.rules||[]).indexOf(l.rl):0);}
function snapAll(only){var n=0,done={};for(var pass=0;pass<4;pass++){var moved=false;allLinks().forEach(function(l){if(only&&only.indexOf(l.rl)<0)return;var key=linkKey(l);if(l.ok||l.missing)return;if(snapLink(l)){moved=true;done[key]=1;}});if(!moved)break;}
  runChecks();n=Object.keys(done).length;var left=checks.links.filter(function(l){return !l.ok&&!l.missing&&(!only||only.indexOf(l.rl)>=0);}).length;commit();toast(n?t('tSnap',n,left):t('tSnapNone'));return n;}
/* parts that take part in a connection, as owner or as target (frame and points are the model, not parts) */
function anyLinks(){return P.parts.some(function(p){return (p.rules||[]).some(function(r){var d=ruleDef(r.r);return d&&d.base==='link'&&nk(r.t);});});}
function linkedSet(){var set={};P.parts.forEach(function(p){(p.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(!d||d.base!=='link')return;var C=linkCands(rl);if(!C.length)return;set[p.id]=1;C.forEach(function(c){if(c.inst&&c.inst.part!==p)set[c.inst.part.id]=1;});});});return set;}
/* "connected only": show every connected part (placing and snapping the new ones), hide the rest; locked parts stay as they are */
function autoShow(quiet){if(P)normAll();if(!ui.onlyLinked||!P||!anyLinks())return;var L=linkedSet(),I=P.work.items,added=[],hid=0;
  INST.forEach(function(i){var it=I[i.iid];if(it.lock)return;if(L[i.part.id]&&!it.on)added.push(i);else if(!L[i.part.id]&&it.on){it.on=false;it.why=null;syncItem(i.iid);hid++;}});
  if(!added.length&&!hid)return;
  /* targets first, so the parts that plug into them can snap onto something already placed */
  function outN(i){return (i.part.rules||[]).filter(function(r){var d=ruleDef(r.r);return d&&d.base==='link';}).length;}
  added.sort(function(a,b){return outN(a)-outN(b);}).forEach(function(i){placeAtHome(i.iid);});
  var ids={};added.forEach(function(i){ids[i.part.id]=1;});var only=[];P.parts.forEach(function(p){(p.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(!d||d.base!=='link')return;if(ids[p.id]||linkCands(rl).some(function(c){return c.inst&&ids[c.inst.part.id];}))only.push(rl);});});
  runChecks();var tt=toast;toast=function(){};try{if(only.length)snapAll(only);else commit();}finally{toast=tt;}
  if(!quiet)toast(t('tShown',added.length,hid));}
function snapMounts(){if(!P)return;var only=[];P.parts.forEach(function(p){(p.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(d&&d.base==='link'&&MOUNT[rl.m])only.push(rl);});});
  if(!only.length||!checks.links.some(function(l){return only.indexOf(l.rl)>=0&&!l.ok&&!l.missing;}))return;var tt=toast;toast=function(){};try{snapAll(only);}finally{toast=tt;}}
function followers(iid){var out=[iid],seen={};seen[iid]=1;if(!ui.enforce)return out;var links=allLinks();
  for(var h=0;h<out.length;h++){var cur=out[h];links.forEach(function(l){if(!FOLLOW[l.mode]||!l.to)return;var o=l.to===cur?l.from:null;if(o&&!seen[o]&&!P.work.items[o].lock){seen[o]=1;out.push(o);}});}return out;}
function applyDelta(d){drag.group.forEach(function(g){P.work.items[g.iid].p=[Math.round((g.s[0]+d[0])*100)/100,Math.round((g.s[1]+d[1])*100)/100,Math.round((g.s[2]+d[2])*100)/100];syncItem(g.iid);});}
/* how far the connections that touch these parts are from being met (0 = all met) */
function groupViol(set){var v=0;onList().forEach(function(i){(i.part.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(!d||d.base!=='link')return;var own=set.indexOf(i.iid)>=0;
  if(!own&&!(nk(rl.t)&&set.some(function(x){var pp=INST_BY[x].part,k=nk(rl.t);return k===nk(pp.id)||k===nk(pp.name)||k===nk(pp.cat);})))return;var l=linkOf(i,rl);if(!l.missing&&!l.ok)v+=l.exc||0;});});return v;}
function enforceOk(iid,fn){if(!ui.enforce)return fn(),true;var set=[iid],it=P.work.items[iid],keepP=it.p.slice(),keepQ=it.q.slice(),v0=groupViol(set);fn();syncItem(iid);if(groupViol(set)>v0+0.01){it.p=keepP;it.q=keepQ;syncItem(iid);toast(t('tHeld'));return false;}return true;}
function moveDrag(e){
  setRay(e);if(!ray.ray.intersectPlane(drag.plane,tmpHit))return;
  var it=P.work.items[drag.iid],d=[tmpHit.x-drag.grab.x,tmpHit.y-drag.grab.y,tmpHit.z-drag.grab.z],step=ui.grid?5:0.5,p=drag.start.slice();
  drag.free.forEach(function(a){p[a]=Math.round((drag.start[a]+d[a])/step)*step;});
  if(ui.magnet&&!e.altKey){var h=halfExtents(psize(INST_BY[drag.iid].part),it.q);
    drag.free.forEach(function(a){var mn=p[a]-h[a],mx=p[a]+h[a],best=7,u=(a+1)%3,v=(a+2)%3;
      function test(c){[c-mn,c-mx].forEach(function(dl){if(Math.abs(dl)<Math.abs(best))best=dl;});}
      onList().forEach(function(o){if(o.iid===drag.iid)return;var q=RT[o.iid],g=40;if(q.min[u]>p[u]+h[u]+g||q.max[u]<p[u]-h[u]-g||q.min[v]>p[v]+h[v]+g||q.max[v]<p[v]-h[v]-g)return;test(q.min[a]);test(q.max[a]);});
      if(shell.n){var cc=crossings(p,a);cc.forEach(test);}
      if(Math.abs(best)<7)p[a]+=best;});}
  var nd=[p[0]-drag.start[0],p[1]-drag.start[1],p[2]-drag.start[2]];if(nd[0]===drag.d[0]&&nd[1]===drag.d[1]&&nd[2]===drag.d[2])return;
  applyDelta(nd);
  if(ui.enforce&&!e.altKey){var v=groupViol(drag.set);
    if(v>drag.v+0.01){var lo=drag.d,hi=nd;for(var k=0;k<12;k++){var mid=[(lo[0]+hi[0])/2,(lo[1]+hi[1])/2,(lo[2]+hi[2])/2];applyDelta(mid);if(groupViol(drag.set)<=drag.v+0.01)lo=mid;else hi=mid;}
      nd=lo.map(function(n){return Math.round(n*100)/100;});applyDelta(nd);v=groupViol(drag.set);if(!drag.warned){drag.warned=true;toast(t('tHeld'));}}
    drag.v=Math.min(drag.v,v);}
  drag.d=nd;drag.moved=true;runChecks();renderStatus();refreshPos();requestRender();
}
canvas.addEventListener('pointerdown',function(e){if(e.button!==0)return;if(pickMode){e.stopImmediatePropagation();e.preventDefault();pickPoint(e);return;}downAt={x:e.clientX,y:e.clientY,hit:null};var p=pick(e);
  if(p){downAt.hit=p.iid;e.stopImmediatePropagation();e.preventDefault();if(selected!==p.iid)select(p.iid);if(!P.work.items[p.iid].lock)startDrag(p.iid,e,p.point);else toast(t('tLocked'));}},true);
window.addEventListener('pointermove',function(e){if(drag)moveDrag(e);});
window.addEventListener('pointerup',function(e){
  if(drag){var ch=drag.moved,id=drag.iid;drag=null;controls.enabled=true;if(ch){P.work.items[id].why=null;commit();}return;}
  if(downAt&&!downAt.hit&&e.target===canvas&&Math.hypot(e.clientX-downAt.x,e.clientY-downAt.y)<4&&selected)select(null);downAt=null;});
window.addEventListener('keydown',function(e){var tg=e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT')return;
  if((e.ctrlKey||e.metaKey)&&(e.key.toLowerCase()==='z'||e.key.toLowerCase()==='y')){e.preventDefault();var rd=e.shiftKey||e.key.toLowerCase()==='y';if(curPage==='sketch')skUndo(rd?1:-1);else if(rd)redo();else undo();return;}
  if(curPage==='sketch'){if(SK.sel&&(e.key==='Delete'||e.key==='Backspace')){delete skState().items[SK.sel];SK.sel=null;skPush();skRender(false);}return;}
  if(e.key==='Escape'){setPick(false);['tableModal','fileModal','confirmModal','imgModal','drawer','helpModal','partModal','gEdit'].forEach(function(id){$('#'+id).hidden=true;});return;}
  if(!selected)return;if(e.key.toLowerCase()==='r')rotateSel(e.shiftKey?0:1);else if(e.key==='Delete'||e.key==='Backspace')removeItem(selected);});

/* ================= connection map (second page) ================= */
var mapRoots={},mapKind='all';
/* edges at part level: one per link rule and resolved target part (a category target gives one edge per part in it) */
function mapEdges(){var E=[],st=new Map();
  (checks.links||[]).forEach(function(l){var s0=st.get(l.rl)||{n:0,bad:0,miss:0,len:0};s0.n++;if(l.missing)s0.miss++;else{if(!l.ok)s0.bad++;s0.len=Math.max(s0.len,l.len);}st.set(l.rl,s0);});
  P.parts.forEach(function(p){(p.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(!d||d.base!=='link')return;var k=nk(rl.t),tg=[];if(!k)return;
    var pt=(P.points||[]).filter(function(q){return !q.part&&(nk(q.id)===k||nk(q.name)===k);})[0];
    if(pt)tg=[{key:'pt:'+pt.id}];else P.parts.forEach(function(q){if(q!==p&&(nk(q.id)===k||nk(q.name)===k||nk(q.cat)===k))tg.push({key:q.id});});
    if(!tg.length)tg=[{key:'?:'+rl.t}];
    tg.forEach(function(x){E.push({a:p.id,b:x.key,kind:rl.k||'data',max:linkMax(rl),rl:rl,part:p,st:st.get(rl)||null});});});});
  return E;}
function nodeName(k){if(k.indexOf('pt:')===0){var q=(P.points||[]).filter(function(x){return 'pt:'+x.id===k;})[0];return '◎ '+(q?q.name:k.slice(3));}if(k.indexOf('?:')===0)return k.slice(2)+' ?';var p=P.parts.filter(function(x){return x.id===k;})[0];return p?p.name+(num(p.qty,1)>1?' ×'+num(p.qty,1):''):k;}
function edgeState(e){if(!e.st||!e.st.n)return 'idle';if(e.st.miss)return 'miss';return e.st.bad?'bad':'ok';}
/* tree per system: breadth-first from the chosen root; edges that close a loop are listed as extra links */
function buildTree(E,root){var adj={};E.forEach(function(e){(adj[e.a]=adj[e.a]||[]).push({to:e.b,e:e,dir:1});(adj[e.b]=adj[e.b]||[]).push({to:e.a,e:e,dir:-1});});
  var seen={},used=new Set(),forest=[];
  function grow(r){seen[r]=1;var node={k:r,kids:[],extra:[]},q=[node];while(q.length){var n=q.shift();(adj[n.k]||[]).forEach(function(x){if(used.has(x.e))return;used.add(x.e);if(seen[x.to]){n.extra.push(x);return;}seen[x.to]=1;var c={k:x.to,kids:[],extra:[],via:x};n.kids.push(c);q.push(c);});}return node;}
  if(root&&adj[root])forest.push(grow(root));
  Object.keys(adj).sort(function(a,b){return adj[b].length-adj[a].length;}).forEach(function(k){if(!seen[k])forest.push(grow(k));});return forest;}
function autoRoot(E){var deg={},inn={};E.forEach(function(e){deg[e.a]=(deg[e.a]||0)+1;deg[e.b]=(deg[e.b]||0)+1;inn[e.b]=(inn[e.b]||0)+1;});
  var ks=Object.keys(deg);if(!ks.length)return null;var mx=Math.max.apply(null,ks.map(function(k){return deg[k];}));
  if(mx<=2){var src=ks.filter(function(k){return !inn[k];});if(src.length)return src[0];}
  return ks.filter(function(k){return deg[k]===mx;})[0];}
function renderMap(){
  var box=$('#mapBody');if(!box||$('#mapView').hidden)return;box.textContent='';var E=mapEdges();
  setSeg('segMapKind',mapKind);
  var kinds=KINDS.filter(function(k){return E.some(function(e){return e.kind===k;});});
  if(!E.length)box.appendChild(el('p','fine',t('linkNone')));
  kinds.forEach(function(k){if(mapKind!=='all'&&mapKind!==k)return;var Ek=E.filter(function(e){return e.kind===k;});
    var sec=el('section','msys'),hd=el('div','head'),h=el('h3','',t('k_'+k)),sw=el('span','ksw');sw.style.background=KCOL[k];h.prepend(sw);hd.appendChild(h);
    var nb=Ek.filter(function(e){var s=edgeState(e);return s==='bad'||s==='miss';}).length;hd.appendChild(el('span','fine',Ek.length+' '+t('mapLinks')+(nb?' · '+nb+' '+t('mapBad'):'')));
    var nodes={};Ek.forEach(function(e){nodes[e.a]=1;nodes[e.b]=1;});var root=mapRoots[k]&&nodes[mapRoots[k]]?mapRoots[k]:autoRoot(Ek);
    var lr=el('label','f rootsel');lr.appendChild(el('span','',t('mapRoot')));var rs=el('select');rs.id='mroot_'+k;Object.keys(nodes).forEach(function(n){var o=el('option','',nodeName(n));o.value=n;rs.appendChild(o);});rs.value=root;rs.onchange=function(){mapRoots[k]=rs.value;renderMap();};lr.appendChild(rs);hd.appendChild(lr);
    sec.appendChild(hd);
    buildTree(Ek,root).forEach(function(n){var ul=el('ul','tree');ul.appendChild(treeLi(n));sec.appendChild(ul);});
    box.appendChild(sec);});
  var linked={};E.forEach(function(e){linked[e.a]=1;linked[e.b]=1;});var lone=P.parts.filter(function(p){return !linked[p.id];});
  if(lone.length&&mapKind==='all'){var s2=el('section','msys');s2.appendChild(el('h3','',t('mapLone')));var w=el('div');lone.forEach(function(p){w.appendChild(el('span','pill',p.name));});s2.appendChild(w);box.appendChild(s2);}
  renderMapForm();
}
function treeLi(n){var li=el('li'),row=el('div','mnode'+(selected&&INST_BY[selected]&&INST_BY[selected].part.id===n.k?' sel':''));
  var nm=el('button','mname',nodeName(n.k));nm.type='button';nm.onclick=function(){var p=P.parts.filter(function(x){return x.id===n.k;})[0];if(!p)return;var i=INST.filter(function(x){return x.part===p;})[0];if(i)select(i.iid);};row.appendChild(nm);
  if(n.via){var e=n.via.e,s=edgeState(e),tag=el('span','medge '+s);tag.dir='ltr';var mm=e.rl.m||'cable',rel=mm==='cable'?'':(mm==='above'||mm==='below')?((mm==='above')===(n.via.dir<0)?t('m_above'):t('m_below')):t('m_'+mm)+(mm==='via'&&e.rl.w?' '+portName(e.rl.w):'');
    var ports=[e.rl.pa?portName(e.rl.pa):'',e.rl.pb?portName(e.rl.pb):''].filter(Boolean).join(' ↔ ');
    tag.removeAttribute('dir');if(rel)tag.appendChild(el('span','',rel+' · '));var nu=el('span','',s==='idle'?'— / '+fmt(linkMax(e.rl))+' mm':s==='miss'?t('notPlaced'):fmt(e.st.len)+' / '+fmt(linkMax(e.rl))+' mm');nu.dir='ltr';tag.appendChild(nu);if(ports){var pp=el('span','',' · '+ports);pp.dir='ltr';tag.appendChild(pp);}row.appendChild(tag);
    var rm=btn('small danger mdel','✕',function(){e.part.rules=(e.part.rules||[]).filter(function(r){return r!==e.rl;});rulesChanged(true);});rm.title=t('mapDel');rm.setAttribute('aria-label',t('mapDel'));row.appendChild(rm);}
  li.appendChild(row);
  n.extra.forEach(function(x){li.appendChild(el('div','mextra','↺ '+t('mapAlso')+nodeName(x.to)+' · '+fmt(x.e.max)+' mm'));});
  if(n.kids.length){var ul=el('ul');n.kids.forEach(function(c){ul.appendChild(treeLi(c));});li.appendChild(ul);}return li;}
function renderMapForm(){var a=$('#mfFrom'),b=$('#mfTo'),kk=$('#mfKind');
  [a,b].forEach(function(s,ix){var keep=s.value;s.textContent='';P.parts.forEach(function(p){var o=el('option','',p.name);o.value=p.id;s.appendChild(o);});if(ix===1)(P.points||[]).filter(function(q){return !q.part;}).forEach(function(q){var o=el('option','','◎ '+q.name);o.value=q.id;s.appendChild(o);});if(keep)s.value=keep;});
  if(!kk.children.length||kk.dataset.l!==lang){kk.textContent='';kk.dataset.l=lang;KINDS.forEach(function(k){var o=el('option','',t('k_'+k));o.value=k;kk.appendChild(o);});}
  var mo=$('#mfMode'),mk=mo.value;mo.textContent='';modeOpts(kk.value||'data').forEach(function(k){var o=el('option','',t('m_'+k));o.value=k;mo.appendChild(o);});if(mk)mo.value=mk;if(mo.value!==mk)mo.selectedIndex=0;
  var wv=$('#mfWay'),wk=wv.value;wv.textContent='';var w0=el('option','','—');w0.value='';wv.appendChild(w0);(P.points||[]).forEach(function(q){var pp=q.part?P.parts.filter(function(x){return x.id===q.part;})[0]:null;var o=el('option','',(pp?pp.name+' · ':'◎ ')+q.name);o.value=q.id;wv.appendChild(o);});wv.value=wk;if(wv.value!==wk)wv.value='';$('#mfWayL').hidden=$('#mfMode').value!=='via';
  [['#mfPa',a.value],['#mfPb',b.value]].forEach(function(x){var ps=$(x[0]),keep=ps.value;ps.textContent='';var o0=el('option','',t('centre'));o0.value='';ps.appendChild(o0);(x[1]&&x[1]===framePartId()?activePoints():portsOf(x[1])).forEach(function(q){var o=el('option','',q.name);o.value=q.id;ps.appendChild(o);});ps.value=keep;if(ps.value!==keep)ps.value='';});}
var mapPickFor=null;
function mapPick(side){mapPickFor=side;showPage('3d');setPick(true);toast(t('tPortPick'));}
function addMapLink(){var a=$('#mfFrom').value,b=$('#mfTo').value,p=P.parts.filter(function(x){return x.id===a;})[0];if(!p||!b||a===b){toast(t('mapPick'));return;}
  var m=$('#mfMode').value,nr={r:'link',t:b,k:$('#mfKind').value};normLink(nr);if(m!=='cable')nr.m=m;var mx=$('#mfMax').value;if(mx!=='')nr.d=num(mx,300);if(m==='via'){if(!$('#mfWay').value){toast(t('tWay'));return;}nr.w=$('#mfWay').value;}if($('#mfPa').value)nr.pa=$('#mfPa').value;if($('#mfPb').value)nr.pb=$('#mfPb').value;p.rules=p.rules||[];p.rules.push(nr);rulesChanged(true);toast(t('mapAdded'));if(checks.links.some(function(l){return l.rl===nr&&!l.ok&&!l.missing;}))snapAll([nr]);}
/* ================= connection graph (third page): node cards with a socket per connection type, wires dragged between them ================= */
var G={s:1,tx:40,ty:40,drag:null,edges:[],sel:null};
function gState(){P.graph=P.graph||{pos:{},exp:{}};P.graph.pos=P.graph.pos||{};P.graph.exp=P.graph.exp||{};return P.graph;}
function gPartOf(key){var id=String(key).split('#')[0];return P.parts.filter(function(p){return p.id===id;})[0]||null;}
function gHasModel(){return !!(shell.n||framePart()||activePoints().length);}
function gNodes(){var g=gState(),fid=framePartId(),out=[];P.parts.forEach(function(p){if(p.id===fid)return;var n=unitCount(p);if(n>1&&g.exp[p.id]){for(var i=1;i<=n;i++)out.push({key:p.id+'#'+i,part:p,unit:i,label:p.name+' '+i});}else out.push({key:p.id,part:p,unit:0,label:p.name+(n>1?' ×'+n:'')});});
  if(gHasModel()){var fp=framePart(),S=curShell();out.push({key:'model',model:true,label:fp?fp.name:S?S.name:t('points')});}return out;}
/* node key that shows a link candidate */
function gKeyOfCand(c){if(c.pt&&!c.pt.part)return {key:'model',row:'pt:'+c.pt.id};if(c.frame&&!c.pt)return {key:'model',row:'centre'};if(c.inst){var g=gState();return {key:g.exp[c.inst.part.id]&&unitCount(c.inst.part)>1?c.inst.iid:c.inst.part.id,row:null};}return null;}
function gEdges(){var E=[],g=gState(),fid=framePartId();
  P.parts.forEach(function(p){if(p.id===fid)return;(p.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(!d||d.base!=='link')return;var C=linkCands(rl),n=unitCount(p),exp=n>1&&g.exp[p.id],seen={};
    var units=exp?INST.filter(function(i){return i.part===p;}):[INST.filter(function(i){return i.part===p;})[0]];
    units.forEach(function(inst){if(!inst)return;var lks=checks.links.filter(function(l){return l.rl===rl&&(!exp||l.from===inst.iid);});var tg=[];
      if(exp){var ix=pairPick(rl,inst,C);if(ix>=0)tg=[C[ix]];else{var l0=lks[0];if(l0&&!l0.missing){var c0=C.filter(function(c){return c.inst?c.inst.iid===l0.to:c.pt?c.pt.p===l0.B0||c.pt.p===l0.pt:false;})[0];tg=[c0||C[0]];}else tg=C.slice(0,1);}}
      else{var byKey={};C.forEach(function(c){var kk=gKeyOfCand(c);if(kk&&!byKey[kk.key+'|'+kk.row]){byKey[kk.key+'|'+kk.row]=1;tg.push(c);}});}
      tg.forEach(function(c){if(!c)return;var kk=gKeyOfCand(c);if(!kk)return;var src=exp?inst.iid:p.id,id=src+'>'+kk.key+'|'+kk.row+'|'+P.parts.indexOf(p)+'.'+p.rules.indexOf(rl);if(seen[id])return;seen[id]=1;
        var row=kk.row||(rl.pb&&c.inst?'port:'+(portByKey(rl.pb,c.inst.part.id)||{}).id:null);
        var bad=lks.some(function(l){return !l.ok&&!l.missing;}),miss=!lks.length||lks.every(function(l){return l.missing;});
        E.push({from:src,to:kk.key,toRow:row,fromRow:rl.pa?'port:'+(portByKey(rl.pa,p.id)||{}).id:null,kind:rl.k||'data',rl:rl,part:p,st:miss?'miss':bad?'bad':'ok',lks:lks});});});});});
  return E;}
function renderGraph(){var view=$('#graphView');if(!view||view.hidden||!P)return;var w=$('#gWorld');w.textContent='';var g=gState(),nodes=gNodes();
  var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.id='gWires';w.appendChild(svg);
  var need=nodes.some(function(n){return !g.pos[n.key];});if(need)gLayout(nodes,true);
  nodes.forEach(function(n){var d=el('div','gnode'+(n.model?' gmodel':'')+(selected&&INST_BY[selected]&&n.part&&INST_BY[selected].part===n.part?' sel':''));d.dataset.key=n.key;var ps=g.pos[n.key];d.style.left=ps[0]+'px';d.style.top=ps[1]+'px';
    var h=el('div','ghead');var sw=el('span','gsw');sw.style.background=n.model?theme.accent:catColor(n.part.cat);h.appendChild(sw);var nm=el('b','',n.label);nm.dir='auto';h.appendChild(nm);
    if(n.part&&unitCount(n.part)>1){var ex=el('button','gbtn',g.exp[n.part.id]?'⇇':'⇉');ex.type='button';ex.title=t(g.exp[n.part.id]?'gCollapse':'gExpand');ex.onclick=function(e){e.stopPropagation();g.exp[n.part.id]=!g.exp[n.part.id];touch();renderGraph();};h.appendChild(ex);}
    d.appendChild(h);
    if(!n.model)KINDS.forEach(function(k){var r=el('div','grow');r.dataset.row='kind:'+k;var si=el('span','gin');si.dataset.kind=k;si.style.borderColor=KCOL[k];r.appendChild(si);var lb=el('span','glab',t('k_'+k));r.appendChild(lb);var so=el('span','gout');so.dataset.kind=k;so.style.background=KCOL[k];so.title=t('gDragHint');r.appendChild(so);d.appendChild(r);});
    var rows=[];if(n.model){if(framePart())rows.push(['centre',t('gCentre')]);activePoints().forEach(function(q){rows.push(['pt:'+q.id,'◎ '+q.name]);});}else portsOf(n.part.id).forEach(function(q){rows.push(['port:'+q.id,'◉ '+q.name]);});
    rows.forEach(function(x){var r=el('div','grow gport');r.dataset.row=x[0];var si=el('span','gin');r.appendChild(si);var lb=el('span','glab',x[1]);lb.dir='auto';r.appendChild(lb);if(!n.model)r.appendChild(el('span','gnone'));d.appendChild(r);});
    var add=el('button','gadd',n.model?t('gAddPt'):t('gAddPort'));add.type='button';add.onclick=function(e){e.stopPropagation();gPickFor=n.model?'model':n.part.id;showPage('3d');setPick(true);toast(n.model?t('tPick'):t('tPortPick'));};d.appendChild(add);
    if(n.part)d.ondblclick=function(e){if(e.target.closest('.gout,.gbtn,.gadd'))return;openPart(n.part);};
    w.appendChild(d);});
  G.edges=gEdges();gApply();gWires();}
function gApply(){$('#gWorld').style.transform='translate('+G.tx+'px,'+G.ty+'px) scale('+G.s+')';}
function gSock(key,row,kind,side){var n=document.querySelector('#gWorld .gnode[data-key="'+String(key).replace(/"/g,'')+'"]');if(!n)return null;var r=null;
  if(row)r=n.querySelector('.grow[data-row="'+row+'"]');if(!r&&kind)r=n.querySelector('.grow[data-row="kind:'+kind+'"]');var s=r?r.querySelector(side==='out'?'.gout,.gnone':'.gin'):null;var el2=s||n.querySelector('.ghead');
  var wr=$('#gWorld').getBoundingClientRect(),b=el2.getBoundingClientRect();return [(b.left+b.width/2-wr.left)/G.s+(s?0:side==='out'?b.width/2/G.s:-b.width/2/G.s),(b.top+b.height/2-wr.top)/G.s];}
function gPath(a,b){var dx=Math.max(40,Math.abs(b[0]-a[0])*0.5);return 'M'+a[0]+','+a[1]+' C'+(a[0]+dx)+','+a[1]+' '+(b[0]-dx)+','+b[1]+' '+b[0]+','+b[1];}
function gWires(){var svg=$('#gWires');if(!svg)return;while(svg.firstChild)svg.removeChild(svg.firstChild);
  G.edges.forEach(function(e,ix){var a=gSock(e.from,e.fromRow,e.kind,'out'),b=gSock(e.to,e.toRow,e.kind,'in');if(!a||!b)return;
    var hit=document.createElementNS(svg.namespaceURI,'path');hit.setAttribute('d',gPath(a,b));hit.setAttribute('class','ghit');hit.dataset.ix=ix;svg.appendChild(hit);
    var p=document.createElementNS(svg.namespaceURI,'path');p.setAttribute('d',gPath(a,b));p.setAttribute('class','gwire '+e.st+(G.sel===e.rl?' on':''));p.style.stroke=e.st==='bad'?'var(--crit)':KCOL[e.kind]||KCOL.other;svg.appendChild(p);});
  if(G.drag&&G.drag.type==='wire'&&G.drag.cur){var tp=document.createElementNS(svg.namespaceURI,'path');tp.setAttribute('d',gPath(G.drag.a,G.drag.cur));tp.setAttribute('class','gwire temp');tp.style.stroke=KCOL[G.drag.kind];svg.appendChild(tp);}}
/* columns by how far a node is from the end of its chain (parts that others plug into sit to the right, like a material graph) */
function gLayout(nodes,onlyMissing){var g=gState(),E=gEdges(),out={};E.forEach(function(e){(out[e.from]=out[e.from]||[]).push(e.to);});var rk={},stack={};
  function rank(k){if(rk[k]!==undefined)return rk[k];if(stack[k])return 0;stack[k]=1;var r=0;(out[k]||[]).forEach(function(x){if(x!==k)r=Math.max(r,1+rank(x));});stack[k]=0;rk[k]=r;return r;}
  var mx=0;nodes.forEach(function(n){mx=Math.max(mx,rank(n.key));});var col={};
  nodes.forEach(function(n){var r=rank(n.key);(col[r]=col[r]||[]).push(n);});
  Object.keys(col).forEach(function(r){var y=20;col[r].sort(function(a,b){return String(a.part?a.part.cat:'~').localeCompare(String(b.part?b.part.cat:'~'))||a.label.localeCompare(b.label);}).forEach(function(n){var hgt=n.model?40+22*(activePoints().length+(framePart()?1:0)):40+18*KINDS.length+18*portsOf(n.part.id).length+22;
    if(!onlyMissing||!g.pos[n.key])g.pos[n.key]=[(mx-r)*290+20,y];y+=hgt+24;});});}
function gFit(){var ns=document.querySelectorAll('#gWorld .gnode');if(!ns.length)return;var g=gState(),x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity;ns.forEach(function(n){var p=g.pos[n.dataset.key];x0=Math.min(x0,p[0]);y0=Math.min(y0,p[1]);x1=Math.max(x1,p[0]+n.offsetWidth);y1=Math.max(y1,p[1]+n.offsetHeight);});
  var c=$('#gCanvas'),W=c.clientWidth,H=c.clientHeight;G.s=Math.max(0.25,Math.min(1.2,Math.min(W/(x1-x0+60),H/(y1-y0+60))));G.tx=(W-(x1-x0)*G.s)/2-x0*G.s;G.ty=20-y0*G.s;gApply();gWires();}
function gWorldPt(e){var wr=$('#gWorld').getBoundingClientRect();return [(e.clientX-wr.left)/G.s,(e.clientY-wr.top)/G.s];}
function gDown(e){if(e.button!==0)return;var tg=e.target;if(tg.closest&&tg.closest('#gEdit'))return;closeGEdit();
  var so=tg.closest('.gout');if(so){var nd=so.closest('.gnode');e.preventDefault();G.drag={type:'wire',from:nd.dataset.key,kind:so.dataset.kind,a:gSock(nd.dataset.key,null,so.dataset.kind,'out'),cur:gWorldPt(e)};gWires();return;}
  if(tg.closest('.gbtn,.gadd'))return;
  var hd=tg.closest('.gnode');if(hd){e.preventDefault();var p=gState().pos[hd.dataset.key];G.drag={type:'node',key:hd.dataset.key,s:p.slice(),m:[e.clientX,e.clientY],el:hd,moved:false};return;}
  if(tg.classList&&tg.classList.contains('ghit')){var ed=G.edges[+tg.dataset.ix];if(ed)openGEdit(ed,e);return;}
  G.drag={type:'pan',m:[e.clientX,e.clientY],s:[G.tx,G.ty]};}
function gMove(e){var d=G.drag;if(!d)return;
  if(d.type==='pan'){G.tx=d.s[0]+e.clientX-d.m[0];G.ty=d.s[1]+e.clientY-d.m[1];gApply();return;}
  if(d.type==='node'){var dx=(e.clientX-d.m[0])/G.s,dy=(e.clientY-d.m[1])/G.s;if(Math.abs(dx)+Math.abs(dy)>2)d.moved=true;var p=[Math.round(d.s[0]+dx),Math.round(d.s[1]+dy)];gState().pos[d.key]=p;d.el.style.left=p[0]+'px';d.el.style.top=p[1]+'px';gWires();return;}
  if(d.type==='wire'){d.cur=gWorldPt(e);gWires();document.querySelectorAll('.gnode.drop').forEach(function(n){n.classList.remove('drop');});var o=document.elementFromPoint(e.clientX,e.clientY),n2=o&&o.closest&&o.closest('.gnode');if(n2&&n2.dataset.key!==d.from)n2.classList.add('drop');}}
function gUp(e){var d=G.drag;G.drag=null;if(!d)return;document.querySelectorAll('.gnode.drop').forEach(function(n){n.classList.remove('drop');});
  if(d.type==='node'){if(d.moved)touch();return;}
  if(d.type!=='wire')return;var o=document.elementFromPoint(e.clientX,e.clientY),nd=o&&o.closest&&o.closest('.gnode');gWires();if(!nd||nd.dataset.key===d.from){gWires();return;}
  var row=o.closest('.grow');gConnect(d.from,d.kind,nd.dataset.key,row?row.dataset.row:null,e);}
/* make (or reuse) the link rule for a wire dropped from one node's type socket onto another node */
function gConnect(fromKey,kind,toKey,row,ev){var a=gPartOf(fromKey),fu=String(fromKey).indexOf('#')>0?+String(fromKey).split('#')[1]:0,nr={r:'link',k:kind};if(!a)return;
  if(toKey==='model'){var fp=framePart(),q=row&&row.indexOf('pt:')===0?(P.points||[]).filter(function(x){return 'pt:'+x.id===row;})[0]:null;
    /* by name: several points with one name (e.g. six arm tips) pair with the copies; a unique name is just that point */
    if(fp){nr.t=fp.id;if(q)nr.pb=q.name;}else if(q)nr.t=q.name;else{toast(t('gNeedPt'));return;}}
  else{var b=gPartOf(toKey);if(!b)return;if(b===a){toast(t('mapPick'));return;}nr.t=b.id;if(row&&row.indexOf('port:')===0)nr.pb=row.slice(5);}
  a.rules=a.rules||[];var same=a.rules.filter(function(r){return r.r==='link'&&nk(r.t)===nk(nr.t)&&(r.k||'data')===kind&&(r.pb||'')===(nr.pb||'');})[0],rl=same||nr;
  if(!same){if(kind==='mech')nr.m=nr.pb||toKey==='model'?'at':'above';a.rules.push(nr);}
  var tu=String(toKey).indexOf('#')>0?toKey:null,tq=toKey==='model'&&row&&row.indexOf('pt:')===0?row.slice(3):null;
  if(fu&&(tu||tq)){rulesChanged(true);var C=linkCands(rl),ix=C.findIndex(function(c){return tu?c.inst&&c.inst.iid===tu:c.pt&&c.pt.id===tq;});if(ix>=0){var n=unitCount(a);rl.u=(rl.u||[]).slice(0,n);while(rl.u.length<n)rl.u.push(0);
    /* swap: the copy that was on this target takes the one this copy leaves, so two copies don't share a target by accident */
    var eff=function(k){return rl.u[k-1]||(C.length===n?k:0);},was=eff(fu);for(var k=1;k<=n;k++)if(k!==fu&&eff(k)===ix+1&&was)rl.u[k-1]=was;rl.u[fu-1]=ix+1;}}
  rulesChanged(true);toast(same?t('gUpdated'):t('mapAdded'));setTimeout(function(){openGEdit({rl:rl,part:a},ev);},0);}
function closeGEdit(){var b=$('#gEdit');if(b)b.hidden=true;if(G.sel){G.sel=null;gWires();}}
function openGEdit(e,ev){var rl=e.rl,p=e.part,b=$('#gEdit'),bx=$('#gEditBody');G.sel=rl;gWires();bx.textContent='';
  var tgN=(function(){var q=P.parts.filter(function(x){return x.id===rl.t;})[0];if(q)return q.name;var pq=(P.points||[]).filter(function(x){return x.id===rl.t||nk(x.name)===nk(rl.t);})[0];return pq?'◎ '+pq.name:rl.t;})();
  var hd=el('p','',p.name+' → '+tgN);hd.style.cssText='margin:0;font-weight:600;font-size:13px';hd.dir='auto';bx.appendChild(hd);
  function selF(lbl,opts,val,fn){var l=el('label','f');l.appendChild(el('span','',lbl));var s=el('select');opts.forEach(function(o){var op=el('option','',o[1]);op.value=o[0];s.appendChild(op);});s.value=val;s.onchange=function(){fn(s.value);rulesChanged(true);openGEdit(e,null);};l.appendChild(s);bx.appendChild(l);}
  var tOpts=[];P.parts.forEach(function(q){if(q!==p)tOpts.push([q.id,q.name]);});var seenN={};activePoints().forEach(function(q){if(!seenN[q.name]&&!framePart()){seenN[q.name]=1;tOpts.push([q.name,'◎ '+q.name]);}});if(!tOpts.some(function(o){return o[0]===rl.t;}))tOpts.unshift([rl.t,rl.t]);
  selF(t('mapTo'),tOpts,rl.t,function(v){rl.t=v;delete rl.pb;delete rl.u;});
  selF(t('kind'),KINDS.map(function(k){return [k,t('k_'+k)];}),rl.k||'data',function(v){setKind(rl,v);});
  var isM=(rl.k||'data')==='mech';selF(isM?t('mWhere'):t('mCableT'),modeOpts(rl.k,rl.m||'cable').map(function(k){return [k,t('m_'+k)];}),rl.m||'cable',function(v){if(v==='cable')delete rl.m;else rl.m=v;delete rl.d;});
  var l=el('label','f');l.appendChild(el('span','',isM?t('limGap'):t('limLen')));var li=el('input');li.type='number';li.step='any';li.dir='ltr';li.placeholder=String(linkMax({m:rl.m}));li.value=rl.d===undefined?'':rl.d;li.onchange=function(){if(li.value==='')delete rl.d;else rl.d=num(li.value,300);rulesChanged(true);};l.appendChild(li);bx.appendChild(l);
  var pa=portsOf(p.id);if(pa.length)selF(t('gFromPort'),[['',t('centre')]].concat(pa.map(function(q){return [q.id,q.name];})),rl.pa||'',function(v){if(v)rl.pa=v;else delete rl.pa;});
  var tp=P.parts.filter(function(x){return x.id===rl.t;})[0],isF=tp&&tp.id===framePartId(),pb=tp?(isF?activePoints():portsOf(tp.id)):[],po=[],sn={};pb.forEach(function(q){var v=isF?q.name:q.id;if(sn[v])return;sn[v]=1;po.push([v,q.name+(isF&&pb.filter(function(x){return x.name===q.name;}).length>1?' (×'+pb.filter(function(x){return x.name===q.name;}).length+')':'')]);});
  var cur=rl.pb||'';if(cur&&!sn[cur]){var mq=pb.filter(function(q){return q.id===cur||nk(q.name)===nk(cur);})[0];if(mq)cur=isF?mq.name:mq.id;}
  if(po.length)selF(t('gToPort'),[['',isF?t('gCentre'):t('centre')]].concat(po),cur,function(v){if(v)rl.pb=v;else delete rl.pb;delete rl.u;});
  if(rl.m==='via')selF(t('mapWay'),[['','—']].concat((P.points||[]).map(function(q){return [q.id,q.name];})),rl.w||'',function(v){if(v)rl.w=v;else delete rl.w;});
  if(unitCount(p)>1){var C=linkCands(rl);if(C.length>1){var ur=el('div','pmunits');ur.appendChild(el('span','fine',t('units')+':'));
      for(var u=1;u<=unitCount(p);u++)(function(u){var lab=el('label','pmu');lab.appendChild(el('span','',String(u)+' →'));var sl=el('select'),o0=el('option','',t('unitAuto')+' ('+(C.length===unitCount(p)?C[u-1].label:t('nearest'))+')');o0.value='0';sl.appendChild(o0);
        C.forEach(function(c,ix){var o=el('option','',c.label);o.value=String(ix+1);sl.appendChild(o);});sl.value=String(rl.u&&rl.u[u-1]||0);
        sl.onchange=function(){var n=unitCount(p);rl.u=(rl.u||[]).slice(0,n);while(rl.u.length<n)rl.u.push(0);rl.u[u-1]=+sl.value;if(!rl.u.some(function(v){return v>0;}))delete rl.u;rulesChanged(true);openGEdit(e,null);};lab.appendChild(sl);ur.appendChild(lab);})(u);
      bx.appendChild(ur);}bx.appendChild(el('p','fine',t('unitHint')));}
  var lk=checks.links.filter(function(l){return l.rl===rl&&!l.missing;});if(lk.length){var bad=lk.filter(function(l){return !l.ok;}).length,st=el('p','fine',(bad?t('mapBad')+': '+bad+' / '+lk.length:'✓ '+lk.length)+' · '+fmt(lk[0].len)+' / '+fmt(lk[0].max)+' mm');if(bad)st.style.color='var(--crit)';bx.appendChild(st);
    if(bad)bx.appendChild(btn('small',t('snapOne'),function(){snapAll([rl]);openGEdit(e,null);}));}
  var rw=el('div','row');rw.appendChild(btn('small',t('editPart'),function(){closeGEdit();openPart(p);}));rw.appendChild(btn('small danger',t('mapDel'),function(){p.rules.splice(p.rules.indexOf(rl),1);closeGEdit();rulesChanged(true);}));rw.appendChild(btn('small solid',t('done'),closeGEdit));bx.appendChild(rw);
  b.hidden=false;b.dir=lang==='he'?'rtl':'ltr';if(ev){var cr=$('#gCanvas').getBoundingClientRect();b.style.left=Math.min(cr.width-296,Math.max(8,ev.clientX-cr.left+12))+'px';b.style.top=Math.min(cr.height-300,Math.max(8,ev.clientY-cr.top-20))+'px';}}
var gPickFor=null;
function gBind(){var c=$('#gCanvas');c.addEventListener('pointerdown',gDown);window.addEventListener('pointermove',function(e){if(G.drag&&!$('#graphView').hidden)gMove(e);});window.addEventListener('pointerup',function(e){if(G.drag&&!$('#graphView').hidden)gUp(e);});
  c.addEventListener('wheel',function(e){if(e.target.closest&&e.target.closest('#gEdit'))return;e.preventDefault();var r=c.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top,ns=Math.max(0.2,Math.min(2,G.s*(e.deltaY<0?1.1:1/1.1)));G.tx=mx-(mx-G.tx)*ns/G.s;G.ty=my-(my-G.ty)*ns/G.s;G.s=ns;gApply();},{passive:false});
  $('#gWide').onclick=function(){document.body.classList.toggle('gwide');setTimeout(function(){gWires();},50);};$('#gLayout').onclick=function(){gLayout(gNodes(),false);touch();renderGraph();gFit();};$('#gFit').onclick=gFit;
  $('#gExpAll').onclick=function(){var g=gState(),any=P.parts.some(function(p){return unitCount(p)>1&&!g.exp[p.id];});P.parts.forEach(function(p){if(unitCount(p)>1)g.exp[p.id]=any;});touch();renderGraph();};}

var curPage='3d';
function showPage(pg){curPage=pg;var map=pg==='map',gr=pg==='graph',skp=pg==='sketch';if(!gr)document.body.classList.remove('gwide');if(skp)document.body.classList.add('gwide');$('#mapView').hidden=!map;$('#graphView').hidden=!gr;$('#sketchView').hidden=!skp;$('#viewport').hidden=map||gr||skp;document.querySelectorAll('.only3d').forEach(function(e){e.hidden=map||gr||skp;});setSeg('segPage',pg);
  try{var hs=map?'#map':gr?'#graph':skp?'#sketch':'';if(location.hash!==hs)history.replaceState(null,'',hs||location.pathname+location.search);}catch(e){}
  if(skp)skOpen();else if(map)renderMap();else if(gr){var first=!$('#gWorld').children.length;renderGraph();if(first)gFit();}else{resize();requestRender();}}
/* ================= views ================= */
function sceneBounds(){var b=new THREE.Box3();if(shell.n)b.copy(shell.box);onList().forEach(function(i){var r=RT[i.iid];b.expandByPoint(new THREE.Vector3(r.min[0],r.min[1],r.min[2]));b.expandByPoint(new THREE.Vector3(r.max[0],r.max[1],r.max[2]));});
  if(b.isEmpty())b.set(new THREE.Vector3(-250,0,-250),new THREE.Vector3(250,400,250));b.min.y=Math.min(b.min.y,0);return b;}
function setOrtho(cam,view,w,h,b,pad){var c=b.getCenter(new THREE.Vector3()),s=b.getSize(new THREE.Vector3()),W,H;
  if(view==='front'){W=s.x;H=s.y;cam.position.set(c.x,c.y,c.z+6000);cam.up.set(0,1,0);}else if(view==='side'){W=s.z;H=s.y;cam.position.set(c.x+6000,c.y,c.z);cam.up.set(0,1,0);}else{W=s.x;H=s.z;cam.position.set(c.x,c.y+6000,c.z);cam.up.set(0,0,-1);}
  var k=Math.max((W+pad)/w,(H+pad)/h);cam.left=-w*k/2;cam.right=w*k/2;cam.top=h*k/2;cam.bottom=-h*k/2;cam.near=1;cam.far=20000;cam.zoom=1;cam.lookAt(c);cam.updateProjectionMatrix();return k;}
function setIso(cam,w,h,b){var c=b.getCenter(new THREE.Vector3()),r=b.getSize(new THREE.Vector3()).length()/2,dist=r/Math.sin(cam.fov*PI/360)*1.05;cam.aspect=w/h;if(cam.aspect<1)dist/=cam.aspect;cam.position.set(c.x+dist*0.55,c.y+dist*0.42,c.z+dist*0.72);cam.up.set(0,1,0);cam.lookAt(c);cam.updateProjectionMatrix();return c;}
function setView(name){
  ui.view=name;var w=vp.clientWidth||800,h=vp.clientHeight||600,b=sceneBounds();
  if(name==='iso'){camera=persp;var c=setIso(persp,w,h,b);controls.object=persp;controls.target.copy(c);controls.enableRotate=true;}
  else{camera=ortho;setOrtho(ortho,name,w,h,b,160);controls.object=ortho;controls.target.copy(b.getCenter(new THREE.Vector3()));controls.enableRotate=false;}
  controls.update();setSeg('segView',name);requestRender();
}
function resize(){var w=vp.clientWidth,h=vp.clientHeight;if(!w||!h)return;renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(w,h,false);
  persp.aspect=w/h;persp.updateProjectionMatrix();if(camera===ortho){var k=(ortho.top-ortho.bottom)/h;ortho.left=-w*k/2;ortho.right=w*k/2;ortho.updateProjectionMatrix();}requestRender();}
var needsRender=true;function requestRender(){needsRender=true;}
function updateTags(){var w=vp.clientWidth,h=vp.clientHeight;INST.forEach(function(i){var r=RT[i.iid],it=P.work.items[i.iid],show=ui.labels&&it.on;r.tag.hidden=!show;if(!show)return;
  _v.set(it.p[0],r.max[1],it.p[2]).project(camera);r.tag.style.left=((_v.x+1)/2*w)+'px';r.tag.style.top=((1-_v.y)/2*h)+'px';});}
function updatePtags(){var w=vp.clientWidth,h=vp.clientHeight,pts=activePoints();document.querySelectorAll('.ptag').forEach(function(e){var q=pts.filter(function(x){return x.id===e.dataset.pid;})[0];if(!q||!ui.pts){e.hidden=true;return;}e.hidden=false;_v.set(q.p[0],q.p[1],q.p[2]).project(camera);e.style.left=((_v.x+1)/2*w)+'px';e.style.top=((1-_v.y)/2*h)+'px';});}
function loop(){requestAnimationFrame(loop);if(!needsRender)return;needsRender=false;renderer.render(scene,camera);updateTags();updatePtags();updateLtags();}

/* ================= auto-arrange ================= */
function autoArrange(){
  INST.forEach(function(i){syncItem(i.iid);});
  var I=P.work.items,ref=refPoint(),sm=shell.n?shell.mass:0,total=(INST.reduce(function(s,i){return s+pmass(i.part);},0)+sm)||1;
  function hasBase(p,b){return (p.rules||[]).some(function(r){var d=ruleDef(r.r);return d&&d.base===b;});}
  var todo=INST.filter(function(i){return !hasBase(i.part,'ref')&&!I[i.iid].lock;});
  todo.forEach(function(i){I[i.iid].on=false;I[i.iid].why=null;syncItem(i.iid);});
  if(ui.onlyLinked&&anyLinks()){var LS=linkedSet();todo=todo.filter(function(i){return LS[i.part.id];});INST.forEach(function(i){if(!LS[i.part.id]&&!I[i.iid].lock&&I[i.iid].on){I[i.iid].on=false;syncItem(i.iid);}});}
  /* parts with a mechanical mount sit where the mount says: model/point targets first, then the free parts, then parts that sit on other parts */
  function mountRules(p){return (p.rules||[]).filter(function(rl){var d=ruleDef(rl.r);return d&&d.base==='link'&&MOUNT[rl.m]&&linkCands(rl).length;});}
  function onModel(p){return mountRules(p).every(function(rl){return linkCands(rl).every(function(c){return !c.inst;});});}
  var mounted=todo.filter(function(i){return mountRules(i.part).length;}),mA=mounted.filter(function(i){return onModel(i.part);}),mB=mounted.filter(function(i){return !onModel(i.part);}),placedM=0,failedM=0;
  todo=todo.filter(function(i){return mounted.indexOf(i)<0;});
  function mountPlace(list){if(!list.length)return;list.forEach(function(i){placeAtHome(i.iid);});runChecks();var rs=[];list.forEach(function(i){mountRules(i.part).forEach(function(rl){if(rs.indexOf(rl)<0)rs.push(rl);});});
    var tt=toast,cm=commit;toast=function(){};commit=function(){};try{snapAll(rs);}finally{toast=tt;commit=cm;}
    list.forEach(function(i){var it=I[i.iid],ls=checks.links.filter(function(l){return l.from===i.iid&&rs.indexOf(l.rl)>=0;});if(ls.length&&ls.every(function(l){return l.missing;})){it.on=false;failedM++;syncItem(i.iid);return;}
      it.why=t('whyMount')+mountRules(i.part).map(ruleName).join(', ')+'.';placedM++;});}
  mountPlace(mA);
  function rank(i){return hasBase(i.part,'trim')?3:INST.some(function(o){return o.part!==i.part&&insideRule(i.part,o.part);})?2:hasBase(i.part,'low')?0:1;}
  todo.sort(function(a,b){return rank(a)-rank(b)||pmass(b.part)-pmass(a.part);});
  function clrOf(p){var c=0;(p.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(d&&d.base==='clear')c=Math.max(c,num(rl.d,d.ds));});return c;}
  function farBetween(a,b){var m=0;(a.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(!d||d.base!=='far')return;var k=nk(rl.t);if(k&&(k===nk(b.id)||k===nk(b.name)||k===nk(b.cat)))m=Math.max(m,num(rl.d,d.ds));});return m;}
  /* search region */
  var R;if(shell.n){R={x0:shell.box.min.x,x1:shell.box.max.x,y0:shell.box.min.y,y1:shell.box.max.y,z0:shell.box.min.z,z1:shell.box.max.z};if(shell.role==='frame'){var mg=0.15*Math.max(R.x1-R.x0,R.y1-R.y0,R.z1-R.z0);R.x0-=mg;R.x1+=mg;R.y0-=mg;R.y1+=mg;R.z0-=mg;R.z1+=mg;}}
  else{var vol=INST.reduce(function(s,i){var z=psize(i.part);return s+z[0]*z[1]*z[2];},0),side=Math.max(200,Math.cbrt(vol*5));R={x0:ref[0]-side/2,x1:ref[0]+side/2,y0:0,y1:side,z0:ref[1]-side/2,z1:ref[1]+side/2};}
  var span=Math.max(R.x1-R.x0,R.y1-R.y0,R.z1-R.z0),step=Math.max(10,Math.ceil(span/22/5)*5),placed=0,failed=0;
  var ORI=[[0,0,0,1],[0,0,0.707107,0.707107],[0.707107,0,0,0.707107],[0,0.707107,0,0.707107]];
  todo.forEach(function(inst){
    var iid=inst.iid,it=I[iid],p=inst.part,r=RT[iid],m=pmass(p),best=null,bestS=Infinity,rules=p.rules||[];
    var clr=clrOf(p),others=onList().map(function(o){var ne=nested(p,o.part);return {q:RT[o.iid],nest:ne,need:ne?0:Math.max(clr,clrOf(o.part),farBetween(p,o.part),farBetween(o.part,p)),top:hasBase(o.part,'top')};});
    /* running centre of gravity of what is already placed */
    var cm=sm,cx=sm?sm*shell.cen[0]:0,cz=sm?sm*shell.cen[2]:0;onList().forEach(function(o){var k=pmass(o.part),q=I[o.iid].p;cm+=k;cx+=k*q[0];cz+=k*q[2];});
    /* placed parts that must connect to this one pull it toward them */
    var incoming=[];onList().forEach(function(o){(o.part.rules||[]).forEach(function(rl){var d=ruleDef(rl.r),k=nk(rl.t);if(d&&d.base==='link'&&k&&(k===nk(p.id)||k===nk(p.name)||k===nk(p.cat)))incoming.push({q:I[o.iid].p,r:RT[o.iid],D:linkMax(rl),m:rl.m||'cable'});});});
    var sibs=onList().filter(function(o){return o.part===p;}),mirror=null;if(sibs.length%2===1){var sp=I[sibs[sibs.length-1].iid].p;mirror=[2*ref[0]-sp[0],2*ref[1]-sp[2],sp[1]];}
    it.on=true;it.ext=false;
    if(mirror){it.q=I[sibs[sibs.length-1].iid].q.slice();it.p=[mirror[0],mirror[2],mirror[1]];syncItem(iid);
      var fine=!others.some(function(o){return !o.nest&&(collide(r,o.q)||(o.need&&gap(r,o.q)<o.need));});if(fine&&shell.n){shellTest(r);fine=!r.sHit&&!r.sOut;}
      if(fine)best={p:it.p.slice(),q:it.q};}
    function evalAt(x,y,z,h){
        if(x-h[0]<R.x0-0.01||x+h[0]>R.x1+0.01||y-h[1]<R.y0-0.01||y+h[1]>R.y1+0.01||z-h[2]<R.z0-0.01||z+h[2]>R.z1+0.01)return Infinity;
        it.p=[x,y,z];syncItem(iid);
        var okc=true,pen=0;for(var k=0;k<others.length;k++){var q=others[k].q;if(!others[k].nest&&(collide(r,q)||(others[k].need&&gap(r,q)<others[k].need))){okc=false;break;}
          if(others[k].top&&r.min[1]>=q.max[1]-0.5&&r.min[0]<q.max[0]&&r.max[0]>q.min[0]&&r.min[2]<q.max[2]&&r.max[2]>q.min[2])pen+=400;}
        if(!okc)return Infinity;if(shell.n){shellTest(r);if(r.sHit||r.sOut)return Infinity;}
        /* score: lower is better */
        var nx=(cx+m*x)/(cm+m),nz=(cz+m*z)/(cm+m),s=pen+Math.hypot(nx-ref[0],nz-ref[1])*(1+4*m/total)+0.02*Math.hypot(x-ref[0],z-ref[1])+0.01*(y-R.y0);
        for(var ri=0;ri<rules.length;ri++){var rl=rules[ri],d=ruleDef(rl.r);if(!d)continue;var D=num(rl.d,d.ds||0);
          if(d.base==='low')s+=(y-h[1]-R.y0)*2;else if(d.base==='high')s+=(R.y1-y-h[1])*2;
          else if(d.base==='center')s+=Math.hypot(x-ref[0],z-ref[1])*3;
          else if(d.base==='wall')s+=Math.min(r.min[0]-R.x0,R.x1-r.max[0],r.min[2]-R.z0,R.z1-r.max[2])*2;
          else if(d.base==='top'){s+=(R.y1-y-h[1])*0.5;}
          else if(d.base==='trim')s+=Math.hypot(nx-ref[0],nz-ref[1])*6;
          else if(d.base==='sym'&&mirror)s+=Math.hypot(x-mirror[0],z-mirror[1])*5+Math.abs(y-mirror[2])*5;
          else if(d.base==='link'){var lk=linkOf(inst,rl);if(!lk.missing)s+=relScore(r,lk.to?RT[lk.to]:{min:lk.pt,max:lk.pt},lk.mode,lk.max,lk.a,lk.pt,lk.path&&lk.path.length>2?lk.path[1]:null,[iid,lk.to]);}
          else if(d.base==='near'||d.base==='far'){var ts=targets(rl.t,iid);if(ts.length){var g=Math.min.apply(null,ts.map(function(q2){return gap(r,q2);}));
            if(d.base==='near')s+=Math.max(0,g-D)*3+g*0.2;}}
        }
        for(var ii=0;ii<incoming.length;ii++){var ic=incoming[ii];if(ic.m==='cable'){var qa=ic.q,dd=Math.hypot(qa[0]-x,qa[1]-y,qa[2]-z);s+=Math.max(0,dd-ic.D)*3+dd*0.1;}else if(ic.m!=='via')s+=relScore(ic.r,r,ic.m,ic.D,ic.q,[x,y,z],null,[]);}
        return s;
    }
    for(var oi=0;oi<ORI.length&&!best;oi++){
      it.q=ORI[oi];var h=halfExtents(psize(p),it.q);
      for(var y=R.y0+h[1];y<=R.y1-h[1]+0.01;y+=step)for(var x=R.x0+h[0];x<=R.x1-h[0]+0.01;x+=step)for(var z=R.z0+h[2];z<=R.z1-h[2]+0.01;z+=step){
        var sc=evalAt(x,y,z,h);if(sc<bestS){bestS=sc;best={p:[x,y,z],q:it.q};}
      }
      /* refine around the best grid cell in 5 mm steps */
      if(best){var improved=true,guard=0;while(improved&&guard++<60){improved=false;for(var ax=0;ax<3;ax++)for(var sg=-1;sg<=1;sg+=2){var c=best.p.slice();c[ax]+=sg*5;var s2=evalAt(c[0],c[1],c[2],h);if(s2<bestS-1e-6){bestS=s2;best={p:c,q:it.q};improved=true;}}}}
    }
    if(best){it.p=best.p;it.q=best.q;it.lock=false;var names=rules.filter(function(rl){var d=ruleDef(rl.r);return d&&d.base!=='manual';}).map(ruleName);
      it.why=names.length?t('whyRules')+names.join(', ')+'.':t('whyDefault');placed++;}
    else{it.on=false;failed++;}
    syncItem(iid);
  });
  var guard=0;while(mB.length&&guard++<6){var ready=mB.filter(function(i){return mountRules(i.part).every(function(rl){return linkCands(rl).some(function(c){return !c.inst||I[c.inst.iid].on||mB.indexOf(c.inst)<0;});});});if(!ready.length)ready=mB.slice();mountPlace(ready);mB=mB.filter(function(i){return ready.indexOf(i)<0;});}
  placed+=placedM;failed+=failedM;runChecks();
  selected=null;commit();setView(ui.view);toast(t('tAuto',placed,failed)+(!placed&&failed&&shell.n&&shell.role!=='frame'?' '+t('tTryFrame'):''));
}

/* ================= parts table ================= */
var COLS=[['id','cId','w-m'],['name','cName','w-l'],['model','cModel','w-l'],['cat','cCat','w-m'],['qty','cQty','w-s'],['x','cX','w-s'],['y','cY','w-s'],['z','cZ','w-s'],['mass','cMass','w-s'],['massE','cMassE','w-s'],['shape','cShape','w-m'],['rules','cRules','w-l'],['notes','cNotes','w-l'],['src','cSrc','w-l']];
var HEAD={id:['id','מזהה'],name:['name','שם','שם הרכיב','component','part'],model:['model','דגם'],cat:['category','cat','קטגוריה','group'],qty:['qty','quantity','כמות'],
  x:['x','length','length_x','x length','אורך','x אורך','x_mm'],y:['y','height','height_y','y height','גובה','y גובה','y_mm'],z:['z','width','width_z','z width','רוחב','z רוחב','z_mm'],
  mass:['mass','mass_kg','mass kg','weight','משקל','מסה','מסה ק"ג','משקל ק"ג'],massE:['mass_empty_kg','empty mass kg','empty mass','מסה ריק','מסה ריק ק"ג'],shape:['shape','צורה'],rules:['rules','כללים'],notes:['notes','הערות','note'],src:['source','מקור','מקור הנתון']};
function slug(s){return String(s||'').toLowerCase().trim().replace(/[^a-z0-9_֐-׿]+/g,'-').replace(/^-|-$/g,'');}
function newPart(o){o=o||{};var id=slug(o.id)||slug(o.name)||uid('c');var base=id,n=2;while(P.parts.some(function(p){return p.id===id;}))id=base+'-'+(n++);
  var sh=String(o.shape||'box').toLowerCase();sh=/x/.test(sh)&&/cyl|גליל/.test(sh)?'cylx':/z/.test(sh)&&/cyl|גליל/.test(sh)?'cylz':/cyl|גליל/.test(sh)?'cyly':'box';
  var p={id:id,name:String(o.name||id),model:String(o.model||''),cat:String(o.cat||''),qty:Math.max(1,Math.round(num(o.qty,1))),size:[num(o.x,50),num(o.y,50),num(o.z,50)],mass:num(o.mass,0),shape:sh,rules:Array.isArray(o.rules)?o.rules:parseRules(o.rules),notes:String(o.notes||''),src:String(o.src||'')};
  if(o.massE!==undefined&&o.massE!==''&&o.massE!==null&&isFinite(Number(o.massE)))p.massE=Number(o.massE);return p;}
function partsChanged(){histLater();normAll();rebuildInst();buildRuntime();syncAll();refreshUI();touch();}
function setPartField(p,k,v){
  if(k==='x')p.size[0]=num(v,p.size[0]);else if(k==='y')p.size[1]=num(v,p.size[1]);else if(k==='z')p.size[2]=num(v,p.size[2]);
  else if(k==='qty')p.qty=Math.max(1,Math.round(num(v,1)));else if(k==='mass')p.mass=num(v,0);
  else if(k==='massE'){if(v==='')delete p.massE;else p.massE=num(v,0);}
  else if(k==='shape')p.shape=v;
  else if(k==='id'){var nid=slug(v);if(nid&&!P.parts.some(function(q){return q!==p&&q.id===nid;})){var old=p.id;p.id=nid;var it=P.work.items,ni={};Object.keys(it).forEach(function(key){ni[key===old?nid:key.indexOf(old+'#')===0?nid+key.slice(old.length):key]=it[key];});P.work.items=ni;
    (P.points||[]).forEach(function(q){if(q.part===old)q.part=nid;});P.shells.forEach(function(S){if(S.part===old)S.part=nid;});}}
  else p[k]=v;
  P.example=false;partsChanged();if(k==='mass'||k==='qty'){rebuildShell();syncAll();refreshUI();}}
/* part window: every value of one part, its rules, and the connections from and to it */
var pmPart=null;
function openPart(p){pmPart=p;renderPart();$('#partModal').hidden=false;}
function incomingTo(p){var out=[];P.parts.forEach(function(q){if(q===p)return;(q.rules||[]).forEach(function(rl){var d=ruleDef(rl.r),k=nk(rl.t);if(d&&d.base==='link'&&k&&(k===nk(p.id)||k===nk(p.name)||k===nk(p.cat)))out.push({q:q,rl:rl});});});return out;}
function renderPart(){var p=pmPart;if(!p||P.parts.indexOf(p)<0){$('#partModal').hidden=true;return;}
  $('#pmTitle').textContent=p.name+(p.id===framePartId()?' · '+t('frameModel'):'');
  var f=$('#pmFields');f.textContent='';
  COLS.forEach(function(c){var k=c[0];if(k==='rules')return;var l=el('label','f'+(k==='name'||k==='model'||k==='notes'||k==='src'?' wide':''));l.appendChild(el('span','',t(c[1])));var inp;
    if(k==='shape'){inp=el('select');[['box','shBox'],['cylx','shCylX'],['cyly','shCylY'],['cylz','shCylZ']].forEach(function(o){var op=el('option','',t(o[1]));op.value=o[0];inp.appendChild(op);});inp.value=p.shape||'box';}
    else{inp=el('input');var isNum=['qty','x','y','z','mass','massE'].indexOf(k)>=0;inp.type=isNum?'number':'text';if(isNum||k==='id'){inp.step='any';inp.dir='ltr';}inp.value=k==='x'?p.size[0]:k==='y'?p.size[1]:k==='z'?p.size[2]:(p[k]===undefined?'':p[k]);}
    inp.onchange=function(){setPartField(p,k,inp.value);if(!$('#tableModal').hidden)renderGrid();renderPart();};l.appendChild(inp);f.appendChild(l);});
  var ta=$('#pmRules');ta.value=rulesText(p.rules);
  ta.onchange=function(){var segs=ta.value.split(/[;\n]/).map(function(x){return x.trim();}).filter(Boolean),bad=segs.filter(function(x){return !ruleDef(x.split(':')[0].trim());});
    if(bad.length){toast(t('tBadRules',bad.join(', ')));ta.value=rulesText(p.rules);return;}p.rules=parseRules(ta.value);rulesChanged(true);renderPart();};
  $('#pmDel').onclick=function(){confirmBox(t('qDelPart',p.name),function(){incomingTo(p).forEach(function(x){if(nk(x.rl.t)!==nk(p.cat))x.q.rules.splice(x.q.rules.indexOf(x.rl),1);});P.parts.splice(P.parts.indexOf(p),1);P.points=(P.points||[]).filter(function(q){return q.part!==p.id;});P.shells.forEach(function(S){if(S.part===p.id)delete S.part;});$('#partModal').hidden=true;selected=null;partsChanged();rebuildShell();syncAll();commit();renderShells();if(!$('#tableModal').hidden)renderGrid();});};
  var box=$('#pmLinks');box.textContent='';
  var rows=[];(p.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(d&&d.base==='link')rows.push({own:p,rl:rl,out:true});});incomingTo(p).forEach(function(x){rows.push({own:x.q,rl:x.rl,out:false});});
  if(!rows.length)box.appendChild(el('p','fine',t('pmNoLinks')));
  rows.forEach(function(x){var rl=x.rl,r=el('div','pmrow'),other=x.out?nodeName(P.parts.some(function(q){return q.id===rl.t;})?rl.t:'?:'+rl.t):x.own.name;
    if(x.out&&!P.parts.some(function(q){return q.id===rl.t;})){var pq=(P.points||[]).filter(function(q){return nk(q.id)===nk(rl.t)||nk(q.name)===nk(rl.t);})[0];other=pq?'◎ '+pq.name:rl.t;}
    var dt=el('span','dot');dt.style.background=KCOL[rl.k||'data']||KCOL.other;r.appendChild(dt);
    r.appendChild(el('span','pmname',(x.out?'→ ':'← ')+other));
    var ks=el('select');KINDS.forEach(function(k){var o=el('option','',t('k_'+k));o.value=k;ks.appendChild(o);});ks.value=rl.k||'data';ks.onchange=function(){setKind(rl,ks.value);rulesChanged(true);renderPart();};r.appendChild(ks);
    var ms=el('select');modeOpts(rl.k,rl.m||'cable').forEach(function(k){var o=el('option','',t('m_'+k));o.value=k;ms.appendChild(o);});ms.value=rl.m||'cable';ms.onchange=function(){if(ms.value==='cable')delete rl.m;else rl.m=ms.value;delete rl.d;rulesChanged(true);renderPart();};r.appendChild(ms);
    var li=el('input');li.type='number';li.step='any';li.dir='ltr';li.className='w-s';li.placeholder=String(linkMax({m:rl.m}));li.value=rl.d===undefined||rl.d===''?'':rl.d;li.title=t('mapMax');li.onchange=function(){if(li.value==='')delete rl.d;else rl.d=num(li.value,300);rulesChanged(true);renderPart();};r.appendChild(li);
    var ls=checks.links.filter(function(l){return l.rl===rl;}),st=el('span','mono');st.dir='ltr';
    if(!ls.length||ls.every(function(l){return l.missing;}))st.textContent='—';else{var bad=ls.filter(function(l){return !l.ok&&!l.missing;});st.textContent=fmt(ls[0].len)+' / '+fmt(ls[0].max);if(bad.length)st.style.color='var(--crit)';}
    r.appendChild(st);
    if(ls.some(function(l){return !l.ok&&!l.missing;}))r.appendChild(btn('small',t('snapOne'),function(){snapAll([rl]);renderPart();}));
    r.appendChild(btn('small danger','✕',function(){x.own.rules.splice(x.own.rules.indexOf(rl),1);rulesChanged(true);renderPart();}));
    box.appendChild(r);
    if(x.out&&unitCount(p)>1){var C=linkCands(rl);if(C.length>1){var ur=el('div','pmunits');ur.appendChild(el('span','fine',t('units')+':'));
      for(var u=1;u<=unitCount(p);u++)(function(u){var lab=el('label','pmu');lab.appendChild(el('span','',String(u)+' →'));var sel=el('select'),o0=el('option','',t('unitAuto')+' ('+(C.length===unitCount(p)?C[u-1].label:t('nearest'))+')');o0.value='0';sel.appendChild(o0);
        C.forEach(function(c,ix){var o=el('option','',c.label);o.value=String(ix+1);sel.appendChild(o);});sel.value=String(rl.u&&rl.u[u-1]||0);
        sel.onchange=function(){var n=unitCount(p);rl.u=(rl.u||[]).slice(0,n);while(rl.u.length<n)rl.u.push(0);rl.u[u-1]=+sel.value;if(!rl.u.some(function(v){return v>0;}))delete rl.u;rulesChanged(true);renderPart();};lab.appendChild(sel);ur.appendChild(lab);})(u);
      box.appendChild(ur);}}
  });
  if(rows.some(function(x){return x.out&&unitCount(p)>1;}))box.appendChild(el('p','fine',t('unitHint')));
  renderPattern(p);
}
/* pattern: lay the copies of one part around an axis (of a part, the model or the reference point) or in a row */
function renderPattern(p){var box=$('#pmPat');box.textContent='';$('#pmPatWrap').hidden=unitCount(p)<2;if(unitCount(p)<2)return;
  var pt=p.pat=p.pat||{type:'circ',around:'ref',axis:'y',r:'',a0:'',step:100,rot:true};
  var f=el('div','fields');
  function sel(lbl,key,opts){var l=el('label','f');l.appendChild(el('span','',t(lbl)));var s2=el('select');opts.forEach(function(o){var op=el('option','',o[1]);op.value=o[0];s2.appendChild(op);});s2.value=pt[key];s2.onchange=function(){pt[key]=s2.value;touch();renderPattern(p);};l.appendChild(s2);f.appendChild(l);}
  function inp(lbl,key,ph){var l=el('label','f');l.appendChild(el('span','',t(lbl)));var i2=el('input');i2.type='number';i2.step='any';i2.dir='ltr';i2.value=pt[key];if(ph!==undefined)i2.placeholder=ph;i2.onchange=function(){pt[key]=i2.value===''?'':num(i2.value,0);touch();};l.appendChild(i2);f.appendChild(l);}
  sel('kind','type',[['circ',t('patCirc')],['lin',t('patLin')]]);
  sel('patAxis','axis',[['x','X'],['y','Y'],['z','Z']]);
  if(pt.type==='circ'){var ar=[['ref',t('patRef')]];if(shell.n)ar.push(['model',t('patModel')]);INST.forEach(function(i){if(i.part!==p&&P.work.items[i.iid].on)ar.push([i.iid,i.label]);});if(!ar.some(function(a){return a[0]===pt.around;}))pt.around='ref';
    sel('patAround','around',ar);var g=patGuess(p);inp('patR','r',g?fmt(g.r):'');inp('patA0','a0',g?fmt(g.a):'');}
  else inp('patStep','step');
  box.appendChild(f);var ck=el('label','row fine');ck.style.flexWrap='nowrap';var cb=el('input');cb.type='checkbox';cb.style.width='auto';cb.checked=pt.rot!==false;cb.onchange=function(){pt.rot=cb.checked;touch();};ck.appendChild(cb);ck.appendChild(el('span','',t('patRot')));if(pt.type==='circ')box.appendChild(ck);
  box.appendChild(btn('small solid',t('patGo'),function(){applyPattern(p);renderPart();}));box.appendChild(el('p','fine',t('patHint')));}
function patCentre(pt){if(pt.around==='model'&&shell.n){var c=shell.box.getCenter(new THREE.Vector3());return [c.x,c.y,c.z];}if(INST_BY[pt.around]&&P.work.items[pt.around].on)return P.work.items[pt.around].p.slice();var r=checks.ref;return [r[0],0,r[1]];}
function patPlane(ax){return ax==='x'?[1,2]:ax==='z'?[0,1]:[0,2];}
/* radius and angle of copy 1 around the chosen centre, used as defaults */
function patGuess(p){var it=P.work.items[p.id+'#1'];if(!it||!it.on)return null;var c=patCentre(p.pat),pl=patPlane(p.pat.axis),du=it.p[pl[0]]-c[pl[0]],dv=it.p[pl[1]]-c[pl[1]];return {r:Math.hypot(du,dv),a:Math.atan2(dv,du)*180/PI};}
function applyPattern(p){var pt=p.pat,n=unitCount(p),first=P.work.items[p.id+'#1'];if(!first.on)placeAtHome(p.id+'#1');
  var ax=pt.axis||'y',ai=ax==='x'?0:ax==='y'?1:2,base=first.p.slice(),q1=new THREE.Quaternion(first.q[0],first.q[1],first.q[2],first.q[3]),moved=[];
  var c=patCentre(pt),pl=patPlane(ax),g=patGuess(p)||{r:300,a:0},r=pt.r===''||pt.r===undefined?g.r:num(pt.r,g.r),a0=(pt.a0===''||pt.a0===undefined?g.a:num(pt.a0,0))*PI/180,sgn=ax==='y'?-1:1;
  for(var i=0;i<n;i++){var iid=p.id+'#'+(i+1),it=P.work.items[iid];if(it.lock&&i>0)continue;var old=it.on?it.p.slice():null,np=base.slice(),nq=first.q.slice();
    if(pt.type==='lin'){np[ai]=base[ai]+i*num(pt.step,100);}
    else{var a=a0+i*2*PI/n;np[pl[0]]=c[pl[0]]+r*Math.cos(a);np[pl[1]]=c[pl[1]]+r*Math.sin(a);
      if(pt.rot!==false){var rq=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(ai===0?1:0,ai===1?1:0,ai===2?1:0),sgn*(a-a0)).multiply(q1);nq=[rq.x,rq.y,rq.z,rq.w].map(function(v){return Math.round(v*1e6)/1e6;});}}
    it.on=true;it.p=np.map(function(v){return Math.round(v*100)/100;});it.q=nq;it.why=null;syncItem(iid);moved.push(iid);
    /* parts fixed onto this copy come along */
    if(old){var keep=ui.enforce;ui.enforce=true;var fl=followers(iid);ui.enforce=keep;fl.forEach(function(f2){if(f2===iid||INST_BY[f2].part===p)return;var fi=P.work.items[f2];fi.p=[0,1,2].map(function(a2){return Math.round((fi.p[a2]+it.p[a2]-old[a2])*100)/100;});syncItem(f2);});}}
  var only=[];P.parts.forEach(function(q){(q.rules||[]).forEach(function(rl){var d=ruleDef(rl.r);if(d&&d.base==='link'&&FOLLOW[rl.m]&&nk(rl.t)&&(nk(rl.t)===nk(p.id)||nk(rl.t)===nk(p.name)))only.push(rl);});});
  runChecks();if(only.length&&checks.links.some(function(l){return only.indexOf(l.rl)>=0&&!l.ok&&!l.missing;})){var tt=toast;toast=function(){};try{snapAll(only);}finally{toast=tt;}}else commit();toast(t('tPat',moved.length));}
function renderGrid(){
  var tb=$('#grid');tb.textContent='';var tr=el('tr');COLS.forEach(function(c){tr.appendChild(el('th','',t(c[1])));});tr.appendChild(el('th',''));var th=el('thead');th.appendChild(tr);tb.appendChild(th);
  var body=el('tbody');
  P.parts.forEach(function(p,ri){var r=el('tr');
    COLS.forEach(function(c){var td=el('td'),k=c[0],inp;
      if(k==='shape'){inp=el('select');[['box','shBox'],['cylx','shCylX'],['cyly','shCylY'],['cylz','shCylZ']].forEach(function(o){var op=el('option','',t(o[1]));op.value=o[0];inp.appendChild(op);});inp.value=p.shape||'box';inp.onchange=function(){p.shape=inp.value;partsChanged();};}
      else if(k==='rules'){inp=btn('small',(p.rules||[]).length?(p.rules||[]).map(function(x){return x.r;}).join(', '):'+ '+t('cRules'),function(){openDrawer(p);});inp.style.maxWidth='170px';inp.style.overflow='hidden';inp.style.textOverflow='ellipsis';}
      else{inp=el('input');var isNum=['qty','x','y','z','mass','massE'].indexOf(k)>=0;inp.type=isNum?'number':'text';if(isNum){inp.step='any';inp.dir='ltr';}
        inp.value=k==='x'?p.size[0]:k==='y'?p.size[1]:k==='z'?p.size[2]:(p[k]===undefined?'':p[k]);
        if(k==='id'){inp.dir='ltr';}
        inp.onchange=function(){setPartField(p,k,inp.value);if(k==='id')inp.value=p.id;};}
      inp.classList.add(c[2]);inp.id='g_'+ri+'_'+k;td.appendChild(inp);r.appendChild(td);});
    var td=el('td');td.appendChild(btn('small danger','✕',function(){P.parts.splice(ri,1);partsChanged();renderGrid();}));r.appendChild(td);body.appendChild(r);});
  tb.appendChild(body);
}
function rowsToParts(rows){ /* rows: array of arrays, first row headers */
  if(!rows.length)return [];var hdr=rows[0].map(function(h){return String(h||'').toLowerCase().trim();}),map={};
  Object.keys(HEAD).forEach(function(k){var i=-1;HEAD[k].some(function(a){i=hdr.indexOf(a);return i>=0;});if(i>=0)map[k]=i;});
  if(map.name===undefined&&map.id===undefined)return [];
  var out=[];rows.slice(1).forEach(function(r){var o={};Object.keys(map).forEach(function(k){o[k]=r[map[k]];});if(!String(o.name||o.id||'').trim())return;if(/^\s*#/.test(String(o.id||o.name)))return;out.push(o);});return out;
}
function addRows(objs,replace){if(!objs.length){toast(t('tNoRows'));return;}if(replace){P.parts=[];P.work.items={};}objs.forEach(function(o){P.parts.push(newPart(o));});P.example=false;partsChanged();renderGrid();renderProjects();toast(t('tRows',objs.length));}
function importTable(file){file.arrayBuffer().then(function(buf){var wb=XLSX.read(buf,{type:'array'}),ws=wb.Sheets[wb.SheetNames[0]],rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});addRows(rowsToParts(rows),$('#pasteReplace').checked);}).catch(function(){toast(t('tBad')+file.name);});}
function templateBlob(){
  var h=['id','name','model','category','qty','length_x','height_y','width_z','mass_kg','mass_empty_kg','shape','rules','notes','source'];
  var rows=[h,['# example','Battery','','Power',1,200,50,120,2,'','box','low; top','delete this row','example, not real data'],['# example','Tank','','Fluid',1,160,200,160,4.5,0.5,'cylinder y','center:20','delete this row','example, not real data']];
  var ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=h.map(function(){return {wch:16};});
  var rr=[['code','name','needs target','default distance mm','what it means','how to write it']];
  bank().forEach(function(r){rr.push([r.id,r.n[1]||r.n[0],r.tg?'yes':'',r.ds!==undefined?r.ds:'',r.d[1]||r.d[0],r.tg?r.id+':<part id>:'+r.ds:(r.ds!==undefined?r.id+':'+r.ds:r.id)]);});
  var ws2=XLSX.utils.aoa_to_sheet(rr);ws2['!cols']=[{wch:10},{wch:30},{wch:12},{wch:18},{wch:90},{wch:26}];
  var wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'components');XLSX.utils.book_append_sheet(wb,ws2,'rules');
  return new Blob([XLSX.write(wb,{bookType:'xlsx',type:'array'})],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
}

/* ================= rule bank drawer ================= */
var drawerPart=null;
function openDrawer(p){drawerPart=p||null;$('#drawer').hidden=false;renderDrawer();}
function renderDrawer(){
  var p=drawerPart,box=$('#ruleList');box.textContent='';$('#drawerFor').textContent=p?t('forPart')+p.name:t('bankOnly');
  var sel=$('#nrBase');if(!sel.children.length||sel.dataset.l!==lang){sel.textContent='';sel.dataset.l=lang;BANK.filter(function(r){return r.id===r.base||r.base==='manual'&&r.id==='los';}).forEach(function(r){var o=el('option','',r.base==='manual'?t('manual'):r.n[lang==='he'?0:1]);o.value=r.base;sel.appendChild(o);});}
  bank().forEach(function(d){
    var cur=p?(p.rules||[]).filter(function(r){return r.r===d.id;})[0]:null,card=el('div','rule'+(cur?' onr':'')),h=el('h4');
    if(p){var cb=el('input');cb.type='checkbox';cb.id='rk_'+d.id;cb.style.width='auto';cb.checked=!!cur;cb.onchange=function(){p.rules=p.rules||[];if(cb.checked){var nr={r:d.id};if(d.tg)nr.t='';if(d.ds!==undefined)nr.d=d.ds;p.rules.push(nr);}else p.rules=p.rules.filter(function(r){return r.r!==d.id;});rulesChanged();};h.appendChild(cb);}
    var lb=el('label','',d.n[lang==='he'?0:1]||d.n[0]);if(p)lb.htmlFor='rk_'+d.id;h.appendChild(lb);var cd=el('span','code',d.id);cd.dir='ltr';h.appendChild(cd);
    if(d.custom){h.appendChild(el('span','pill',t('custom')));h.appendChild(btn('small danger','✕',function(){P.customRules=P.customRules.filter(function(x){return x!==d;});P.parts.forEach(function(q){q.rules=(q.rules||[]).filter(function(r){return r.r!==d.id;});});rulesChanged();}));}
    card.appendChild(h);card.appendChild(el('p','',d.d[lang==='he'?0:1]||d.d[0]));
    if(cur&&(d.tg||(d.ds!==undefined&&d.base!=='manual'))){var row=el('div','fields');
      if(d.tg){var l=el('label','f');l.appendChild(el('span','',t('target')));var s=el('select');s.id='rt_'+d.id;var o0=el('option','','—');o0.value='';s.appendChild(o0);
        function grp(label,items){if(!items.length)return;var g=el('optgroup');g.label=label;items.forEach(function(x){var o=el('option','',x[1]);o.value=x[0];g.appendChild(o);});s.appendChild(g);}
        grp(t('optParts'),P.parts.filter(function(q){return q!==p;}).map(function(q){return [q.id,q.name];}));grp(t('optPoints'),(P.points||[]).filter(function(q){return !q.part;}).map(function(q){return [q.id,q.name];}));grp(t('optCats'),cats().filter(function(c){return c!=='—';}).map(function(c){return [c,c];}));
        s.value=cur.t||'';if(cur.t&&s.value!==cur.t){[].some.call(s.options,function(o){if(nk(o.value)===nk(cur.t)){s.value=o.value;return true;}});}s.onchange=function(){cur.t=s.value;rulesChanged(true);};l.appendChild(s);row.appendChild(l);}
      if(d.ds!==undefined){var l2=el('label','f');l2.appendChild(el('span','',t('dist')));var i=el('input');i.type='number';i.id='rd_'+d.id;i.min=0;i.step=5;i.value=num(cur.d,d.ds);i.onchange=function(){cur.d=num(i.value,d.ds);rulesChanged(true);};l2.appendChild(i);row.appendChild(l2);}
      if(d.base==='link'){var l3=el('label','f');l3.appendChild(el('span','',t('kind')));var ks=el('select');ks.id='rk2_'+d.id;KINDS.forEach(function(k){var o=el('option','',t('k_'+k));o.value=k;ks.appendChild(o);});ks.value=cur.k||'data';ks.onchange=function(){cur.k=ks.value;rulesChanged(true);};l3.appendChild(ks);row.appendChild(l3);
        var l4=el('label','f');l4.appendChild(el('span','',t('mode')));var ms=el('select');ms.id='rk3_'+d.id;modeOpts(cur.k,cur.m||'cable').forEach(function(k){var o=el('option','',t('m_'+k));o.value=k;ms.appendChild(o);});ms.value=cur.m||'cable';ms.onchange=function(){cur.m=ms.value;rulesChanged(true);};l4.appendChild(ms);row.appendChild(l4);}
      card.appendChild(row);}
    box.appendChild(card);});
}
function rulesChanged(keep){P.example=false;histLater();normAll();if(!$('#partModal').hidden)setTimeout(renderPart,0);autoShow();runChecks();snapMounts();refreshUI();requestRender();touch();if(!$('#tableModal').hidden)renderGrid();if(!keep)renderDrawer();}

/* ================= CAD file import ================= */
var pending=[],occtP=null;
function loadOcct(){
  if(occtP)return occtP;toast(t('tStep'));
  occtP=new Promise(function(res,rej){var s=document.createElement('script');s.src='lib/occt-import-js.js';s.onload=function(){try{window.occtimportjs({locateFile:function(n){return 'lib/'+n;}}).then(res,rej);}catch(e){rej(e);}};s.onerror=rej;document.head.appendChild(s);});
  occtP.catch(function(){occtP=null;});return occtP;
}
function parseCad(name,buf){
  if(/\.stl$/i.test(name)){var g=new THREE.STLLoader().parse(buf);if(g.index)g=g.toNonIndexed();return Promise.resolve(new Float32Array(g.attributes.position.array));}
  if(/\.obj$/i.test(name)){var obj=new THREE.OBJLoader().parse(new TextDecoder().decode(buf)),arr=[];obj.updateMatrixWorld(true);
    obj.traverse(function(o){if(o.isMesh){var gg=o.geometry.index?o.geometry.toNonIndexed():o.geometry,pa=gg.attributes.position;for(var i=0;i<pa.count;i++)arr.push(pa.getX(i),pa.getY(i),pa.getZ(i));}});return Promise.resolve(new Float32Array(arr));}
  if(/\.(step|stp)$/i.test(name))return loadOcct().then(function(occt){var r=occt.ReadStepFile(new Uint8Array(buf),null);if(!r||!r.success)throw new Error('step');var arr=[];
    r.meshes.forEach(function(m){var pos=m.attributes.position.array,idx=m.index?m.index.array:null;if(idx)for(var i=0;i<idx.length;i++){var k=idx[i]*3;arr.push(pos[k],pos[k+1],pos[k+2]);}else for(var j=0;j<pos.length;j++)arr.push(pos[j]);});return new Float32Array(arr);});
  return Promise.reject(new Error('type'));
}
function guessKind(pos){ /* signed volume vs bounding box: thin-walled shells fill little of their box */
  var v=0,mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];
  for(var i=0;i<pos.length;i+=9){v+=(pos[i]*(pos[i+4]*pos[i+8]-pos[i+5]*pos[i+7])-pos[i+1]*(pos[i+3]*pos[i+8]-pos[i+5]*pos[i+6])+pos[i+2]*(pos[i+3]*pos[i+7]-pos[i+4]*pos[i+6]))/6;
    for(var k=0;k<9;k++){var a=k%3;if(pos[i+k]<mn[a])mn[a]=pos[i+k];if(pos[i+k]>mx[a])mx[a]=pos[i+k];}}
  var bv=(mx[0]-mn[0])*(mx[1]-mn[1])*(mx[2]-mn[2]);return bv>0&&Math.abs(v)/bv>0.45?'solid':'hollow';
}
function addCadFiles(files){
  var list=Array.prototype.slice.call(files);if(!list.length)return;
  if(list.some(function(f){return /\.x_t$|\.x_b$/i.test(f.name);}))toast(t('tXt'));
  list=list.filter(function(f){return /\.(stl|obj|step|stp)$/i.test(f.name);});if(!list.length)return;
  pending=list.map(function(f){var base=f.name.replace(/\.[^.]+$/,''),s=slug(base),m=P.parts.filter(function(p){return s&&(s===p.id||s.indexOf(p.id)>=0||s===slug(p.name)||(slug(p.name)&&s.indexOf(slug(p.name))>=0));})[0];
    return {file:f,name:base.slice(0,40),role:m?'part':'shell',part:m?m.id:(P.parts[0]?P.parts[0].id:''),unit:'1',up:/\.(step|stp)$/i.test(f.name)?'z':'y'};});
  renderFileGrid();$('#fileModal').hidden=false;
}
function renderFileGrid(){
  var tb=$('#fileGrid');tb.textContent='';var tr=el('tr');[t('fFile'),t('fRole'),t('fPart'),t('units'),t('upAxis')].forEach(function(h){tr.appendChild(el('th','',h));});tb.appendChild(tr);
  pending.forEach(function(f,i){var r=el('tr');r.appendChild(el('td','',f.file.name));
    var role=el('select');role.id='fr_'+i;[['shell','fShell'],['part','fPart']].forEach(function(o){var op=el('option','',t(o[1]));op.value=o[0];role.appendChild(op);});role.value=f.role;if(!P.parts.length)role.disabled=true;
    var ps=el('select');ps.id='fp_'+i;P.parts.forEach(function(p){var op=el('option','',p.name);op.value=p.id;ps.appendChild(op);});ps.value=f.part;ps.disabled=f.role!=='part';
    role.onchange=function(){f.role=role.value;ps.disabled=f.role!=='part';};ps.onchange=function(){f.part=ps.value;};
    var un=el('select');un.id='fu_'+i;[['1','mm'],['10','cm'],['1000','m'],['25.4','inch']].forEach(function(o){var op=el('option','',o[1]);op.value=o[0];un.appendChild(op);});un.value=f.unit;un.onchange=function(){f.unit=un.value;};
    var up=el('select');up.id='fa_'+i;['y','z'].forEach(function(a){var op=el('option','',a.toUpperCase());op.value=a;up.appendChild(op);});up.value=f.up;up.onchange=function(){f.up=up.value;};
    [role,ps,un,up].forEach(function(x){var td=el('td');td.appendChild(x);r.appendChild(td);});tb.appendChild(r);});
}
function commitFiles(){
  $('#fileModal').hidden=true;var chain=Promise.resolve(),lastShell=null,failed=[];
  pending.forEach(function(f){chain=chain.then(function(){return f.file.arrayBuffer();}).then(function(buf){return parseCad(f.file.name,buf);}).then(function(pos){
    if(!pos.length||pos.length%9)throw new Error('empty');var id=uid('g');geo[id]=pos;saveGeo(id);
    if(f.role==='part'){var p=P.parts.filter(function(q){return q.id===f.part;})[0];if(!p)throw new Error('part');p.mesh={id:id,unit:f.unit,up:f.up,turn:'0'};
      var g=transformGeo(pos,p.mesh,true),z=g.boundingBox.getSize(new THREE.Vector3());p.size=[Math.round(z.x*10)/10,Math.round(z.y*10)/10,Math.round(z.z*10)/10];g.dispose();}
    else{var nS={id:id,name:f.name,unit:f.unit,up:f.up,turn:'0',under:0,kind:guessKind(pos)};var gf=guessFramePart();if(gf){nS.role='frame';nS.part=gf;}P.shells.push(nS);lastShell=id;}
  }).catch(function(e){failed.push(f.file.name);if(/\.(step|stp)$/i.test(f.file.name))toast(t('tStepFail'));});});
  chain.then(function(){pending=[];P.example=false;if(lastShell)P.work.shellId=lastShell;rebuildInst();buildRuntime();rebuildShell();syncAll();commit();renderShells();renderProjects();setView(ui.view);
    if(failed.length&&!/\.(step|stp)$/i.test(failed[0]))toast(t('tBad')+failed.join(', '));if(lastShell)$('#shSet').open=true;});
}

/* ================= storage: IndexedDB (always) + account sync (when the page runs as a Claude artifact) ================= */
var mem={};
function idb(){return new Promise(function(res,rej){try{var rq=indexedDB.open('config-studio',1);rq.onupgradeneeded=function(){rq.result.createObjectStore('kv');};rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error);};}catch(e){rej(e);}});}
function kvDo(mode,fn){return idb().then(function(db){return new Promise(function(res,rej){var tx=db.transaction('kv',mode),rq=fn(tx.objectStore('kv'));tx.oncomplete=function(){res(rq&&rq.result);};tx.onerror=function(){rej(tx.error);};});});}
function kvSet(k,v){mem[k]=v;return kvDo('readwrite',function(s){return s.put(v,k);}).catch(function(){});}
function kvGet(k){return kvDo('readonly',function(s){return s.get(k);}).catch(function(){return mem[k];});}
function kvDel(k){delete mem[k];return kvDo('readwrite',function(s){return s.delete(k);}).catch(function(){});}
function saveGeo(id){kvSet('geo:'+id,geo[id].buffer.slice(0));pushGeo(id);}
var saveT,remote={col:null,ok:false,partial:false};
function touch(){P.updatedAt=Date.now();clearTimeout(saveT);saveT=setTimeout(persist,900);}
function persist(){kvSet('proj:'+P.id,JSON.stringify(P));kvSet('index',JSON.stringify({ids:projects.map(function(p){return p.id;}),cur:P.id,lang:lang}));pushRemote(P);}
function storageNote(){$('#storage').textContent=remote.ok?(remote.partial?t('remPartial'):t('remSaved')):t('locSaved');}
function withTimeout(p,ms){return Promise.race([p,new Promise(function(_,rej){setTimeout(function(){rej(new Error('timeout'));},ms);})]);}
function pushRemote(p){if(!remote.col)return;var s=JSON.stringify(p);if(s.length>230000){remote.partial=true;storageNote();return;}
  remote.col.doc('proj_'+p.id).set({kind:'proj',id:p.id,updatedAt:p.updatedAt,json:s}).then(function(){remote.ok=true;storageNote();}).catch(function(){remote.ok=false;storageNote();});}
/* geometry goes up as 16-bit quantised chunks so the same shells open on another computer */
function b64(u8){var s='';for(var i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return btoa(s);}
function unb64(str){var bin=atob(str),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
function packGeo(pos){var mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity],i,a;for(i=0;i<pos.length;i++){a=i%3;if(pos[i]<mn[a])mn[a]=pos[i];if(pos[i]>mx[a])mx[a]=pos[i];}
  var q=new Uint16Array(pos.length);for(i=0;i<pos.length;i++){a=i%3;q[i]=mx[a]>mn[a]?Math.round((pos[i]-mn[a])/(mx[a]-mn[a])*65535):0;}return {mn:mn,mx:mx,data:b64(new Uint8Array(q.buffer))};}
function unpackGeo(o){var q=new Uint16Array(unb64(o.data).buffer),pos=new Float32Array(q.length);for(var i=0;i<q.length;i++){var a=i%3;pos[i]=o.mn[a]+q[i]/65535*(o.mx[a]-o.mn[a]);}return pos;}
function pushGeo(id){if(!remote.col||!geo[id])return;var pk=packGeo(geo[id]),CH=180000,n=Math.ceil(pk.data.length/CH);if(n>24){remote.partial=true;storageNote();return;}
  var chain=Promise.resolve();for(var i=0;i<n;i++)(function(i){chain=chain.then(function(){return remote.col.doc('geo_'+id+'_'+i).set({kind:'geo',gid:id,i:i,n:n,mn:pk.mn,mx:pk.mx,data:pk.data.slice(i*CH,(i+1)*CH)});});})(i);
  chain.catch(function(){remote.partial=true;storageNote();});}
function initRemote(){
  if(!window.claude||typeof window.claude.use!=='function'){storageNote();return Promise.resolve();}
  return withTimeout(Promise.all([window.claude.use('db'),window.claude.use('user')]),11000).then(function(r){
    if(!r[0]||!r[1])throw new Error('none');return r[1].id().then(function(id){if(!id)throw new Error('noid');remote.col=r[0].collection('data/users/'+id);return withTimeout(remote.col.get(),10000);});
  }).then(function(snap){
    var chunks={},changed=false;
    snap.docs.forEach(function(d){var o=d.data()||{};
      if(o.kind==='proj'&&o.json){try{var rp=JSON.parse(o.json),lp=projects.filter(function(p){return p.id===rp.id;})[0];
        if(!lp){projects.push(rp);changed=true;}else if((rp.updatedAt||0)>(lp.updatedAt||0)){projects[projects.indexOf(lp)]=rp;if(P===lp)P=rp;changed=true;}}catch(e){}}
      else if(o.kind==='geo'){(chunks[o.gid]||(chunks[o.gid]=[]))[o.i]=o;}});
    Object.keys(chunks).forEach(function(gid){var c=chunks[gid];if(geo[gid]||!c[0]||c.filter(Boolean).length!==c[0].n)return;try{geo[gid]=unpackGeo({mn:c[0].mn,mx:c[0].mx,data:c.map(function(x){return x.data;}).join('')});kvSet('geo:'+gid,geo[gid].buffer.slice(0));changed=true;}catch(e){}});
    remote.ok=true;storageNote();
    projects.forEach(function(p){if(!snap.docs.some(function(d){var o=d.data()||{};return o.kind==='proj'&&o.id===p.id&&(o.updatedAt||0)>=(p.updatedAt||0);})&&!p.example)pushRemote(p);});
    if(changed){openProject(P.id,true);}
  }).catch(function(){remote.col=null;remote.ok=false;storageNote();});
}
function loadLocal(){
  return kvGet('index').then(function(ix){if(!ix)return;ix=JSON.parse(ix);if(ix.lang)lang=ix.lang;
    return Promise.all(ix.ids.map(function(id){return kvGet('proj:'+id);})).then(function(list){list.forEach(function(s){if(s){try{projects.push(JSON.parse(s));}catch(e){}}});
      var gids=[];projects.forEach(function(p){p.shells.forEach(function(s){gids.push(s);});p.parts.forEach(function(q){if(q.mesh)gids.push(q.mesh);});});
      return Promise.all(gids.map(function(s){if(s.gen){geo[s.id]=boxShellGeo.apply(null,s.gen);return null;}return kvGet('geo:'+s.id).then(function(b){if(b)geo[s.id]=new Float32Array(b);});})).then(function(){return ix.cur;});});
  }).catch(function(){});
}
function openProject(id,keepView){
  P=projects.filter(function(p){return p.id===id;})[0]||projects[0];selected=null;fill='full';
  P.shells.forEach(function(s){if(s.gen&&!geo[s.id])geo[s.id]=boxShellGeo.apply(null,s.gen);});
  rebuildInst();buildRuntime();rebuildShell();hist=[];histIdx=-1;syncAll();hist=[snap()];histIdx=0;SK.pid=null;if(curPage==='sketch')setTimeout(skOpen,0);
  renderProjects();renderShells();renderPoints();refreshUI();if(!keepView)setView('iso');else requestRender();
  var pid=P.id;setTimeout(function(){if(P&&P.id===pid){normAll();autoShow(true);runChecks();snapMounts();refreshUI();}},700);
  kvSet('index',JSON.stringify({ids:projects.map(function(p){return p.id;}),cur:P.id,lang:lang}));
}
/* project file: everything, geometry included, as one JSON */
function projectFile(){var g={};P.shells.forEach(function(s){if(geo[s.id]&&!s.gen)g[s.id]=packGeo(geo[s.id]);});P.parts.forEach(function(q){if(q.mesh&&geo[q.mesh.id])g[q.mesh.id]=packGeo(geo[q.mesh.id]);});
  return new Blob([JSON.stringify({app:'config-studio',v:1,project:P,geo:g})],{type:'application/json'});}
/* bring someone else's saved configurations (and their sketch, as one more configuration) into this project; nothing of ours changes */
function importConfigs(file){file.text().then(function(txt){var o=JSON.parse(txt);if(o.app!=='config-studio'||!o.project)throw new Error('fmt');var src=o.project,who=src.name||file.name,miss={},n=0;
  function adopt(state,name){var st=clone(state),items={};Object.keys(P.work.items).forEach(function(k){items[k]=clone(P.work.items[k]);items[k].on=false;items[k].lock=false;});
    Object.keys(st.items||{}).forEach(function(k){if(items[k])items[k]=st.items[k];else if(st.items[k].on)miss[k]=1;});st.items=items;st.name=name;st.shellId=P.work.shellId;
    P.configs.push({id:uid('c'),name:name,state:st,summary:''});n++;}
  (src.configs||[]).forEach(function(c){adopt(c.state,c.name+' · '+who);});
  if(src.sketch&&src.sketch.items&&Object.keys(src.sketch.items).length){var w={items:{}};Object.keys(src.sketch.items).forEach(function(k){var it=src.sketch.items[k];if(it.on)w.items[k]={on:true,p:it.p.slice(),q:it.q.slice(),lock:true,ext:false,why:null};});adopt(w,t('pageSketch')+' · '+who);}
  touch();renderSaved();toast(t('tCfgIn',n,who));var m=Object.keys(miss).length;if(m)setTimeout(function(){toast(t('tCfgMiss',m));},2600);}).catch(function(){toast(t('tBad')+file.name);});}
function importProjectFile(file){file.text().then(function(s){var o=JSON.parse(s);if(o.app!=='config-studio'||!o.project)throw new Error('fmt');var p=o.project;
  if(projects.some(function(x){return x.id===p.id;}))p.id=uid('p');Object.keys(o.geo||{}).forEach(function(id){geo[id]=unpackGeo(o.geo[id]);saveGeo(id);});
  projects.push(p);openProject(p.id);touch();}).catch(function(){toast(t('tBad')+file.name);});}

/* ================= export ================= */
var dlP=null;
function saveFile(filename,blob,isImage){
  if(!dlP)dlP=(window.claude&&typeof window.claude.use==='function')?withTimeout(window.claude.use('downloads'),8000).catch(function(){return null;}):Promise.resolve(null);
  return dlP.then(function(dl){
    if(dl)return dl.save({filename:filename,data:blob}).catch(function(){if(isImage)preview(blob,filename);});
    var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();
    if(isImage&&window.claude)preview(blob,filename);setTimeout(function(){if(!isImage)URL.revokeObjectURL(u);},4000);
  });
}
function preview(blob,filename){$('#imgPrev').src=URL.createObjectURL(blob);$('#imgTitle').textContent=filename;$('#imgModal').hidden=false;}
function safeName(n){return String(n||'layout').replace(/[\\/:*?"<>|]+/g,'').trim().replace(/\s+/g,'-').slice(0,50)||'layout';}
function shot(cam,w,h){var keep=renderer.getPixelRatio(),sz=renderer.getSize(new THREE.Vector2());renderer.setPixelRatio(1);renderer.setSize(w,h,false);renderer.render(scene,cam);
  var c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(renderer.domElement,0,0);renderer.setPixelRatio(keep);renderer.setSize(sz.x,sz.y,false);return c;}
function composeSheet(){
  var W=2400,H=1700,M=50,TB=150,g=36,cap=40,b=sceneBounds(),s=b.getSize(new THREE.Vector3()),pad=120;
  var fw0=s.x+pad,sw0=s.z+pad,vh=s.y+pad,k=Math.min((H-2*M-TB-40-cap)/vh,(W-2*M-40-2*g)/(2*fw0+sw0));
  var fw=Math.round(fw0*k),sw=Math.round(sw0*k),ph=Math.round(vh*k),topH=Math.min(Math.round(sw0*k),Math.round(ph*0.45)),isoH=Math.max(200,ph-topH-g-cap),x0=Math.round((W-(2*fw+sw+2*g))/2),y0=M+26+cap;
  var cv=document.createElement('canvas');cv.width=W;cv.height=H;var ctx=cv.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,W,H);
  var keepClear=renderer.getClearColor(new THREE.Color()).clone();renderer.setClearColor(0xffffff,1);gridH.visible=false;
  var oc=new THREE.OrthographicCamera(),pc=new THREE.PerspectiveCamera(30,1,10,40000);
  [{t:'3D',x:x0,y:y0,w:fw,h:isoH,v:'iso'},{t:'TOP',x:x0,y:y0+isoH+g+cap,w:fw,h:topH,v:'top'},{t:'FRONT',x:x0+fw+g,y:y0,w:fw,h:ph,v:'front'},{t:'SIDE',x:x0+2*fw+2*g,y:y0,w:sw,h:ph,v:'side'}].forEach(function(p){
    var cam;if(p.v==='iso'){setIso(pc,p.w,p.h,b);cam=pc;}else{setOrtho(oc,p.v,p.w,p.h,b,pad);cam=oc;}
    ctx.drawImage(shot(cam,p.w,p.h),p.x,p.y);ctx.strokeStyle='#b7bcb1';ctx.lineWidth=1.5;ctx.strokeRect(p.x+.5,p.y+.5,p.w-1,p.h-1);
    ctx.fillStyle='#666b63';ctx.font='600 20px "Space Grotesk", Arial, sans-serif';ctx.textAlign='left';ctx.fillText(p.t,p.x,p.y-12);});
  renderer.setClearColor(keepClear,1);gridH.visible=true;requestRender();
  ctx.strokeStyle='#1b1c1a';ctx.lineWidth=3;ctx.strokeRect(M,M,W-2*M,H-2*M);var ty=H-M-TB;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(M,ty);ctx.lineTo(W-M,ty);ctx.stroke();
  var c=checks,off=c.cog?Math.hypot(c.cog[0]-c.ref[0],c.cog[2]-c.ref[1]):0;
  var cells=[[t('project'),P.name,3],[t('cfg'),P.work.name+(curShell()?' · '+curShell().name:''),3.4],[t('placed'),c.placed+' / '+INST.length,1.5],[t('mass'),c.mass.toFixed(2)+' kg',1.6],
    [t('sheetCog'),c.cog?fmt(off)+' mm · '+t('height')+' '+fmt(c.cog[1])+' mm':'—',3.4],[t('sheetChecks'),c.pairs.length+' '+t('collisions')+' · '+c.outs.length+' '+t('outside')+' · '+c.rules.length+' '+t('cRules'),4],[t('date'),new Date().toISOString().slice(0,10),1.7]];
  var tot=cells.reduce(function(a,x){return a+x[2];},0),cx=M,rtl=lang==='he';
  cells.forEach(function(cl,i){var cw=(W-2*M)*cl[2]/tot;if(i){ctx.beginPath();ctx.moveTo(cx,ty);ctx.lineTo(cx,H-M);ctx.stroke();}
    ctx.textAlign=rtl?'right':'left';var tx=rtl?cx+cw-18:cx+18;ctx.direction=rtl?'rtl':'ltr';
    ctx.fillStyle='#666b63';ctx.font='600 17px "Heebo", Arial, sans-serif';ctx.fillText(cl[0],tx,ty+38);
    ctx.fillStyle='#1b1c1a';var fs=30;ctx.font='600 '+fs+'px "Heebo", Arial, sans-serif';while(ctx.measureText(cl[1]).width>cw-36&&fs>13){fs--;ctx.font='600 '+fs+'px "Heebo", Arial, sans-serif';}
    ctx.fillText(cl[1],tx,ty+92);cx+=cw;});
  return cv;
}
function exportPng(){runChecks();var cv=composeSheet();cv.toBlob(function(b){saveFile(safeName(P.name)+'-'+safeName(P.work.name)+'.png',b,true);},'image/png');}


/* ================= help ================= */
var HELP={
he:[
 ['סדר עבודה מומלץ','ol',['פתח פרויקט חדש ותן לו שם.','מלא את טבלת הרכיבים: הקלדה ישירה, ייבוא Excel/CSV, או הדבקה מ-Google Sheets.','העלה מעטפת חיצונית ומודלים של רכיבים, אם יש.','הגדר נקודת ייחוס לאיזון וסטייה מותרת.','שייך כללים לרכיבים מתוך בנק הכללים.','גרור רכיבים למקומם או לחץ "סידור אוטומטי", ותקן לפי לוח הבדיקות.','שמור כל חלופה כקונפיגורציה, וייצא גיליון PNG למצגת.']],
 ['קבצים נתמכים','ul',['תלת-ממד: STL, OBJ, STEP (‎.step / .stp).','X_T (Parasolid) לא נתמך. ייצא מתוכנת ה-CAD ל-STEP או STL.','טבלה: ‎.xlsx, .xls, .csv, .tsv, או הדבקה ישירה מגיליון.','קובץ פרויקט: ‎.json שנשמר מהאתר הזה בלבד.','אפשר לגרור כמה קבצים יחד לכל מקום בדף.']],
 ['טבלת רכיבים','ul',['מידות במ"מ, מסה בק"ג. X = אורך, Y = גובה, Z = רוחב.','שורת הכותרות בקובץ חייבת להתאים לתבנית. הורד אותה מ"הורד תבנית Excel".','"כמות" יוצרת כמה יחידות זהות של אותו רכיב.','"מסה ריק" מיועדת לרכיב שהמסה שלו משתנה, כמו מיכל.','"מקור הנתון": כתוב אם המספר מדוד, מדף יצרן או הערכה. הכלי לא יודע להבחין, והתוצאות טובות רק כמו הנתונים.','שינוי מזהה של רכיב מנתק כללים של רכיבים אחרים שכיוונו אליו. בדוק אותם אחרי שינוי.']],
 ['קבצי תלת-ממד','ul',['לכל קובץ בוחרים אם הוא מעטפת או מודל של רכיב. ההתאמה לרכיב מנוחשת משם הקובץ, אז כדאי לתת לקובץ את שם הרכיב.','בדוק יחידות וציר עליון. אם המודל ענק, זעיר או שוכב על הצד, תקן בהגדרות המעטפת.','מודל של רכיב מחליף את המידות שלו בטבלה במידות התיבה החוסמת של הקובץ.','סוג המודל: "חלול" למעטפת עם דפנות ועובי, "מלא" לגוף אטום. הכלי מנחש, ואם בדיקת "מחוץ למעטפת" נראית שגויה, החלף את הסוג.','STEP נטען לאט יותר (עד כחצי דקה בפעם הראשונה).']],
 ['שלד מרכזי','ul',['במוצר שבנוי סביב שלד (למשל מסגרת רחפן), העלה את השלד כמודל ובהגדרות שלו בחר "שלד מרכזי". אז רכיב מחוץ לשלד לא מסומן כבעיה, ורק רכיב שחודר לחומר של השלד נחשב התנגשות.','בדיקת החדירה דוגמת נקודות ברשת בתוך כל רכיב, אז צינור דק של השלד שעובר בין הנקודות עלול לא להיתפס.','"משקל המודל" נכנס לחישוב מרכז הכובד, במרכז פני השטח של המודל. אם השלד מופיע גם כשורה בטבלת הרכיבים, תן לו משקל רק באחד המקומות.','לחיבור רכיב לשלד: סמן נקודה על השלד ("סמן נקודה") ובחר אותה כיעד בחיבור, למשל צמוד או מתחת.','אם השלד מופיע גם כשורה בטבלה, בחר אותה ב"שורת השלד בטבלה". השורה לא תוצב כקופסה נוספת, המשקל שלה ישמש כמשקל המודל (אם לא הוזן אחר), וחיבור אליה הולך לנקודה שסימנת על השלד או למרכז השלד.']],
 ['נקודות על המודל','ul',['"סמן נקודה" ואז לחיצה על המודל יוצרת נקודה שאפשר לכוון אליה כללים.','נקודה שייכת למעטפת שעליה סומנה. שינוי יחידות, סיבוב או גובה של המעטפת לא מזיז אותה, וצריך לסמן מחדש.']],
 ['נקודת ייחוס ואיזון','ul',['מרכז הכובד נמדד כמרחק אופקי מנקודת הייחוס: ציר גלגלים, מרכז רוטורים, מרכז בסיס וכדומה.','אפשר להזין X ו-Z ידנית, או לתת לרכיב את הכלל "מגדיר נקודת ייחוס" ואז הנקודה נלקחת ממיקומו.','הסטייה המותרת היא החלטה שלך. הכלי לא יודע מה נכון למוצר שלך.','המתג "מלא / ריק" מראה כמה מרכז הכובד זז כשהמסה המשתנה מתרוקנת.']],
 ['בנק הכללים','ul',['כלל הוא דרישת מיקום לרכיב. חלק נבדקים אוטומטית וחלק מסומנים "לבדיקה ידנית".','כללי "קרוב ל" ו"רחוק מ" צריכים יעד: רכיב, נקודה או קטגוריה. בלי יעד הכלל לא נבדק.','אפשר להוסיף כלל משלך ולבחור איך הוא ייבדק.','בטבלה כותבים כללים כקוד, למשל ‎low; far:battery:30‎. רשימת הקודים בגיליון השני של התבנית.','כללים יכולים לסתור זה את זה. הפרה בלוח הבדיקות היא מידע לשיקול דעת, לא בהכרח טעות.']],
 ['חיבורים','ul',['קו חיבור יוצא מדופן הרכיב ולא ממרכזו, ואורך כבל נמדד מדופן לדופן. כשמסמנים נקודת חיבור, הקו יוצא ממנה.','"הצמד חיבורים" מזיז כל רכיב שהחיבור שלו חורג עד שהחיבור מתקיים: צמוד נצמד, מעל יושב על היעד, בתוך נכנס לקופסה, כבל ארוך מדי מתקרב. רכיב נעול לא זז. חיבור חדש מהמפה מוצמד מיד. אחרי ההצמדה כדאי לבדוק התנגשויות.','הכלל link מחבר רכיב לרכיב אחר, לקטגוריה או לנקודה על המודל. בטבלה: link:<יעד>:<אורך מרבי>:<סוג>, למשל link:gnss_hrtk_f9p:300:data.','סוג: data (כחול), power (כתום), water (טורקיז). בלי סוג, החיבור נחשב data.','שרשרת נבנית מכמה כללים: מחשב → GPS בשורה של המחשב, GPS → רכיב אחר בשורה של ה-GPS.','האורך הוא קו ישר בין מרכזי הרכיבים. כבל אמיתי עובר מסביב לרכיבים ויוצא ממחבר, אז תן מרווח באורך המרבי.','קו מקווקו אדום = ארוך מהמותר. בחירת רכיב מדגישה את החיבורים שלו ומציגה את האורך שלהם.','אם ליעד יש כמה יחידות (למשל 6 מנועים), החיבור הולך ליחידה הקרובה ביותר.']],
 ['שני סוגי חיבור','ul',['מכני = איפה הרכיב יושב. בוחרים צד: בדיוק על הנקודה (התחתית של הרכיב, או נקודת החיבור שלו, יושבת על הנקודה), מעל (יושב על היעד), מתחת (תלוי מתחתיו), לצד (נוגע בדופן) או בתוך. הרכיב קופץ מיד למקום, נשאר שם וזז יחד עם היעד.','נתונים, חשמל, מים ואחר = כבל. הוא לא מזיז שום רכיב: רק מצייר קו ובודק שהאורך לא עובר את המגבלה. "קשיח" = קו ישר שאסור לו לעבור דרך רכיב. "דרך נקודה" = מסלול הכבל עובר דרך נקודה שבחרת, למשל תפס על הזרוע.','רכיב שחוזר כמה פעמים (למשל 6 מנועים) על 6 נקודות עם אותו שם: כל עותק יושב על נקודה אחרת לפי הסדר.']],
 ['גרף חיבורים','ul',['העמוד "גרף חיבורים" מציג כל רכיב ככרטיס. בצד ימין של כל כרטיס יש נקודה צבעונית לכל סוג חיבור: נתונים, חשמל, מים, מכני, אחר. גוררים ממנה אל כרטיס אחר כדי ליצור חיבור מהסוג הזה.','שחרור על שורת "נקודת חיבור" בכרטיס היעד מחבר בדיוק לנקודה הזאת. כרטיס המודל או השלד מציג את הנקודות שסומנו עליו, וגם את מרכז השלד.','חיבור מכני חדש נוצר כ"צמוד", וכל השאר ככבל. לחיצה על חוט פותחת עריכה של סוג, אופן, מגבלה ונקודות, ושם גם מוחקים.','רכיב עם כמה עותקים מוצג ככרטיס אחד עם ×n. הכפתור ⇉ פורס אותו לכרטיס לכל עותק. חוט מעותק לעותק קובע איזה עותק מתחבר לאיזה, והשאר נשארים על "אוטומטי".','"+ נקודת חיבור" בכרטיס פותח את התלת-ממד לסימון, ואחרי הלחיצה על הרכיב חוזרים לגרף.','מיקום הכרטיסים נשמר עם הפרויקט. "סדר את הגרף" מסדר מחדש: רכיבים שאחרים מתחברים אליהם נמצאים בצד ימין.']],
 ['חלון רכיב','ul',['רכיב עם כמה עותקים (כמות > 1): כשלרכיב ולמה שהוא מחובר אליו יש אותו מספר עותקים, עותק 1 מתחבר לעותק 1 של היעד, עותק 2 לעותק 2 וכן הלאה. גם 6 נקודות עם אותו שם על השלד נחשבות 6 יעדים לפי סדר הסימון. אחרת כל עותק מתחבר ליעד הקרוב אליו. בחלון הרכיב אפשר לקבוע לכל עותק את היעד שלו.','"תבנית לעותקים" בחלון הרכיב מסדר את כל העותקים סביב ציר (של נקודת הייחוס, מרכז המודל או רכיב אחר) במרווחים שווים, או בשורה. רכיבים שמחוברים לעותקים זזים איתם.','לחיצה כפולה על רכיב ברשימת הרכיבים (או "פרטי הרכיב והחיבורים" בכרטיס הרכיב) פותחת חלון עם כל הערכים שלו, הכללים בקוד, וכל החיבורים ממנו ואליו.','בחלון אפשר לשנות סוג, אופן ומגבלה של כל חיבור, למחוק חיבור, ולהצמיד חיבור חורג.']],
 ['מפת חיבורים','ul',['הכפתור "מפת חיבורים" למעלה פותח עמוד שמראה מה מתחבר למה ובאיזה סדר. אפשר לשמור קישור ישיר אליו (‎#map בסוף הכתובת).','כל סוג חיבור הוא מערכת נפרדת עם עץ משלה. העץ מתחיל ברכיב עם הכי הרבה חיבורים, ואפשר לבחור רכיב התחלה אחר.','לחיצה על רכיב בוחרת אותו. ✕ מוחק חיבור, והטופס בתחתית מוסיף חיבור חדש.','אופן החיבור: כבל או צינור (נבדק אורך), צמוד (נבדק מרווח, ברירת מחדל 2 מ"מ), מעל או מתחת (הרכיב יושב על השני, חופף לו במבט מלמעלה, והמרווח האנכי עד 5 מ"מ כברירת מחדל).','נקודת חיבור על רכיב: "סמן בתלת-ממד" בטופס, ואז לחיצה על הרכיב במקום של המחבר. הנקודה זזה ומסתובבת יחד עם הרכיב, והחיבור נמדד ממנה במקום ממרכז הרכיב.','בטבלה: link:<יעד>:<מגבלה>:<סוג>:<אופן>:<נקודה שלי>:<נקודה ביעד>:<נקודת מעבר>, למשל link:frame:2:mech:touch.','אופנים נוספים: צינור קשיח (קו ישר בלי רכיב באמצע), דרך נקודה (האורך נמדד דרך נקודת מעבר, למשל מאטם), לצד (באותו גובה, עד 5 מ"מ), על אותו ציר (הסטייה מהציר עד 2 מ"מ). רדיוס כיפוף של צינור גמיש לא נבדק.','אופן "בתוך": הרכיב חייב להיות כולו בתוך רכיב אחר (למשל לוחות בתוך קופסת אלקטרוניקה). המגבלה היא מרווח מינימלי מהדופן, 0 כברירת מחדל. בין רכיב לרכיב שמכיל אותו לא נספרת התנגשות, והתוכן זז יחד עם הקופסה. הבדיקה לפי התיבה החוסמת, אז עובי הדופן לא נלקח בחשבון.','"אכוף חיבורים" (מופעל): אי אפשר לגרור, לסובב או להקליד מיקום שמפר חיבור. החלק נעצר בגבול. רכיבים שמחוברים צמוד, מעל, מתחת או על אותו ציר זזים יחד. Alt בזמן גרירה עוקף.']],
 ['הזזה ותצוגה','ul',['גרירת רכיב מזיזה אותו במישור המבט. Shift+גרירה מזיזה למעלה ולמטה.','R מסובב 90° סביב הציר האנכי, Shift+R סביב X. Del מחזיר לרשימה. Ctrl+Z מבטל.','"מגנט" מצמיד לדפנות ולרכיבים שכנים. Alt בזמן גרירה מבטל אותו זמנית.','"נעל" מקבע רכיב, והסידור האוטומטי לא יזיז אותו.','אדום = התנגשות, כתום = מחוץ למעטפת, כחול = הפרת כלל.']],
 ['סידור אוטומטי','ul',['מציב כל רכיב שאינו נעול לפי הכללים שלו, ושומר על מרכז הכובד קרוב לנקודת הייחוס.','זו הצעת פתיחה ולא פתרון מיטבי. הוא מחפש ברשת של מיקומים ולא בודק כל אפשרות.','הוא מבטל את הסידור הנוכחי של רכיבים לא נעולים. Ctrl+Z מחזיר.','רכיב שמגדיר נקודת ייחוס לא מוזז. הצב אותו ידנית קודם.']],
 ['קירובים שכדאי להכיר','ul',['התנגשות נבדקת לפי התיבה החוסמת של הרכיב (לגליל יש בדיקה עגולה), לא לפי הצורה המדויקת.','המסה של כל רכיב מחושבת כאילו היא במרכז התיבה שלו.','כבלים, צנרת, ברגים ומשקל המעטפת עצמה לא נכללים, אלא אם תוסיף אותם כרכיבים.','הספים של "נמוך" ו"גבוה" הם שליש תחתון ושליש עליון. זו בחירה של הכלי ולא תקן.','הכלי לא בודק חום, חוזק, אטימות או חיווט. הוא עוזר לבחון סידור, ולא מחליף בדיקה הנדסית.']],
 ['שמירה וגיבוי','ul',['השינויים נשמרים אוטומטית. שורת המצב בכרטיס הפרויקט אומרת איפה.','"שמור קובץ פרויקט" יוצר קובץ אחד עם הכול, כולל המודלים. השתמש בו לגיבוי ולמעבר בין מחשבים.','ניקוי נתוני הגלישה בדפדפן מוחק פרויקטים שנשמרו רק בו. גבה לפני כן.','"קונפיגורציות שמורות" הן חלופות סידור בתוך אותו פרויקט. שמירה באותו שם מחליפה את הקודמת.']]
],
en:[
 ['Suggested workflow','ol',['Start a new project and name it.','Fill the parts table: type it in, import Excel/CSV, or paste from Google Sheets.','Add an outer shell and part models, if you have them.','Set the balance reference point and the allowed offset.','Assign rules to parts from the rule bank.','Drag parts into place or press "Auto-arrange", then fix what the checks panel reports.','Save each alternative as a configuration and export a PNG sheet for your deck.']],
 ['Supported files','ul',['3D: STL, OBJ, STEP (.step / .stp).','X_T (Parasolid) is not supported. Export to STEP or STL from your CAD program.','Table: .xlsx, .xls, .csv, .tsv, or a direct paste from a sheet.','Project file: a .json saved from this site only.','You can drop several files at once anywhere on the page.']],
 ['Parts table','ul',['Sizes in mm, mass in kg. X = length, Y = height, Z = width.','The header row of your file must match the template. Get it from "Download Excel template".','"Qty" creates several identical units of one part.','"Empty mass" is for a part whose mass changes, such as a tank.','"Source": note whether a number is measured, from a datasheet, or an estimate. The tool cannot tell, and results are only as good as the data.','Changing a part ID breaks rules on other parts that targeted it. Check them afterwards.']],
 ['3D files','ul',['For each file choose shell or part model. The part match is guessed from the file name, so name the file after the part.','Check units and up axis. If the model is huge, tiny or lying on its side, fix it in the shell settings.','A part model replaces that part\'s table size with the bounding box of the file.','Model type: "Hollow" for a shell with wall thickness, "Solid" for a closed body. The tool guesses; if "outside shell" looks wrong, switch the type.','STEP loads more slowly (up to about half a minute the first time).']],
 ['Central frame','ul',['For a product built around a frame (e.g. a drone frame), add the frame as a model and set its role to "Central frame". Parts outside it are then fine, and only a part that cuts into the frame material counts as a collision.','The cut-in test samples a grid of points inside each part, so a thin frame tube passing between those points can be missed.','"Model mass" is added to the centre of gravity at the centre of the model surface. If the frame is also a row in the parts table, give it mass in only one place.','To join a part to the frame: mark a point on the frame ("Mark a point") and pick it as the target of a connection, e.g. touching or below.','If the frame is also a row in the parts table, choose it in "Frame row in the table". That row is not placed as an extra box, its mass is used as the model mass (unless you typed another), and a connection to it goes to a point marked on the frame or to the frame centre.']],
 ['Points on the model','ul',['"Mark a point", then a click on the model, creates a point that rules can target.','A point belongs to the shell it was marked on. Changing that shell\'s units, turn or height does not move it; mark it again.']],
 ['Reference point and balance','ul',['The centre of gravity is measured as a horizontal distance from the reference point: wheel axle, rotor centre, base centre and so on.','Type X and Z by hand, or give a part the rule "Defines the reference point" and the point follows that part.','The allowed offset is your decision. The tool does not know what is right for your product.','The "Full / Empty" switch shows how far the centre of gravity moves as the variable mass empties.']],
 ['Rule bank','ul',['A rule is a placement demand on a part. Some are checked automatically, others are marked "check by hand".','"Close to" and "Away from" rules need a target: a part, a point or a category. Without one the rule is not checked.','You can add your own rule and choose how it is checked.','In the table, rules are written as codes, e.g. low; far:battery:30. The codes are listed on the second sheet of the template.','Rules can contradict each other. A violation in the checks panel is information for your judgement, not always a mistake.']],
 ['Connections','ul',['A connection line leaves from the part\'s side, not its centre, and cable length is measured side to side. With a marked port it leaves from the port.','"Snap connections" moves each part whose connection fails until it is met: touching closes the gap, above sits on the target, inside moves into the box, a too-long cable moves closer. Locked parts stay. A new link from the map snaps at once. Check collisions afterwards.','The link rule connects a part to another part, a category or a point on the model. In the table: link:<target>:<max length>:<type>, e.g. link:gnss_hrtk_f9p:300:data.','Type: data (blue), power (orange), water (teal). Without a type the link counts as data.','A chain is built from several rules: computer → GPS in the computer row, GPS → another part in the GPS row.','Length is the straight line between part centres. A real cable leaves from a connector and runs around parts, so leave margin in the maximum.','Dashed red line = longer than allowed. Selecting a part highlights its connections and shows their lengths.','If the target has several units (for example 6 motors), the link goes to the nearest one.']],
 ['Two kinds of connection','ul',['Mechanical = where the part sits. Pick a side: exactly on the point (the part\'s bottom, or its port, sits on the point), on top (sits on the target), below (hangs under it), beside (touches its side) or inside. The part jumps there at once, stays, and moves with the target.','Data, power, water and other = a cable. It never moves a part: it only draws a line and checks the length against the limit. "Rigid" = a straight line that may not pass through a part. "Through a point" = the cable route passes a point you chose, e.g. a clip on the arm.','A part that repeats (e.g. 6 motors) on 6 points with the same name: each copy sits on a different point, in order.']],
 ['Connection graph','ul',['The "Connection graph" page shows each part as a card. On the right of each card is a coloured dot for each connection type: data, power, water, mechanical, other. Drag from it to another card to make a connection of that type.','Dropping on a port row of the target card connects to exactly that port. The model or frame card lists the points marked on it, and the frame centre.','A new mechanical connection starts as "touching", the others as a cable. Click a wire to edit its type, mode, limit and ports, or delete it.','A part with several copies shows as one card with ×n. The ⇉ button expands it into a card per copy. A wire from copy to copy sets which copy goes to which; the rest stay on "auto".','"+ Port" on a card opens the 3D view to mark it, and after the click on the part you come back to the graph.','Card positions are saved with the project. "Tidy the graph" lays them out again, with the parts others plug into on the right.']],
 ['Part window','ul',['A part with several copies (qty > 1): when the part and its target have the same number of copies, copy 1 links to copy 1 of the target, copy 2 to copy 2 and so on. Six points with the same name on the frame count as six targets in the order they were marked. Otherwise each copy links to its nearest target. In the part window you can set each copy\'s target.','"Pattern for the copies" in the part window lays all copies around an axis (of the reference point, the model centre or another part) at equal angles, or in a row. Parts fixed to the copies move with them.','Double-click a part in the parts list (or "Part details and connections" in the part card) to open all its values, its rule codes, and every connection from and to it.','There you can change each connection\'s type, mode and limit, delete it, or snap a failing one.']],
 ['Connection map','ul',['The "Connection map" button at the top opens a page that shows what connects to what and in which order. You can bookmark it (#map at the end of the address).','Each connection type is its own system with its own tree. The tree starts at the part with the most links; you can pick another start.','Clicking a part selects it. ✕ deletes a connection, and the form at the bottom adds one.','How it connects: cable or hose (length is checked), touching (gap is checked, default 2 mm), above or below (one part sits on the other, overlapping seen from above, vertical gap up to 5 mm by default).','A port on a part: "Mark in 3D" in the form, then click the part where the connector is. The port moves and turns with the part, and the link is measured from it instead of from the part centre.','In the table: link:<target>:<limit>:<type>:<how>:<my port>:<target port>:<waypoint>, e.g. link:frame:2:mech:touch.','More modes: rigid (straight line with no part in the way), through a point (length measured via a waypoint such as a cable gland), beside (same height, up to 5 mm), same axis (off-axis up to 2 mm). The bend radius of a flexible hose is not checked.','"Inside": the part must sit wholly inside another part (e.g. boards inside an electronics box). The limit is the minimum clearance from the walls, 0 by default. A part and its container do not count as colliding, and the contents move with the box. Checked on bounding boxes, so wall thickness is ignored.','"Enforce connections" (on): you cannot drag, turn or type a position that breaks a connection; the part stops at the limit. Parts joined touching, above, below or on the same axis move together. Hold Alt while dragging to override.']],
 ['Moving and viewing','ul',['Dragging moves a part in the view plane. Shift-drag moves it up and down.','R turns 90° about the vertical axis, Shift+R about X. Del sends it back to the list. Ctrl+Z undoes.','"Magnet" snaps to walls and neighbouring parts. Hold Alt while dragging to switch it off.','"Lock" pins a part, and auto-arrange will not move it.','Red = collision, orange = outside the shell, blue = rule violation.']],
 ['Auto-arrange','ul',['Places every unlocked part by its rules and keeps the centre of gravity near the reference point.','It is a starting proposal, not an optimum. It searches a grid of positions and does not try everything.','It discards the current positions of unlocked parts. Ctrl+Z brings them back.','A part that defines the reference point is not moved. Place it by hand first.']],
 ['Approximations to know','ul',['Collisions use each part\'s bounding box (cylinders get a round check), not the exact shape.','Each part\'s mass is treated as sitting at the centre of its box.','Cables, piping, fasteners and the weight of the shell itself are not included unless you add them as parts.','The "low" and "high" thresholds are the bottom and top third. That is the tool\'s choice, not a standard.','The tool does not check heat, strength, sealing or wiring. It helps you study a layout and does not replace engineering review.']],
 ['Saving and backup','ul',['Changes are saved automatically. The status line in the project card says where.','"Save project file" writes one file with everything, models included. Use it for backup and to move between computers.','Clearing browsing data deletes projects that were saved only in the browser. Back up first.','"Saved configurations" are layout alternatives inside one project. Saving under the same name replaces the earlier one.']]
]};
function renderHelp(){var box=$('#helpBody');box.textContent='';HELP[lang].forEach(function(sec){box.appendChild(el('h3','',sec[0]));var l=el(sec[1]);sec[2].forEach(function(x){l.appendChild(el('li','',x));});box.appendChild(l);});}

/* ================= wiring ================= */
function bind(){
  $('#segLang').onclick=function(e){var v=e.target.dataset.v;if(!v)return;lang=v;applyLang();renderProjects();renderShells();refreshUI();storageNote();if(!$('#tableModal').hidden)renderGrid();if(!$('#drawer').hidden)renderDrawer();if(!$('#helpModal').hidden)renderHelp();persist();};
  $('#selProject').onchange=function(){persist();openProject($('#selProject').value);};
  $('#projName').onchange=function(){P.name=$('#projName').value.trim()||P.name;P.example=false;renderProjects();touch();};
  ['refLabel','refX','refZ','tol'].forEach(function(id){$('#'+id).onchange=function(){P.ref.label=$('#refLabel').value;P.ref.x=num($('#refX').value,0);P.ref.z=num($('#refZ').value,0);P.tol=Math.max(0,num($('#tol').value,10));runChecks();refreshUI();requestRender();touch();};});
  $('#btnNewProj').onclick=function(){persist();var p=freshProject(t('project')+' '+(projects.length+1));projects.push(p);openProject(p.id);touch();$('#projName').focus();$('#projName').select();};
  $('#btnDelProj').onclick=function(){confirmBox(t('qDelProj',P.name),function(){var id=P.id;projects=projects.filter(function(p){return p.id!==id;});kvDel('proj:'+id);if(remote.col)remote.col.doc('proj_'+id).delete().catch(function(){});
    if(!projects.length)projects.push(exampleProject());openProject(projects[0].id);persist();});};
  $('#btnExportProj').onclick=function(){saveFile(safeName(P.name)+'.json',projectFile(),false).then(function(){toast(t('tSaved'));});};
  $('#btnImportProj').onclick=function(){$('#projFile').click();};$('#projFile').onchange=function(e){if(e.target.files[0])importProjectFile(e.target.files[0]);e.target.value='';};
  var drop=$('#drop');drop.onclick=function(){$('#cadFile').click();};drop.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#cadFile').click();}};
  $('#cadFile').onchange=function(e){addCadFiles(e.target.files);e.target.value='';};
  ['dragenter','dragover'].forEach(function(n){window.addEventListener(n,function(e){e.preventDefault();drop.classList.add('over');});});
  ['dragleave','drop'].forEach(function(n){window.addEventListener(n,function(e){e.preventDefault();drop.classList.remove('over');});});
  window.addEventListener('drop',function(e){if(e.dataTransfer&&e.dataTransfer.files.length){var fs=e.dataTransfer.files,f0=fs[0].name;
    if(/\.(xlsx|xls|csv|tsv)$/i.test(f0))importTable(fs[0]);else if(/\.json$/i.test(f0))importProjectFile(fs[0]);else addCadFiles(fs);}});
  $('#btnFileGo').onclick=commitFiles;$('#btnFileCancel').onclick=function(){pending=[];$('#fileModal').hidden=true;};
  ['shName','shUnit','shUp','shTurn','shUnder','shKind','shRole','shMass','shPart'].forEach(function(id){$('#'+id).onchange=function(){var S=curShell();if(!S)return;var wasF=S.role==='frame';S.name=$('#shName').value||S.name;S.unit=$('#shUnit').value;S.up=$('#shUp').value;S.turn=$('#shTurn').value;S.under=num($('#shUnder').value,0);S.kind=$('#shKind').value;S.role=$('#shRole').value;S.mass=Math.max(0,num($('#shMass').value,0));if(id==='shPart')S.part=$('#shPart').value;else if(S.role==='frame'&&!wasF&&!S.part)S.part=guessFramePart();
    rebuildInst();buildRuntime();rebuildShell();syncAll();refreshUI();renderShells();setView(ui.view);touch();};});
  $('#btnShDel').onclick=function(){var S=curShell();if(!S)return;P.shells=P.shells.filter(function(x){return x!==S;});kvDel('geo:'+S.id);delete geo[S.id];P.work.shellId=P.shells[0]?P.shells[0].id:null;rebuildShell();syncAll();commit();renderShells();};
  $('#btnTable').onclick=function(){renderGrid();$('#tableModal').hidden=false;};$('#btnTableDone').onclick=function(){$('#tableModal').hidden=true;};
  $('#btnAddRow').onclick=function(){P.parts.push(newPart({name:t('parts')+' '+(P.parts.length+1)}));partsChanged();renderGrid();};
  $('#btnTpl').onclick=function(){saveFile('config-studio-template.xlsx',templateBlob(),false);};
  $('#btnImportTable').onclick=function(){$('#tableFile').click();};$('#tableFile').onchange=function(e){if(e.target.files[0])importTable(e.target.files[0]);e.target.value='';};
  $('#btnPaste').onclick=function(){$('#pasteBox').hidden=!$('#pasteBox').hidden;};
  $('#btnPasteGo').onclick=function(){var rows=$('#pasteArea').value.split(/\r?\n/).filter(function(l){return l.trim();}).map(function(l){return l.split(l.indexOf('\t')>=0?'\t':',');});addRows(rowsToParts(rows),$('#pasteReplace').checked);$('#pasteArea').value='';};
  $('#btnExample').onclick=function(){persist();var ex=projects.filter(function(p){return p.example;})[0];if(!ex){ex=exampleProject();projects.push(ex);}openProject(ex.id);if(!ex.configs.length&&onList().length<=2)autoArrangeQuiet();persist();};
  $('#btnHelp').onclick=function(){renderHelp();$('#helpModal').hidden=false;};$('#helpClose').onclick=function(){$('#helpModal').hidden=true;};
  $('#btnPoint').onclick=function(){setPick(!pickMode);};
  $('#btnBank').onclick=function(){openDrawer(null);};$('#drawerClose').onclick=function(){$('#drawer').hidden=true;};
  $('#nrAdd').onclick=function(){var n=$('#nrName').value.trim();if(!n)return;var base=$('#nrBase').value,id=slug(n).slice(0,14)||uid('r');while(ruleDef(id))id+='x';
    var d={id:id,base:base,custom:true,n:[n,n],d:[$('#nrDesc').value.trim(),$('#nrDesc').value.trim()]};if(base==='near'||base==='far'||base==='link')d.tg=1;if(['near','far','center','wall','clear','link'].indexOf(base)>=0)d.ds=num($('#nrDist').value,20);
    P.customRules.push(d);$('#nrName').value='';$('#nrDesc').value='';rulesChanged();};
  $('#segView').onclick=function(e){if(e.target.dataset.v)setView(e.target.dataset.v);};
  $('#segShell').onclick=function(e){if(e.target.dataset.v){ui.shell=e.target.dataset.v;applyShellMode();refreshUI();}};
  $('#segMode').onclick=function(e){if(e.target.dataset.v){ui.mode=e.target.dataset.v;syncAll();refreshUI();}};
  $('#segFill').onclick=function(e){if(e.target.dataset.v){fill=e.target.dataset.v;runChecks();refreshUI();requestRender();}};
  $('#togLabels').onclick=function(){ui.labels=!ui.labels;refreshUI();requestRender();};
  [['togPts','pts'],['togLtags','ltags'],['togMarks','marks'],['togFloor','floor']].forEach(function(x){$('#'+x[0]).onclick=function(){ui[x[1]]=!ui[x[1]];if(x[1]==='marks')runChecks();refreshUI();};});
  $('#btnEye').onclick=function(e){e.stopPropagation();var m=$('#hudMenu');m.hidden=!m.hidden;$('#btnEye').setAttribute('aria-expanded',String(!m.hidden));};
  $('#hudMenu').addEventListener('click',function(e){e.stopPropagation();});document.addEventListener('pointerdown',function(e){var m=$('#hudMenu');if(!m.hidden&&!e.target.closest('.hwrap')){m.hidden=true;$('#btnEye').setAttribute('aria-expanded','false');}});
  $('#btnHideAll').onclick=function(){var any=ui.pts||ui.labels||ui.links||ui.ltags||ui.marks||ui.floor;['pts','labels','links','ltags','marks','floor'].forEach(function(k){ui[k]=!any;});runChecks();refreshUI();};
  $('#btnCatAll').onclick=function(){PREF.cat=PREF.cat||{};var cs=cats(),any=cs.some(function(c){return !PREF.cat[c];});cs.forEach(function(c){PREF.cat[c]=any;});savePref();renderTray();};
  initFolds();skBind();$('#togGrid').onclick=function(){ui.grid=!ui.grid;refreshUI();};$('#togMagnet').onclick=function(){ui.magnet=!ui.magnet;refreshUI();};document.querySelectorAll('#segPage button').forEach(function(b){b.onclick=function(){showPage(b.dataset.v);};});document.querySelectorAll('#segMapKind button').forEach(function(b){b.onclick=function(){mapKind=b.dataset.v;renderMap();};});$('#mfAdd').onclick=addMapLink;$('#mfFrom').onchange=renderMapForm;$('#mfKind').onchange=renderMapForm;$('#mfTo').onchange=renderMapForm;$('#mfPickA').onclick=function(){mapPick('a');};$('#mfPickB').onclick=function(){mapPick('b');};$('#mfMode').onchange=function(){var m=$('#mfMode').value;$('#mfMax').value='';$('#mfMax').placeholder=String(linkMax({m:m}));$('#mfWayL').hidden=m!=='via';};window.addEventListener('hashchange',function(){showPage(location.hash==='#map'?'map':location.hash==='#graph'?'graph':location.hash==='#sketch'?'sketch':'3d');});gBind();
    $('#pmClose').onclick=function(){$('#partModal').hidden=true;};$('#btnSnap').onclick=function(){snapAll(null);};
  $('#togOnly').onclick=function(){ui.onlyLinked=!ui.onlyLinked;refreshUI();toast(ui.onlyLinked?t('tOnlyOn'):t('tOnlyOff'));if(ui.onlyLinked)autoShow(true);runChecks();snapMounts();refreshUI();};
  $('#togEnforce').onclick=function(){ui.enforce=!ui.enforce;refreshUI();toast(ui.enforce?t('tEnfOn'):t('tEnfOff'));};
  $('#togLinks').onclick=function(){ui.links=!ui.links;runChecks();refreshUI();requestRender();};
  $('#btnUndo').onclick=undo;$('#btnRedo').onclick=redo;$('#btnAuto').onclick=autoArrange;$('#btnPng').onclick=exportPng;
  $('#btnCfgIn').onclick=function(){$('#cfgFile').click();};$('#cfgFile').onchange=function(){var f=$('#cfgFile').files[0];$('#cfgFile').value='';if(f)importConfigs(f);};
  $('#btnSave').onclick=function(){var n=$('#cfgName').value.trim()||P.work.name;P.work.name=n;var ex=P.configs.filter(function(c){return c.name===n;})[0],st=clone(P.work);
    if(ex){ex.state=st;ex.summary=summary();ex.updatedAt=Date.now();}else P.configs.push({id:uid('c'),name:n,state:st,summary:summary(),updatedAt:Date.now()});touch();refreshUI();toast(t('tSaved'));};
  $('#btnEmpty').onclick=function(){Object.keys(P.work.items).forEach(function(k){var it=P.work.items[k];it.on=false;it.lock=false;it.why=null;});P.work.name=t('cfg')+' '+(P.configs.length+1);selected=null;syncAll();commit();};
  $('#imgClose').onclick=function(){$('#imgModal').hidden=true;};
  window.addEventListener('resize',resize);if(window.ResizeObserver)new ResizeObserver(resize).observe(vp);
  if(window.matchMedia)window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',readTheme);
  new MutationObserver(readTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
}
function start(){
  loadLocal().then(function(cur){
    applyLang();if(!projects.length)projects.push(exampleProject());
    bind();readTheme();resize();openProject(cur||projects[0].id);
    if(P.example&&!P.configs.length&&onList().length<=2){autoArrangeQuiet();}
    showPage(location.hash==='#map'?'map':location.hash==='#graph'?'graph':location.hash==='#sketch'?'sketch':'3d');storageNote();loop();initRemote();
  });
}
function autoArrangeQuiet(){var tt=toast;toast=function(){};try{autoArrange();}finally{toast=tt;}hist=[snap()];histIdx=0;refreshUI();}
/* SKETCH */
/* ================= 2D sketch page: three drawing views (front / side / top) to play with positions freely ================= */
/* each view shows two axes of the same 3D position, so a part moved in one view moves in the others; the frame hides what is behind it */
var SK={mode:'detail',colMode:'part',gcache:{},zoom:1,pan:[0,0,0],rows:[],sel:null,k:1,drag:null,ghost:true,lock:true,hist:[],hi:-1,built:false,ver:-1};
var SKV=[{v:'front',u:[1,0,0],w:[0,1,0],d:[0,0,1],lab:'vFront'},{v:'side',u:[0,0,-1],w:[0,1,0],d:[1,0,0],lab:'vSide'},{v:'top',u:[1,0,0],w:[0,0,-1],d:[0,1,0],lab:'vTop'}];
function skState(){if(!P.sketch||typeof P.sketch!=='object')P.sketch={items:{}};if(!P.sketch.items)P.sketch.items={};return P.sketch;}
function skItem(iid){var it=skState().items[iid];return it&&it.on?it:null;}
function skBox(){var b=new THREE.Box3();if(shell.n)b.copy(shell.box);INST.forEach(function(i){var it=skItem(i.iid);if(!it)return;var h=halfExtents(psize(i.part),it.q);b.expandByPoint(new THREE.Vector3(it.p[0]-h[0],it.p[1]-h[1],it.p[2]-h[2]));b.expandByPoint(new THREE.Vector3(it.p[0]+h[0],it.p[1]+h[1],it.p[2]+h[2]));});
  if(b.isEmpty())b.set(new THREE.Vector3(-400,0,-400),new THREE.Vector3(400,400,400));return b;}
function dot3(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
function skPush(){var s=JSON.stringify(skState());if(SK.hist[SK.hi]!==s){SK.hist=SK.hist.slice(0,SK.hi+1);SK.hist.push(s);if(SK.hist.length>80)SK.hist.shift();SK.hi=SK.hist.length-1;}touch();}
function skUndo(d){var n=SK.hi+d;if(n<0||n>=SK.hist.length)return;SK.hi=n;P.sketch=JSON.parse(SK.hist[n]);if(SK.sel&&!skItem(SK.sel))SK.sel=null;skRender(true);}
function skBuild(){var host=$('#skViews');host.textContent='';SK.rows.forEach(function(r){r.ren.dispose();});SK.rows=[];
  SKV.forEach(function(V){var cell=el('div','skcellv'),lab=el('div','sklab',t(V.lab));cell.appendChild(lab);var vw=el('div','skview'),cv=document.createElement('canvas');vw.appendChild(cv);vw.dataset.v=V.v;cell.appendChild(vw);host.appendChild(cell);
    var ren=new THREE.WebGLRenderer({canvas:cv,antialias:true,preserveDrawingBuffer:true});ren.setPixelRatio(Math.min(window.devicePixelRatio||1,2));ren.autoClear=false;
    var cam=new THREE.OrthographicCamera(-1,1,1,-1,1,40000);var r={V:V,view:vw,cv:cv,ren:ren,cam:cam};SK.rows.push(r);
    cv.addEventListener('pointerdown',function(e){skDown(r,e);});
    cv.addEventListener('wheel',function(e){e.preventDefault();skZoomAt(r,e.clientX,e.clientY,e.deltaY<0?1.15:1/1.15);},{passive:false});});
  SK.built=true;}
/* every part its own colour (golden-angle hues) so a legend can name it; or the category colour as in 3D */
function partColor(p){var L=P.parts.filter(function(q){return q.id!==framePartId();}),ix=L.indexOf(p);if(ix<0)ix=0;var hue=(ix*137.508+18)%360,c=new THREE.Color();c.setHSL(hue/360,0.62,ix%2?0.42:0.55);return '#'+c.getHexString();}
function skColor(p){return SK.colMode==='part'?partColor(p):catColor(p.cat);}
function skGeo(p){var key=p.id+'|'+SK.mode+'|'+(p.mesh?p.mesh.id+p.mesh.unit+p.mesh.up+p.mesh.turn:'')+'|'+p.size.join(',')+p.shape,c=SK.gcache[key];if(c)return c;var g;
  if(SK.mode==='detail'&&p.mesh&&geo[p.mesh.id])g=transformGeo(geo[p.mesh.id],p.mesh,true);
  else{var s=psize(p),ca=cylAxis(p);if(ca>=0){var rad=s[(ca+1)%3]/2;g=new THREE.CylinderGeometry(rad,rad,s[ca],32);if(ca===0)g.rotateZ(PI/2);else if(ca===2)g.rotateX(PI/2);}else g=new THREE.BoxGeometry(s[0],s[1],s[2]);}
  c={g:g,e:g.attributes.position.count<300000?new THREE.EdgesGeometry(g,SK.mode==='detail'&&p.mesh?35:30):null};SK.gcache[key]=c;return c;}
function skScene(){var sc=new THREE.Scene(),gh=new THREE.Scene(),meshes=[];
  if(shell.n){var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(shell.T,3));
    var fm=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:new THREE.Color(theme.viewport||'#ffffff').lerp(new THREE.Color('#ffffff'),0.6),side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}));sc.add(fm);
    if(!SK.edges||SK.edgesVer!==shell.ver){SK.edges=new THREE.EdgesGeometry(g,28);SK.edgesVer=shell.ver;}sc.add(new THREE.LineSegments(SK.edges,new THREE.LineBasicMaterial({color:theme.ink})));}
  INST.forEach(function(i){var it=skItem(i.iid);if(!it)return;var p=i.part,G=skGeo(p),bg=G.g;
    var on=SK.sel===i.iid,col=skColor(p),m=new THREE.Mesh(bg,new THREE.MeshBasicMaterial({color:col,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}));m.position.set(it.p[0],it.p[1],it.p[2]);m.quaternion.set(it.q[0],it.q[1],it.q[2],it.q[3]);m.userData.iid=i.iid;sc.add(m);meshes.push(m);
    var eg=G.e||new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),ln=new THREE.LineSegments(eg,new THREE.LineBasicMaterial({color:on?theme.crit:theme.ink,transparent:!on,opacity:on?1:0.75}));ln.position.copy(m.position);ln.quaternion.copy(m.quaternion);if(G.e)sc.add(ln);
    if(on){var bh=new THREE.BoxHelper(m,theme.crit);sc.add(bh);}
    if(SK.ghost){var gm=new THREE.Mesh(bg,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:0.22,depthTest:false,depthWrite:false}));gm.position.copy(m.position);gm.quaternion.copy(m.quaternion);gh.add(gm);
      var gl=new THREE.LineSegments(eg,new THREE.LineDashedMaterial({color:on?theme.crit:theme.ink,dashSize:6*SK.k,gapSize:5*SK.k,depthTest:false,transparent:true,opacity:0.7}));gl.position.copy(m.position);gl.quaternion.copy(m.quaternion);gl.computeLineDistances();if(G.e)gh.add(gl);}});
  return {sc:sc,gh:gh,meshes:meshes};}
/* one scale (mm per pixel) for all three views, so sizes compare across them and with the shelf */
/* three equal views side by side; one scale for all (zoom 100% = the frame fits) */
function skLayout(fit){var b=skBox(),c=b.getCenter(new THREE.Vector3()),sz=b.getSize(new THREE.Vector3()),host=$('#skViews'),gap=10,pad=24;
  var W=Math.max(160,Math.floor((host.clientWidth-2*gap)/3)),top=host.getBoundingClientRect().top,H=Math.max(220,Math.min(W*1.15,window.innerHeight-top-$('#skBank').offsetHeight-40));
  var ext=SKV.map(function(V){var eu=Math.abs(V.u[0])*sz.x+Math.abs(V.u[1])*sz.y+Math.abs(V.u[2])*sz.z,ev=Math.abs(V.w[0])*sz.x+Math.abs(V.w[1])*sz.y+Math.abs(V.w[2])*sz.z;return [eu,ev];});
  SK.k0=Math.max(Math.max.apply(null,ext.map(function(e){return Math.max(e[0]/(W-2*pad),e[1]/(H-2*pad));})),0.05);if(fit||!SK.c0){SK.c0=[c.x,c.y,c.z];}
  SK.W=W;SK.H=H;SK.rows.forEach(function(r){r.W=W;r.H=H;r.cv.style.width=W+'px';r.cv.style.height=H+'px';r.ren.setSize(W,H,false);});skCams();}
function skCams(){SK.k=SK.k0/SK.zoom;SK.c=[0,1,2].map(function(a){return SK.c0[a]+SK.pan[a];});var c=SK.c,W=SK.W,H=SK.H;
  SK.rows.forEach(function(r){var V=r.V,cam=r.cam,dist=20000;cam.left=-W*SK.k/2;cam.right=W*SK.k/2;cam.top=H*SK.k/2;cam.bottom=-H*SK.k/2;cam.near=1;cam.far=40000;
    cam.position.set(c[0]+V.d[0]*dist/2,c[1]+V.d[1]*dist/2,c[2]+V.d[2]*dist/2);cam.up.set(V.w[0],V.w[1],V.w[2]);cam.lookAt(c[0],c[1],c[2]);cam.updateProjectionMatrix();});
  var zl=$('#skZoomL');if(zl)zl.textContent=Math.round(SK.zoom*100)+'%';var zr=$('#skZoom');if(zr&&document.activeElement!==zr)zr.value=String(Math.round(Math.log(SK.zoom)/Math.log(2)*100));}
/* zoom keeps the point under the mouse in place (or the middle, from the buttons) */
function skZoom(z,r,cx,cy){z=Math.max(0.25,Math.min(8,z));if(r&&cx!==undefined){var before=skWorld(r,cx,cy);SK.zoom=z;skCams();var after=skWorld(r,cx,cy);for(var a=0;a<3;a++)SK.pan[a]+=before[a]-after[a];}else SK.zoom=z;skCams();skRender(false);}
function skZoomAt(r,cx,cy,f){skZoom(SK.zoom*f,r,cx,cy);}
function skRender(relayout,fit){if(!P||$('#sketchView').hidden)return;if(!SK.built)skBuild();if(relayout||fit||SK.ver!==shell.ver){if(fit||SK.ver!==shell.ver){SK.zoom=1;SK.pan=[0,0,0];}skLayout(fit||SK.ver!==shell.ver);SK.ver=shell.ver;}
  var S=skScene();SK.meshes=S.meshes;var bg=new THREE.Color(theme.viewport||'#eeeeee');
  SK.rows.forEach(function(r){r.ren.setClearColor(bg,1);r.ren.clear();r.ren.render(S.sc,r.cam);if(SK.ghost)r.ren.render(S.gh,r.cam);});
  skShelf();skInfo();skLegend();setSeg('skSegMode',SK.mode);setSeg('skSegCol',SK.colMode);var st=skState();if(document.activeElement!==$('#skTitle'))$('#skTitle').value=st.title||'';if(document.activeElement!==$('#skNote'))$('#skNote').value=st.note||'';$('#skUndo').disabled=SK.hi<=0;$('#skRedo').disabled=SK.hi>=SK.hist.length-1;$('#skGhost').setAttribute('aria-pressed',String(SK.ghost));$('#skLockC').checked=SK.lock;}
/* parts not yet placed in the sketch wait on a shelf beside each view, drawn at the same scale and seen from the same side */
/* the bank: parts not yet placed, drawn from the front at the views' scale; copies of one part share a card */
function skShelf(){var left=[],seen={};INST.forEach(function(i){if(skItem(i.iid))return;if(seen[i.part.id]){seen[i.part.id].n++;return;}var g={i:i,n:1};seen[i.part.id]=g;left.push(g);});
  var sh=$('#skBankList'),sl=sh.scrollLeft;sh.textContent='';$('#skBankN').textContent=left.length?String(left.reduce(function(a,g){return a+g.n;},0)):'';
  if(!left.length){sh.appendChild(el('p','fine',t('skAllIn')));return;}var MAXH=96,V=SKV[0];
  left.forEach(function(g){var i=g.i,h=halfExtents(psize(i.part),[0,0,0,1]),wu=2*h[0],wv=2*h[1],sc=Math.max(1/SK.k,0),w=wu/SK.k,hh=wv/SK.k,f=Math.min(1,MAXH/Math.max(hh,1),220/Math.max(w,1));
    var cell=el('div','skcell'),bx=el('div','skpart');bx.style.width=Math.max(4,w*f)+'px';bx.style.height=Math.max(4,hh*f)+'px';bx.style.background=skColor(i.part);if(f<1)bx.classList.add('skscaled');
    bx.title=i.label+' · '+fmt(psize(i.part)[0])+'×'+fmt(psize(i.part)[1])+'×'+fmt(psize(i.part)[2])+' mm'+(f<1?' · '+t('skScaled'):'');
    cell.appendChild(bx);cell.appendChild(el('span','sknm',i.part.name+(g.n>1?' ×'+g.n:'')));cell.title=bx.title;cell.addEventListener('pointerdown',function(e){skShelfDown(i,null,e);});sh.appendChild(cell);});sh.scrollLeft=sl;}
function skInfo(){var box=$('#skInfo');box.textContent='';var i=SK.sel&&INST_BY[SK.sel],it=SK.sel&&skItem(SK.sel);
  if(!i||!it){box.appendChild(el('span','fine',t('skHint')));return;}
  var sw=el('span','sw');sw.style.background=skColor(i.part);box.appendChild(sw);box.appendChild(el('b','',i.label));
  ['X','Y','Z'].forEach(function(a,ax){var l=el('label','skxyz');l.appendChild(el('span','mono',a));var inp=el('input');inp.type='number';inp.step=ui.grid?5:1;inp.value=fmt(it.p[ax]);inp.id='skp'+a;
    inp.onchange=function(){var v=Number(inp.value);if(!isFinite(v))return;it.p[ax]=v;skPush();skRender(false);};l.appendChild(inp);box.appendChild(l);});
  box.appendChild(btn('small danger',t('skBack'),function(){delete skState().items[SK.sel];SK.sel=null;skPush();skRender(false);}));
  /* turning: slider = by hand, number = exact degrees about the model's X, Y, Z */
  var eu=new THREE.Euler().setFromQuaternion(new THREE.Quaternion(it.q[0],it.q[1],it.q[2],it.q[3]),'XYZ'),deg=[eu.x,eu.y,eu.z].map(function(v){var d=Math.round(v*1800/PI)/10;return d===-0?0:d;});
  var rg=el('div','skrot');rg.dir='ltr';rg.appendChild(el('span','lab',t('rotT')));
  function setR(ax,v,live){var d=deg.slice();d[ax]=v;var q=new THREE.Quaternion().setFromEuler(new THREE.Euler(d[0]*PI/180,d[1]*PI/180,d[2]*PI/180,'XYZ'));it.q=[q.x,q.y,q.z,q.w].map(function(n){return Math.round(n*1e6)/1e6;});deg=d;
    if(live)skDraw();else{skPush();skRender(false);}}
  ['X','Y','Z'].forEach(function(a,ax){var l=el('label','skxyz');l.appendChild(el('span','mono',a));var r=el('input');r.type='range';r.min='-180';r.max='180';r.step='1';r.value=String(deg[ax]);r.id='skr'+a;r.setAttribute('aria-label',t('rotT')+' '+a);
    var n=el('input');n.type='number';n.step='0.1';n.value=String(deg[ax]);n.id='skrN'+a;n.setAttribute('aria-label',t('rotT')+' '+a);
    r.oninput=function(){n.value=r.value;setR(ax,+r.value,true);};r.onchange=function(){setR(ax,+r.value,false);};n.onchange=function(){var v=Number(n.value);if(!isFinite(v))return;v=((v+180)%360+360)%360-180;setR(ax,Math.round(v*10)/10,false);};
    l.appendChild(r);l.appendChild(n);rg.appendChild(l);});
  SKV.forEach(function(V){rg.appendChild(btn('small','90° '+t(V.lab),function(){skRot(V);}));});box.appendChild(rg);}
/* redraw the views only (no panel rebuild) while a slider moves */
function skDraw(){var S=skScene();SK.meshes=S.meshes;var bg=new THREE.Color(theme.viewport||'#eeeeee');SK.rows.forEach(function(r){r.ren.setClearColor(bg,1);r.ren.clear();r.ren.render(S.sc,r.cam);if(SK.ghost)r.ren.render(S.gh,r.cam);});}
function skRot(V){var it=SK.sel&&skItem(SK.sel);if(!it)return;var q=new THREE.Quaternion(it.q[0],it.q[1],it.q[2],it.q[3]),r=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(V.d[0],V.d[1],V.d[2]),PI/2);q.premultiply(r);it.q=[q.x,q.y,q.z,q.w].map(function(n){return Math.round(n*1e6)/1e6;});skPush();skRender(false);}
function skWorld(r,cx,cy){var rc=r.cv.getBoundingClientRect(),du=(cx-rc.left-rc.width/2)*SK.k,dv=-(cy-rc.top-rc.height/2)*SK.k,V=r.V,c=SK.c;return [0,1,2].map(function(a){return c[a]+V.u[a]*du+V.w[a]*dv;});}
function skSnap(v){return ui.grid?Math.round(v/5)*5:Math.round(v*10)/10;}
function skDown(r,e){if(e.button!==0)return;var rc=r.cv.getBoundingClientRect(),nd=new THREE.Vector2((e.clientX-rc.left)/rc.width*2-1,-(e.clientY-rc.top)/rc.height*2+1),rr=new THREE.Raycaster();rr.setFromCamera(nd,r.cam);
  var hits=rr.intersectObjects(SK.meshes||[],false);if(!hits.length){SK.sel=null;e.preventDefault();r.cv.setPointerCapture(e.pointerId);SK.drag={pan:true,r:r,s:SK.pan.slice(),m:[e.clientX,e.clientY]};skRender(false);return;}
  /* with hidden parts shown, a click goes to the nearest part even if the frame covers it */
  var iid=hits[0].object.userData.iid,it=skItem(iid);SK.sel=iid;e.preventDefault();r.cv.setPointerCapture(e.pointerId);SK.drag={r:r,iid:iid,s:it.p.slice(),m:[e.clientX,e.clientY],moved:false};skRender(false);}
function skMove(e){var d=SK.drag;if(!d)return;if(d.pan){var du0=(e.clientX-d.m[0])*SK.k,dv0=-(e.clientY-d.m[1])*SK.k,V0=d.r.V;for(var a0=0;a0<3;a0++)SK.pan[a0]=d.s[a0]-V0.u[a0]*du0-V0.w[a0]*dv0;skCams();skRender(false);return;}if(d.shelf){d.gh.style.left=(e.clientX-d.off[0])+'px';d.gh.style.top=(e.clientY-d.off[1])+'px';return;}
  var du=(e.clientX-d.m[0])*SK.k,dv=-(e.clientY-d.m[1])*SK.k;if(Math.abs(e.clientX-d.m[0])+Math.abs(e.clientY-d.m[1])>2)d.moved=true;var it=skItem(d.iid),V=d.r.V;
  for(var a=0;a<3;a++){var mv=V.u[a]*du+V.w[a]*dv;it.p[a]=Math.abs(V.u[a])+Math.abs(V.w[a])>0?skSnap(d.s[a]+mv):d.s[a];}skRender(false);}
function skUp(e){var d=SK.drag;SK.drag=null;if(!d||d.pan)return;var o=document.elementFromPoint(e.clientX,e.clientY);
  if(d.shelf){d.gh.remove();var cv=o&&o.closest&&o.closest('.skview');if(!cv)return;var r=SK.rows.filter(function(x){return x.view===cv;})[0];if(!r)return;
    var w=skWorld(r,e.clientX,e.clientY),dep=r.V.d,c=SK.c;var p=[0,1,2].map(function(a){return Math.abs(dep[a])?c[a]:skSnap(w[a]);});skState().items[d.i.iid]={on:true,p:p,q:[0,0,0,1]};SK.sel=d.i.iid;skPush();skRender(false);return;}
  if(o&&o.closest&&o.closest('.skbank')){delete skState().items[d.iid];SK.sel=null;skPush();skRender(false);return;}
  if(d.moved)skPush();}
function skShelfDown(i,r,e){if(e.button!==0)return;e.preventDefault();var bx=e.currentTarget.querySelector('.skpart'),rc=bx.getBoundingClientRect(),gh=bx.cloneNode(true);gh.classList.add('skfly');document.body.appendChild(gh);
  var off=[rc.width/2,rc.height/2];gh.style.left=(e.clientX-off[0])+'px';gh.style.top=(e.clientY-off[1])+'px';SK.drag={shelf:true,i:i,gh:gh,off:off};}
/* legend: one swatch per part that is in the sketch, with how many copies */
function skLegendRows(){var L=[];P.parts.forEach(function(p){var n=INST.filter(function(i){return i.part===p&&skItem(i.iid);}).length;if(n)L.push({p:p,n:n,c:skColor(p)});});return L;}
function skLegend(){var box=$('#skLegend');box.textContent='';var L=skLegendRows();box.hidden=!L.length;L.forEach(function(r){var it=el('span','sklg');var sw=el('span','sw');sw.style.background=r.c;it.appendChild(sw);it.appendChild(el('span','',r.p.name+(r.n>1?' ×'+r.n:'')));box.appendChild(it);});}
/* A4 landscape sheet at 300 dpi: title, the three views at one scale, colour legend, the "why" text, scale bar */
function skExportA4(){var Wp=3508,Hp=2480,m=130,cv=document.createElement('canvas');cv.width=Wp;cv.height=Hp;var x=cv.getContext('2d'),rtl=lang==='he',st=skState(),L=skLegendRows();
  x.fillStyle='#ffffff';x.fillRect(0,0,Wp,Hp);x.fillStyle='#1b1c1a';x.textBaseline='alphabetic';x.direction=rtl?'rtl':'ltr';x.textAlign=rtl?'right':'left';var X0=rtl?Wp-m:m;
  x.font='700 76px Heebo, Arial, sans-serif';x.fillText(st.title||P.name,X0,m+60);
  x.font='400 38px Heebo, Arial, sans-serif';x.fillStyle='#666b63';x.fillText(P.name+' · '+new Date().toLocaleDateString(rtl?'he-IL':'en-GB'),X0,m+118);
  x.strokeStyle='#1b1c1a';x.lineWidth=3;x.beginPath();x.moveTo(m,m+150);x.lineTo(Wp-m,m+150);x.stroke();
  /* views */
  var gap=50,top=m+230,vw=Math.floor((Wp-2*m-2*gap)/3),botH=640,vh=Hp-top-m-botH-40,b=skBox(),c=b.getCenter(new THREE.Vector3()),sz=b.getSize(new THREE.Vector3()),pad=60;
  var k=Math.max.apply(null,SKV.map(function(V){var eu=Math.abs(V.u[0])*sz.x+Math.abs(V.u[1])*sz.y+Math.abs(V.u[2])*sz.z,ev=Math.abs(V.w[0])*sz.x+Math.abs(V.w[1])*sz.y+Math.abs(V.w[2])*sz.z;return Math.max(eu/(vw-2*pad),ev/(vh-2*pad));}));
  var ren=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});ren.setPixelRatio(1);ren.setSize(vw,vh,false);ren.autoClear=false;var keepSel=SK.sel;SK.sel=null;var S=skScene();SK.sel=keepSel;
  var order=rtl?[0,1,2]:[0,1,2];order.forEach(function(ix,pos){var V=SKV[ix],cam=new THREE.OrthographicCamera(-vw*k/2,vw*k/2,vh*k/2,-vh*k/2,1,40000);cam.position.set(c.x+V.d[0]*10000,c.y+V.d[1]*10000,c.z+V.d[2]*10000);cam.up.set(V.w[0],V.w[1],V.w[2]);cam.lookAt(c);cam.updateProjectionMatrix();
    ren.setClearColor(0xffffff,1);ren.clear();ren.render(S.sc,cam);if(SK.ghost)ren.render(S.gh,cam);var px=rtl?Wp-m-(pos+1)*vw-pos*gap:m+pos*(vw+gap);
    x.drawImage(ren.domElement,px,top);x.strokeStyle='#cfd3c8';x.lineWidth=2;x.strokeRect(px,top,vw,vh);x.fillStyle='#1b1c1a';x.font='600 40px Heebo, Arial, sans-serif';x.textAlign='center';x.fillText(t(V.lab),px+vw/2,top-22);});
  ren.dispose();x.textAlign=rtl?'right':'left';
  /* legend and text share the bottom band */
  var by=top+vh+70,colW=(Wp-2*m-gap)/2,legX=rtl?Wp-m:m,noteX=rtl?Wp-m-colW-gap:m+colW+gap;
  x.font='700 42px Heebo, Arial, sans-serif';x.fillStyle='#1b1c1a';x.fillText(t('skLegendT'),legX,by);
  x.font='400 32px Heebo, Arial, sans-serif';var per=Math.ceil(L.length/2)||1,lw=colW/2,lh=Math.min(54,Math.floor((botH-120)/per));
  L.forEach(function(r,ix){var col=Math.floor(ix/per),row=ix%per,yy=by+50+row*lh,xx=rtl?legX-col*lw:legX+col*lw;x.fillStyle=r.c;var sx=rtl?xx-34:xx;x.fillRect(sx,yy-26,34,34);x.strokeStyle='#1b1c1a';x.lineWidth=1.5;x.strokeRect(sx,yy-26,34,34);
    x.fillStyle='#1b1c1a';var label=r.p.name+(r.n>1?' ×'+r.n:''),tx=rtl?xx-50:xx+50,maxw=lw-70;while(x.measureText(label).width>maxw&&label.length>4)label=label.slice(0,-2);x.fillText(label,tx,yy);});
  x.font='700 42px Heebo, Arial, sans-serif';x.fillText(t('skWhyT'),rtl?noteX:noteX,by);x.font='400 34px Heebo, Arial, sans-serif';
  var words=String(st.note||'').split(/\s+/).filter(Boolean),line='',yy=by+56,lines=[];(String(st.note||'').split('\n')).forEach(function(par){var ws=par.split(/\s+/).filter(Boolean),ln='';ws.forEach(function(w){var tt=ln?ln+' '+w:w;if(x.measureText(tt).width>colW&&ln){lines.push(ln);ln=w;}else ln=tt;});lines.push(ln);});
  lines.slice(0,Math.floor((botH-80)/48)).forEach(function(l,ix){x.fillText(l,noteX,yy+ix*48);});
  /* scale bar: a round length close to 1/5 of a view width */
  var target=vw*k/5,mag=Math.pow(10,Math.floor(Math.log10(target))),len=[1,2,5,10].map(function(f){return f*mag;}).filter(function(v){return v<=target;}).pop()||mag,bl=len/k,sx0=rtl?m:Wp-m-bl,sy=Hp-m+10;
  x.fillStyle='#1b1c1a';x.fillRect(sx0,sy-14,bl,14);x.fillStyle='#ffffff';x.fillRect(sx0+bl/2,sy-12,bl/2-2,10);x.fillStyle='#1b1c1a';x.font='400 30px Heebo, Arial, sans-serif';x.textAlign='center';x.direction='ltr';x.fillText(fmt(len)+' mm',sx0+bl/2,sy-26);
  var paper=k*(300/25.4);x.direction='ltr';x.textAlign='left';var sc1='1:'+Math.round(paper),scx=rtl?sx0+bl+40:sx0-30-x.measureText(sc1).width-x.measureText(t('skScaleT')+' ').width;x.font='600 30px Heebo, Arial, sans-serif';x.fillText(sc1,scx,sy);var w1=x.measureText(sc1+'  ').width;x.font='400 30px Heebo, Arial, sans-serif';x.direction=rtl?'rtl':'ltr';x.textAlign=rtl?'right':'left';x.fillText(t('skScaleT'),rtl?scx+w1+x.measureText(t('skScaleT')).width:scx+w1,sy);
  cv.toBlob(function(bl2){saveFile(safeName(st.title||P.name)+'-A4.png',bl2,true);},'image/png');return cv;}
function skFromWork(){var it=skState().items={};onList().forEach(function(i){var w=P.work.items[i.iid];it[i.iid]={on:true,p:w.p.slice(),q:w.q.slice()};});skPush();skRender(true);toast(t('skPulled',Object.keys(it).length));}
function skToWork(){var n=0,S=skState().items;INST.forEach(function(i){var s=S[i.iid];if(!s||!s.on)return;var w=P.work.items[i.iid];w.on=true;w.p=s.p.slice();w.q=s.q.slice();w.lock=SK.lock;w.ext=false;w.why=t('whySketch');syncItem(i.iid);n++;});
  if(!n){toast(t('skEmpty'));return;}commit();showPage('3d');setView(ui.view);toast(t('skSent',n));}
function skBind(){window.addEventListener('pointermove',function(e){if(SK.drag)skMove(e);});window.addEventListener('pointerup',function(e){if(SK.drag)skUp(e);});
  window.addEventListener('resize',function(){if(!$('#sketchView').hidden)skRender(true);});
  $('#skPull').onclick=skFromWork;$('#skSend').onclick=skToWork;$('#skUndo').onclick=function(){skUndo(-1);};$('#skRedo').onclick=function(){skUndo(1);};
  $('#skGhost').onclick=function(){SK.ghost=!SK.ghost;skRender(false);};$('#skLockC').onchange=function(){SK.lock=$('#skLockC').checked;};
  $('#skFit').onclick=function(){skRender(true,true);};
  document.querySelectorAll('#skSegMode button').forEach(function(b){b.onclick=function(){SK.mode=b.dataset.v;skRender(false);};});document.querySelectorAll('#skSegCol button').forEach(function(b){b.onclick=function(){SK.colMode=b.dataset.v;skRender(false);};});
  $('#skTitle').oninput=function(){skState().title=$('#skTitle').value;touch();};$('#skNote').oninput=function(){skState().note=$('#skNote').value;touch();};$('#skA4').onclick=function(){skExportA4();};
  $('#skZin').onclick=function(){skZoom(SK.zoom*1.25);};$('#skZout').onclick=function(){skZoom(SK.zoom/1.25);};$('#skZoom').oninput=function(){skZoom(Math.pow(2,Number($('#skZoom').value)/100));};
  $('#skClear').onclick=function(){confirmBox(t('skQClear'),function(){skState().items={};SK.sel=null;skPush();skRender(true);});};}
function skOpen(){skState();var nw=SK.pid!==P.id;if(nw){SK.pid=P.id;SK.sel=null;SK.hist=[JSON.stringify(skState())];SK.hi=0;}skRender(true,nw||!SK.c0);}

window.__studio={sk:SK,skRender:skRender,screenOf:function(iid){var it=P.work.items[iid];_v.set(it.p[0],RT[iid].max[1],it.p[2]).project(camera);var r=canvas.getBoundingClientRect();return [r.left+(_v.x+1)/2*r.width,r.top+(1-_v.y)/2*r.height];},get P(){return P;},get checks(){return checks;},select:select,syncAll:syncAll,parseRules:parseRules,rulesText:rulesText,commit:commit,autoArrange:autoArrange,rowsToParts:rowsToParts,pointState:pointState,inject:function(pj,gid,pk){geo[gid]=unpackGeo(pk);projects.push(pj);openProject(pj.id);refreshUI();}};
start();
})();
