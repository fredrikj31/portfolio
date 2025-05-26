import { Github } from "@/src/components/icons/Github";
import { LinkedIn } from "@/src/components/icons/LinkedIn";
import { Twitter } from "@/src/components/icons/Twitter";
import { ResumeLinkIconType } from "@/src/services/sanity/handlers/resume/schemas";
import clsx from "clsx";
import { Mail, MapPin, Phone } from "lucide-react";

interface LinkIconProps {
  icon: ResumeLinkIconType;
  className?: string;
}

export const LinkIcon = ({ icon, className }: LinkIconProps): JSX.Element | null => {
  switch (icon) {
    case "phone":
      return <Phone className={clsx(className)} />;
    case "email":
      return <Mail className={clsx(className)} />;
    case "github":
      return <Github className={clsx(className)} />;
    case "map":
      return <MapPin className={clsx(className)} />;
    case "linkedin":
      return <LinkedIn className={clsx(className)} />;
    case "twitter":
      return <Twitter className={clsx(className)} />;
    default:
      return icon satisfies never;
  }
};
