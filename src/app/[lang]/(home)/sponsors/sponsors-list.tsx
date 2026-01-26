import { Sponsor } from "@/lib/types/sponsor";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";

import { useState, useEffect, ViewTransition, startTransition } from "react";
import { getSponsors } from "../actions";
import { useMessages } from "@/lib/hooks/useMessages";
import Image, { StaticImageData } from "next/image";

import BisectHostingDarkLogo from "./featured-sponsor-img/bh/BH_DARK.svg";
import BisectHostingLightLogo from "./featured-sponsor-img/bh/BH_LIGHT.svg";
import FivemanageDarkLogo from "./featured-sponsor-img/fivemanage/FM_DARK.svg";
import FivemanageLightLogo from "./featured-sponsor-img/fivemanage/FM_LIGHT.svg";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

type FeaturedSponsor = Omit<Sponsor, "image"> & {
  website: string;
  colors: {
    light: {
      brandColor: string;
      backgroundColor: string;
    };
    dark: {
      brandColor: string;
      backgroundColor: string;
    };
  };
  image: {
    dark: StaticImageData | string;
    light: StaticImageData | string;
  };
};

const constFeaturedSponsors: FeaturedSponsor[] = [
  {
    MemberId: "bisect",
    name: "Bisect Hosting",
    image: {
      dark: BisectHostingLightLogo,
      light: BisectHostingDarkLogo,
    },
    website: "https://www.bisecthosting.com/",
    colors: {
      light: { brandColor: "#1b57c4", backgroundColor: "#e4e7f2" },
      dark: { brandColor: "#1b57c4", backgroundColor: "#020525" },
    },
  },
  {
    MemberId: "fivemanage",
    name: "Fivemanage",
    image: {
      dark: FivemanageDarkLogo,
      light: FivemanageLightLogo,
    },
    website: "https://fivemanage.com/",
    colors: {
      light: { brandColor: "#fbb15b", backgroundColor: "#e6e7eb" },
      dark: { brandColor: "#fbb15b", backgroundColor: "#0d0e12" },
    },
  },
];

const staticSponsors: Sponsor[] = [
  {
    MemberId: "apexhosting",
    name: "ApexHosting",
    image: "/sponsors/apexhosting.png",
    website: "https://apexminecrafthosting.com",
  },
];
export function SponsorsList() {
  const messages = useMessages();
  const theme = useTheme();

  const [featuredSponsors, setFeaturedSponsors] = useState<FeaturedSponsor[]>();
  const [sponsors, setSponsors] = useState<Sponsor[]>(staticSponsors);
  const [state, setState] = useState<"loading" | "error" | "loaded">("loading");

  useEffect(() => {
    async function loadSponsors() {
      try {
        const openCollectiveSponsors = await getSponsors();
        const sortedSponsors = [...openCollectiveSponsors].sort((a, b) => {
          const amountA = a.totalAmountDonated || 0;
          const amountB = b.totalAmountDonated || 0;
          return amountB - amountA;
        });
        setSponsors([...sortedSponsors, ...staticSponsors]);
        startTransition(() => setState("loaded"));
      } catch (error) {
        console.error("Failed to load sponsors:", error);
        startTransition(() => setState("error"));
      }
    }
    loadSponsors();
  }, []);

  useEffect(() => {
    startTransition(() => {
      setFeaturedSponsors(constFeaturedSponsors);
    });
  });

  useEffect(() => {
    console.log("theme:", theme.theme);
  }, [theme.theme]);
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{messages.sponsors.ourSponsors}</h3>
      <ViewTransition
        enter="blur-scale-transition"
        exit="blur-scale-transition"
      >
        <div className="flex flex-col gap-4 pt-8">
          {featuredSponsors &&
            featuredSponsors.map((sponsor) => (
              <Button
                key={sponsor.MemberId}
                variant="link"
                className="flex-1 border border-(--sponsor-light-brand-color) bg-(--sponsor-light-background-color) transition-all hover:shadow-lg dark:border-(--sponsor-dark-brand-color) dark:bg-(--sponsor-dark-background-color)"
                asChild
                style={
                  {
                    "--sponsor-light-brand-color":
                      sponsor.colors.light.brandColor,
                    "--sponsor-light-background-color":
                      sponsor.colors.light.backgroundColor,
                    "--sponsor-dark-brand-color":
                      sponsor.colors.dark.brandColor,
                    "--sponsor-dark-background-color":
                      sponsor.colors.dark.backgroundColor,
                  } as React.CSSProperties
                }
              >
                <Link
                  key={sponsor.MemberId}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <div className="relative h-24 w-full">
                    <Image
                      src={
                        theme.theme === "dark"
                          ? sponsor.image.light
                          : sponsor.image.dark
                      }
                      alt={sponsor.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </Link>
              </Button>
            ))}
        </div>
      </ViewTransition>

      <ViewTransition update="blur-scale-transition">
        <div className="flex flex-wrap justify-center gap-2">
          {state === "loading" && (
            <p className="text-muted-foreground">{messages.misc.loading}</p>
          )}
          {state === "error" && (
            <p className="text-destructive">{messages.misc.failedToLoad}</p>
          )}
          {state === "loaded" &&
            sponsors.map((sponsor) => {
              const logoSrc = sponsor.image;
              if (!logoSrc) return null;

              console.log("sponsor:", sponsor);

              const content = (
                <Tooltip key={sponsor.MemberId}>
                  <TooltipTrigger
                    style={{
                      cursor: sponsor.website ? "pointer" : "default",
                    }}
                  >
                    <Avatar className="hover:border-primary size-16 border-2 transition-all ease-in-out hover:scale-110">
                      <AvatarImage src={logoSrc} alt={sponsor.name} />
                      <AvatarFallback>
                        {sponsor.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{sponsor.name}</p>
                  </TooltipContent>
                </Tooltip>
              );

              return sponsor.website ? (
                <Link
                  key={sponsor.MemberId}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  title={sponsor.name}
                >
                  {content}
                </Link>
              ) : (
                content
              );
            })}
        </div>
      </ViewTransition>
    </div>
  );
}
