import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { LanguageNav } from './components/LanguageNav';
import { PodcastCard } from './components/PodcastCard';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { WelcomeModal } from './components/WelcomeModal';
import { fetchPodcastsByLanguage } from './services/geminiService';
import { LANGUAGES } from './constants';
import type { Podcast } from './types';

const App: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>(LANGUAGES[0]);
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisitedGlobalPodcastHub');
        if (!hasVisited) {
            setIsModalOpen(true);
        }
    }, []);
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        localStorage.setItem('hasVisitedGlobalPodcastHub', 'true');
    };

    const loadPodcasts = useCallback(async (language: string) => {
        setIsLoading(true);
        setError(null);
        setPodcasts([]);
        try {
            const fetchedPodcasts = await fetchPodcastsByLanguage(language);
            // Add a unique image URL to each podcast
            const podcastsWithImages = fetchedPodcasts.map(p => ({
                ...p,
                imageUrl: `https://picsum.photos/seed/${p.name.replace(/\s/g, '-')}/400/400`
            }));
            setPodcasts(podcastsWithImages);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch podcasts. The model may be busy. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPodcasts(selectedLanguage);
    }, [selectedLanguage, loadPodcasts]);

    const filteredPodcasts = useMemo(() => {
        return podcasts.filter(podcast =>
            podcast.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [podcasts, searchTerm]);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
            <WelcomeModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md py-4 mb-8">
                    <LanguageNav 
                        languages={LANGUAGES}
                        selectedLanguage={selectedLanguage}
                        onSelect={setSelectedLanguage}
                    />
                    <div className="mt-6 max-w-lg mx-auto">
                        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6 px-1">
                    <h2 className="text-2xl font-bold text-slate-100">
                        {isLoading ? `Discovering ${selectedLanguage} podcasts...` : `Popular in ${selectedLanguage}`}
                    </h2>
                    <button
                        onClick={() => loadPodcasts(selectedLanguage)}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-400 bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Get new podcast suggestions"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0 8.25 8.25 0 000-11.667l-3.182-3.182m0 0v-4.992"
                            />
                        </svg>
                        <span>New Suggestions</span>
                    </button>
                </div>

                {isLoading && <LoadingSpinner />}
                {error && <p className="text-center text-red-400 text-lg">{error}</p>}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredPodcasts.length > 0 ? (
                            filteredPodcasts.map((podcast, index) => (
                                <PodcastCard key={`${podcast.name}-${index}`} podcast={podcast} />
                            ))
                        ) : (
                            <p className="text-center text-slate-400 col-span-full">{
                                searchTerm 
                                ? `No podcasts found for "${searchTerm}".`
                                : 'No podcasts found. Try getting new suggestions.'
                            }</p>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;