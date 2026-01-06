import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/ui/LoginButton";
import LogoutButton from "@/components/ui/LogoutButton";
import Profile from "@/components/ui/Profile";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-4xl font-bold text-white">Next.js + Auth0</h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-6">
          {user ? (
            <div className="space-y-4">
              <p className="text-green-400 text-xl">✅ Successfully logged in!</p>
              <Profile />
              <LogoutButton />
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-white/80 text-lg">
                Welcome! Please log in to access your protected content.
              </p>
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}