import React, { useRef } from "react";

export const CameraStep = ({ formData, setFormData }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload this file or process it with AI/OCR
      console.log("File captured:", file.name);
      
      // Update formData with a preview URL or the file object
      setFormData({ 
        ...formData, 
        coverImage: URL.createObjectURL(file) 
      });
    }
  };

  const triggerCamera = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col gap-6 animate-in zoom-in-95 duration-500 h-[75vh] overflow-y-auto text-white">
      {/* <div className="space-y-2 text-center">
        <h3 className="font-bold text-lg">Scan Cover or ISBN</h3>
        <p className="text-sm text-slate-500">
          Point your camera at the book cover or the barcode on the back.
        </p>
      </div> */}

      {/* Camera Viewfinder / Drop Zone */}
      <div 
        onClick={triggerCamera}
        className="relative w-full aspect-[3/4] bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors group"
      >
        {formData.coverImage ? (
          <img 
            src={formData.coverImage} 
            alt="Preview" 
            className="w-full h-full object-cover rounded-[36px]" 
          />
        ) : (
          <>
            <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
            </div>
            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              Tap to capture
            </span>
          </>
        )}

        {/* Hidden Input: 'capture="environment"' triggers the back camera on mobile */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
        />
      </div>

      {/* <div className="bg-blue-50 p-4 rounded-2xl flex gap-3">
        <div className="text-blue-500">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-xs text-blue-800 leading-relaxed">
          <b>Pro tip:</b> Good lighting helps our AI identify the book title and author automatically.
        </p>
      </div> */}
    </div>
  );
};