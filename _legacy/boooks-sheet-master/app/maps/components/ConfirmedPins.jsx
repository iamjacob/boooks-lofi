"use client";
import { Marker } from "react-map-gl/maplibre";
import Link from "next/link";
import { usePlacementStore } from "../store/usePlacementStore";
import {
  BookOpen,
  ShoppingCart,
  Library,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import Book from "@/app/components/Book";

const TYPE_ICON = {
  read: {
    icon: BookOpen,
    color: "#2563eb", // blue
  },
  buy: {
    icon: ShoppingCart,
    color: "#16a34a", // green
  },
  library: {
    icon: Library,
    color: "#9333ea", // purple
  },
  event: {
    icon: Calendar,
    color: "#ea580c", // orange
  },
  other: {
    icon: MoreHorizontal,
    color: "#6b7280", // gray
  },
};

export default function ConfirmedPins() {
  const locations = usePlacementStore((s) => s.locations);

  return (
    <>
      {locations.map((loc) => {
        const config = TYPE_ICON[loc.type];
        const Icon = config?.icon ?? MoreHorizontal;
        const color = config?.color ?? "#6b7280";

        return (
          <Marker
            key={loc.id}
            latitude={loc.lat}
            longitude={loc.lng}
            anchor="bottom"
          >
            <div
              className="flex items-center justify-center touch-auto"
              style={{
                width: 80,
                height: 80,
              }}
            >
                    <svg
                      className="-rotate-45 -ml-4"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.4243 9.79244C18.4119 8.58141 16.1397 8.10579 13.8185 8.40377C14.3296 7.36657 14.5787 6.30262 14.5425 5.29599C14.4765 3.44125 13.4458 1.88258 11.6421 0.908411C9.35075 -0.329354 5.85832 -0.298793 3.33909 0.979085C1.20318 2.06213 0.0276816 3.85957 0.0276816 6.04285C0.0276816 7.44679 0.00851693 18.9878 0.00212836 21.9523L0 22.6438C0 23.2512 0.549416 23.7574 1.22661 23.7689L13.8952 23.9981C13.9889 24 14.0826 24 14.1762 24C18.9975 24 22.4324 22.0841 23.6015 18.7452C24.7451 15.4827 23.3481 11.5517 20.4243 9.79244ZM9.37417 9.9548C9.2677 10.0217 9.20594 10.0637 9.19103 10.0732C8.648 10.4476 8.53727 11.1295 8.94188 11.6262C9.34649 12.1228 10.1046 12.2374 10.6668 11.8879C10.7222 11.8535 10.7775 11.8172 10.8244 11.7866C11.5229 11.3607 15.2006 9.35502 19.0294 11.6586C21.0461 12.8716 22.0257 15.7482 21.2143 18.071C20.3838 20.4452 17.8901 21.7518 14.1912 21.7518C14.1102 21.7518 14.0272 21.7518 13.9484 21.7499L2.51284 21.5436V21.3124C2.51923 17.603 2.53627 7.36084 2.53627 6.04094C2.53627 4.32755 3.64575 3.40496 4.57422 2.93315C6.32682 2.04494 8.81198 2.00101 10.3516 2.83192C11.4334 3.41451 11.9999 4.26833 12.0403 5.36666C12.0978 6.96926 10.9734 8.8985 9.37417 9.9548Z"
                        fill="#D91B24"
                      />
                    </svg>

                  <Book orbit={true}/>

                    <Link href="/book/the-midnight-library" className="group">
                      <div className="text-sm text-slate-400 hover:scale-105 transition">
                        Book →
                      </div>
                    </Link>
            </div>
          </Marker>
        );
      })}
    </>
  );
}
