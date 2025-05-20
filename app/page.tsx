import Listes from "@/library/Listes/page";
import Entetepage from "@/library/Entetepage/page";
import Langues from "@/library/Langues/page";
import CounterSection from "@/library/Count/page";
import Formation from "@/library/Formation/page";
import Chart1 from "@/library/Charts/Chart1/page";
import Chart2 from "@/library/Charts/Chart2/page";
import { BoxRevealDemo } from "@/library/Box/page";
// import { GlareCardDemo } from "@/library/Card/page";


export default function Home() {
  return (
    <>
      <Entetepage/>

      <CounterSection/>

      {/* <GlareCardDemo/> */}

      <div className="container grid grid-cols-2 gap-4 justify-center m-8">
      <Chart1/>
      <Chart2/>
      </div>


      <div className="container grid grid-cols-2 gap-4 justify-center ml-6">
        <BoxRevealDemo />
        <Formation />
      </div>


      <div className="py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Nos Formations</h2>
        <Listes />
        <Langues />
      </div>
    </>
  );
}
