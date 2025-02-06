import { FC } from "react";
import { useMsal } from "@azure/msal-react";

const Signin: FC = () => {
  const { instance } = useMsal();
  const handleSignin = () => {
    instance.loginPopup();
  };

  return (
    <div>
      <h1>Signin Page</h1>
      <button onClick={handleSignin}>Login with Microsoft</button>
    </div>
  );
};

export default Signin;

// import NextAuth from "next-auth";
// import AzureADProvider from "next-auth/providers/azure-ad";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID!,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//       tenantId: process.env.AZURE_AD_TENANT_ID!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET!,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
