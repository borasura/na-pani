
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NavbarMini() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <div className="border-b px-4">
              <div>
          {
            session ? (
              <form action={async () => {
                'use server'
                await auth.api.signOut({
                  headers: await headers()
                });
                redirect('/')
              }}>
                <Button type='submit'>Sign Out</Button>
              </form>
            ) :
              <Link href='/sign-in' className={buttonVariants()}>
                Sign In
              </Link>
          }
        </div>
    </div>

  )
}