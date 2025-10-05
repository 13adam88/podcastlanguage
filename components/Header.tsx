
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center py-10 bg-slate-900 border-b border-slate-700">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                Global Podcast Hub
            </h1>
            <p className="mt-3 text-lg text-slate-400">
                Discover podcasts from around the world in every language.
            </p>
        </header>
    );
};
