import type { Member } from "@/lib/members";
import { MemberCard } from "./MemberCard";

type MemberListProps = {
  members: Member[];
};

// The first two rows of the 3-column grid are visible without scrolling, so
// their images load eagerly (one of them is usually the LCP); the rest stay lazy.
const EAGER_IMAGE_COUNT = 6;

export function MemberList({ members }: MemberListProps) {
  return (
    // role="list" because Safari/VoiceOver drops list semantics once
    // list-style is removed (Tailwind's reset does that).
    <ul role="list" className="grid gap-md sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, index) => (
        <li key={member.id}>
          <MemberCard member={member} imageLoading={index < EAGER_IMAGE_COUNT ? "eager" : "lazy"} />
        </li>
      ))}
    </ul>
  );
}
