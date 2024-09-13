"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MySideLogo from "@/img/mySideLogo.svg";

interface iHeader {
  search: string;
  setSearch: (value: string) => void;
}

export const Header: React.FC<iHeader> = ({ search, setSearch }) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 py-4 gap-4 bg-white">
      <div>
        <Image src={MySideLogo} height={150} width={150} alt="MySide logo" />
      </div>

      <Input placeholder="Search" value={search} onChange={() => setSearch} />
    </header>
  );
};
