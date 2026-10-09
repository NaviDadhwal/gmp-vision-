import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBuildingFactory2,
  IconWind,
  IconFilter,
  IconFileCertificate,
  IconFileDollar,
  IconBrandWhatsapp,
  IconPhone,
} from "@tabler/icons-react";

export interface GMPFloatingDockProps {
  className?: string;
  mobileClassName?: string;
}

export const GMPFloatingDock: React.FC<GMPFloatingDockProps> = ({
  className,
  mobileClassName,
}) => {
  const gmpLinks = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-400 hover:text-white transition-colors" />
      ),
      href: "/",
    },
    {
      title: "Cleanroom Solutions",
      icon: (
        <IconBuildingFactory2 className="h-full w-full text-[#38BDF8] transition-colors" />
      ),
      href: "/solutions",
    },
    {
      title: "HVAC & AHU",
      icon: (
        <IconWind className="h-full w-full text-neutral-300 transition-colors" />
      ),
      href: "/solutions/hvac-systems",
    },
    {
      title: "HEPA Filtration",
      icon: (
        <IconFilter className="h-full w-full text-[#3DAE2B] transition-colors" />
      ),
      href: "/solutions/air-filtration",
    },
    {
      title: "Projects & Portfolio",
      icon: (
        <IconFileCertificate className="h-full w-full text-neutral-300 transition-colors" />
      ),
      href: "/projects",
    },
    {
      title: "Instant RFQ",
      icon: (
        <IconFileDollar className="h-full w-full text-[#F59E0B] transition-colors" />
      ),
      href: "/rfq",
    },
    {
      title: "WhatsApp Hotline",
      icon: (
        <IconBrandWhatsapp className="h-full w-full text-[#25D366] transition-colors" />
      ),
      href: "https://wa.me/919999999999?text=Hello%20GMP%20Vision,%20I%20need%20a%20cleanroom%20inquiry",
    },
    {
      title: "Direct Call",
      icon: (
        <IconPhone className="h-full w-full text-neutral-300 transition-colors" />
      ),
      href: "tel:+919999999999",
    },
  ];

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <FloatingDock
          desktopClassName={className}
          mobileClassName={mobileClassName}
          items={gmpLinks}
        />
      </div>
    </div>
  );
};
