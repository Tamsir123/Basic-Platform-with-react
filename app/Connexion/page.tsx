'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
  
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // console.log('Email:', Email);
      // console.log('Password:', Password);

  
      const Donnees = {
          email : Email,
          password: Password,
    
      }
  


      try {
        const res = await axios.post('http://localhost:4400/userlogin', {
            email : Email,
            password: Password
        });
  
       localStorage.setItem('token', res.data.token);
        alert( ' Connexion avec succes votre token = ' + res.data.token)
       router.push('/');
        
      } catch (err) {
        alert("ÉAAAAchec de la connexion au serveur " + err);
        console.log("ÉAAAAchec de la connexion au serveur " + err);
      }


        
    };
  



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Connexion</h2>
      

      <form className="space-y-4" onSubmit={handleSubmit} > 
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="your@email.com"
            value={Email} onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="••••••••"
            value={Password} onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
  
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
        </div>
  
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          Sign In
        </button>
      </form>
  
      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account? 
        <a href="/Inscription" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</a>
      </div>
    </div>
  </div>
  );
}
