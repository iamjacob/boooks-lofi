import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Mail, 
  Facebook, 
  Instagram,
  AlertTriangle,
  HeartCrack,
  Download,
  Copy,
  Link2,
  MessageSquare,
  Bookmark,
  X
} from 'lucide-react';


const SharePanel = ({ onClose }) => {
  


  const shareOptions = [
    { icon: MessageSquare, label: 'SMS' },
    { icon: MessageCircle, label: 'WhatsApp' },
    // { icon: Send, label: 'Message' },
    { icon: Facebook, label: 'Messenger' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Copy, label: 'Copy link' },
  ];

    const [linkConfig, setLinkConfig] = useState({
      type: 'general',
      cameraPosition: { x: 0, y: 0, z: 5 },
      cameraRotation: { x: 0, y: 0, z: 0 },
      collectionId: '',
      shelfId: '',
      focusTarget: ''
    });

    const getShareLink = () => {
    const baseUrl = 'https://app.example.com/share/';
    const params = new URLSearchParams();
    
    if (linkConfig.type === 'camera') {
      params.append('camera', `${linkConfig.cameraPosition.x},${linkConfig.cameraPosition.y},${linkConfig.cameraPosition.z}`);
      params.append('rotation', `${linkConfig.cameraRotation.x},${linkConfig.cameraRotation.y},${linkConfig.cameraRotation.z}`);
    } else if (linkConfig.type === 'collection' && linkConfig.collectionId) {
      params.append('collection', linkConfig.collectionId);
    } else if (linkConfig.type === 'shelf' && linkConfig.shelfId) {
      params.append('shelf', linkConfig.shelfId);
    }
    
    return baseUrl + (params.toString() ? '?' + params.toString() : '');
  };


  return (
    <div className="text-white">
        {/* Share Options */}
        <div className="p-2">
          <div className="flex justify-around mb-6">
            {shareOptions.map((option, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <button className="w-11 h-11 bg-gray-800 rounded-full backdrop-blur-2xl flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg active:scale-90 transition-transform">
                  <option.icon size={22} className="text-white-700" strokeWidth={1} />
                </button>
                <span className="text-xs text-gray-200 text-center max-w-20">{option.label}</span>
              </div>
            ))}
          </div>

          <div className="flex m-1 items-center gap-2 bg-black/10 backdrop-blur rounded-lg px-3 py-2.5">
                      <Link2 size={16} className="text-slate-400" />
                      <input
                        type="text"
                        value={getShareLink()}
                        readOnly
                        className="flex-1 bg-transparent text-xs outline-none text-slate-300"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(getShareLink())}
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium"
                      >
                        Copy
                      </button>
                    </div>
      {/* 
      <div className="flex gap-2 mt-4">
        {window.location.href}
        <button className="px-3 py-1 border rounded" onClick={() => { navigator.clipboard?.writeText(window.location.href); }}>
          Copy link
        </button>
      </div> 
      */}
    </div>
    </div>
  );
};
export default SharePanel;