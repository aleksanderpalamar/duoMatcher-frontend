import * as Dialog from "@radix-ui/react-dialog";

import { GameBanner } from "../../components/GameBanner";
import { CreateAdBanner } from "../../components/CreateAdBanner";
import { useEffect, useState } from "react";
import { Logo } from "../../components/Logo";
import { GameController } from "phosphor-react";
import { Input } from "../../components/Form/Input";
import { CreateAdModal } from "../../components/CreateAdModal";
import axios from "axios";
import { Footer } from "../../components/Footer";

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

export function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://69.164.222.113:3000/games")      
      .then(response => {
        setGames(response.data);
      });
  }, []);

  return (
    <div className="smartphone:p-4 max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <Logo />
      <h1 className="text-5xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-[#B10040] bg-clip-text">duo</span>{" "}
        está aqui.
      </h1>
      <div className="grid smartphone:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
        <Footer />
      </Dialog.Root>
    </div>
  );
}
