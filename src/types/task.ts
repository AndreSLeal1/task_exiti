export enum TaskStatus {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
}

export interface Task {
  id: string;
  titulo: string;
  descricao?: string;
  status: TaskStatus;
  dataCriacao: string;
  dataConclusao?: string;
}
