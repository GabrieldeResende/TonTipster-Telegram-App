import { createThirdwebClient } from "thirdweb";

const clientId = process.env.CLIENT_ID;
const secretKey = process.env.SECRET_KEY;

export const client = createThirdwebClient({
    clientId: `${clientId}`,
    secretKey: `${secretKey}`
});