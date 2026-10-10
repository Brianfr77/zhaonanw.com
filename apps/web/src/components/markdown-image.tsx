// biome-ignore lint/correctness/noUndeclaredDependencies: Vinext provides this Next.js-compatible module.
import Image from "next/image";
import type { ComponentProps } from "react";

type MarkdownImageProps = ComponentProps<"img"> & {
  readonly node?: unknown;
};

const toDimension = (value: number | string | undefined): number | undefined => {
  const dimension = typeof value === "string" ? Number(value) : value;

  return dimension !== undefined && Number.isFinite(dimension) && dimension > 0
    ? dimension
    : undefined;
};

const MarkdownImage = ({
  alt = "",
  height: heightProperty,
  node: _node,
  src,
  width: widthProperty,
  ...properties
}: MarkdownImageProps) => {
  if (typeof src !== "string" || !src) {
    return null;
  }

  const height = toDimension(heightProperty);
  const width = toDimension(widthProperty);
  const sizes = width === undefined ? "100vw" : `(max-width: ${width}px) 100vw, ${width}px`;

  return (
    <a
      aria-label={`查看原图（新标签页）：${alt || "文章配图"}`}
      className="block w-full xl:w-4xl cursor-zoom-in no-underline"
      href={src}
      rel="noopener noreferrer"
      target="_blank"
      title="点击查看原图，可放大阅读文字与数据"
    >
      <Image
        {...properties}
        alt={alt}
        {...(height === undefined
          ? {}
          : {
              height,
            })}
        className="w-full h-auto"
        sizes={sizes}
        src={src}
        unoptimized={true}
        {...(width === undefined
          ? {}
          : {
              width,
            })}
      />
      <span className="block text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-sans">
        点击图片查看原图，可放大阅读文字与数据 ↗
      </span>
    </a>
  );
};

export { MarkdownImage };
