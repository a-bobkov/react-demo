import { useState } from 'react';
import TaskDone from './TaskDone.jsx';
import TaskEdit from './TaskEdit.jsx';
import TaskView from './TaskView.jsx';
import TaskDelete from './TaskDelete.jsx';

export default function Task({task, onChangeTask, onDeleteTask})
{
  const [isEditing, setIsEditing] = useState(false);

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
        taskId={task.id}
        onDeleteTask={onDeleteTask}
      />
    </>
  );

  function onChangeDone(checked)
  {
    onChangeTask({
      ...task,
      done: checked
    });
  }

  function onSaveName(name)
  {
    onChangeTask({
      ...task,
      text: name
    });
    setIsEditing(false);
  }

  function onEditName()
  {
    setIsEditing(true);
  }
}
