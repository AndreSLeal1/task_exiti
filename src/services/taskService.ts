export const taskService = {
  fetchTasks: async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Erro ao carregar tarefas')
    return response.json()
  },
  
  createTask: async (taskData: any) => {
    const response = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
    return response.json()
  },

  updateTask: async (id: string, taskData: any) => {
    const response = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
    return response.json()
  }
}