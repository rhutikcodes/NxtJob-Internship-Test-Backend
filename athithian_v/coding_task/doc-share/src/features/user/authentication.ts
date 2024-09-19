import { createClerkClient } from "@clerk/clerk-sdk-node";

async function authenticate(signInToken:string, secretKey:string){
    try {
        const clerk = createClerkClient({secretKey: secretKey});
        const user = await clerk.clients.verifyClient(signInToken);
        console.log(user);
        
        return user;   
    } catch (error) {
        console.error(error);
    }
}

export default authenticate;