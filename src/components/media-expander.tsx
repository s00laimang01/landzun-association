import { FC, ReactNode, useEffect, useRef, useState } from "react";
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
  children?: ReactNode;
}> = ({ type = "img", note, src, children, name }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [poster, setPoster] = useState<string | undefined>(undefined);
  const frameTime = 5; // Choose a specific frame time in seconds

  useEffect(() => {
    if (type === "vid" && videoRef.current) {
      const video = videoRef.current;

      const handleLoadedData = () => {
        video.currentTime = frameTime; // Seek to the desired frame
      };

      const handleSeeked = () => {
        if (video.currentTime === frameTime) {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            setPoster(canvas.toDataURL("image/jpeg")); // Set the captured frame as poster
          }

          video.currentTime = 0; // Reset the video
          video.pause();
        }
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("seeked", handleSeeked);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("seeked", handleSeeked);
      };
    }
  }, [type, src, frameTime]);

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="relative">
          {children || <Img src={poster || ""} />}
          {Boolean(note || name) && (
            <div className="absolute bg-black bottom-0 right-0 w-full bg-opacity-50 opacity-100 transition-opacity duration-300 h-fit rounded-lg flex flex-col justify-end p-4">
              <DialogTitle className="text-white text-xl font-bold">
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
        <DialogHeader>{name && <DialogTitle>{name}</DialogTitle>}</DialogHeader>
        <div className="mt-4">
          {type === "img" ? (
            <Img
              src={src}
              alt={name}
              width={1200}
              className="rounded-lg h-[25rem]"
            />
          ) : (
            <video
              ref={videoRef}
              src={src}
              autoPlay
              controls
              poster={poster} // Use the captured frame as the poster
              className="w-full rounded-lg"
            />
          )}
        </div>
        {note && (
          <DialogDescription className="mt-4 text-sm text-gray-500">
            {note}
          </DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  );
};
