"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "My Goals", path: "/goals" },
  { name: "Roadmap", path: "/roadmap" },
  { name: "Learning", path: "/learning" },
  { name: "Upskill", path: "/upskill" },
  { name: "Calendar", path: "/calendar" },
  { name: "Credentials", path: "/credentials" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-bold text-white">
          Saarthi AI 
        </div>

        {/* Nav Links */}
        <div className="flex gap-6 text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`relative group transition duration-300
                  ${isActive ? "text-blue-400" : "text-gray-300"}
                  hover:text-white`}
              >
                {item.name}

                {/* Active underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            );
          })}
        </div>

        {/* 🔐 AUTH SECTION */}
        <div className="flex items-center gap-4">

          {session?.user ? (
            <>
              {/* Profile Image */}
              <img
                src={session.user.image || ""}
                alt="profile"
                className="w-9 h-9 rounded-full border border-white/20"
              />

              {/* Logout */}
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-white text-black px-4 py-1.5 rounded-lg text-sm hover:bg-gray-200 transition"
            >
              Sign in
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}