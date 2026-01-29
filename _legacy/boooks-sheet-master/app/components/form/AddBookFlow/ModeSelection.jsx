// components/AddBook/ModeSelection.jsx
import { ModeButton } from './ModeButton';
import { CameraIcon, LinkIcon, Form } from 'lucide-react';

export const ModeSelection = ({ onSelect, onCancel }) => (
  <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="grid grid-cols-3 gap-6">
      <ModeButton icon={<Form />} label="Manual" onClick={() => onSelect('manual')} />
      <ModeButton icon={<CameraIcon />} label="Camera" onClick={() => onSelect('camera')} />
      <ModeButton icon={<LinkIcon />} label="Link/File" onClick={() => onSelect('link')} />
    </div>
    <button onClick={onCancel} className="w-full py-2 bg-slate-900 text-white rounded-2xl">Close</button>
  </div>
);