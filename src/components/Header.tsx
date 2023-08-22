import gitHubLogo from "../assets/github-mark.svg";
import { FaPaw } from "react-icons/fa";

function Header() {
  return (
    <>
      <div className="flex h-12 w-full flex-row items-center justify-between bg-gradient-to-b from-slate-50 to-indigo-50 px-3 py-1.5 drop-shadow-lg">
        <div className="flex h-full w-auto flex-row items-center">
          <span className="text-2xl font-medium">Cat Cals</span>
          <div className="mx-2 h-full w-auto rotate-[25deg]">
            <FaPaw size="100%" />
          </div>
        </div>
        <div className="flex h-full w-auto flex-row items-center">
          <a
            href="https://github.com/john-pham-bit"
            className="h-full"
            target="_blank"
          >
            <img src={gitHubLogo} className="h-full w-auto" alt="gitHugLogo" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
