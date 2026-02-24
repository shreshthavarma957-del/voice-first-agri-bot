
import React, { useState } from 'react';
import { Plus, Calendar, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { FarmTask } from '../types';

export const FarmScheduler: React.FC = () => {
  const [tasks, setTasks] = useState<FarmTask[]>([
    { id: '1', title: 'Water the wheat field', date: '2024-03-20', completed: false },
    { id: '2', title: 'Apply fertilizer to cotton', date: '2024-03-21', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: FarmTask = {
      id: Date.now().toString(),
      title: newTask,
      date: new Date().toISOString().split('T')[0],
      completed: false,
    };
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-50 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
          <Calendar className="text-emerald-500" />
          Farm Tasks
        </h2>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-4 bg-emerald-50 border-2 border-transparent rounded-2xl focus:border-emerald-400 outline-none transition-all text-lg"
        />
        <button
          onClick={addTask}
          className="bg-emerald-500 text-white p-4 rounded-2xl hover:bg-emerald-600 transition-colors shadow-md"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 group"
          >
            <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleTask(task.id)}>
              {task.completed ? (
                <CheckCircle2 className="text-emerald-500" />
              ) : (
                <Circle className="text-emerald-300" />
              )}
              <div className="flex flex-col">
                <span className={cn(
                  "text-lg font-medium transition-all",
                  task.completed ? "line-through text-emerald-400" : "text-emerald-900"
                )}>
                  {task.title}
                </span>
                <span className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">
                  {task.date}
                </span>
              </div>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-300 hover:text-red-500 p-2 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-emerald-400 font-medium">
            No tasks for today. Add one above!
          </div>
        )}
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
