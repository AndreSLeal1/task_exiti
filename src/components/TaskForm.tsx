"use client";
import { TaskStatus } from '@/types/task';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TaskFormProps {
  initialData?: {
    titulo?: string;
    descricao?: string;
    status?: TaskStatus;
  };
}

export default function TaskForm({ initialData }: TaskFormProps) {
  
  const router = useRouter();
  const [errors, setErrors] = useState<{ titulo?: string; status?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const titulo = formData.get('titulo') as string;
    const descricao = formData.get('descricao') as string;
    const status = formData.get('status') as TaskStatus;

    if (!titulo) {
      setErrors((prev) => ({ ...prev, titulo: 'O título é obrigatório.' }));
      return;
    }
    if (!status) {
      setErrors((prev) => ({ ...prev, status: 'O status é obrigatório.' }));
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descricao, status }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados.');
      }

      console.log('Dados enviados com sucesso!');
      router.push('/');
    } catch (error) {
      console.error('Erro:', error);
      alert('Não foi possível salvar a tarefa. Tente novamente.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm"
      noValidate
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-gray-700"
          >
            Título *
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            defaultValue={initialData?.titulo || ''}
            className={`mt-1 block w-full rounded-md border p-2 ${
              errors.titulo ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.titulo && (
            <p className="text-sm text-red-500 mt-1">{errors.titulo}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            defaultValue={initialData?.descricao || ''}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status *
          </label>
          <select
            id="status"
            name="status"
            defaultValue={initialData?.status || 'PENDENTE'}
            className={`mt-1 block w-full rounded-md border p-2 ${
              errors.status ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            {Object.values(TaskStatus).map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-sm text-red-500 mt-1">{errors.status}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Salvar Tarefa
          </button>
        </div>
      </div>
    </form>
  );
}