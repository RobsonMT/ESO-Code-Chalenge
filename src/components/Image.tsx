import { useInView } from "react-intersection-observer";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  srcSet?: string;
  sizes?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  className?: string;
}

const Image = ({
  src,
  alt,
  width,
  height,
  srcSet,
  sizes,
  objectFit = "cover",
  className = "",
}: ImageProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Carrega uma vez quando entra na viewport
    threshold: 0.1, // Carrega quando 10% da imagem está visível
  });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        overflow: "hidden",
      }}
      className={className}
    >
      {inView && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: objectFit,
          }}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default Image;
