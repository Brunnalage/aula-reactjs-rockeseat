import React, { useState, useEffect } from 'react';
import './styles.css';
import { useForm } from "react-hook-form";
import { Card } from '../../components/Card/index';

function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });

  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/BrunnaLage');
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }
    fetchData();
  }, []);




  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
      </header>

    <form onSubmit={handleSubmit(onSubmit)}>
           <input type="text"
        placeholder="Digite o nome..." {...register("firstName", { required: true })}         
        onChange={e => setStudentName(e.target.value)} />
        {errors.firstName?.type === 'required' && "First name is required"}

      <button type="button" onClick={handleAddStudent}>
        Adicionar</button>

      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time} />))
      }
      <button type="submit">Enviar</button>
    </form>
 
    </div>
  )
}

export default Home