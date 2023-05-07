import { useState } from "react";
import { ITask } from "../sections/Hero";
import { tw } from "../utils/tw";

type TaskProps = {
  data: ITask;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  isCompleted: boolean;
}

export function Task({ data, onDelete, onComplete, isCompleted}: TaskProps) {

  const [checked, setChecked] = useState(false);
  const handleChecked = () => { 
    setChecked(!checked);
    onComplete(data.id)
  }
  return(
    <div className="flex gap-4 rounded-lg text-gray-100 bg-gray-500 border border-gray-400 p-4 item-start justify-between">
      <div className="flex gap-3 items-start">
        <input type="checkbox" className="rounded w-6 h-6 border-[#4EA8DE] accent-purple-dark" onClick={handleChecked}/>
        <label className={tw({'line-through text-gray-300': isCompleted})}>{data.title}</label>
      </div>
      <button onClick={() => onDelete(data.id)}>
        <img src="/trash.svg" alt="" className="min-w-[24px]"/>
      </button>
    </div>
  )
}