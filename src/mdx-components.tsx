import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        src={(props as { src?: string }).src || ""}
        alt={(props as { alt?: string }).alt || ""}
        width={800}
        height={600}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    ),
    ...components,
  };
}
