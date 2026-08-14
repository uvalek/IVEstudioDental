/* Optimizador de imágenes de IV Estudio Dental
 * ---------------------------------------------------------------------------
 * ESTO NO ES PARTE DEL SITIO. El sitio son archivos HTML y CSS sueltos y
 * funciona sin nada de esto. Este script sólo sirve para preparar una imagen
 * nueva cuando el cliente mande una foto.
 *
 * CÓMO SE USA
 *   1. Deja la foto nueva en la carpeta  herramientas/originales/
 *      con el mismo nombre que aparece en la lista IMAGENES de abajo.
 *      Por ejemplo: herramientas/originales/retrato-doctor.jpg
 *   2. Abre la Terminal en la carpeta del proyecto y escribe:
 *
 *        cd herramientas && npm install sharp && node optimizar-imagenes.mjs
 *
 *   3. Listo. Se generan solas todas las versiones en assets/img/
 *      y el sitio las toma sin tocar el HTML.
 *
 * La carpeta herramientas/node_modules no se sube a GitHub (está en .gitignore).
 */

import sharp from "sharp";
import { readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const ORIGINALES = path.join(AQUI, "originales");
const DESTINO = path.join(AQUI, "..", "assets", "img");

/* Los anchos salen del tamaño real al que se ve cada imagen en la página.
 * No los cambies a ojo: si los subes, el sitio se vuelve más lento. */
const IMAGENES = [
  {
    nombre: "logo-iv",
    anchos: [900],
    calidad: 86,
    nota: "Logotipo. Se usa en el menú, de marca de agua y en el pie.",
  },
  {
    nombre: "doctor-hero",
    // 1024 es el ancho real del original: pedir más no añade detalle.
    anchos: [460, 700, 1024],
    calidad: 74,
    alfa: true,
    nota: "Foto grande del doctor, arriba de todo. Necesita fondo recortado (PNG).",
  },
  {
    nombre: "retrato-doctor",
    anchos: [400, 800],
    calidad: 76,
    alfa: true,
    nota: "Retrato de la sección 'El Doctor'. Necesita fondo recortado (PNG).",
  },
  {
    nombre: "antes-despues-protesis",
    anchos: [400, 800],
    calidad: 86,
    nota: "Tarjeta de prótesis. Lleva texto, por eso va con más calidad.",
  },
  {
    nombre: "ortodoncia-brackets",
    anchos: [400, 800],
    calidad: 86,
    nota: "Tarjeta de ortodoncia. Lleva texto, por eso va con más calidad.",
  },
  {
    nombre: "paciente-consulta",
    anchos: [400, 800],
    calidad: 82,
    nota: "Tarjeta de endodoncia.",
  },
];

if (!existsSync(ORIGINALES)) {
  console.error(`\nNo existe la carpeta:\n  ${ORIGINALES}\n\nCréala y mete ahí las fotos.\n`);
  process.exit(1);
}

const archivos = readdirSync(ORIGINALES);
const buscar = (nombre) =>
  archivos.find((f) => path.parse(f).name === nombre && !f.startsWith("."));

let procesadas = 0;
let pesoAntes = 0;
let pesoDespues = 0;

for (const img of IMAGENES) {
  const encontrado = buscar(img.nombre);
  if (!encontrado) {
    console.log(`  —  ${img.nombre}: sin archivo nuevo, se deja como está`);
    continue;
  }

  const origen = path.join(ORIGINALES, encontrado);
  const meta = await sharp(origen).metadata();
  pesoAntes += statSync(origen).size;
  console.log(`\n  ${img.nombre}  (${meta.width}x${meta.height}, ${meta.hasAlpha ? "con transparencia" : "sin transparencia"})`);

  if (img.alfa && !meta.hasAlpha) {
    console.log(`     AVISO: esta imagen debería tener el fondo recortado y no lo tiene.`);
  }

  for (const ancho of img.anchos) {
    // Con un solo tamaño el archivo va sin sufijo; con varios, lleva el ancho.
    const sufijo = img.anchos.length === 1 ? "" : `-${ancho}`;
    const salida = path.join(DESTINO, `${img.nombre}${sufijo}.webp`);
    const info = await sharp(origen)
      .resize({ width: ancho, withoutEnlargement: true })
      .webp({ quality: img.calidad, alphaQuality: img.alfa ? 85 : 80, effort: 6 })
      .toFile(salida);
    pesoDespues += info.size;
    console.log(`     ${path.basename(salida).padEnd(32)} ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
  procesadas++;
}

if (procesadas === 0) {
  console.log(`\nNo se encontró ninguna imagen nueva en:\n  ${ORIGINALES}\n`);
} else {
  console.log(
    `\n  ${procesadas} imagen(es). ${(pesoAntes / 1024 / 1024).toFixed(2)} MB -> ${Math.round(pesoDespues / 1024)} KB\n`
  );
}
