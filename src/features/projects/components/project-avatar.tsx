import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectAvatarProps {
  name: string;
  image?: string;
  className?: string;
  fallbackClassName?: string;
}

export default function ProjectAvatar({
  name,
  className,
  image,
  fallbackClassName,
}: ProjectAvatarProps) {
  if (image) {
    return (
      <div
        className={cn("relative size-5 overflow-hidden rounded-md", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "rounded-md bg-blue-600 text-sm font-semibold uppercase text-white",
          fallbackClassName,
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}
