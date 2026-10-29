import Link from "next/link";
import { departmentTone } from "@/lib/departments";
import type { Member } from "@/lib/members";
import { Avatar } from "./Avatar";
import { DepartmentBadge } from "./DepartmentBadge";

type MemberCardProps = {
  member: Member;
  imageLoading?: "eager" | "lazy";
};

/**
 * The whole card is clickable, but only the name is the actual link
 * (its ::after overlay stretches over the card). Screen readers hear one
 * short link name instead of the entire card's text.
 */
export function MemberCard({ member, imageLoading = "lazy" }: MemberCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-background shadow-sm hover:border-accent hover:shadow-lg motion-safe:transition-[translate,box-shadow,border-color] motion-safe:duration-200 motion-safe:hover:-translate-y-1 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus)">
      {/* Decorative banner in the department colour. */}
      <div aria-hidden="true" className={`h-16 ${departmentTone(member.department).bg}`} />

      <div className="flex flex-1 flex-col items-center px-md pb-md text-center">
        <Avatar
          name={member.name}
          src={member.avatar}
          department={member.department}
          loading={imageLoading}
          className="-mt-10 ring-4 ring-background"
        />
        <h2 className="mt-sm text-lg font-semibold">
          <Link
            href={`/members/${member.id}`}
            className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none"
          >
            {member.name}
          </Link>
        </h2>
        <p className="text-muted">{member.role}</p>
        <p className="mt-sm">
          <DepartmentBadge department={member.department} />
        </p>

        {/* mt-auto pushes the footer to the bottom so cards in a row line up. */}
        <div className="mt-auto w-full pt-md">
          <div className="flex items-center justify-between gap-sm border-t border-border pt-sm text-sm text-muted">
            <span className="inline-flex items-center gap-xs">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 shrink-0"
              >
                <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {member.location}
            </span>
            {/* Visual hint only; the name above is the real link. */}
            <span aria-hidden="true" className="inline-flex items-center gap-xs font-medium text-accent">
              View profile
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
