import type { Session } from "next-auth";
import Image from "next/image";

export default function UserAvatar({ session }: { session: Session | null }) {
  if (!session?.user?.image) {
    return null; // Or render a default avatar if you prefer
  }

  return (
    <div>
      <Image
        src={session.user.image}
        alt="User Avatar"
        width={32}
        height={32}
      />
    </div>
  );
}
