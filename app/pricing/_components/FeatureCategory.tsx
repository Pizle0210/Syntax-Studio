export default function FeatureCategory({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
        {label}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}