"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "https://linkedin.com/in/bpmct", label: "Contact", external: true },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <Link href="/">
        <Image
          src="/images/headshot.jpeg"
          alt="My headshot"
          width={76}
          height={76}
        />
      </Link>
      <div>
        <h1>Ben Potter</h1>
        <nav>
          {navItems.map((item) => {
            const isSelected = item.external
              ? false
              : pathname === item.href || pathname.startsWith(item.href + "/");
            if (item.external) {
              return (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isSelected ? "selected" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
