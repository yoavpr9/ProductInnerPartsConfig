"""Rebuild index.html from src/config-studio.html + src/app.js (run from the repository root)."""
h = open('src/config-studio.html', encoding='utf8').read()
s = open('src/app.js', encoding='utf8').read()
tag = '<script src="app.js"></script>'
assert tag in h
page = h.replace(tag, '<script>\n' + s + '\n</script>')
head = ('<!doctype html>\n<html lang="he" dir="rtl">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<style>body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n')
open('index.html', 'w', encoding='utf8').write(head + page + '\n</body>\n</html>\n')
