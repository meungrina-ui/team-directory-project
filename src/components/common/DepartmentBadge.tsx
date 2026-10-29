import { departmentTone } from "@/lib/departments";

type DepartmentBadgeProps = {
  department: string;
};

export function DepartmentBadge({ department }: DepartmentBadgeProps) {
  const { bg, fg } = departmentTone(department);
  return (
    <span className={`inline-block rounded-full px-sm py-xs text-xs font-semibold ${bg} ${fg}`}>
      {department}
    </span>
  );
}
