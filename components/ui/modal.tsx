"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";

interface ModalProps {
  flag: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  domain: string;
  currencies: string[];
  languages: string[];
  borderCountries: string[];
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({
  flag,
  name,
  nativeName,
  population: number,
  region,
  subRegion,
  capital,
  domain,
  currencies,
  languages,
  borderCountries,
  onClose,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Back</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {/* <Image src={flag} alt={name} width={180} height={60} /> */}
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right"></Label>
          </div>
        </div>
        <DialogFooter>// Border countries</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
