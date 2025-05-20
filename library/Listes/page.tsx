"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/context/ToastContext";

interface User {
    user_id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string | number;
    fonction?: string; // Optional as it might not be present in the API response
    image?: string; // Optional as it might not be present in the API response
}

export default function Listes() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [totalUserCount, setTotalUserCount] = useState<number>(0);
    const { showToast } = useToast();
    
    // Modal state for user details
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showUserModal, setShowUserModal] = useState<boolean>(false);
    
    // Confirmation modal for deletion
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    
    // Edit User Modal
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    
    // Form data for editing user
    const [editFormData, setEditFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        fonction: ''
    });

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

    // Fonction pour ouvrir le modal des détails de l'utilisateur
    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    // Fonction pour fermer le modal des détails de l'utilisateur
    const handleCloseUserModal = () => {
        setShowUserModal(false);
        setSelectedUser(null);
    };

    // Préparation pour supprimer un utilisateur
    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    // Fonction pour supprimer un utilisateur
    const handleConfirmDelete = async () => {
        if (!userToDelete) return;
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Vous devez être connecté pour effectuer cette action.");
            }
            
            const response = await fetch(`http://localhost:4400/api/deleteUser/${userToDelete.user_id}`, {
                method: 'DELETE',
                headers: {
                    'token': token,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`Erreur lors de la suppression: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.Error === true) {
                throw new Error(data.Message || 'Erreur serveur');
            }
            
            // Mettre à jour la liste des utilisateurs
            setUsers(users.filter(user => user.user_id !== userToDelete.user_id));
            
            // Mettre à jour le compteur total
            setTotalUserCount(prev => prev - 1);
            
            // Afficher une confirmation
            showToast({
                message: 'Utilisateur supprimé avec succès',
                type: 'success',
                duration: 3000
            });
            
            // Fermer le modal
            setShowDeleteModal(false);
            setUserToDelete(null);
        } catch (error) {
            console.error("Failed to delete user:", error);
            showToast({
                message: error instanceof Error ? error.message : 'Erreur lors de la suppression',
                type: 'error',
                duration: 5000
            });
        }
    };

    // Annuler la suppression
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    // Préparation pour éditer un utilisateur
    const handleEditClick = (user: User) => {
        setUserToEdit(user);
        setEditFormData({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone.toString(),
            fonction: user.fonction || ''
        });
        setShowEditModal(true);
    };

    // Gérer les changements dans le formulaire d'édition
    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Soumettre les modifications d'un utilisateur
    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!userToEdit) return;
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Vous devez être connecté pour effectuer cette action.");
            }
            
            const response = await fetch(`http://localhost:4400/api/updateUser/${userToEdit.user_id}`, {
                method: 'PUT',
                headers: {
                    'token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFormData)
            });
            
            if (!response.ok) {
                throw new Error(`Erreur lors de la mise à jour: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.Error === true) {
                throw new Error(data.Message || 'Erreur serveur');
            }
            
            // Mettre à jour la liste des utilisateurs
            setUsers(users.map(user => 
                user.user_id === userToEdit.user_id 
                    ? { 
                        ...user, 
                        ...editFormData,
                        // Préserver l'image
                        image: user.image
                    } 
                    : user
            ));
            
            // Afficher une confirmation
            showToast({
                message: 'Utilisateur mis à jour avec succès',
                type: 'success',
                duration: 3000
            });
            
            // Fermer le modal
            setShowEditModal(false);
            setUserToEdit(null);
        } catch (error) {
            console.error("Failed to update user:", error);
            showToast({
                message: error instanceof Error ? error.message : 'Erreur lors de la mise à jour',
                type: 'error',
                duration: 5000
            });
        }
    };

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
                                <th className="p-4 text-center text-green-800">Actions</th>
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
                                            <div 
                                                className="cursor-pointer" 
                                                onClick={() => handleUserClick(user)}
                                            >
                                                <Image 
                                                    width={48}
                                                    height={48} 
                                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-green-200 hover:ring-green-500 transition-all" 
                                                    src={user.image || "/images/default-avatar.png"} 
                                                    alt={`Profil de ${user.prenom} ${user.nom}`} 
                                                />
                                            </div>
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
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button 
                                                onClick={() => handleEditClick(user)}
                                                className="p-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                                title="Modifier"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(user)}
                                                className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                                title="Supprimer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Modal pour afficher les détails de l'utilisateur */}
            {showUserModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6 relative">
                        <button 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseUserModal}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <div className="flex flex-col items-center mb-6">
                            <div className="h-24 w-24 mb-4 relative">
                                <Image
                                    src={selectedUser.image || '/images/default-avatar.png'}
                                    alt={`Avatar de ${selectedUser.prenom} ${selectedUser.nom}`}
                                    className="rounded-full object-cover border-4 border-green-200"
                                    width={96}
                                    height={96}
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-green-800">{selectedUser.prenom} {selectedUser.nom}</h2>
                            <p className="text-green-600">{selectedUser.fonction || "Utilisateur"}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <div className="border-b pb-2">
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{selectedUser.email}</p>
                            </div>
                            
                            <div className="border-b pb-2">
                                <p className="text-sm text-gray-500">Téléphone</p>
                                <p className="font-medium">{selectedUser.telephone || "Non renseigné"}</p>
                            </div>
                            
                            <div className="border-b pb-2">
                                <p className="text-sm text-gray-500">ID Utilisateur</p>
                                <p className="font-medium">{selectedUser.user_id}</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                onClick={handleCloseUserModal}
                            >
                                Fermer
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                onClick={() => {
                                    handleCloseUserModal();
                                    handleEditClick(selectedUser);
                                }}
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmation pour la suppression */}
            {showDeleteModal && userToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                        <div className="text-center mb-6">
                            <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h2 className="text-xl font-semibold text-gray-900">Confirmer la suppression</h2>
                            <p className="text-gray-600 mt-2">
                                Êtes-vous sûr de vouloir supprimer l&apos;utilisateur <span className="font-medium">{userToDelete.prenom} {userToDelete.nom}</span> ?
                            </p>
                            <p className="text-red-600 text-sm mt-2">Cette action est irréversible.</p>
                        </div>
                        
                        <div className="flex justify-center space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                onClick={handleCancelDelete}
                            >
                                Annuler
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                onClick={handleConfirmDelete}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal pour éditer un utilisateur */}
            {showEditModal && userToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6 relative">
                        <button 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setShowEditModal(false);
                                setUserToEdit(null);
                            }}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <h2 className="text-xl font-semibold text-green-800 mb-4">Modifier l&apos;utilisateur</h2>
                        
                        <form onSubmit={handleSubmitEdit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={editFormData.nom}
                                        onChange={handleEditFormChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={editFormData.prenom}
                                        onChange={handleEditFormChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editFormData.email}
                                        onChange={handleEditFormChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Téléphone
                                    </label>
                                    <input
                                        type="text"
                                        name="telephone"
                                        value={editFormData.telephone}
                                        onChange={handleEditFormChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fonction
                                    </label>
                                    <input
                                        type="text"
                                        name="fonction"
                                        value={editFormData.fonction}
                                        onChange={handleEditFormChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setUserToEdit(null);
                                    }}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                >
                                    Sauvegarder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}