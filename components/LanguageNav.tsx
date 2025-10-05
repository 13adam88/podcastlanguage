
import React from 'react';

interface LanguageNavProps {
    languages: string[];
    selectedLanguage: string;
    onSelect: (language: string) => void;
}

export const LanguageNav: React.FC<LanguageNavProps> = ({ languages, selectedLanguage, onSelect }) => {
    return (
        <nav className="flex justify-center flex-wrap gap-2 sm:gap-4">
            {languages.map(lang => (
                <button
                    key={lang}
                    onClick={() => onSelect(lang)}
                    className={`px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-400
                        ${selectedLanguage === lang 
                            ? 'bg-teal-500 text-white shadow-lg' 
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                >
                    {lang}
                </button>
            ))}
        </nav>
    );
};
