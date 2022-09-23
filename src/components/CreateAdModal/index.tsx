import { Check, GameController } from "phosphor-react";
import { Input } from "../Form/Input";
import { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios("http://localhost:3000/games")      
      .then(response => {
        setGames(response.data);
      });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3000/games/${data.game}/ads`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hoursStart,
      hourEnd: data.hoursEnd, 
      useVoiceChannel: useVoiceChannel,
    })
    
    alert("Anúncio criado com sucesso!")
    } catch (error) {
      console.log(error);
      alert("Erro ao criar anúncio!")
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content className="fixed bg-[#2a2643] rounded-lg smartphone:w-[25rem] w-[480px] smartphone:py-2 smartphone:px-5 py-8 px-10 text-white smartphone:top-1/1 smartphone:left-1/1 top-1/2 left-1/2 smartphone:-translate-x-1/1 smartphone:-translate-y-1/1 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 smartphone:mt-4 flex flex-col gap-4 smartphone:gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              name="game"
              id="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 app"
              defaultValue=""
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>
              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Seu nome (ou nickname)
            </label>
            <Input
              name="name"
              id="name"
              placeholder="Qual o seu nickname dentro do game?"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">
                Joga há quantos anos?
              </label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">
                Qual seu Discord?
              </label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays" className="font-semibold">
                Quando costuma jogar?
              </label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 roudend bg-zinc-900 ${
                    weekDays.includes("0") ? "bg-gray-400" : ""
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda-feira"
                  className={`w-8 h-8 roudend bg-zinc-900 ${
                    weekDays.includes("1") ? "bg-gray-400" : ""
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça-feira"
                  className={`w-8 h-8 roudend bg-zinc-900 ${
                    weekDays.includes("2") ? "bg-gray-400" : ""
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta-feira"
                  className={`w-8 h-8 roudend bg-zinc-900 ${
                    weekDays.includes("3") ? "bg-gray-400" : ""
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta-feira"
                  className={`w-8 h-8 roudend bg-zinc-900 ${
                    weekDays.includes("4") ? "bg-gray-400" : ""
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta-feira"
                  className={`w-8 h-8 roudend bg-zinc-900 ${
                    weekDays.includes("5") ? "bg-gray-400" : ""
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 roudend bg-zinc-900 ${
                    weekDays.includes("6") ? "bg-gray-400" : ""
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hoursStart" className="font-semibold">
                Qual horário do dia?
              </label>
              <div className="grid grid-cols-2 gap-1">
                <Input name="hoursStart" id="hoursStart" type="time" placeholder="De" />
                <Input name="hoursEnd" id="hoursEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="font-semibold items-center text-sm flex gap-2 mt-2">
            <Checkbox.Root
              checked={useVoiceChannel} 
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className="w-6 h-6 p-1 roudend bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check size={16} className="text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>
          <footer className="flex items-center gap-2 justify-end">
            <Dialog.Close
              type="button"
              className="flex items-center bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="flex gap-3 items-center bg-[#B10040] px-5 h-12 rounded-md font-semibold hover:bg-[#7c022f]"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
