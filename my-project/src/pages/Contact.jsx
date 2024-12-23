import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [userEmail, setUserEmail] = useState(''); // Identificador único do usuário logado
  const [nameContact, setNameContact] = useState('');
  const [numberContact, setNumberContact] = useState('');
  const [jobContact, setJobContact] = useState('');
  const [contacts, setContacts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  // Carregar o e-mail do usuário logado e contatos associados
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser'); 
    if (loggedInUser) {
      setUserEmail(loggedInUser);

      // Carregar contatos associados ao e-mail do usuário logado
      const storedContacts = JSON.parse(localStorage.getItem(`contacts_${loggedInUser}`) || '[]');
      setContacts(storedContacts);
    } else {
      navigate('/'); 
    }
  }, [navigate]);

  // Salvar os contatos no localStorage sempre que houver alterações
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`contacts_${userEmail}`, JSON.stringify(contacts));
    }
  }, [contacts, userEmail]);

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    const newContact = {
      name: nameContact,
      number: numberContact,
      job: jobContact,
    };

    if (editingIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editingIndex] = newContact;
      setContacts(updatedContacts);
      setEditingIndex(null);
    } else {
      setContacts([...contacts, newContact]);
    }

    setNameContact('');
    setNumberContact('');
    setJobContact('');
  };

  const handleDelete = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNameContact(contacts[index].name);
    setNumberContact(contacts[index].number);
    setJobContact(contacts[index].job);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUserEmail('');
    navigate('/');
  };

  const handleDeleteUser = () => {
    localStorage.clear()
    alert("Reiniciar Sistema")
    navigate('/')
  }


  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-4">
      <h1 className="text-3xl font-bold text-indigo-600">Olá, {userEmail}!</h1>
      <p className="text-lg mt-4">Bem-vindo ao seu painel de contatos</p>

      <form onSubmit={handleSubmitEvent} className="w-3/4 sm:w-1/2 lg:w-1/3 mt-8 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={nameContact}
          onChange={(e) => setNameContact(e.target.value)}
          className="w-full mb-4 p-3 rounded border border-gray-300"
          placeholder="Nome"
        />
        <input
          type="text"
          value={numberContact}
          onChange={(e) => setNumberContact(e.target.value)}
          className="w-full mb-4 p-3 rounded border border-gray-300"
          placeholder="Número"
        />
        <input
          type="text"
          value={jobContact}
          onChange={(e) => setJobContact(e.target.value)}
          className="w-full mb-4 p-3 rounded border border-gray-300"
          placeholder="Profissão"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
        >
          {editingIndex !== null ? 'Atualizar Contato' : 'Adicionar Contato'}
        </button>
      </form>

      <div className="w-full justify-center items-center flex flex-col mt-8">
        <h1 className="mt-4 flex text-2xl font-bold">Lista de Contatos</h1>
        <div className="w-3/4 sm:w-1/2 lg:w-1/3 mt-8 bg-slate-400 p-6 rounded-lg shadow-lg">
          <ul className="w-full">
            {contacts.map((contact, index) => (
              <li key={index} className="mb-4 flex justify-between bg-white p-4 rounded shadow">
                <div>
                  <p>Nome: {contact.name}</p>
                  <p>Número: {contact.number}</p>
                  <p>Profissão: {contact.job}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-1 bg-yellow-300 rounded-md hover:bg-yellow-400"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-1 bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        Sair
      </button>
      <button
        onClick={handleDeleteUser}
        className="mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        Reiniciar sistema
      </button>
    </div>
  );
};

export default Contact;
