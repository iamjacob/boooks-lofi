import React from "react";
import Book from './../../components/Book'

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ScannedView = () => {
  return (
        <div className="absolute bottom-20 left-10 w-25 h-25 bg-white/20 rounded-2xl ">
 
        <Book cover={"./../billeder/000.jpg"}/>
        

        {/* <Book3dOpen /> */}

    <div className="text-white text-sm">Scanned 50%</div>
    </div>
  )
}

export default ScannedView