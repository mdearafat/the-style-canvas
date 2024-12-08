import Image from "next/image";
import Link from "next/link";
import HeaderActions from "./HeaderActions";

export default function Header() {
  return (
    <header className="py-4 px-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/The Style Canvas.svg"
            alt="The Style Canvas"
            width={150}
            height={40}
            priority
          />
        </Link>
        <HeaderActions />
      </div>
    </header>
  );
}
