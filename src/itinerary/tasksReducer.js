let id = 0;

const ADDED = 'added';
const CHANGED = 'changed';
const DELETED = 'deleted';

export function tasksReducer( tasks, action )
{
  switch (action.type)
  {
    case ADDED:
    {
      const newTask = {
        ...action.task,
        id: id++,
      };
      return [ ...tasks, newTask ];
    }
    case CHANGED:
    {
      return tasks.map((task) =>
        task.id === action.task.id ? action.task : task
      );
    }
    case DELETED:
    {
      return tasks.filter((task) => task.id !== action.taskId);
    }
  }
}

export function createTasksDispatcher(dispatch)
{
  return {
    addTask,
    changeTask,
    deleteTask,
  };

  function addTask(task)
  {
    dispatch({
      type: ADDED,
      task,
    });
  }

  function changeTask(task)
  {
    dispatch({
      type: CHANGED,
      task,
    });
  }

  function deleteTask(taskId)
  {
    dispatch({
      type: DELETED,
      taskId,
    });
  }
}