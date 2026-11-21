"""Rebuild index.html from src/config-studio.html + src/app.js (run from the repository root)."""
h = open('src/config-studio.html', encoding='utf8').read()
s = open('src/app.js', encoding='utf8').read()
tag = '<script src="app.js"></script>'
assert tag in h
page = h.replace(tag, '<script>\n' + s + '\n</script>')
head = ('<!doctype html>\n<html lang="he" dir="rtl">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<meta name="description" content="Config Studio: arrange a product\'s inner parts in 3D and check centre of gravity, collisions and cable lengths, in the browser.">\n'
        '<meta name="theme-color" content="#f3f4ef" media="(prefers-color-scheme: light)">\n'
        '<meta name="theme-color" content="#141613" media="(prefers-color-scheme: dark)">\n'
        '<meta property="og:title" content="Config Studio">\n'
        '<meta property="og:description" content="Arrange a product\'s inner parts in 3D and check balance, collisions and connections.">\n'
        '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Crect width=\'32\' height=\'32\' rx=\'7\' fill=\'%231b1c1a\'/%3E%3Crect x=\'7\' y=\'7\' width=\'18\' height=\'18\' rx=\'2\' fill=\'none\' stroke=\'%23f3f4ef\' stroke-width=\'2\'/%3E%3Crect x=\'10\' y=\'15\' width=\'6\' height=\'7\' fill=\'%238fb0ff\'/%3E%3Ccircle cx=\'20\' cy=\'18\' r=\'2.5\' fill=\'%23f3f4ef\'/%3E%3C/svg%3E">\n'
        '<style>body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n')
open('index.html', 'w', encoding='utf8').write(head + page + '\n</body>\n</html>\n')
