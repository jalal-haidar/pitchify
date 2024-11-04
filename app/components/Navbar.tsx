import { auth, signOut, signIn } from "@/auth";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <img src="./logo.png" alt="Logo" width={144} height={30} />
        </Link>

        <div className="items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut(); //after logout, redirect to home page
                }}
              >
                <button type="submit">Log out</button>
              </form>

              <Link href={`/user${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Log in</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
