
import type { Metadata, Viewport } from "next";
import '../maps.css'
  

export const metadata: Metadata = {
    title: "Boooks Maps",
    description: "Find enthuiasm live",
  };
  
  export const viewport: Viewport = {
    themeColor: 'black',
  }

export default function MapsLayout({
  children,
}: {
  children: React.ReactNode
}) {
 


  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: '#000',
      }}
    >

      {children}
    </div>
  )
}
