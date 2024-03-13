import { useTheme } from "next-themes";
import NextImage from "./NextImage";
import Link from "next/link";

const WebLogo = ({ className }) => {
  const { theme } = useTheme();

  return (
    <>
      <Link href="/">
        <div className={`relative ${className ?? "w-12 h-16"}`}>
          <NextImage
            src={`${
              theme === "light"
                ? "/images/lightLogo.svg"
                : "/images/darkLogo.svg"
            }`}
            alt="Nopal-Dos-logo"
          />
        </div>
      </Link>
    </>
  );
};

export default WebLogo;
