import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5001/login", form);
      setMessage(res.data.message);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message); // show backend message
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={form.email}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={form.password}
        onChange={handleChange}
        style={styles.input}
      />

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>

      <p style={{ color: message === "Login successful" ? "green" : "red" }}>
        {message}
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px"
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "250px"
  },
  button: {
    padding: "10px 20px",
    background: "blue",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default App;