"use client";

import Zoom from "./Zoom";
import North from "./North";
import Toggle3D from "./toggle3d";
import Screenshot from "./Screenshot";
import RealTime from "./RealTime";
import AddLocation from "./AddLocation";
import Home from "./Home";
import Pitch from "./Pitch";
import LatLong from "./LatLong";
import Info from "./Info";
import Filters from "./Filters";
import More from "./More";

import "../../maps.css";
import { useLiveLocation } from "../store/useLiveLocation";

export default function MapUI() {
  const { follow } = useLiveLocation();
  return (
    <div className="absolute pointer-events-auto z-1000">
      <div className="fixed flex flex-col m-3 bottom-20 gap-1 z-1000">
        <div
          className={`${
            follow ? "opacity-40 pointer-events-none" : ""
          } relative bg-white/60 rounded-full  p-1 gap-2 flex flex-col`}
        >
          <North />

          <Toggle3D />
          <Home />
        </div>
        <div className=" bg-white/80 rounded-full  p-1 gap-2 flex flex-col">
          <RealTime />
        </div>
      </div>

      <div className="hidden">
        <Pitch />

        <AddLocation />

        {/*  add this in info box! */}
        {/* <Filters /> */}
        <Screenshot />
      </div>

      <div className="fixed bottom-2 w-fit block-inline">
        <LatLong />
      </div>

      <div className="fixed flex-col flex gap-2 bottom-4 right-2 z-50">
        <More />
        <Info />
      </div>
      <div className="fixed flex gap-2 bottom-40 right-2 z-50">
        <Zoom />
      </div>
    </div>
  );
}
