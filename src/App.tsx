import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const existingItems = localStorage.getItem("items");
    if (existingItems) {
      setTasks(JSON.parse(existingItems));
    }
  }, []);
  const addTask = () => {
    if (inputValue.trim()) {
      const newTasks = [...tasks, inputValue];
      setTasks(newTasks);
      setInputValue("");
      localStorage.setItem("items", JSON.stringify(newTasks)); 
    }
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem("items", JSON.stringify(newTasks)); 
  };

  return (
    <>
      <div className="p-0 h-screen bg-gradient-to-b from-indigo-500 to-blue-500 flex items-center justify-center">
        <div className="bg-white p-6 w-2/3 rounded shadow-xl">
          <h1 className="text-indigo-500 text-3xl text-center mb-4">
            To Do List
          </h1>
          <div className="mt-2 flex justify-center"> 
            <input
              className="border rounded-l p-2 w-1/3 " 
              type="text"
              placeholder="Add a new task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="bg-indigo-500 text-white rounded-r p-2"
              onClick={addTask}
            >
              Add
            </button>
          </div>
          <ul className="mt-4 px-10">
            {tasks.map((task, index) => (
              <li key={index} className="flex justify-between items-center text-gray-800 border-b py-2">
                <span>{task}</span>
                <button
                  className="text-red-500 ml-4"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
