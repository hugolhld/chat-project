import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Inscription réussie !');
      } else {
        console.error('Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        {<label>
            Prenom:
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <br></br>
            Nom : <input
                    Type="text"
                    Name="lastName"
                    Value={formData.lastName}
                    onChange={handleChange}
                    required
            />
            <br></br>
            Email : <input
                    Type='email'
                    Name="email"
                    Value={formData.email}
                    onChange={handleChange}
                    required
            />
            <br></br>
            Password : <input
                    Type='password'
                    Name="password"
                    Value={formData.password}
                    onChange={handleChange}
                    required
            />
            <br></br>
        </label>
        }
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Form;
