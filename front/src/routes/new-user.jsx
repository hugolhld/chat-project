import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
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
        <>
            <div className="w-full bg-grey-lighter min-h-screen flex justify-center flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="firstName"
                                placeholder="Prenom" 
                                // value={formData.firstName}
                                onChange={handleChange}
                                required/>

                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="lastName"
                                placeholder="Nom" 
                                // value={formData.lastName}
                                onChange={handleChange}
                                required/>

                            <input 
                                type="email"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email"
                                // value={formData.email}
                                onChange={handleChange}
                                required/>
                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password" 
                                // value={formData.password}
                                onChange={handleChange}
                                required/>

                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-indigo-600 font-bold text-white hover:bg-green-dark focus:outline-none my-1"
                            >
                                Sign-in
                            </button>
                </form>
                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the Terms of Service and Privacy Policy
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account? 
                        <a className="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form;