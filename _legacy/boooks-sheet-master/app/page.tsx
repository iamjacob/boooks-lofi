"use client";
import Link from "next/link";

import { useState, useEffect, useCallback } from "react";
// import { useDrawer } from "./hooks/useDrawer";
import Drawer from "./components/ui/Drawer";
import BottomNav from "./components/nav/menu/BottomNav";
import Header from "./components/nav/Header";
import Reading from "./components/nav/Reading";
import RightMenu from "./components/nav/menu/rightnav/RightMenu";
// import Apps from "./components/Apps";


import Camera from "./Scanner/camera/Camera";
// import AddBookFlow from "./components/form/AddBookFlow/AddBookFlow";
// import LoginDialog from "./components/auth/LoginDialog";
import CommentsPanel from "./components/nav/panels/CommentsPanel";
import SharePanel from "./components/nav/panels/SharePanel";
import ProfilePanel from "./components/nav/panels/ProfilePanel";
import Search from "./components/nav/Search";
import WishList from "./components/nav/WishList";
import DonationPanel from "./components/nav/panels/DonationPanel";
import Menu from "./components/nav/menu/Menu";
import AuthDialog from "./components/auth/AuthDialog";
import HeartIcon from "./components/nav/menu/HeartIcon"

import FallingLetters from "./components/landingpage/FallingLetters";

const QUOTES = [
  "Læsning gør os blide over for verden|og skarpe over for uretfærdighed.| — Ukendt",
  "Bøger er de eneste ting,|der kan være både tunge og give os vinger.| — Ukendt",
  "At læse er at plante skove i ørkenen.| — Ukendt",
  "En bog er en nøgle til et fængsel,|du ikke vidste, du sad i.| — Ukendt",
  "En bog er en invitation til at træde ud|af sit eget liv for en stund.| — Ukendt",
  "Læsning er sjælens spejlrefleks.| — Ukendt",
  "Bøger er de åndelige vitaminer,|vores moderne verden mangler.| — Ukendt",
  "At læse er at opdage, at man er en del|af en meget større historie.| — Ukendt",
  "En bog er et kompas til det indre landskab.| — Ukendt",
  "Læsning er den bro, |vi bygger over uvidenhedens kløft.| — Ukendt",
  "Bøger er de tætteste venner,|der aldrig dømmer dit mørke.| — Ukendt",
  "At læse er at leve en smule mere,|hver eneste dag.| — Ukendt",
  '"En læser lever tusind liv, før han dør.|Den mand, der aldrig læser, lever kun ét.|— George R.R. Martin"',
  "Læsning er en basal kur mod uvidenhed,|en modgift mod fanatisme og en vej til frihed.|— Malala Yousafzai",
  "Bøger er et unikt, bærbart magi.|— Stephen King",
  "Læsning er for sindet,|hvad motion er for kroppen.|— Joseph Addison",
  "Man læser aldrig en bog én gang.|Hvis en bog er værd at læse, er den værd at genlæse.|— Oscar Wilde",
  "Verden er en bog, og de, der ikke rejser,|læser kun én side.|— Sankt Augustin",
  "Læsning giver os et sted at tage hen,|når vi er nødt til at blive, hvor vi er.|— Mason Cooley",
  "Bøger er spejle:|Du ser kun i dem, hvad du allerede har indeni dig.| — Carlos Ruiz Zafón",
  "Vi læser for at vide, at vi ikke er alene.| — C.S. Lewis",
  "En bog er en gave, du kan åbne igen og igen.| — Garrison Keillor",
  "Litteratur er den mest behagelige måde|at ignorere livet på.| — Fernando Pessoa",
  "Når jeg har lidt penge, køber jeg bøger.|Hvis der er noget til overs, køber jeg mad og tøj.| — Erasmus af Rotterdam",
  "En bog skal være øksen til den frosne sø indeni os.| — Franz Kafka",
  "Bøger er de mest loyale venner.|De er de mest tilgængelige og kloge rådgivere.| — Charles W. Eliot",
  "Mange mennesker, inklusive mig selv, føler sig bedre|bare ved synet af en bog.| — Jane Smiley",
  "Der findes ingen ven så loyal som en bog.| — Ernest Hemingway",
  "Læsning er en samtale.|Alle bøger taler, men en god bog lytter også.| — Mark Haddon",
  "At læse er at låne en andens øjne et øjeblik.| — Ukendt",
  "En bog er en have, man bærer i lommen.| — Kinesisk ordsprog",
  "Bøger gør os til personligheder,|der er større end os selv.| — Harold Bloom",
  "At lære at læse er at tænde en ild;|hver stavelse er en gnist.| — Victor Hugo",
  "Bøger er fly, tog og veje.|De er destinationen og rejsen i ét.| — Anna Quindlen",
  "At læse er at drømme med åbne øjne.| — Ukendt",
  "Intet er så charmerende som en hylde med bøger,|der endnu ikke er læst.| — John Keiths",
  "Bøger er broer mellem mennesker og verdener.| — Ukendt",
  "Hvis du ikke kan lide at læse,|har du bare ikke fundet den rigtige bog endnu.| — J.K. Rowling",
  "Biblioteket er et hospital for sindet.| — Ukendt",
  "Læsning er flugt, men også en vej hjem.| — Ukendt",
  "En god bog er en begivenhed i mit liv.| — Stendhal",
  "Bøger er det eneste, man kan købe,|der gør dig rigere.| — Ukendt",
  "Man finder ikke de rigtige bøger.|De rigtige bøger finder dig.| — Ukendt",
  "Gode bøger hjælper dig med at forstå,|og de hjælper dig med at blive forstået.| — John Green",
  "Bøger er frø, der plantes i sindet|og blomstrer i hjertet.| — Ukendt",
  "Læsning er som at trække vejret for sjælen.| — Ukendt",
  "Hver bog, du læser, efterlader et aftryk,|der ændrer den, du er.| — Ukendt",
  "Bøger er de stille vidner til vores vækst.| — Ukendt",
  "Når du læser en god bog, dør en del af dig aldrig.| — Ukendt",
  "En bog er et hjerte, der kun slår,|når et andet hjerte rører ved det.| — Ukendt",
  "Læsning er den eneste form for telepati,|der findes mellem fortid og fremtid.| — Matt Haig",
  "Bøger er ikke lavet af papir og blæk,|men af kød, blod og sjælefred.| — Ukendt",
  "At læse en god bog er som at finde en ven,|man ikke vidste, man savnede.| — Ukendt",
  "Nogle bøger efterlader os friere,|andre efterlader os klogere, men de bedste gør os hele.| — Ukendt",
  "Ord kan være som bittesmå doser af arsenik:|De sluges ubemærket, men efter tid virker de.| — Victor Klemperer",
  "Bøger er medicin for den trætte sjæl|og kompas for det vildfarsne sind.| — Ukendt",
  "En bog er en dør, der altid står på klem|til et rum, hvor du altid er velkommen.| — Ukendt",
  "Vi mister os selv i bøger,|men det er også der, vi finder os selv igen.| — Ukendt",
  "Læsning er at rejse uden at flytte en fod.| — Jhumpa Lahiri",
  "Bøger er ekkoer af stemmer,|der nægter at forsvinde i glemslen.| — Ukendt",
  "Når du åbner en bog, tænder du et lys|i et mørkt hjørne af din bevidsthed.| — Ukendt",
  "Litteratur er sandheden om mennesket,|fortalt gennem løgne om karakterer.| — Ukendt",
  "En bog er den eneste rejse, hvor man|aldrig behøver at bekymre sig om at vende hjem.| — Ukendt",
  "At læse er at spise ved et bord,|hvor de klogeste i verden serverer. — Ukendt",
  "En bog er en samling af drømme,|der venter på, at nogen vækker dem.| — Ukendt",
  "Læsning er stilhedens smukkeste musik.| — Ukendt",
  "Vi læser ikke for at flygte fra virkeligheden,|men for at forstå den bedre.| — Ukendt",
  "Bøger er ankre i en stormfuld verden|og vinger i en fastlåst hverdag.| — Ukendt",
  "At eje en bog er at eje en hemmelighed,|som kun venter på at blive fortalt.| — Ukendt",
  "En god bog kender dig bedre,|end du kender dig selv.| — Ukendt",
  "Læsning er den ultimative frihed:|Ingen kan diktere, hvad du ser i dit indre.| — Ukendt",
  "Bøger minder os om, at vores følelser|er universelle og aldrig ensomme.| — Ukendt",
  "Hver side er en ny chance|for at se verden med andre øjne.| — Ukendt",
  "Bøger er brosten på vejen|mod den person, du er ved at blive.| — Ukendt",
  "Læsning er hjertets åndedræt.| — Ukendt",
  "En bog er et kort over et terræn,|som forfatteren har udforsket for dig.| — Ukendt",
  "At læse er at modtage gæster i sit sind,|uden at skulle rydde op først.| — Ukendt",
  "Bøger giver os mod til at stille spørgsmål,|vi ikke turde tænke før.| — Ukendt",
  "En læst bog er en del af din sjæl,|der aldrig kan tages fra dig.| — Ukendt",
  "Læsning er at høre med øjnene|og tale med tavsheden.| — Ukendt",
  "Bøger er fyrtårne i et hav af tid. — E.P. Whipple",
  "Hver bog, du elsker, bliver en mur|i det hus, du bygger til din sjæl.| — Ukendt",
  "At læse er at finde guld i andre menneskers tanker.| — Ukendt",
  "En bog er en krystal, der bryder lyset|fra din egen erfaring.| — Ukendt",
  "Læsning er den mest intime form for samtale,|der findes mellem to fremmede.| — Ukendt",
  "Bøger er tidskapsler, der bærer|menneskehedens hjertebanken gennem århundreder.| — Ukendt",
  "Når du læser, bliver dit sind|et galleri for usynlig kunst.| — Ukendt",
  "En bog er en nøgle til et fængsel,|du ikke vidste, du sad i.| — Ukendt",
  "Læsning gør os blide over for verden|og skarpe over for uretfærdighed.| — Ukendt",
  "Bøger er de eneste ting,|der kan være både tunge og give os vinger.| — Ukendt",
  "At læse er at plante skove i ørkenen.| — Ukendt",
  "En bog er en invitation til at træde ud|af sit eget liv for en stund. — Ukendt",
  "Læsning er sjælens spejlrefleks. — Ukendt",
  "Bøger er de åndelige vitaminer,|vores moderne verden mangler. — Ukendt",
  "At læse er at opdage, at man er en del|af en meget større historie. — Ukendt",
  "En bog er et kompas til det indre landskab. — Ukendt",
  "Læsning er den bro, vi bygger over uvidenhedens kløft. — Ukendt",
  "Bøger er de tætteste venner,|der aldrig dømmer dit mørke. — Ukendt",
  "At læse er at leve en smule mere,|hver eneste dag. — Ukendt",
];

const QuotesPage =()=> {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 14000); // hvert 14. sekund

    return () => clearInterval(interval);
  }, []);

  return <FallingLetters key={index} quote={QUOTES[index]} />;

}


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: any) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // const { isOpen, open, close } = useDrawer(() => {
  //   console.log("drawer fired");
  // });

  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  const openAddBook = () => setIsAddBookOpen(true);
  const closeAddBook = () => setIsAddBookOpen(false);

  //Login
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Open function
  const openLogin = () => setIsAuthOpen(true);

  // Close function
  const closeLogin = () => setIsAuthOpen(false);

  // Scanner
  const [adding, setAdding] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);

  // // small perf: useCallback for stable handlers
  // const openLogin = useCallback(() => setLoginOpen(true), []);
  // const closeLogin = useCallback(() => setLoginOpen(false), []);

  // ReadNow
  const [isReadingOpen, setIsReadingOpen] = useState(false);
  const toggleReading = () => setIsReadingOpen((v) => !v);
  const closeReading = () => setIsReadingOpen(false);

  // comments drawer
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const openComments = () => setIsCommentsOpen(true);
  const closeComments = () => setIsCommentsOpen(false);

  // share drawer
  const [isShareOpen, setIsShareOpen] = useState(false);
  const openShare = () => setIsShareOpen(true);
  const closeShare = () => setIsShareOpen(false);

  // profile drawer
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  // search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleSearch = () => setIsSearchOpen((v) => !v);
  const closeSearch = () => setIsSearchOpen(false);

  // wish list
  const [isWishListOpen, setIsWishListOpen] = useState(false);
  const toggleWishList = () => setIsWishListOpen((v) => !v);
  const closeWishList = () => setIsWishListOpen(false);

  //Apps
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const openApps = useCallback(() => setIsAppsOpen(true), []);
  const closeApps = useCallback(() => setIsAppsOpen(false), []);
  const toggleApps = useCallback(() => setIsAppsOpen((v) => !v), []);

  // donation drawer + context
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [donationContext, setDonationContext] = useState<{
    bookId?: string;
    userId?: string;
    type?: "wish" | "person" | "general";
  } | null>(null);

  const openDonation = (ctx?: {
    bookId?: string;
    userId?: string;
    type?: "wish" | "person" | "general";
  }) => {
    setDonationContext(ctx ?? null);
    setIsDonationOpen(true);
  };
  const closeDonation = () => {
    setIsDonationOpen(false);
    setDonationContext(null);
  };

  return (
    <div className="w-screen flex justify-center">
      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenLogin={openLogin}
      />

      {/* backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-[1002]"
          aria-hidden="true"
        />
      )}

      {/* login dialog lifted to page */}
      {/* <LoginDialog isOpen={loginOpen} onClose={closeLogin} /> */}
      {/* <AuthDialog initialView="login" onClose={closeLogin} /> */}
      {isAuthOpen && <AuthDialog initialView="login" onClose={closeLogin} />}

      <Header
        onMenuToggle={() => setMenuOpen((v) => !v)}
        // onAppsToggle={toggleApps}
      />
<HeartIcon/>
      {adding && <Camera onClose={() => setAdding(false)} />}


      {/* Comments */}
      {/* <Drawer isOpen={isCommentsOpen} onRequestClose={closeComments}>
        <CommentsPanel onClose={closeComments} />
      </Drawer> */}

      {/* Share */}
      {/* <Drawer isOpen={isShareOpen} onRequestClose={closeShare}>
        <SharePanel onClose={closeShare} />
      </Drawer> */}

      {/* Profile */}
      {/* <Drawer side={"top"} isOpen={isProfileOpen} onRequestClose={closeProfile}>
        <ProfilePanel closeProfile={closeProfile} />
      </Drawer> */}

      {/* Donation */}
      {/* <Drawer isOpen={isDonationOpen} onRequestClose={closeDonation}>
        <DonationPanel payload={donationContext} onClose={closeDonation} />
      </Drawer> */}



      {/* search */}
       <Search onClose={closeSearch} isOpen={true} openCam={()=>{setAdding(true)}}/>


      <div className="flex flex-col m-2">
<QuotesPage/>
     

        <div className="mt-10 flex gap-8 justify-center">
          <Link href="/author/matt-haig">
            <div className="text-sm text-slate-400 hover:scale-105 transition">
              Author →
            </div>
          </Link>
          <Link href="/book/the-midnight-library" className="group">
            <div className="text-sm text-slate-400 hover:scale-105 transition">
              Book →
            </div>
          </Link>
        </div>
      </div>

      {/* {!isSearchOpen && (
        <BottomNav
          onReadClick={toggleReading}
          onSearchClick={toggleSearch}
          onWishListClick={toggleWishList}
        />
      )} */}
    </div>
  );
}
