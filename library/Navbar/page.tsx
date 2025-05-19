import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/LOGO.jpg'; // Adjust the path based on your folder structure
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { getUserAvatar } from '@/lib/avatar-utils';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const router = useRouter();
  const { showToast } = useToast();
  
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté lors du montage du composant
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    // Tentative de récupération du nom d'utilisateur depuis le token (si disponible)
    try {
      if (token) {
        // Décoder le token JWT simplement pour l'affichage
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        if (tokenData.prenom && tokenData.nom) {
          setUserName(`${tokenData.prenom} ${tokenData.nom}`);
          // Récupérer l'ID utilisateur pour l'avatar
          if (tokenData.user_id || tokenData.id) {
            const id = tokenData.user_id || tokenData.id;
            setUserId(id);
            // Définir l'URL de l'avatar basé sur l'ID
            setAvatarUrl(getUserAvatar(id));
          } else {
            // Avatar aléatoire si pas d'ID
            setAvatarUrl(getUserAvatar());
          }
        } else {
          setUserName('Utilisateur');
          setAvatarUrl(getUserAvatar());
        }
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      setUserName('Utilisateur');
      setAvatarUrl(getUserAvatar());
    }
  }, []);
  
  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName('');
    setUserId(null);
    setAvatarUrl(getUserAvatar()); // Réinitialiser avec un avatar aléatoire
    
    // Afficher une notification de déconnexion
    showToast({
      message: 'Vous êtes maintenant déconnecté.',
      type: 'success',
      duration: 3000
    });
    
    // Rediriger vers la page d'accueil
    router.push('/');
  };

  return (
    <>
      <div className="navbar bg-gradient-to-r from-green-50 to-white shadow-md relative z-40 rounded-full  max-w-7xl mx-auto my-2 border-b border-green-200 border-opacity-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost flex items-center gap-2">
            <Image 
              src={Logo}
              alt="2iE Platform Logo" 
              width={45} 
              height={45}
              className="rounded-full"
              priority
            />
            <span className="text-xl text-green-700">2iE Platform</span>
          </Link>
        </div>
        
        <div className="flex-none">
          <div className="flex items-center space-x-2">
            <Link href="/" className="btn btn-ghost text-green-700 hover:bg-green-100">
              Accueil
            </Link>
            <Link href="/Contact" className="btn btn-ghost text-green-700 hover:bg-green-100">
              Contact
            </Link>
            <Link href="/Apropos" className="btn btn-ghost text-green-700 hover:bg-green-100">
              A propos
            </Link>

            <div className="form-control">
              <input 
                type="text" 
                placeholder="Rechercher" 
                className="input input-bordered border-green-300 focus:border-green-500 focus:ring-green-200 w-24 md:w-auto" 
              />
            </div>

            {isAuthenticated ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring-2 ring-green-500">
                    <Image
                      alt="User Profile"
                      src={avatarUrl}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-green-100"
                >
                  <li className="font-medium border-b border-green-100 pb-1">
                    <span className="text-green-800 flex justify-between items-center">
                      {userName}
                      <span className="badge badge-success badge-sm">Connecté</span>
                    </span>
                  </li>
                  <li>
                    <Link href="/Profile" className="text-green-800 hover:bg-green-50">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/Parametre" className="text-green-800 hover:bg-green-50">
                      Paramètres
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center w-full transition-all duration-300 ease-in-out transform hover:translate-x-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Déconnexion</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link 
                href="/Connexion" 
                className="btn bg-green-500 hover:bg-green-600 text-white border-none transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Connexion
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Elegant Separator */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent shadow-sm relative z-50"></div>
    </>
  );
}