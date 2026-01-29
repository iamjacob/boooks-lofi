import { Check } from 'lucide-react';

const StepsBtn = ({ children, variant = 'empty', onClick }) => {
  const variants = {
    chosen: 'bg-white text-black shadow-lg shadow-black/20',
    filled: 'bg-white/10 backdrop-blur text-black',
    empty: 'border border-white/20 text-gray-900 hover:bg-black/5',
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex border text-[10px] border-[rgba(0,0,0,.5)] items-center gap-2 px-1 py-0.5 rounded-full font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${variants[variant]}`}
    >
      {variant === 'chosen' && <Check className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default StepsBtn;
