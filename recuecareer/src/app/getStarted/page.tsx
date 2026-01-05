import { auth0 } from "@/lib/auth0"

export default async function Home() {
  const session = await auth0.getSession()
  

  if (!session) {
    return (
    <header className="fixed top-30 items-center justify-center text-Secondary">

        <div className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-inter font-semibold p-10">
            ReCueCareer
        </div>

        <p className="italic text-lg md:text-xl leading-relaxed tracking-tight text-white max-w-2xl text-center">
            Today you will make a decision that will change the trajectory of your career. Make it count...
        </p>

        <div className="flex flex-row font-semibold items-center justify-center gap-5 m-7">
            <a className="bg-BackgroundNavyBlue z-50 py-5 px-8 text-LightCutsieGrayMiau custom-blur-border text-4xl hover:bg-Primary rounded-3xl transition-color duration-300" href="/auth/login?screen_hint=signup">
                Sign up   
            </a>
            <a className="bg-BackgroundNavyBlue z-50 py-5 px-8 text-LightCutsieGrayMiau custom-blur-border text-4xl hover:bg-Primary rounded-3xl transition-color duration-300" href="/auth/login">
                Sign in
            </a>
        </div> 

    </header>
    );
  }

  return (
    <h1>
        <div className="flex flex-row font-semibold items-center justify-center gap-5 m-7">
            <a className="bg-BackgroundNavyBlue z-50 py-5 px-8 text-LightCutsieGrayMiau custom-blur-border text-4xl hover:bg-Primary rounded-3xl transition-color duration-300" href="/auth/logout">
                Log Out  
            </a>
        </div>
    </h1>
  )
}