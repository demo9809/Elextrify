interface SpecTableProps {
  specs: Array<{
    label: string;
    value: string;
  }>;
  columns?: number;
}

export function SpecTable({ specs, columns = 4 }: SpecTableProps) {
  // Map column numbers to Tailwind classes
  const columnClasses: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  const gridClass = columnClasses[columns] || 'grid-cols-4';

  return (
    <div className="bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-4 mt-4">
      <div className="font-medium text-[#111827] mb-3">Specifications:</div>
      <div className={`grid ${gridClass} gap-x-8 gap-y-2 text-sm`}>
        {specs.map((spec, index) => (
          <div key={index}>
            <div className="text-[#6B7280] mb-1">{spec.label}</div>
            <div className="text-[#111827] font-mono">{spec.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
