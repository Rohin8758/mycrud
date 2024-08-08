import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', number: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [userIdCounter, setUserIdCounter] = useState(1);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex === null) {
      const newEntry = { ...form, userId: userIdCounter };
      setData([...data, newEntry]);
      setUserIdCounter(userIdCounter + 1);
    } else {
      const updatedData = [...data];
      updatedData[editingIndex] = { ...form, userId: data[editingIndex].userId };
      setData(updatedData);
      setEditingIndex(null);
    }
    setForm({ name: '', email: '', number: '' });
  };

  const handleEdit = (index) => {
    const { userId, ...rest } = data[index];
    setForm(rest);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>CRUD Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Number"
          value={form.number}
          onChange={handleChange}
        />
        <button type="submit">{editingIndex === null ? 'Add' : 'Update'}</button>
      </form>
      <table>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Number</th>
          <th>Actions</th>
        </tr>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.userId}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.number}</td>
            <td>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;