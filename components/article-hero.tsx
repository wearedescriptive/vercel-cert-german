import { getImageProps } from "next/image";

export function ArticleHero({
  image: { src, alt },
}: {
  image: { src: string; alt: string };
}) {
  const common = { src, alt, sizes: "100vw" };

  // desktop: wide landscape
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 600,
    quality: 85,
  });

  // mobile: taller aspect ratio
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 900,
    quality: 75,
  });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source media="(min-width: 640px)" srcSet={mobile} />
      <img
        {...rest}
        alt={alt}
        fetchPriority="high"
        style={{ width: "100%", height: "auto" }}
        className="rounded-lg"
      />
    </picture>
  );
}
