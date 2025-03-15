export default function Listes() {
    const listItems = [
            {
                id: 1,
                image: "https://img.daisyui.com/images/profile/demo/1@94.webp",
                nom: "Lupa",
                prenom: "Dio",
                email: "dio.lupa@example.com",
                fonction: "Ingénieur IA"
            },
            {
                id: 2,
                image: "https://img.daisyui.com/images/profile/demo/4@94.webp",
                nom: "Beilish",
                prenom: "Ellie",
                email: "ellie.beilish@example.com",
                fonction: "Data Scientist"
            },
            {
                id: 3,
                image: "https://img.daisyui.com/images/profile/demo/3@94.webp",
                nom: "Gardener",
                prenom: "Sabrino",
                email: "sabrino.gardener@example.com",
                fonction: "Spécialiste ML"
            },
            {
                id: 4,
                image: "https://img.daisyui.com/images/profile/demo/1@94.webp",
                nom: "Lupa",
                prenom: "Dio",
                email: "dio.lupa@example.com",
                fonction: "Expert Cybersécurité"
            },
            {
                id: 5,
                image: "https://img.daisyui.com/images/profile/demo/4@94.webp",
                nom: "Beilish",
                prenom: "Ellie",
                email: "ellie.beilish@example.com",
                fonction: "Responsable Marketing"
            },
            {
                id: 6,
                image: "https://img.daisyui.com/images/profile/demo/3@94.webp",
                nom: "Gardener",
                prenom: "Sabrino",
                email: "sabrino.gardener@example.com",
                fonction: "Architecte IA"
            },
            {
                id: 7,
                image: "https://img.daisyui.com/images/profile/demo/1@94.webp",
                nom: "Lupa",
                prenom: "Dio",
                email: "dio.lupa@example.com",
                fonction: "Analyste Sécurité"
            },
            {
                id: 8,
                image: "https://img.daisyui.com/images/profile/demo/4@94.webp",
                nom: "Beilish",
                prenom: "Ellie",
                email: "ellie.beilish@example.com",
                fonction: "Stratège Digital"
            }
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                                                alt={`Profil de ${item.prenom} ${item.nom}`} 
                                            />
                                            <div>
                                                <div className="font-semibold text-green-900">{item.nom}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center hidden md:table-cell">
                                        <div className="text-sm text-green-800">{item.prenom}</div>
                                    </td>
                                    <td className="p-4 text-center hidden md:table-cell">
                                        <div className="text-sm text-green-600">{item.email}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {item.fonction}
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