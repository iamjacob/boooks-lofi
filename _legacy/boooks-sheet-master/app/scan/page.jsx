import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page

// "use client";

// import Script from 'next/script';
// import { useRef } from 'react';
// import jscanify from 'jscanify';

// export default function Page() {
//   const canvasRef = useRef(null);

//   const processImage = (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !canvasRef.current) return;

//     const img = new Image();
//     img.src = URL.createObjectURL(file);
    
//     img.onload = () => {
//       const scanner = new jscanify();
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
      
//       // 1. Set canvas to image size and draw it
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);

//       // 2. Extract paper and resize canvas to fit the result
//       const resultCanvas = scanner.extractPaper(canvas, img.width, img.height);
//       canvas.width = resultCanvas.width;
//       canvas.height = resultCanvas.height;
//       ctx.drawImage(resultCanvas, 0, 0);
//     };
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Script 
//         src="https://docs.opencv.org/4.7.0/opencv.js" 
//         strategy="beforeInteractive" 
//       />
      
//       <h1>Scanner</h1>
//       <input type="file" accept="image/*" onChange={processImage} />
//       <hr />
//       <canvas ref={canvasRef} style={{ maxWidth: '100%', border: '1px solid black' }} />
//     </div>
//   );
// }