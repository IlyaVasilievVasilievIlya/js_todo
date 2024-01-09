import { CreateTask } from '../components/Tasks/CreateTask';
import { HeaderElement } from '../components/HeaderElement';
import { TaskList } from '../components/Tasks/TaskList';

export function TasksPage() {

  return (
    <>
      <HeaderElement> 
          <CreateTask/>
      </HeaderElement>
      <TaskList/>
    </>
  );
}