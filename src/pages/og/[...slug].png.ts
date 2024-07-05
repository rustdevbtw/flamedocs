import fs from "fs/promises";
import type { APIRoute } from "astro";
import { getCollection } from 'astro:content'
import { Resvg } from "@resvg/resvg-js"


function ev(str, i) {
    return str
      .replace(/%i<\{([^}]+)\}>/g, (_, e) => Function("i", `"use strict"; return (i${e})`)(i));
}

function splitString(str, max = 50, tmpl = '%s') {
    const maxLen = max;
    const words = str.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + word).length <= maxLen) {
            currentLine += (currentLine.length ? ' ' : '') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    });

    if (currentLine.length) {
        lines.push(currentLine);
    }

    return lines.map((l, i) => ev(tmpl, i).replaceAll("%s", l));
}

export const prerender = true;

// Get all entries from the `docs` content collection.
const entries = await getCollection('docs')

// Map the entry array to an object with the page ID as key and the
// frontmatter data as value.
const pages = Object.fromEntries(entries.map(({ data, slug }) => [slug, { data }]))

export const GET: APIRoute = async ({ props, params, request }) => {
  let svg = (await fs.readFile("./public/flame.svg")).toString();
  let descs = splitString(props.description, 48, `<tspan x="50%" y="%i<{*56+326}>" dominant-baseline="middle" text-anchor="middle">%s</tspan>`);
  let titles = splitString(props.title, 32, `<tspan x="50%" y="%i<{*3+244.682}>" dominant-baseline="middle" text-anchor="middle">%s</tspan>`);
  svg = svg.replaceAll(`<tspan x="50%" y="326" dominant-baseline="middle" text-anchor="middle">$desc</tspan>`, descs.join("")).replaceAll(`<tspan x="50%" y="244.682" dominant-baseline="middle" text-anchor="middle">$title</tspan>`, titles.join(""));
  const opts = {
    font: {
      fontFiles: ['./src/fonts/Cas.ttf'], // Load custom fonts.
      loadSystemFonts: false, // It will be faster to disable loading system fonts.
    },
  };
  const resvg = new Resvg(svg, opts)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};

export function getStaticPaths() {
  return Object.keys(pages).map(p => { return { params: { slug: p }, props: pages[p].data } });
}
