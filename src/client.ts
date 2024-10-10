import { createThirdwebClient } from "thirdweb"

const clientId: string | undefined = process.env.CLIENT_ID
const secretKey: string | undefined = process.env.SECRET_KEY

export const client = createThirdwebClient({
    clientId: `${clientId}`,
    secretKey: `${secretKey}`
})