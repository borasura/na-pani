import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    // baseURL: "http://localhost:3000" // the base url of your auth server https://na-pani.vercel.app/
    baseURL: "https://na-pani.vercel.app"
})

// export const { signIn, signUp, useSession } = createAuthClient()