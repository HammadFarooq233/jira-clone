import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MemberAvatarProps {
  name: string;
  className?: string;
  fallbackClassName: string;
}

export default function MemberAvatar({
  name,
  className,
  fallbackClassName,
}: MemberAvatarProps) {
  return (
    <Avatar
      className={cn(
        "size-10 rounded-full border border-neutral-300 transition",
        className,
      )}
    >
      <AvatarFallback
        className={cn(
          "flex items-center justify-center bg-neutral-200 font-medium text-neutral-500",
          fallbackClassName,
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
