export default function Listes() {
    const listItems = [
            {
                id: 1,
                image: "https://img.daisyui.com/images/profile/demo/1@94.webp",
                name: "Dio Lupa",
                title: "Informatique",
                description: "Techniques Avancées de Machine Learning",
                details: "Inscrits : 150",
                highlight: "Placement Pro : 90%"
            },
            {
                id: 2,
                image: "https://img.daisyui.com/images/profile/demo/4@94.webp",
                name: "Ellie Beilish",
                title: "Science des Données",
                description: "Python pour l'Analyse de Données",
                details: "Durée : 12 Semaines",
                highlight: "Niveau : Intermédiaire"
            },
            {
                id: 3,
                image: "https://img.daisyui.com/images/profile/demo/3@94.webp",
                name: "Sabrino Gardener",
                title: "IA & Machine Learning",
                description: "Bases de l'Apprentissage Profond",
                details: "Projets Pratiques",
                highlight: "Impact Carrière : Élevé"
            },
            {
                id: 4,
                image: "https://img.daisyui.com/images/profile/demo/1@94.webp",
                name: "Dio Lupa",
                title: "Cybersécurité",
                description: "Fondamentaux de la Sécurité Réseau",
                details: "Certification Incluse",
                highlight: "Reconnu par l'Industrie"
            },
            {
                id: 5,
                image: "https://img.daisyui.com/images/profile/demo/4@94.webp",
                name: "Ellie Beilish",
                title: "Marketing Digital",
                description: "Stratégie de Médias Sociaux",
                details: "Sessions en Ligne en Direct",
                highlight: "Cours par des Experts"
            },
            {
                id: 6,
                image: "https://img.daisyui.com/images/profile/demo/3@94.webp",
                name: "Sabrino Gardener",
                title: "IA & Machine Learning",
                description: "Bases de l'Apprentissage Profond",
                details: "Projets Pratiques",
                highlight: "Impact Carrière : Élevé"
            },
            {
                id: 7,
                image: "https://img.daisyui.com/images/profile/demo/1@94.webp",
                name: "Dio Lupa",
                title: "Cybersécurité",
                description: "Fondamentaux de la Sécurité Réseau",
                details: "Certification Incluse",
                highlight: "Reconnu par l'Industrie"
            },
            {
                id: 8,
                image: "https://img.daisyui.com/images/profile/demo/4@94.webp",
                name: "Ellie Beilish",
                title: "Marketing Digital",
                description: "Stratégie de Médias Sociaux",
                details: "Sessions en Ligne en Direct",
                highlight: "Cours par des Experts"
            }
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="p-4 text-left text-green-800">Formateur</th>
                                <th className="p-4 text-center hidden md:table-cell text-green-800">Formation</th>
                                <th className="p-4 text-center hidden md:table-cell text-green-800">Détails</th>
                                <th className="p-4 text-center text-green-800">Points Clés</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems.map((item) => (
                                <tr 
                                    key={item.id} 
                                    className="border-b hover:bg-green-50 transition-colors"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <img 
                                                className="w-12 h-12 rounded-full object-cover ring-2 ring-green-200" 
                                                src={item.image} 
                                                alt={`Profil de ${item.name}`} 
                                            />
                                            <div>
                                                <div className="font-semibold text-green-900">{item.name}</div>
                                                <div className="text-sm text-green-700">{item.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center hidden md:table-cell">
                                        <div className="text-sm text-green-800">{item.description}</div>
                                    </td>
                                    <td className="p-4 text-center hidden md:table-cell">
                                        <div className="text-sm text-green-600">{item.details}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {item.highlight}
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