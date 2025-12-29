import { useState } from 'react';
import TaskDone from './TaskDone.jsx';
import TaskEdit from './TaskEdit.jsx';
import TaskView from './TaskView.jsx';
import TaskDelete from './TaskDelete.jsx';
import { useContextTasks } from './TasksContext.jsx';

export default function Task({task})
{
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, tasksDispatcher] = useContextTasks();

  return (
    <>
      <TaskDone
        isDone={task.done}
        onChangeDone={onChangeDone}
      />
      {isEditing ? (
        <TaskEdit
          name={task.text}
          onSaveName={onSaveName}
        />
      ) : (
        <TaskView
          name={task.text}
          onEditName={onEditName}
        />
      )}
      <TaskDelete
        onDeleteTask={onDeleteTask}
      />
    </>
  );

  function onChangeDone(checked)
  {
    onTaskChanged({
      done: checked,
    });
  }

  function onSaveName(name)
  {
    onTaskChanged({
      text: name,
    });
    setIsEditing(false);
  }

  function onTaskChanged(changed)
  {
    tasksDispatcher.changeTask({
      ...task,
      ...changed,
    });
  }

  function onEditName()
  {
    setIsEditing(true);
  }

  function onDeleteTask()
  {
    tasksDispatcher.deleteTask(task.id);
  }
}
