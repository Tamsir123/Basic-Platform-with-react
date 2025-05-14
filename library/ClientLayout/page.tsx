'use client';


import { usePathname } from 'next/navigation';
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Cacher Navbar/Footer sur /login et /inscription
  const hideLayout = ['/Connexion', '/Inscription'].includes(pathname);

  return (
    <>
      {!hideLayout && < Navbar />}
      {children}
      {!hideLayout &&   <Footer Nom="DIOUF" Prenom="Tamsir Ababacar" />}
    </>
  );
}