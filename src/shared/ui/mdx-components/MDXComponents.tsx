import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

export const MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-4xl font-bold mb-4 mt-8" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-3xl font-semibold mb-3 mt-6" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-2xl font-semibold mb-2 mt-4" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-4 leading-7" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => {
    const { href, ...rest } = props;
    if (href?.startsWith("/")) {
      return <Link href={href} className="text-[var(--accent)] hover:underline" {...rest} />;
    }
    return (
      <a
        href={href}
        className="text-[var(--accent)] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      />
    );
  },
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <Image
      src={(props.src as string) || ""}
      alt={props.alt || ""}
      width={800}
      height={600}
      className="rounded-lg my-8"
      style={{ maxWidth: "100%", height: "auto" }}
    />
  ),
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="bg-[var(--muted)] px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="bg-[var(--muted)] rounded-lg p-4 overflow-x-auto my-6"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-[var(--accent)] pl-4 italic my-6 opacity-80"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border border-[var(--border)] bg-[var(--muted)] px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border border-[var(--border)] px-4 py-2" {...props} />
  ),
};
