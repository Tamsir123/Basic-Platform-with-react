import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/LOGO.jpg'; // Adjust the path based on your folder structure

export default function Navbar() {
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

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring-2 ring-green-200">
                  <img
                    alt="User Profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                    className="filter blur-sm hover:blur-none transition-all duration-300"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-green-100"
              >
                <li>
                  <a className="justify-between text-green-800 hover:bg-green-50">
                    Profile
                    <span className="badge badge-success badge-sm">New</span>
                  </a>
                </li>
                <li>
                  <a className="text-green-800 hover:bg-green-50">Paramètres</a>
                </li>
                <li>
                  <a className="text-green-800 hover:bg-green-50">Déconnexion</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Elegant Separator */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent shadow-sm relative z-50"></div>
    </>
  );
}