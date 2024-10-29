"use client"
import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

export const client = createThirdwebClient({
    clientId: `${clientId}`
});