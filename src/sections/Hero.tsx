import { FormEvent, useState } from "react";
import { Task } from "../components/Task";

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function Hero() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const tasksCompleted = tasks.filter(task => task.isCompleted === true).length;

  const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask = {id: crypto.randomUUID(), title: task, isCompleted: false}
    setTasks(tasks => [...tasks, newTask])
    setTask('')
  }
  
  const handleDeleteTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  const handleCompleteTask = (id: string) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if( task.id === id) {
          return {...task, isCompleted: !task.isCompleted};
        } else {
          return task;
        }
      })
    })
  }

  return(
    <section className="flex justify-center flex-col items-center bg-gray-600">
      <header className="w-full h-[200px] px-5 bg-gray-700 flex items-center justify-center"><img src="/logo.svg"/></header>
      <div className="max-w-[736px] px-5 w-full gap-16 flex flex-col">
        <form onSubmit={handleCreateTask}>
          <div className="w-full flex gap-2 h-[54px] -mt-[27px]">
            <input 
              type="text" 
              placeholder="Adicione uma nova tarefa" 
              value={task} 
              onChange={(event) => {setTask(event.target.value)}}  
              className="w-full p-4 text-gray-100 placeholder-gray-300 h-full bg-[#262626] border rounded-lg border-gray-700 "
            />
            <button className="flex text-sm font-bold text-[#fff] hover:opacity-90 items-center justify-between p-4 rounded-lg max-w-[90px] w-full bg-[#1E6F9F]">
              Criar 
              <img src="/plus-icon.svg" alt=""/>
            </button>
          </div>
        </form>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-[#4EA8DE]">Tarefas criadas</h4>
            <div className="text-[#D9D9D9] text-xs font-bold rounded-full flex items-center justify-center w-[25px] h-[19px] bg-[#333333]">
              <span>{tasks.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-[#8284FA]">Concluídas</h4>
            <div className="text-[#D9D9D9] text-xs font-bold rounded-full flex items-center justify-center px-2 py-[2px] h-[19px] bg-[#333333]">
              <span>{tasksCompleted} de {tasks.length}</span>
            </div>
          </div> 
        </div>
        {tasks.length == 0 ? (
          <div className="flex items-center justify-center gap-4 flex-col py-16 px-6 rounded-lg border-t border-[#333333]">
            <img src="/clipboard.png" alt="" />
            <p className="text-center text-[#808080]">
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <br/>Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        ):(
            <div className="flex flex-col gap-3">
              {tasks.map((task) => {
              return(
                <Task 
                    key={task.id} 
                    data={task} 
                    onDelete={handleDeleteTask} 
                    onComplete={handleCompleteTask}
                    isCompleted={task.isCompleted}
                  />   
                )
              })}
            </div>
          )
        }
      </div>
    </section>
  ) 
}