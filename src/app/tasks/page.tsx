'use client';
import { type Task, TaskStatus } from '@/types/task';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTaskStore } from '@/store/taskStore';

export default function Home() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'TODOS'>(
    'TODOS',
  );
  const [sortBy, setSortBy] = useState<'dataCriacao' | 'titulo'>('dataCriacao');

  const { tasks, fetchTasks, deleteTask, loading, error } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks
    .filter((task) => statusFilter === 'TODOS' || task.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'dataCriacao') {
        return (
          new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
        );
      }
      return a.titulo.localeCompare(b.titulo);
    });

  const statusBadgeClasses = (status: TaskStatus) => {
    const base = 'px-2 py-1 rounded-full text-sm';
    switch (status) {
      case 'PENDENTE':
        return `${base} bg-yellow-100 text-yellow-800`;
      case 'EM_ANDAMENTO':
        return `${base} bg-blue-100 text-blue-800`;
      case 'CONCLUIDO':
        return `${base} bg-green-100 text-green-800`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciamento de Tarefas
          </h1>
          <Link
            href="/tasks/new"
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5" />
            Nova Tarefa
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Filtrar por:
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as TaskStatus | 'TODOS')
                }
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
              <label className="text-sm font-medium text-gray-700">
                Ordenar por:
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'dataCriacao' | 'titulo')
                }
                className="border rounded-md px-3 py-1.5 text-sm"
              >
                <option value="dataCriacao">Data de Criação</option>
                <option value="titulo">Título</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p>Carregando tarefas...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {task.titulo}
                    </h3>
                    {task.descricao && (
                      <p className="text-gray-600">{task.descricao}</p>
                    )}
                    <div className="flex items-center gap-3">
                      <span className={statusBadgeClasses(task.status)}>
                        {task.status.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">
                        Criado em:{' '}
                        {new Date(task.dataCriacao).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/tasks/${task.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
