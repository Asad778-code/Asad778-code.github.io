import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";
import Hero, { Navbar } from "../components/Hero";
import { Contact, Explorations, Services, Stats, Works } from "../components/Sections";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const done = useCallback(() => setIsLoading(false), []);
  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={done} />}</AnimatePresence>
      <Navbar />
      <main>
        <Hero ready={!isLoading} />
        <Works />
        <Services />
        <Explorations />
        <Stats />
      </main>
      <Contact />
    </>
  );
}
