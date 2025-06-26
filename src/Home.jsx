import { useEffect, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import gala1 from "./assets/gala1.jpg";

export function Home() {
  const navigate = useNavigate();
  const titleRef = useRef(null);

  useEffect(() => {
    const animateAndRedirect = async () => {
      // Animación del título con GSAP
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 }, // Estado inicial
        { opacity: 1, y: 0, duration: 2, ease: "power3.out" } // Estado final
      );

      // Esperar a que termine la animación
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Redirigir al login
      navigate("/sign-in");
    };

    animateAndRedirect();
  }, []);

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${gala1})` }} />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />

        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                ref={titleRef}
                variant="h1"
                className="mb-6 font-black text-2xl sm:text-3xl lg:text-7xl border-b-2 pb-3 text-white"
              >
                PASSWORD CLOUD
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
