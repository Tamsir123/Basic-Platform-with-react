import Listes from "@/components/Listes/page";
import Entetepage from "@/components/Entetepage/page";
import Langues from "@/components/Langues/page";

export default function Home() {
  return (
    <>
      <Entetepage/>
      <div className="py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Nos Formations</h2>
        <Listes />
        <Langues />
      </div>
      
    </>
  );
}
