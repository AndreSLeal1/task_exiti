"use client";
import { TaskStatus } from '@/types/task';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <select
            value={searchParams.get('status') || 'TODOS'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm"
          >
            <option value="TODOS">Todos</option>
            {Object.values(TaskStatus).map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={searchParams.get('sort') || 'dataCriacao,desc'}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm"
          >
            <option value="dataCriacao,desc">Mais Recentes</option>
            <option value="dataCriacao,asc">Mais Antigas</option>
            <option value="titulo,asc">A-Z</option>
            <option value="titulo,desc">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
}