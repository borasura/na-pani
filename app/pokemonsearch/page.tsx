
import { UserSearchAutocomplete } from "./user-search-autocomplete"

async function userSelected(username: string, id: string){
  'use server'
  console.log("Inside userSelected SA - Selected user - ", username, " ", id)
}

export default async function PokemonSearch() {

  return <main className="p-5">
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">User Search</h1>
      <p className="mb-4">Search for users by typing their username:</p>
      <UserSearchAutocomplete userSelected={userSelected}/>
    </div>
  </main>
}