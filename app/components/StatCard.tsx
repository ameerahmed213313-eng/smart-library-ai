type Props = {
  title: string;
  value: number;
  icon: string;
};

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-base font-medium text-slate-500">{title}</h3>
      <p className="mt-2 text-4xl font-bold text-slate-900">{value}</p>
    </div>
  );
}