
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="text-center py-6 border-t border-slate-700 bg-slate-900 mt-12">
            <p className="text-slate-500">
                &copy; {new Date().getFullYear()} Global Podcast Hub. All rights reserved.
            </p>
        </footer>
    );
};
