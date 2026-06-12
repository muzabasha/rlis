import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useApp } from '../../context/AppContext';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { sidebarOpen, fontSize, projectorMode, toggleSidebar } = useApp();
    const previousSidebarState = useRef<boolean | null>(null);

    // Auto-sidebar collapse/restore on Projector Mode toggle
    useEffect(() => {
        if (projectorMode) {
            previousSidebarState.current = sidebarOpen;
            if (sidebarOpen) {
                toggleSidebar();
            }
        } else {
            if (previousSidebarState.current === true && !sidebarOpen) {
                toggleSidebar();
            }
            previousSidebarState.current = null;
        }
    }, [projectorMode]);

    const fontSizeClass = {
        normal: '',
        large: 'text-lg',
        xlarge: 'text-xl',
    }[fontSize];

    return (
        <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 ${fontSizeClass}`}>
            <Navbar />
            <AnimatePresence>
                {sidebarOpen && <Sidebar />}
            </AnimatePresence>
            <AnimatePresence>
                {sidebarOpen && (
                    <button
                        type="button"
                        aria-label="Close course navigation"
                        onClick={toggleSidebar}
                        className="fixed inset-0 top-16 z-30 bg-slate-950/40 backdrop-blur-[1px] md:hidden"
                    />
                )}
            </AnimatePresence>
            <main
                className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'ml-0'}`}
            >
                <div className="min-h-[calc(100vh-4rem)]">
                    {children}
                </div>
            </main>
        </div>
    );
}
