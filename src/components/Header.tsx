import gitHubLogo from "../assets/github-mark.svg";
import { FaPaw } from "react-icons/fa";

function Header() {
  return (
    <>
      <div className="flex h-12 w-full flex-row items-center justify-between bg-gradient-to-b from-slate-50 to-indigo-50 px-3 py-1.5 drop-shadow-lg sm:px-16 lg:px-40">
        <div className="flex h-full w-auto flex-row items-center">
          <span className="select-none text-2xl font-medium">Cat Cals</span>
          <div className="mx-2 h-full w-auto rotate-[25deg]">
            <FaPaw size="100%" />
          </div>
        </div>
        <div className="flex h-3/4 flex-row items-center">
          <a
            href="https://github.com/john-pham-bit"
            className="flex h-full flex-row items-center"
            target="_blank"
          >
            <img
              src={gitHubLogo}
              className="mx-2 h-full w-auto"
              alt="gitHugLogo"
            />
            <span className="hidden select-none sm:block">GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
