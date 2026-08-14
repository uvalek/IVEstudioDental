# IV Estudio Dental — sitio web

Landing de una sola página. HTML, CSS y un archivo pequeño de JavaScript.
No hay que "compilar" ni "construir" nada: los archivos que ves son
exactamente los que se publican.

**Sitio:** https://iv-estudio-dental.vercel.app
**Cliente:** IV Estudio Dental · Dr. Antonio · San Martín Texmelucan, Puebla

---

## Lo primero que tienes que saber

Sólo hay **un archivo que vas a tocar**: `index.html`. Ahí están todos los
textos, teléfonos y direcciones.

Ábrelo con cualquier editor de texto (VS Code, o incluso TextEdit en modo
texto plano). Busca lo que quieras cambiar con **Cmd+F**, cámbialo, guarda.

**No toques estos archivos** salvo que sepas lo que haces:

| Archivo | Qué es |
|---|---|
| `assets/css/styles.css` | Los colores, tamaños y la forma de todo |
| `assets/js/main.js` | Sólo hace funcionar el menú del celular |
| `vercel.json` | Configuración del servidor |
| `assets/fonts/` | Las tipografías |

---

## Cambiar el teléfono o el WhatsApp

El número está en el sitio de dos maneras distintas y hay que cambiar **las
dos**. Usa Buscar y Reemplazar (Cmd+Shift+F o Cmd+Option+F) en `index.html`:

### 1. El número que se ve en pantalla — aparece 6 veces
Busca: `248 125 2250`
Reemplaza por el número nuevo, con los mismos espacios.

### 2. El enlace de WhatsApp — aparece 5 veces
Busca: `wa.me/522481252250`
Reemplaza por: `wa.me/52` + el número nuevo sin espacios ni guiones.

> El `52` del principio es el código de México. Va **siempre**, aunque el
> número sea local. Sin él, WhatsApp no abre.

### 3. El enlace de llamada — aparece 3 veces
Busca: `tel:+522481252250`
Reemplaza por: `tel:+52` + el número nuevo sin espacios.

### 4. La ficha de Google — aparece 2 veces
Busca: `+52-248-125-2250`
Reemplaza respetando los guiones.

**Al terminar**, busca `2481252250` en todo el archivo. Si aparece algún
resultado, es uno que se te escapó.

---

## Cambiar el mensaje que sale escrito en WhatsApp

Cuando alguien toca el botón, WhatsApp se abre con un mensaje ya escrito.
Hoy dice: *"Hola, vi su página y quiero agendar una cita."*

Ese texto va **codificado** dentro del enlace (por eso se ve raro: los
espacios son `%20`, la í es `%C3%AD`). Aparece 5 veces:

```
?text=Hola%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20agendar%20una%20cita.
```

Para cambiarlo sin equivocarte:

1. Entra a https://www.urlencoder.org
2. Escribe el mensaje nuevo y copia el resultado codificado.
3. En `index.html`, busca y reemplaza todo lo que va después de `?text=`
   por el texto nuevo, en las 5 apariciones.

Si algo sale mal, WhatsApp se abre igual pero sin mensaje. No rompe el sitio.

---

## Los 6 datos que faltan

Todo lo que está sin confirmar aparece **entre corchetes** y en color gris
claro. Búscalo en `index.html` escribiendo `PENDIENTE` en el buscador: cada
uno tiene un comentario justo encima explicando qué va ahí.

| # | Qué falta | Busca este texto |
|---|---|---|
| 1 | ¿Ofrecen limpieza, resinas, extracciones, blanqueamiento? | `[Para confirmar con el cliente:` |
| 2 | Apellido del doctor | `[apellido pendiente]` |
| 3 | Semblanza del doctor (2–3 párrafos) | `[Semblanza pendiente` |
| 4 | Número de cédula profesional | `[Céd. Prof. — pendiente]` |
| 5 | Torre y consultorio de Angelópolis | `[Torre y número de consultorio` |
| 6 | Dirección real de la página de Facebook | `[enlace pendiente]` |

### Las reseñas ya están puestas

Las tres reseñas del sitio son reales, copiadas de la ficha de Google el
13/08/2026. Son las únicas tres que tienen texto escrito; las otras 17 son
calificaciones de estrellas sin comentario. Están en dos lugares y si algún
día se cambian hay que tocar los dos:

1. La sección visible, dentro de las tarjetas con `<blockquote>`.
2. La ficha de Google, en el bloque `"review"` del JSON-LD.

### Cómo llenar cada uno

Reemplaza el texto entre corchetes, **incluidos los corchetes**, por el dato
real. Ejemplo:

```html
<!-- ANTES -->
<h2 class="titular titular--seccion">Dr. Antonio <span class="pendiente">[apellido pendiente]</span></h2>

<!-- DESPUÉS -->
<h2 class="titular titular--seccion">Dr. Antonio Vázquez</h2>
```

Fíjate que se borra también el `<span class="pendiente">` y su `</span>`.
Esa etiqueta es la que pinta el texto en gris; si la dejas, el apellido real
se vería descolorido.

### El caso del Facebook (pendiente 12)

Hoy va como **texto, no como enlace**, porque no tenemos la dirección real.
El diseño original apuntaba a una *búsqueda* de Facebook disfrazada de perfil,
y eso se quitó.

Cuando tengas la URL real, cambia el `<span class="enlace-pie">` por un
enlace. Búscalo con `PENDIENTE 12` y sustituye el bloque entero por:

```html
<a class="enlace-pie" href="AQUI_VA_LA_URL_REAL" target="_blank" rel="noopener">
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  IV Estudio Dental
</a>
```

### Botón de emergencia: esconder todo lo que falta

¿Necesitas enseñarle el sitio al cliente antes de tener los datos? Abre
`assets/css/styles.css`, busca `BLOQUES PENDIENTES` y añade esta línea justo
debajo del comentario:

```css
.pendiente { display: none !important; }
```

Desaparecen los 12 de golpe. Cuando los llenes, borra esa línea.

---

## Cambiar una imagen

Las imágenes están en `assets/img/`. Cada foto existe en **dos o tres
tamaños** (`-400`, `-800`, `-1024`) para que en un celular no se descargue una
imagen gigante. Por eso no basta con reemplazar un archivo: hay que
regenerar todos los tamaños.

Es un solo comando:

1. Deja la foto nueva en `herramientas/originales/` con **el mismo nombre**
   que tenía la anterior (la extensión puede cambiar):

   | Archivo a reemplazar | Qué es |
   |---|---|
   | `logo-iv` | Logotipo |
   | `doctor-hero` | Foto grande del doctor, arriba de todo |
   | `retrato-doctor` | Retrato en la sección "El Doctor" |
   | `antes-despues-protesis` | Tarjeta de prótesis |
   | `ortodoncia-brackets` | Tarjeta de ortodoncia |
   | `paciente-consulta` | Tarjeta de endodoncia |

2. En la Terminal, dentro de la carpeta del proyecto:

```bash
cd herramientas && npm install sharp && node optimizar-imagenes.mjs
```

3. Listo. Se generan todos los tamaños y el sitio los toma solo. No hay que
   tocar el HTML.

> Las dos fotos del doctor (`doctor-hero` y `retrato-doctor`) necesitan estar
> **con el fondo recortado** y guardadas como PNG. Si mandas un JPEG normal,
> se verá un rectángulo blanco alrededor del doctor. El script te avisa si
> detecta ese problema.

### Y no olvides el texto alternativo

Cada imagen tiene un `alt="..."` que describe qué se ve. Lo usa Google y lo
leen las personas ciegas. Si cambias una foto por algo distinto, cambia
también su `alt` en `index.html`.

---

## Cambiar horarios, direcciones o servicios

Estos datos están **en dos lugares** y hay que cambiar los dos, o Google
mostrará información distinta a la de la página:

1. **En el texto visible**, dentro del `<body>`.
2. **En la ficha de Google**, dentro del bloque
   `<script type="application/ld+json">` que está arriba del todo.

Busca en `index.html` el comentario *"Ficha del negocio para Google"*. Ahí
verás los horarios escritos así:

```json
"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
"opens": "10:00",
"closes": "19:00"
```

Los días van en inglés y las horas en formato de 24 horas. Es la única parte
del archivo donde hay que escribir en inglés.

> Después de tocar ese bloque, pégalo en
> https://validator.schema.org para comprobar que no se rompió. Una coma de
> más y Google deja de leer la ficha entera.

---

## Poner el dominio propio

Cuando el cliente contrate su dominio (por ejemplo `ivestudiodental.com`):

### 1. En los archivos

El dominio viejo aparece **12 veces** repartidas en 3 archivos. No vayas
etiqueta por etiqueta: usa **Buscar y Reemplazar en todo el archivo**.

Busca: `iv-estudio-dental.vercel.app`
Reemplaza por: `ivestudiodental.com`

| Archivo | Veces |
|---|---|
| `index.html` | 10 (7 de ellas en la ficha de Google) |
| `robots.txt` | 1 |
| `sitemap.xml` | 1 |

Comprueba al final buscando `vercel.app`: no debe quedar ningún resultado.

### 2. En Vercel

Panel de Vercel → tu proyecto → **Settings** → **Domains** → **Add**.
Vercel te dirá qué registros DNS poner en el sitio donde compraste el
dominio. Tarda entre unos minutos y unas horas en funcionar.

### 3. Avisarle a Google

Entra a https://search.google.com/search-console, agrega el dominio nuevo y
manda el `sitemap.xml`. Sin esto, Google puede tardar semanas en enterarse.

---

## Publicar un cambio

El sitio está conectado a Vercel. Cada vez que subes un cambio a GitHub,
Vercel lo publica solo en 1–2 minutos.

```bash
git add .
git commit -m "Agrego el apellido del doctor"
git push
```

Si algo sale mal, en el panel de Vercel puedes volver a la versión anterior:
**Deployments** → busca la que funcionaba → **⋯** → **Promote to Production**.

### Antes de publicar, revisa siempre

- Abre `index.html` en el navegador y mira que no haya quedado texto entre
  corchetes que ya debería estar lleno.
- Toca los botones de WhatsApp y comprueba que abren con el mensaje correcto.
- Míralo en tu celular, no sólo en la computadora.

---

## Qué hay en cada carpeta

```
index.html          ← el sitio entero: todos los textos están aquí
README.md           ← este archivo
robots.txt          ← le dice a Google que puede indexar
sitemap.xml         ← lista de páginas para Google
site.webmanifest    ← nombre e iconos al "instalar" el sitio en un celular
vercel.json         ← caché y seguridad del servidor

assets/
  css/styles.css    ← todo el diseño
  js/main.js        ← sólo el menú del celular
  img/              ← fotos, logotipo e imagen de vista previa
  fonts/            ← Cormorant Garamond y Lora
  icons/            ← favicon e iconos de celular

herramientas/
  optimizar-imagenes.mjs   ← script para preparar fotos nuevas
  originales/              ← aquí dejas las fotos sin optimizar

_originales/        ← respaldo del export de Claude Design (17 MB).
                      No se sube a GitHub. Puedes borrarlo si ya no lo quieres.
```

---

## Notas técnicas

Por si alguien retoma el proyecto:

- **El sitio funciona sin JavaScript.** El menú del celular abre con una
  casilla de CSS; `main.js` sólo añade cerrar con Esc y al elegir una sección.
  Esto importa porque el export original no dibujaba nada sin JS.
- **Las animaciones de entrada** (los desvanecidos al bajar) están encerradas
  en la clase `.js`, que sólo se activa si el navegador ejecuta JavaScript. Sin
  JS no se oculta nada: la página se ve completa y quieta. Lo mismo para quien
  tenga activado "reducir movimiento" en su sistema. Si quieres quitarlas del
  todo, borra el apartado 9 de `styles.css`.
- **Caché:** `vercel.json` guarda las tipografías un año, las imágenes un día y
  el CSS y el JS los revalida siempre. Esto último es a propósito: como esos
  dos archivos se editan y conservan el mismo nombre, marcarlos como
  "inmutables" haría que quien ya visitó el sitio siguiera viendo la versión
  vieja durante meses.
- **No hay dependencias.** `sharp` sólo se instala si vas a optimizar
  imágenes, y vive en `herramientas/`, fuera del sitio.
- **Peso:** ~500 KB en la primera carga. El export original pesaba 17 MB.
- **Contraste:** cuatro colores del diseño original se oscurecieron porque no
  pasaban el mínimo de accesibilidad (WCAG AA). Están anotados en
  `styles.css`, en el apartado de variables.
- **No hay aviso de privacidad** porque el sitio no pide ni guarda ningún dato
  personal: no hay formularios. Si algún día se agrega uno, hay que redactarlo
  (lo exige la LFPDPPP).
- **Pendiente de revisar:** la foto `ortodoncia-brackets` lleva la marca de
  agua *"Dra. Italivi Flores O."*. Confirmar con el cliente si es del
  consultorio antes de dejarla publicada.
