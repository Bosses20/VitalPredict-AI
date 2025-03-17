import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarGroupProps {
  users: { image: string; name: string }[];
  remainingCount?: number;
  maxCount?: number;
}

export default function AvatarGroup({ 
  users, 
  remainingCount = 0,
  maxCount = 5 
}: AvatarGroupProps) {
  const displayedUsers = users.slice(0, maxCount);

  return (
    <div className="flex items-center -space-x-2">
      {displayedUsers.map((user, i) => (
        <div
          key={i}
          className={cn(
            "inline-block rounded-full ring-2 ring-black",
            "relative overflow-hidden hover:z-10 transition-transform hover:scale-105"
          )}
        >
          <div className="relative w-8 h-8">
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="object-cover rounded-full"
              unoptimized
            />
          </div>
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "inline-flex items-center justify-center w-8 h-8 rounded-full",
            "bg-lime-400/20 border border-lime-400/30",
            "text-xs font-medium text-lime-400",
            "hover:z-10 transition-transform"
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
