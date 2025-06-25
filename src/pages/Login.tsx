import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Hooks/useUser";

export const Login = () => {
  const [form, setForm] = useState({ name: "", code: "" });
  const [error, setError] = useState("");
  const { setUsername } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    const { name, code } = form;

    if (!name.trim() || !code.trim()) {
      setError("Por favor ingresa tu nombre y tu código.");
      return;
    }

    try {
      await axios.post("http://localhost:7520/api/user/login", {
        name: name.trim(),
        code: code.trim(),
      });

      setUsername(name);
      navigate("/dashboard");
    } catch (err: any) {
      const msg = err.response?.data || "Error con el servidor.";
      setError(msg);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Bienvenido a LinkSpace</h1>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <label className="form-label">Nombre:</label>
        <input
          className="form-control mb-3"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Ej: andres"
        />

        <label className="form-label">Código:</label>
        <input
          className="form-control mb-3"
          name="code"
          type="text"
          value={form.code}
          onChange={handleChange}
          placeholder="**********"
        />

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Entrar
        </button>

        {error && <div className="mt-3 text-danger text-center">{error}</div>}
      </div>
    </div>
  );
};
