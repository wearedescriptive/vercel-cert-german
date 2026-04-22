import { cacheLife } from "next/cache";
import type { ComponentType, SVGProps } from "react";

import { Twitter } from "./icons/twitter";
import { GitHub } from "./icons/github";
import { Discord } from "./icons/discord";

import { getPublicationConfig } from "@/lib/api";

async function DateText() {
  "use cache";

  cacheLife("max");

  return new Date().getFullYear();
}

async function SocialLinks() {
  "use cache";

  cacheLife("max");

  const config = await getPublicationConfig();
  const socialLinks = config?.data.socialLinks;

  const items: {
    key: keyof NonNullable<typeof socialLinks>;
    label: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
  }[] = [
    { key: "twitter", label: "Twitter", Icon: Twitter },
    { key: "github", label: "Github", Icon: GitHub },
    { key: "discord", label: "discord", Icon: Discord },
  ];

  return (
    <ul className="flex items-center gap-3">
      {items.map(({ key, label, Icon }) => {
        const href = socialLinks?.[key];
        if (!href) return null;
        return (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label={label}
            >
              <Icon className="size-4 transition-colors hover:text-foreground" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export async function Footer() {
  return (
    <footer className="border-t border-neutral-200/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <div className="relative h-0 w-0 border-l-8 border-r-8 border-b-14 border-l-transparent border-r-transparent border-b-neutral-400" />
          <span>
            &copy; <DateText /> Vercel Daily News
          </span>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
