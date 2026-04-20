type BadgeVariant = "success" | "failure" | "upcoming" | "pending";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-launch-success/20 text-launch-success border-launch-success/30",
  failure: "bg-launch-failure/20 text-launch-failure border-launch-failure/30",
  upcoming: "bg-launch-upcoming/20 text-launch-upcoming border-launch-upcoming/30",
  pending: "bg-space-blue/30 text-space-silver border-space-blue/50",
};

export const Badge = ({ variant, children }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
};
