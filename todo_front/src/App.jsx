import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]); // Renamed todoName to todos
  const [todosadd, setTodosadd] = useState(""); // Renamed todoName to todos
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todoindex/");
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (id) => {
    console.log("Clicked ID: " + id);
    setLoading(true);
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/todoitems/" + id
      );

      //  setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      fetchTodos();
    }
    setLoading(false);
  };

  const handlePost = async () => {
    // console.log(todosadd);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/todoitems/",
        {
          todosadd,
        }
      );

      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      fetchTodos();
    }
    setLoading(false);
  };

  return (
    <>
      <div className="addform">
        <input
          type="text"
          value={todosadd}
          onChange={(event) => setTodosadd(event.target.value)}
        />

        <button onClick={handlePost}>Add</button>
      </div>
      <div>
        <h1>Todo From Laravel</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.ItemName}{" "}
                <button onClick={() => handleClick(todo.id)}>Complete</button>{" "}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
