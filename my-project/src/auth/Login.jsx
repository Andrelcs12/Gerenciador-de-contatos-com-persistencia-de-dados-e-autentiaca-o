import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAt, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userFound = users.find(
      user => user.email === input.email && user.password === input.password
    );

    if (userFound) {
      localStorage.setItem('loggedInUser', userFound.name); // Salva o nome do usuário logado
      alert('Login bem-sucedido!');
      navigate('/contact');
    } else {
      alert('Email ou senha inválidos.');
    }
  };

  return (
    <div className="w-full h-screen bg-slate-600 flex items-center">
      <div className="mx-auto max-w-lg bg-white p-8 rounded-lg w-11/12 sm:w-3/5">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Login</h1>
        <form onSubmit={handleSubmitEvent} className="mb-0 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">Entre com sua conta</p>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Digite seu Email"
              value={input.email}
              onChange={handleInputChange}
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <FaAt className="text-gray-400" />
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Digite sua senha"
              value={input.password}
              onChange={handleInputChange}
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
            Entrar
          </button>
          <p className="text-center text-sm text-gray-500">
            Não tem conta ainda?
            <Link to="/register" className="underline text-indigo-600"> Cadastrar-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
