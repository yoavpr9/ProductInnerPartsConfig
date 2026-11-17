# ProductInnerPartsConfig

Config Studio: a browser tool for testing how the inner parts of a product fit together.
סטודיו לבדיקת קונפיגורציית הרכיבים הפנימיים של מוצר, ישירות בדפדפן.

## What it does / מה הוא עושה

- Several projects, each with its own name and balance reference point.
- Parts table: edit in place, import Excel/CSV, paste from Google Sheets, download an Excel template.
- Rule bank: placement rules per part (as low as possible, close to, away from, clearance, ...) and your own rules.
- Connections: link parts to each other (data, power, water) with a maximum length, e.g. `link:gnss:300:data`. Lines are drawn in 3D and turn red when too long.
- Connection map: a second page (#map) that shows each system (data, power, water) as a tree of what connects to what, with lengths, and lets you add or delete connections.
- 3D files: drop STL, OBJ or STEP files, several at once, as an outer shell or as the model of a part.
- Live checks: centre of gravity against the reference point, full vs. empty mass, collisions, parts outside the shell, rule violations.
- Auto-arrange, saved configurations, PNG sheet export, Hebrew and English.

## Your data / הנתונים שלך

Everything you enter stays in your own browser on your own computer. Nothing is uploaded.
To move a project to another computer, or to keep a backup, use "Save project file" and "Open project file".

כל מה שמזינים נשמר בדפדפן שלכם בלבד, ושום דבר לא עולה לשרת.
כדי להעביר פרויקט למחשב אחר או לגבות אותו: "שמור קובץ פרויקט" ו"פתח קובץ פרויקט".

## Known approximations / קירובים

- Collisions are checked on each part's bounding box (cylinders get a round check), not on the exact shape.
- Each part's mass is treated as sitting at the centre of its box.
- The "low" and "high" rules use the bottom and top third of the height. That threshold is a choice, not a standard.
- Connection length is the straight line between part centres. A real cable is longer, so leave margin.
- X_T (Parasolid) files are not supported. Export to STEP or STL from your CAD program.

## Files

- `index.html` is the whole site.
- `lib/` holds the STEP reader ([occt-import-js](https://github.com/kovacsv/occt-import-js), LGPL-2.1, with its licence files).
- `src/` holds the readable source. Run `python3 src/build.py` from the repository root to rebuild `index.html`.

Other libraries are loaded from public CDNs: three.js r128 (MIT) and SheetJS 0.18.5 (Apache-2.0).
