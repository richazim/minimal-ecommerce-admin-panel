"use client"
import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react";

function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname() // console.log(pathname === "/") si on est sur la page page d'accueil http://localhost/

    return (
      <Link
        {...props}
        className={cn(
          "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
          pathname === props.href && "bg-background text-foreground"
        )}
      />
    )
}

export default NavLink;

// Omit<ComponentProps<typeof Link>, "className">): NavLink accepte toutes les props que le composant Link accepte sauf la prop className.
// Omit<ComponentProps<typeof Link>, "className">): La prop children de link  est donc passé au rendu Link.