import { LoginStatus } from './LoginStatus'
import {PredefinedFilter} from "@/components/PredefinedFilter";

export default function Home() {
  const backgroundStyle = {
    backgroundImage: 'url(/img/background.png), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,5)) ',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    backgroundBlendMode: 'overlay'
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" style={backgroundStyle} >
      <LoginStatus />
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <PredefinedFilter genreId={15} title={"Romance"} description={"Dive into a world of passion and heartfelt emotions with our collection of romance movies"}/>
        <PredefinedFilter genreId={4} title={"Fantasy"} description={"Discover our Fantasy movie collection, filled with magical adventures, mythical creatures, and exciting tales of heroism."}/>
        <PredefinedFilter genreId={5} title={"Comedy"} description={"Laugh out loud with our collection of our critically acclaimed movies"}/>
        <PredefinedFilter genreId={7} title={"Horror"} description={"Explore our horror movie collection, where suspense, eerie atmospheres, and spine-chilling stories await to thrill and unsettle you."}/>
      </div>
    </main>
  )
}
