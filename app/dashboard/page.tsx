import ClientComponent from "@/components/client-component";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Page() {

  const session = await auth.api.getSession({
      headers: await headers()
    });
  
    if (!session) {
      return redirect('/')
    }
  
    const user = session?.user;

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
          <div className='mt-10 text-center'>
                <h1 className='text-2xl font-bold underline'>Welcome to the dashboard</h1>
                <ul>
                  <li>Name: {user.name}</li>
                  <li>Email: {user.email}</li>
                </ul>
                <ClientComponent />
              </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  )
}
