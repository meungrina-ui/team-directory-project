import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/common/Avatar";
import { DepartmentBadge } from "@/components/common/DepartmentBadge";
import { departmentTone } from "@/lib/departments";
import { getMember, getMembers } from "@/lib/members";

// Only the ids from generateStaticParams exist; any other id is a 404.
export const dynamicParams = false;

// Pre-render every known profile at build time.
export function generateStaticParams() {
  return getMembers().map((member) => ({ id: member.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/members/[id]">): Promise<Metadata> {
  const { id } = await params;
  const member = getMember(id);
  if (!member) notFound();

  return {
    title: member.name, // becomes "Ana Silva | Team Directory" via the layout template
    description: `${member.role} in ${member.department}, based in ${member.location}.`,
  };
}

export default async function MemberPage({ params }: PageProps<"/members/[id]">) {
  const { id } = await params;
  const member = getMember(id);
  // dynamicParams already blocks unknown ids; this also narrows the type.
  if (!member) notFound();

  return (
    <>
      <Link href="/" className="inline-block text-accent underline-offset-4 hover:underline">
        <span aria-hidden="true">← </span>Back to directory
      </Link>

      <article className="mt-lg overflow-hidden rounded-card border border-border bg-background shadow-sm">
        {/* Decorative banner in the department colour. */}
        <div aria-hidden="true" className={`h-28 ${departmentTone(member.department).bg}`} />

        <div className="px-lg pb-lg">
          <Avatar
            name={member.name}
            src={member.avatar}
            department={member.department}
            size="lg"
            loading="eager" // always at the top of the page
            className="-mt-14 ring-4 ring-background"
          />
          <h1 className="mt-md text-3xl font-bold">{member.name}</h1>
          <p className="mt-xs text-lg text-muted">{member.role}</p>

          <h2 className="mt-xl text-xl font-semibold">About</h2>
          <p className="mt-sm max-w-prose">{member.bio}</p>

          <h2 className="mt-xl text-xl font-semibold">Details</h2>
          <dl className="mt-sm grid grid-cols-1 gap-x-lg gap-y-sm sm:grid-cols-[max-content_1fr] sm:items-center">
            <dt className="font-medium text-muted">Department</dt>
            <dd>
              <DepartmentBadge department={member.department} />
            </dd>
            <dt className="font-medium text-muted">Location</dt>
            <dd>{member.location}</dd>
            <dt className="font-medium text-muted">Email</dt>
            <dd className="break-all">
              <a href={`mailto:${member.email}`} className="text-accent underline underline-offset-4">
                {member.email}
              </a>
            </dd>
          </dl>
        </div>
      </article>
    </>
  );
}
