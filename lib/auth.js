import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: false },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET },
  },
  plugins: [jwt(), nextCookies()],
});
