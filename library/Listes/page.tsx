"use client";

import { useState, useEffect } from "react";

interface User {
    user_id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    fonction?: string; // Optional as it might not be present in the API response
    image?: string; // Optional as it might not be present in the API response
}

export default function Listes() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [totalUserCount, setTotalUserCount] = useState<number>(0);

    useEffect(() => {
        const checkAuthAndFetchUsers = async () => {
            try {
                // Check if token exists in localStorage
                const token = localStorage.getItem('token');
                
                // Log pour le débogage - vous verrez ceci dans la console du navigateur
                console.log("Token récupéré:", token ? "Token présent" : "Aucun token");
                
                if (!token) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                // Vérifiez si le token a un format valide
                try {
                    // Simple vérification - un token JWT a généralement 3 parties séparées par des points
                    if (!token.includes('.')) {
                        console.warn("Le token ne semble pas avoir un format JWT valide");
                    }
                } catch (e) {
                    console.error("Erreur lors de la vérification du token:", e);
                }

                setIsAuthenticated(true);

                // Fetch users from the API
                const response = await fetch('http://localhost:4400/api/Utilisateur', {
                    method: 'GET',
                    headers: {
                        'token': token,  // Modifié pour correspondre à ce que le backend attend
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        // Le token est probablement invalide ou expiré
                        localStorage.removeItem('token'); // Supprimer le token invalide
                        setIsAuthenticated(false);
                        throw new Error(`Session expirée ou invalide. Veuillez vous reconnecter.`);
                    } else {
                        throw new Error(`Erreur lors de la récupération des utilisateurs: ${response.status}`);
                    }
                }

                const data = await response.json();
                
                // Vérifier si la réponse contient une erreur du serveur
                if (data.Error === true) {
                    throw new Error(data.Message || 'Erreur serveur');
                }
                
                // Map the API response to our User interface
                type ApiUser = {
                    user_id?: number;
                    id?: number;
                    nom: string;
                    prenom: string;
                    email: string;
                    telephone?: string;
                    fonction?: string;
                    image?: string;
                };
                
                // Fonction pour obtenir une image par défaut variée en fonction de l'ID utilisateur
                const getDefaultAvatar = (userId: number): string => {
                    // Liste d'avatars par défaut variés
                    const defaultAvatars = [
                        "https://img.daisyui.com/images/profile/demo/1@94.webp",
                        "https://img.daisyui.com/images/profile/demo/2@94.webp",
                        "https://img.daisyui.com/images/profile/demo/3@94.webp",
                        "https://img.daisyui.com/images/profile/demo/4@94.webp",
                        "https://img.daisyui.com/images/profile/demo/5@94.webp"
                    ];
                    
                    // Sélectionner un avatar basé sur l'ID utilisateur (pour maintenir la cohérence)
                    return defaultAvatars[userId % defaultAvatars.length];
                };
                
                const fetchedUsers: User[] = data.map((user: ApiUser) => {
                    const userId = user.user_id || user.id || 0;
                    return {
                        user_id: userId,
                        nom: user.nom,
                        prenom: user.prenom,
                        email: user.email,
                        telephone: user.telephone || "",
                        fonction: user.fonction || "Utilisateur",
                        // Utiliser l'image de l'utilisateur, ou générer une image par défaut variée
                        image: user.image || getDefaultAvatar(userId)
                    };
                });
                
                // Conserver le nombre total des utilisateurs pour l'affichage
                const totalUserCount = fetchedUsers.length;
                
                // Trier les utilisateurs par ID en ordre décroissant (les derniers ajoutés en premier)
                // en supposant que l'ID est auto-incrémenté
                const sortedUsers = [...fetchedUsers].sort((a, b) => b.user_id - a.user_id);
                
                // Limiter à 10 utilisateurs (les 10 derniers)
                const limitedUsers = sortedUsers.slice(0, 10);
                
                // Stocker à la fois les utilisateurs filtrés et le nombre total
                setUsers(limitedUsers);
                setTotalUserCount(totalUserCount);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                // Afficher des détails plus spécifiques sur l'erreur pour le débogage
                if (err instanceof Error) {
                    setError(`Erreur: ${err.message}. Assurez-vous que le serveur backend est en cours d'exécution.`);
                } else {
                    setError("Erreur lors du chargement des utilisateurs. Veuillez réessayer ultérieurement.");
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetchUsers();
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="container mx-auto p-4 flex justify-center items-center h-64">
                <div className="text-green-600 text-lg font-medium">Chargement en cours...</div>
            </div>
        );
    }

    // Show authentication message if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                Veuillez vous connecter pour accéder à la liste des utilisateurs.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <a 
                        href="/Connexion" 
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Se connecter
                    </a>
                </div>
            </div>
        );
    }

    // Show error message if there was an error
    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Réessayer
                    </button>
                    <a 
                        href="/Connexion" 
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Se reconnecter
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="mb-4 px-4 pt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-green-800">Liste des utilisateurs</h2>
                        <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            Affichage des {users.length} derniers utilisateurs sur {totalUserCount} au total
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="p-4 text-left text-green-800">Nom</th>
                                <th className="p-4 text-center hidden md:table-cell text-green-800">Prénom</th>
                                <th className="p-4 text-center hidden md:table-cell text-green-800">Email</th>
                                <th className="p-4 text-center text-green-800">Fonction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr 
                                    key={user.user_id} 
                                    className="border-b hover:bg-green-50 transition-colors"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <img 
                                                className="w-12 h-12 rounded-full object-cover ring-2 ring-green-200" 
                                                src={user.image} 
                                                alt={`Profil de ${user.prenom} ${user.nom}`} 
                                            />
                                            <div>
                                                <div className="font-semibold text-green-900">{user.nom}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center hidden md:table-cell">
                                        <div className="text-sm text-green-800">{user.prenom}</div>
                                    </td>
                                    <td className="p-4 text-center hidden md:table-cell">
                                        <div className="text-sm text-green-600">{user.email}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {user.fonction || user.telephone || "Utilisateur"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}