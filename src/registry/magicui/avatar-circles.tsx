import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarCirclesProps {
  numPeople: number;
  avatarUrls: Array<{
    imageUrl: string;
    profileUrl?: string;
  }>;
  className?: string;
}

function AvatarCircles({
  numPeople,
  avatarUrls,
  className,
}: AvatarCirclesProps) {
  const displayAvatars = avatarUrls.slice(0, 5);
  const remainingCount = numPeople - displayAvatars.length;

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {displayAvatars.map((avatar, i) => (
        <a
          key={i}
          href={avatar.profileUrl}
          className={cn(
            "inline-block rounded-full ring-2 ring-black",
            "relative overflow-hidden hover:z-10 transition-transform hover:scale-105"
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-8 h-8">
            <Image
              src={avatar.imageUrl}
              alt="Avatar"
              fill
              className="object-cover rounded-full"
              unoptimized
            />
          </div>
        </a>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "inline-flex items-center justify-center w-8 h-8 rounded-full",
            "bg-lime-400/20 border border-lime-400/30",
            "text-xs font-medium text-lime-400"
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export { AvatarCircles };
