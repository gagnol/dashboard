
import dbConnect from "@/lib/db-connect";
import User from "@/lib/user-model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials):Promise<any> {
        
        await dbConnect();
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const userFound = await User.findOne({
          email: credentials.email,
        }).select("+password");

        if (!userFound) throw new Error("Invalid credentials");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!passwordMatch) throw new Error("Invalid credentials");

      

        return Promise.resolve(userFound); // Devuelve la promesa
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token._id =user._id,
        token.name = user.name;
        token.image = user.image;
        token.isAdmin=user.isAdmin
      };

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user._id = token._id,
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
      
    },
    
  },
});


export { handler as GET, handler as POST }
