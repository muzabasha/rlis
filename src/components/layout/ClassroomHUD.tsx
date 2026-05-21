import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
    Zap, Contrast, X, Sliders, ChevronUp, ChevronDown, Keyboard
} from 'lucide-react';

function Keycap3D({ name, label, isActive }: { name: string; label?: string; isActive: boolean }) {
    return (
        <span 
            className={`keycap-3d text-[10px] sm:text-xs font-black transition-all ${
                isActive ? 'keycap-3d-active' : ''
            }`}
            title={label}
        >
            {name}
        </span>
    );
}

export default function ClassroomHUD() {
    const { 
        projectorMode, 
        projectorScale, 
        laserPointerEnabled, 
        washoutProtection,
        setProjectorScale,
        toggleLaserPointer,
        toggleWashoutProtection,
        toggleProjectorMode
    } = useApp();

    const [isMinimized, setIsMinimized] = useState(false);
    const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});

    // Global Key Listener to Light up 3D keycaps on user keystroke
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Guard: Ignore when typing in textbook inputs/workbook textareas
            const activeEl = document.activeElement;
            const isTyping = activeEl && (
                activeEl.tagName === 'INPUT' || 
                activeEl.tagName === 'TEXTAREA' || 
                activeEl.getAttribute('contenteditable') === 'true'
            );
            if (isTyping) return;

            let keyName = e.key.toUpperCase();
            if (e.key === ' ') keyName = 'SPACE';
            if (e.key === 'Alt') keyName = 'ALT';
            
            // Set Alt modifier separately to ensure Alt combinations register properly
            if (e.altKey) {
                setPressedKeys(prev => ({ ...prev, 'ALT': true }));
            }
            
            setPressedKeys(prev => ({ ...prev, [keyName]: true }));
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            let keyName = e.key.toUpperCase();
            if (e.key === ' ') keyName = 'SPACE';
            if (e.key === 'Alt') {
                keyName = 'ALT';
                setPressedKeys(prev => ({ ...prev, 'ALT': false }));
            }
            if (!e.altKey) {
                setPressedKeys(prev => ({ ...prev, 'ALT': false }));
            }
            setPressedKeys(prev => ({ ...prev, [keyName]: false }));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    if (!projectorMode) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 140 }}
                className="fixed bottom-6 right-6 z-[9990] flex flex-col pointer-events-auto"
            >
                <div className="glass border-2 border-primary-500/30 dark:border-primary-400/35 rounded-2xl shadow-2xl overflow-hidden max-w-sm min-w-[310px]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-700 dark:to-indigo-700 px-4 py-3 flex items-center justify-between text-white select-none">
                        <div className="flex items-center gap-2 font-bold tracking-tight">
                            <Sliders size={16} className="animate-pulse text-amber-300" />
                            <span className="text-xs sm:text-sm">Classroom Presentation HUD</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="p-1 rounded hover:bg-white/20 transition-colors text-white/90"
                                title={isMinimized ? "Expand Controls" : "Minimize Controls"}
                            >
                                {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            <button
                                onClick={toggleProjectorMode}
                                className="p-1 rounded hover:bg-red-500/30 hover:text-red-200 transition-colors text-white/90"
                                title="Exit Projector Mode"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Controls Content */}
                    <motion.div
                        animate={{ height: isMinimized ? 0 : 'auto' }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden bg-white/95 dark:bg-slate-905/95 text-slate-900 dark:text-slate-100"
                    >
                        <div className="p-4 flex flex-col gap-3.5 max-h-[460px] overflow-y-auto scrollbar-thin">
                            {/* Scale Control */}
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                                    Pedagogical Text Scale
                                </label>
                                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                                    {(['normal', 'large', 'huge'] as const).map((scale) => {
                                        const active = projectorScale === scale;
                                        return (
                                            <button
                                                key={scale}
                                                onClick={() => setProjectorScale(scale)}
                                                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                                                    active 
                                                    ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-650' 
                                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                                                }`}
                                            >
                                                {scale === 'normal' ? 'Normal' : scale === 'large' ? 'Large' : 'Huge'}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="flex flex-col gap-2">
                                {/* Laser Pointer Toggle */}
                                <button
                                    onClick={toggleLaserPointer}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border font-bold text-xs transition-all ${
                                        laserPointerEnabled
                                        ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/80 text-rose-700 dark:text-rose-450 shadow-sm'
                                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Zap size={14} className={laserPointerEnabled ? 'animate-bounce text-rose-500' : ''} />
                                        <span>Glow Laser Pointer</span>
                                    </div>
                                    <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-650 dark:text-slate-350">
                                        {laserPointerEnabled ? 'ON' : 'OFF'}
                                    </span>
                                </button>

                                {/* Washout Protection Toggle */}
                                <button
                                    onClick={toggleWashoutProtection}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border font-bold text-xs transition-all ${
                                        washoutProtection
                                        ? 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-300 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-455 shadow-sm'
                                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Contrast size={14} className={washoutProtection ? 'animate-spin text-cyan-500' : ''} style={{ animationDuration: '5s' }} />
                                        <span>Washout Contrast Shield</span>
                                    </div>
                                    <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-650 dark:text-slate-350">
                                        {washoutProtection ? 'ON' : 'OFF'}
                                    </span>
                                </button>
                            </div>

                            {/* 3D Keyboard Remote Guide */}
                            <div className="border-t border-slate-200/60 dark:border-slate-800/80 pt-3">
                                <div className="flex items-center gap-1.5 mb-2 px-1">
                                    <Keyboard size={13} className="text-indigo-500" />
                                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                                        Presenter Keyboard Guide
                                    </label>
                                </div>
                                
                                <div className="flex flex-col gap-2.5 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/30 dark:border-slate-800/35">
                                    {/* Alt + 1-6 keys for section jumps */}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider block">Section Jumps</span>
                                        <div className="flex items-center gap-1 flex-wrap">
                                            <Keycap3D name="ALT" isActive={pressedKeys['ALT']} label="Alt Modifier Key" />
                                            <span className="text-slate-400 text-[10px] font-black">+</span>
                                            {['1', '2', '3', '4', '5', '6'].map(num => (
                                                <Keycap3D key={num} name={num} isActive={pressedKeys[num] && pressedKeys['ALT']} label={`Jump to Section ${num}`} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Simulation controls */}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider block">Simulation Sandbox Controls</span>
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <Keycap3D name="SPACE" isActive={pressedKeys['SPACE']} label="Play / Pause Simulation Run" />
                                            <Keycap3D name="S" isActive={pressedKeys['S']} label="Step Frame" />
                                            <Keycap3D name="R" isActive={pressedKeys['R']} label="Reset Simulation Sandbox" />
                                        </div>
                                    </div>

                                    {/* UI adjustments */}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider block">Pedagogy & Display Aids</span>
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <Keycap3D name="L" isActive={pressedKeys['L']} label="Toggle Glow Laser Pointer" />
                                            <Keycap3D name="W" isActive={pressedKeys['W']} label="Toggle Washout Contrast Shield" />
                                            <Keycap3D name="[" isActive={pressedKeys['[']} label="Scale Down Typography" />
                                            <Keycap3D name="]" isActive={pressedKeys[']']} label="Scale Up Typography" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Tips */}
                            <div className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850">
                                <span className="font-extrabold text-amber-500 dark:text-amber-400">Presenter Feedback:</span> Keys on the virtual guide depress dynamically when physically pressed on your keyboard remote.
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
