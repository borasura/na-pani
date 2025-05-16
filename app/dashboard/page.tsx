import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {

  //TODO - do we need this? Can't we make this check global?
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return redirect('/')
  }
  redirect(`/dashboard/home`)
}
