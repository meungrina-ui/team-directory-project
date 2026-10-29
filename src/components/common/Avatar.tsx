import Image from "next/image";
import { departmentTone } from "@/lib/departments";
import { getInitials } from "@/lib/utils";

type AvatarProps = {
  name: string;
  src: string;
  /** Colours the initials fallback. */
  department: string;
  size?: "md" | "lg";
  /** "eager" for images visible without scrolling; next/image lazy-loads by default. */
  loading?: "eager" | "lazy";
  className?: string;
};

const sizes = {
  md: { px: 80, className: "size-20 text-2xl" },
  lg: { px: 112, className: "size-28 text-3xl" },
};

/**
 * Photo, or initials when there is no photo.
 * Always shown next to the person's name, so it is decorative for screen
 * readers (empty alt / aria-hidden) to avoid hearing the name twice.
 */
export function Avatar({
  name,
  src,
  department,
  size = "md",
  loading = "lazy",
  className = "",
}: AvatarProps) {
  const { px, className: sizeClass } = sizes[size];

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={px}
        height={px}
        loading={loading}
        className={`${sizeClass} shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }

  const { bg, fg } = departmentTone(department);
  return (
    <span
      aria-hidden="true"
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full font-semibold ${bg} ${fg} ${className}`}
    >
      {getInitials(name)}
    </span>
  );
}
