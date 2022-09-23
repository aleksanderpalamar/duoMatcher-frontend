import logo from "../../assets/duoMatcher.svg";

export function Logo() {
  return (
    <div className="items-center justify-center flex">
      <img
        src={logo}
        className="smartphone:w-12 smartphone:h-12 w-20 h-20"
        alt="Logo"
        title="Logomarca duoMatcher"
      />
      <h1 className="smartphone:text-xl text-2xl font-bold text-white">duoMatcher</h1>
    </div>
  );
}
