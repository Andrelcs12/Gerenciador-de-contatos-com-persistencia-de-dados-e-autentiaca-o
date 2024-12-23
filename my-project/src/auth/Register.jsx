import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAt, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.some((user) => user.email === input.email);

    if (userExists) {
      alert('Usuário já cadastrado.');
    } else if (input.email && input.password && input.name) {
      storedUsers.push(input); 
      localStorage.setItem('users', JSON.stringify(storedUsers));
      localStorage.setItem('loggedInUser', input.name);
      alert('Cadastro bem-sucedido!');
      navigate('/contact');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-screen bg-slate-600 flex items-center">
      <div className="mx-auto max-w-lg bg-white p-8 rounded-lg w-11/12 sm:w-3/5">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Cadastro</h1>
        <form onSubmit={handleRegister} className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Digite seu nome"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <FaUser className="text-gray-400" />
            </span>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Digite seu Email"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <FaAt className="text-gray-400" />
            </span>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Digite sua senha"
            />
            <span
              className="absolute inset-y-0 end-0 grid place-content-center text-gray-500 px-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Cadastrar
          </button>

          <p className="text-center text-sm text-gray-500">
            Já tem conta?
            <Link className="underline text-indigo-600 ml-1" to='/'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
