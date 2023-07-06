"use client";
import { BackButton } from "../../components/BackButton/BackButton";
import { Multiselect } from "../../components/Multiselect/Multiselect";
import { leadersVariants } from "../../utils/leaders";
import { useRouter, usePathname } from "next/navigation";
import { getLastRouteSegment, paths } from "../../utils/routes";

export default function LeadersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const listFor = getLastRouteSegment(pathname);

  const changeListFor = (value: string) => {
    router.replace(
      getLastRouteSegment(paths.leaders[value as "group" | "stream"])
    );
  };

  return (
    <>
      <BackButton />
      <Multiselect
        variants={leadersVariants}
        selectedVariant={listFor}
        onSelect={changeListFor}
        variantsAsTabs
      />
      {children}
    </>
  );
}
