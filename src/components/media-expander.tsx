import { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Img } from "react-image";

export const MediaExpander: FC<{
  type?: "img" | "vid";
  note?: string;
  src: string;
  name?: string;
  children: ReactNode;
}> = ({ type = "img", note, src, children, name }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="relative">
          {children}
          {Boolean(note || name) && (
            <div className="absolute bg-black bottom-0 right-0 w-full bg-opacity-50 opacity-100 transition-opacity duration-300 h-fit rounded-lg flex flex-col justify-end p-4">
              <DialogTitle className="text-white text-base font-bold line-clamp-2">
                {name}
              </DialogTitle>
              {note && (
                <DialogDescription className="text-white">
                  {note}
                </DialogDescription>
              )}
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90%] md:max-w-2xl md:h-[95%] overflow-auto">
        <DialogHeader>
          {name && <DialogTitle className="text-sm">{name}</DialogTitle>}
        </DialogHeader>
        <div className="mt-4">
          {type === "img" ? (
            <Img
              src={src}
              alt={name}
              width={1200}
              className="rounded-lg h-[25rem]"
            />
          ) : (
            <video src={src} autoPlay controls className="w-full rounded-lg" />
          )}
        </div>
        {note && (
          <DialogDescription className="mt-4 md:text-sm text-xs text-gray-500">
            {note}
            {/*  */}
          </DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  );
};
