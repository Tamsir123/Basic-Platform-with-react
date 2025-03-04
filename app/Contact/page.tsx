export default function Contact() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-800 tracking-tight sm:text-5xl md:text-6xl mb-6">
            Contactez l&apos;Équipe 2iE
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Vous avez des questions sur nos formations, notre plateforme ou votre parcours académique ? 
            Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-green-50 p-8 rounded-xl shadow-md">
            <div className="mb-6">
              <svg className="w-12 h-12 text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Contactez-nous par email</h2>
              <p className="text-green-700 mb-4">
                Notre équipe répond sous 24h ouvrables
              </p>
              <a 
                href="mailto:support@2ie-platform.edu" 
                className="btn btn-outline btn-primary border-green-600 text-green-700 hover:bg-green-50"
              >
                support@2ie-platform.edu
              </a>
            </div>
          </div>

          <div className="bg-green-50 p-8 rounded-xl shadow-md">
            <div className="mb-6">
              <svg className="w-12 h-12 text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Appelez-nous</h2>
              <p className="text-green-700 mb-4">
                Disponible du lundi au vendredi, 8h-18h
              </p>
              <a 
                href="tel:+22600000000" 
                className="btn btn-outline btn-primary border-green-600 text-green-700 hover:bg-green-50"
              >
                +226 00 00 00 00
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-white border border-green-100 rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
              Formulaire de Contact
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-green-700 mb-2">Nom Complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                    placeholder="Votre nom" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-green-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                    placeholder="Votre email" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-green-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                  placeholder="Votre message"
                ></textarea>
              </div>
              <div className="text-center">
                <button 
                  type="submit" 
                  className="btn btn-primary bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                >
                  Envoyer le Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}