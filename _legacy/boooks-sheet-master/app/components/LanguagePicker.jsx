import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const LanguagePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(['da', 'en', 'no']);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'da', name: 'Dansk', flag: 'dk' },
    { code: 'de', name: 'Deutsch', flag: 'de' },
    { code: 'es', name: 'Español', flag: 'es' },
    { code: 'fr', name: 'Français', flag: 'fr' },
    { code: 'it', name: 'Italiano', flag: 'it' },
    { code: 'nl', name: 'Nederlands', flag: 'nl' },
    { code: 'pt', name: 'Português', flag: 'pt' },
    { code: 'sv', name: 'Svenska', flag: 'se' },
    { code: 'no', name: 'Norsk', flag: 'no' },
    { code: 'fi', name: 'Suomi', flag: 'fi' },
    { code: 'pl', name: 'Polski', flag: 'pl' },
    { code: 'ru', name: 'Русский', flag: 'ru' },
    { code: 'ja', name: '日本語', flag: 'jp' },
    { code: 'zh', name: '中文', flag: 'cn' },
    { code: 'ko', name: '한국어', flag: 'kr' },
    { code: 'ar', name: 'العربية', flag: 'sa' },
    { code: 'hi', name: 'हिन्दी', flag: 'in' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguage = (code) => {
    setSelectedLanguages(prev => {
      if (prev.includes(code)) {
        return prev.length > 1 ? prev.filter(c => c !== code) : prev;
      }
      return [...prev, code];
    });
  };

  const getDisplayText = () => {
    if (selectedLanguages.length === 1) {
      return languages.find(l => l.code === selectedLanguages[0])?.name || 'Select';
    }
    return selectedLanguages.length.toString();
  };

  const getSelectedFlags = () => {
    return selectedLanguages.slice(0, 3).map(code => 
      languages.find(l => l.code === code)
    );
  };

  useEffect(() => {
    console.log('Selected languages:', selectedLanguages);
  }, [selectedLanguages]);

  return (
    <div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center -space-x-2">
            {getSelectedFlags().map((lang, idx) => (
              <img
                key={lang.code}
                src={`/flags/${lang.flag}.svg`}
                alt={lang.name}
                className="w-6 h-4 object-cover rounded border-2 border-white"
                style={{ zIndex: getSelectedFlags().length - idx }}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {getDisplayText()}
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 -ml-25 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="py-1">
              {languages.map((lang) => {
                const isSelected = selectedLanguages.includes(lang.code);
                return (
                  <button
                    key={lang.code}
                    onClick={() => toggleLanguage(lang.code)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={`/flags/${lang.flag}.svg`}
                      alt={lang.name}
                      className="w-6 h-4 object-cover rounded"
                    />
                    <span className="flex-1 text-left text-sm text-gray-700">
                      {lang.name}
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Demo info */}
      {/* <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className="inline-block bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">
            Selected: <span className="font-medium text-gray-900">
              {selectedLanguages.map(code => 
                languages.find(l => l.code === code)?.name
              ).join(', ')}
            </span>
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default LanguagePicker;