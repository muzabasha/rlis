import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, ProgressData } from '../types';
import { allTopics } from '../data/courseData';

interface AppContextType extends AppState {
    toggleDarkMode: () => void;
    toggleProjectorMode: () => void;
    toggleSidebar: () => void;
    setCurrentUnit: (id: string) => void;
    setCurrentTopic: (id: string) => void;
    markTopicComplete: (topicId: string) => void;
    setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
    getProgress: (topicId: string) => ProgressData | undefined;
    setProjectorScale: (scale: 'normal' | 'large' | 'huge') => void;
    toggleLaserPointer: () => void;
    toggleWashoutProtection: () => void;
    totalProgress: number;
}

const defaultState: AppState = {
    darkMode: false,
    projectorMode: false,
    sidebarOpen: true,
    currentUnit: 'unit1',
    currentTopic: 'u1t1',
    progress: {},
    fontSize: 'normal',
    projectorScale: 'large',
    laserPointerEnabled: false,
    washoutProtection: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppState>(() => {
        try {
            const saved = localStorage.getItem('rl-app-state');
            if (saved) {
                return { ...defaultState, ...JSON.parse(saved) };
            }
        } catch {
            // Ignore malformed local state and fall back to defaults.
        }
        return defaultState;
    });

    useEffect(() => {
        localStorage.setItem('rl-app-state', JSON.stringify(state));
        if (state.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Projector Mode Classes Sync
        document.body.classList.remove('projector-scale-normal', 'projector-scale-large', 'projector-scale-huge');
        if (state.projectorMode) {
            document.body.classList.add('projector-mode');
            document.body.classList.add(`projector-scale-${state.projectorScale ?? 'large'}`);
            
            if (state.washoutProtection) {
                document.body.classList.add('projector-washout-on');
            } else {
                document.body.classList.remove('projector-washout-on');
            }

            if (state.laserPointerEnabled) {
                document.body.classList.add('projector-laser-on');
            } else {
                document.body.classList.remove('projector-laser-on');
            }
        } else {
            document.body.classList.remove('projector-mode', 'projector-washout-on', 'projector-laser-on');
        }
    }, [state]);

    const toggleDarkMode = () => setState(s => ({ ...s, darkMode: !s.darkMode }));
    const toggleProjectorMode = () => setState(s => ({ ...s, projectorMode: !s.projectorMode }));
    const toggleSidebar = () => setState(s => ({ ...s, sidebarOpen: !s.sidebarOpen }));
    const setCurrentUnit = (id: string) => setState(s => ({ ...s, currentUnit: id }));
    const setCurrentTopic = (id: string) => setState(s => ({ ...s, currentTopic: id }));
    const setFontSize = (size: 'normal' | 'large' | 'xlarge') => setState(s => ({ ...s, fontSize: size }));
    const setProjectorScale = (scale: 'normal' | 'large' | 'huge') => setState(s => ({ ...s, projectorScale: scale }));
    const toggleLaserPointer = () => setState(s => ({ ...s, laserPointerEnabled: !s.laserPointerEnabled }));
    const toggleWashoutProtection = () => setState(s => ({ ...s, washoutProtection: !s.washoutProtection }));

    const markTopicComplete = (topicId: string) => {
        setState(s => ({
            ...s,
            progress: {
                ...s.progress,
                [topicId]: {
                    topicId,
                    completed: true,
                    lastVisited: new Date(),
                    timeSpent: (s.progress[topicId]?.timeSpent ?? 0) + 1,
                },
            },
        }));
    };

    const getProgress = (topicId: string) => state.progress[topicId];

    const totalTopics = allTopics.length;
    const completedCount = Object.values(state.progress).filter(p => p.completed).length;
    const totalProgress = Math.round((completedCount / totalTopics) * 100);

    return (
        <AppContext.Provider value={{
            ...state,
            toggleDarkMode,
            toggleProjectorMode,
            toggleSidebar,
            setCurrentUnit,
            setCurrentTopic,
            markTopicComplete,
            setFontSize,
            getProgress,
            setProjectorScale,
            toggleLaserPointer,
            toggleWashoutProtection,
            totalProgress,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}
