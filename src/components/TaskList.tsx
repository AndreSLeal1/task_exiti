import { AlertTriangle, Plus } from 'lucide-react'
import Link from 'next/link'
import TaskListItem from './TaskListItem'
import { Button } from './ui/button'

export default function TaskList({ tasks, isLoading, error }: TaskListProps) {
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 p-6 rounded-lg flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Ops! Ocorreu um erro ao carregar as tarefas
          </h3>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="text-red-700 border-red-300 hover:bg-red-100"
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {!isLoading && !error && (
        tasks.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="mb-6 text-gray-400 mx-auto w-fit">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma tarefa encontrada
            </h3>
            <Link href="/tasks/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Criar Primeira Tarefa
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskListItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}