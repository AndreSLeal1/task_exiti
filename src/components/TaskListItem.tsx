"use client";
import type { Task } from '@/types/task';
import { statusBadgeClasses } from '@/lib/utils';
import { useTaskStore } from '@/store/taskStore';
import Link from 'next/link';
import { Button } from './ui/button';

interface TaskListItemProps {
  task: Task;
}

export default function TaskListItem({ task }: TaskListItemProps) {
  const { deleteTask } = useTaskStore();

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      await deleteTask(task.id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">{task.titulo}</h3>
            <span className={statusBadgeClasses(task.status)}>
              {task.status.replace('_', ' ')}
            </span>
          </div>
          
          {task.descricao && (
            <p className="text-gray-600">{task.descricao}</p>
          )}

          <div className="flex gap-4 text-sm text-gray-500">
            <span>Criado em: {new Date(task.dataCriacao).toLocaleDateString()}</span>
            {task.dataConclusao && (
              <span>Concluído em: {new Date(task.dataConclusao).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <Link href={`/tasks/${task.id}/edit`} passHref>
            <Button variant="outline">Editar</Button>
          </Link>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}