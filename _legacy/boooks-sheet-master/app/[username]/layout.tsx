"use client";

import Link from "next/link";

import { BootstrapClient } from "@/src/bootstrap/bootstrap.client";

import { useState, useEffect, useCallback } from "react";
import Drawer from "../components/ui/Drawer";
import BottomNav from "../components/nav/menu/BottomNav";
import Header from "../components/nav/Header";
import Reading from "../components/nav/Reading";
import RightMenu from "../components/nav/menu/rightnav/RightMenu";

import Camera from "../Scanner/camera/Camera";
import CommentsPanel from "../components/nav/panels/CommentsPanel";
import SharePanel from "../components/nav/panels/SharePanel";
import ProfilePanel from "../components/nav/panels/ProfilePanel";
import Search from "../components/nav/Search";
import WishList from "../components/nav/WishList";
import DonationPanel from "../components/nav/panels/DonationPanel";
import Menu from "../components/nav/menu/Menu";
import AuthDialog from "../components/auth/AuthDialog";

export default function RootLayout({
  children,
  overlay,
}: Readonly<{
  children: React.ReactNode;
  overlay: React.ReactNode;
}>) {
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
    <html lang="en">
      <body>
<BootstrapClient />


        {children}
        {overlay}
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

        {isAuthOpen && <AuthDialog initialView="login" onClose={closeLogin} />}

        <Header onMenuToggle={() => setMenuOpen((v) => !v)} backBtn />

        {adding && <Camera onClose={() => setAdding(false)} />}

        {/* Comments */}
        <Drawer isOpen={isCommentsOpen} onRequestClose={closeComments}>
          <CommentsPanel onClose={closeComments} />
        </Drawer>

        {/* Share */}
        <Drawer isOpen={isShareOpen} onRequestClose={closeShare}>
          <SharePanel onClose={closeShare} />
        </Drawer>

        {/* Profile */}
        <Drawer
          side={"top"}
          isOpen={isProfileOpen}
          onRequestClose={closeProfile}
        >
          <ProfilePanel closeProfile={closeProfile} storyActive={isProfileOpen}/>
        </Drawer>

        {/* Donation */}
        <Drawer isOpen={isDonationOpen} onRequestClose={closeDonation}>
          <DonationPanel payload={donationContext} onClose={closeDonation} />
        </Drawer>

        {/* Reading */}
        {isReadingOpen && <Reading onClose={closeReading} />}

        {/* search */}
        <Search
          onClose={closeSearch}
          isOpen={isSearchOpen}
          openCam={() => {
            setAdding(true);
          }}
        />

        {isWishListOpen && <WishList onDonateClick={openDonation} />}

        {!isSearchOpen && !isReadingOpen && (
          <RightMenu
            onAddClick={openAddBook}
            onCommentsClick={openComments}
            onShareClick={openShare}
            onProfileClick={openProfile}
            setAdding={()=>{setAdding(true)}}
          />
        )}

        {/* <div className="fixed top-40 z-100">

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
</div> */}

        {!isSearchOpen && !isReadingOpen && (
          <BottomNav
            onAddClick={()=>{setAdding(true)}}
            onReadClick={toggleReading}
            onSearchClick={toggleSearch}
            onWishListClick={toggleWishList}
          />
        )}
      </body>
    </html>
  );
}
