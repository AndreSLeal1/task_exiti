"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TaskStatus } from '@/types/task';
import { useTaskStore } from '@/store/taskStore';

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { tasks, updateTask, loading } = useTaskStore();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    status: TaskStatus.PENDENTE,
  });

  useEffect(() => {
    const task = tasks.find((t) => t.id === params.id);
    if (task) {
      setFormData({
        titulo: task.titulo,
        descricao: task.descricao || '',
        status: task.status,
      });
    }
  }, [tasks, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask(params.id, formData);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Editar Tarefa</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
            >
              {Object.values(TaskStatus).map((status) => (
                <option key={status} value={status}>
                  {status.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}