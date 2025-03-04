export default function Apropos() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-800 mb-6">
            La Plateforme 2iE : Transformer l&apos;Éducation Technique
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Une solution numérique innovante conçue pour accompagner les étudiants dans leur parcours académique et professionnel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-10 h-10 text-green-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h2 className="text-2xl font-bold text-green-800">Notre Mission</h2>
            </div>
            <p className="text-green-700">
              Simplifier et optimiser la gestion académique en fournissant des outils numériques performants qui permettent un suivi personnalisé de chaque étudiant.
            </p>
          </div>

          <div className="bg-green-50 p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-10 h-10 text-green-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-2xl font-bold text-green-800">Notre Vision</h2>
            </div>
            <p className="text-green-700">
              Devenir la référence technologique dans la gestion des profils étudiants, en proposant une plateforme intuitive qui favorise la réussite académique et professionnelle.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-3xl font-bold text-green-800 mb-6">Nos Engagements Clés</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
              <div className="text-4xl font-bold text-green-600 mb-4">+2000</div>
              <h4 className="text-xl font-semibold text-green-800">Étudiants Accompagnés</h4>
              <p className="text-green-700 mt-2">Un écosystème numérique qui soutient chaque parcours individuel.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
              <div className="text-4xl font-bold text-green-600 mb-4">99%</div>
              <h4 className="text-xl font-semibold text-green-800">Taux de Satisfaction</h4>
              <p className="text-green-700 mt-2">Une plateforme conçue pour répondre aux besoins réels des étudiants.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
              <div className="text-4xl font-bold text-green-600 mb-4">5+</div>
              <h4 className="text-xl font-semibold text-green-800">Années d&apos;Innovation</h4>
              <p className="text-green-700 mt-2">Une expertise continue dans la transformation digitale de l&apos;éducation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}