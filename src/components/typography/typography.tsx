interface TypographyProps {
  text: string | number;
  className?: string;
  length?: number;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong";
}

function Typography({ variant, text, className, length }: TypographyProps) {
  const Component = variant || "span";

  return (
    <Component className={className}>
      {length && typeof text === "string" && text.length > length ? (
        <>{text.substring(0, length)}...</>
      ) : (
        text
      )}
    </Component>
  );
}

export { Typography };
