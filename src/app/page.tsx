import type { Metadata } from "next";
import { connection } from "next/server";
import { MemberSearch } from "@/components/common/MemberSearch";
import { getDepartments, getMembers } from "@/lib/members";

// The layout's title.template only applies to child routes, not to this
// page in the same segment, so the full title is written out here.
export const metadata: Metadata = {
  title: "Team Directory",
};

export default async function DirectoryPage() {
  // The results depend on the URL (?q=…&department=…), so render this page per
  // request instead of at build time. MemberSearch reads the URL itself.
  await connection();

  const members = getMembers();
  const departments = getDepartments();

  return (
    <>
      <div className="mb-xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Team directory</h1>
        <p className="mt-sm max-w-prose text-lg text-muted">
          Meet the {members.length} people across {departments.length} departments who build our
          product.
        </p>
      </div>
      <MemberSearch members={members} departments={departments} />
    </>
  );
}
