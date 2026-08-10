type DashboardCardProps = {
  title: string;
  value: string;
};

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      <h3 className="text-sm text-zinc-400">{title}</h3>

      <p className="mt-3 text-3xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}