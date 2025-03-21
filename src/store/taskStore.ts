// src/store/taskStore.ts
import { create } from 'zustand';
import type { Task, TaskStatus } from '@/types/task';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, 'id' | 'dataCriacao'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:8080/tasks');
      const data = await response.json();
      set({ tasks: data, loading: false });
    } catch (error) {
      set({ error: 'Falha ao carregar tarefas', loading: false });
    }
  },
  
  createTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      set((state) => ({ tasks: [...state.tasks, newTask], loading: false }));
    } catch (error) {
      set({ error: 'Falha ao criar tarefa', loading: false });
    }
  },
  
  updateTask: async (id, task) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Falha ao atualizar tarefa', loading: false });
    }
  },
  
  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'DELETE',
      });
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Falha ao excluir tarefa', loading: false });
    }
  },
}));