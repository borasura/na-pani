import { createAuthClient } from "better-auth/react"
// export const authClient = createAuthClient({
//     // baseURL: "http://localhost:3000" // the base url of your auth server https://na-pani.vercel.app/
//     baseURL: "https://na-pani.vercel.app"
// })

console.log("process.env.NEXT_PUBLIC_REACT_APP_BASE_URL is ", process.env.NEXT_PUBLIC_REACT_APP_BASE_URL)
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL || "http://localhost:3000" // Fallback to the default URL if the env variable is not set
});

// export const { signIn, signUp, useSession } = createAuthClient()