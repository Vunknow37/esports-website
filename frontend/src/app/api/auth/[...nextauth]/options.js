import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import DiscordProvider from "next-auth/providers/discord";

export const options = {
    providers : [
        GoogleProvider({
                clientId : process.env.GOOGLE_ID , 
                clientSecret : process.env.GOOGLEAUTH_SECRET ,

        }) ,
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
          })

    ] , 
    
}