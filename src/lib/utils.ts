import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TaskStatus } from "@/types/task"

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

export const statusBadgeClasses = (status: TaskStatus) => {
  const base = 'px-2 py-1 rounded-full text-sm font-medium';
  switch (status) {
    case 'PENDENTE': return `${base} bg-yellow-100 text-yellow-800`;
    case 'EM_ANDAMENTO': return `${base} bg-blue-100 text-blue-800`;
    case 'CONCLUIDO': return `${base} bg-green-100 text-green-800`;
    default: return `${base} bg-gray-100 text-gray-800`;
  }
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
