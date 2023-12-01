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
        <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-4">
                <div class="bg-grey-lighter min-h-screen flex flex-col">
                    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                            <form onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Prenom"
                                placeholder="Prenom" 
                                value={formData.Prenom}
                                onChange={handleChange}
                                required/>

                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Nom"
                                placeholder="Nom" 
                                value={formData.firstName}
                                onChange={handleChange}
                                required/>

                            <input 
                                type="email"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="Email"
                                placeholder="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                required/>
                            <input 
                                type="password"
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password" 
                                value={formData.Password}
                                onChange={handleChange}
                                required/>

                            <button
                                type="submit"
                                class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                            >Sign-in</button>
                    </form>
                            <div class="text-center text-sm text-grey-dark mt-4">
                                By signing up, you agree to the Terms of Service and Privacy Policy
                            </div>
                        </div>

                        <div class="text-grey-dark mt-6">
                            Already have an account? 
                            <a class="no-underline border-b border-blue text-blue" href="../login/">
                                Log in
                            </a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Form;