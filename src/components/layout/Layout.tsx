import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LaserPointerTrail from './LaserPointerTrail';
import ClassroomHUD from './ClassroomHUD';
import { useApp } from '../../context/AppContext';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { sidebarOpen, fontSize, projectorMode, toggleSidebar } = useApp();
    const [previousSidebarState, setPreviousSidebarState] = useState<boolean | null>(null);

    // Auto-sidebar collapse/restore on Projector Mode toggle
    useEffect(() => {
        if (projectorMode) {
            setPreviousSidebarState(sidebarOpen);
            if (sidebarOpen) {
                toggleSidebar();
            }
        } else {
            if (previousSidebarState === true && !sidebarOpen) {
                toggleSidebar();
            }
            setPreviousSidebarState(null);
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
            <main
                className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'ml-0'}`}
            >
                <div className="min-h-[calc(100vh-4rem)]">
                    {children}
                </div>
            </main>
            
            {/* Global Classroom Presentation Aids */}
            <LaserPointerTrail />
            <ClassroomHUD />
        </div>
    );
}
