import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

// interfaces
import { ITask } from "../interfaces/Task";

// styles
import styles from "./TaskForm.module.css";

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, dificulty: number): void;
}

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [dificulty, setDificulty] = useState<number>(0);

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDificulty(task.dificulty);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(handleUpdate);
    if (taskList) {
      if (handleUpdate) {
        console.log(title);
        console.log(dificulty);
        handleUpdate(id, title, dificulty);
      } else {
        const id = Math.floor(Math.random() * 1000);

        const newTask: ITask = { id, title, dificulty };

        setTaskList!([...taskList, newTask]);

        setTitle("");
        setDificulty(0);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDificulty(parseInt(e.target.value));
    }
  };

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input
          type="number"
          name="difficulty"
          placeholder="Dificuldade da tarefa (1 a 5)"
          value={dificulty}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;