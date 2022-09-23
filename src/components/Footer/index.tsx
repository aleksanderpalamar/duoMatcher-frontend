export function Footer() {
  return (
    <footer className="bg-transparent py-8 px-10 text-white mt-8 flex flex-col items-center">
      <div className="flex flex-col gap-4">
        <a href="">
          <img
            src="/images/google-play-badge.png"
            alt=""
            className="w-50 h-20"
          />
        </a>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <p className="font-normal text-sm">
          desenvolvido com ❤️ por{" "}
          <a
            href="https://www.palamarsolutionit.com.br/"
            className="font-bold text-transparent bg-[#B10040] bg-clip-text hover:border-b-2 hover:border-b-[#B10040]"
          >
            Palamar
          </a>
        </p>
      </div>
    </footer>
  );
}
