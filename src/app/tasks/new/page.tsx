// src/app/tasks/new/page.tsx
"use client";
import TaskForm from '@/components/TaskForm';

export default function NewTaskPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Criar Nova Tarefa</h2>
        <TaskForm />
      </div>
    </div>
  );
}