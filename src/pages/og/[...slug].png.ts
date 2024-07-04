import fs from "fs/promises";
import satori from "satori";
import type { APIRoute } from "astro";
import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'
import { Resvg } from "@resvg/resvg-js"
import { JSDOM } from "jsdom"

export const prerender = true;

// Get all entries from the `docs` content collection.
const entries = await getCollection('docs')

// Map the entry array to an object with the page ID as key and the
// frontmatter data as value.
const pages = Object.fromEntries(entries.map(({ data, slug }) => [slug, { data }]))

export const GET: APIRoute = async ({ props, params, request }) => {
  let svg = await fs.readFile("./public/flame.svg");
  svg = svg
    .toString()
    .replaceAll("&#60;doc title&#62;", props.title)
    .replaceAll("&#60;doc desc&#62;", props.description);
  console.log(svg);
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
