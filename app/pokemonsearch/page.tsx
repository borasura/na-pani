
import { UserSearchAutocomplete } from "./user-search-autocomplete"

export default async function PokemonSearch() {

  return <main className="p-5">
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">User Search</h1>
      <p className="mb-4">Search for users by typing their username:</p>
      <UserSearchAutocomplete />
    </div>
  </main>
}