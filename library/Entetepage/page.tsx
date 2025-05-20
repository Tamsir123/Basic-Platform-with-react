
import Link from "next/link";
export default function Entetepage() {
    return (
        <>
        <div className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container relative z-10 py-16 md:py-28">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 mr-2 rounded-full bg-green-500 animate-pulse"></span>
                Plateforme Éducative
              </span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-green-700 via-green-600 to-blue-700 bg-clip-text text-transparent pb-3">
              Plateforme de Gestion des<br />Profils Étudiants de 2iE
            </h1>
            
            <p className="mt-6 text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Une solution innovante pour suivre, analyser et optimiser les parcours académiques 
              de nos étudiants. Découvrez comment transformer la gestion éducative.
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/Connexion">
                <button className="btn btn-primary btn-lg shadow-lg shadow-green-200">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Connexion
                </button>
              </Link>

              <Link href="/Apropos">
              <button className="btn btn-outline btn-lg border-green-600 text-green-700 hover:bg-green-50">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                En savoir plus
              </button>
              </Link>
            </div>
            
            <div className="mt-12 flex justify-center space-x-6 items-center">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                {['bg-green-300', 'bg-green-500', 'bg-green-700'].map((color, i) => (
                    <div key={i+1} className={`w-8 h-8 rounded-full ${color} ring-2 ring-white flex items-center justify-center text-xs text-white font-bold`}>
                      {i+1}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">+2k étudiants</span>
              </div>
              <div className="flex items-center">
                <div className="text-amber-500 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">4.9/5 satisfaction</span>
              </div>
             
            </div>
          </div>
        </div>
      </div>
        </>
    )
}