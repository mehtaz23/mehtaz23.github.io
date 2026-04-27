import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

/**
 * Remark plugin: converts ```mermaid fenced code blocks into raw HTML
 * <pre class="mermaid"> nodes BEFORE shiki syntax highlighting runs.
 *
 * Rehype plugins run after shiki, so by that point the code block has already
 * been transformed into spans with astro-code classes and the language-mermaid
 * class is gone. By operating at the remark (MDAST) level we intercept the
 * raw `code` node — lang === "mermaid" — and replace it with an HTML node
 * that shiki skips entirely. Mermaid.js then picks it up client-side.
 */
function remarkMermaid() {
  return (tree) => {
    function walk(node) {
      if (Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.type === "code" && child.lang === "mermaid") {
            // Escape HTML entities so the browser's HTML parser hands
            // Mermaid.js the correct raw text via element.textContent.
            const escaped = child.value
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
            node.children[i] = {
              type: "html",
              value: `<pre class="mermaid">${escaped}</pre>`,
            };
          } else {
            walk(child);
          }
        }
      }
    }
    walk(tree);
  };
}

export default defineConfig({
  site: "https://mehtaz23.github.io",
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});
