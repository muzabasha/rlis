import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, ProgressData } from '../types';

interface AppContextType extends AppState {
    toggleDarkMode: () => void;
    toggleProjectorMode: () => void;
    toggleSidebar: () => void;
    setCurrentUnit: (id: string) => void;
    setCurrentTopic: (id: string) => void;
    markTopicComplete: (topicId: string) => void;
    setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
    getProgress: (topicId: string) => ProgressData | undefined;
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
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppState>(() => {
        try {
            const saved = localStorage.getItem('rl-app-state');
            if (saved) {
                return { ...defaultState, ...JSON.parse(saved) };
            }
        } catch { }
        return defaultState;
    });

    useEffect(() => {
        localStorage.setItem('rl-app-state', JSON.stringify(state));
        if (state.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        if (state.projectorMode) {
            document.body.classList.add('projector-mode');
        } else {
            document.body.classList.remove('projector-mode');
        }
    }, [state]);

    const toggleDarkMode = () => setState(s => ({ ...s, darkMode: !s.darkMode }));
    const toggleProjectorMode = () => setState(s => ({ ...s, projectorMode: !s.projectorMode }));
    const toggleSidebar = () => setState(s => ({ ...s, sidebarOpen: !s.sidebarOpen }));
    const setCurrentUnit = (id: string) => setState(s => ({ ...s, currentUnit: id }));
    const setCurrentTopic = (id: string) => setState(s => ({ ...s, currentTopic: id }));
    const setFontSize = (size: 'normal' | 'large' | 'xlarge') => setState(s => ({ ...s, fontSize: size }));

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

    const totalTopics = 24; // total topics across all units
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
