import InteractiveDiagram from '../../components/topic/InteractiveDiagram';
import TopicProgressTracker from '../../components/topic/TopicProgressTracker';
import VirtualLabShell from '../../components/topic/VirtualLabShell';
import QuizCard from '../../components/topic/QuizCard';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../../components/topic/SectionWrapper';
import InfoCard from '../../components/topic/InfoCard';
import { MathBlock, SymbolTable } from '../../components/topic/MathBlock';
import {
    BookOpen, Calculator, Users, HelpCircle, FlaskConical, Lightbulb,
    Layout, Shield, Search, Zap, Binary, Layers, Eye, ChevronRight,
    Play, RotateCcw, TrendingUp, Brain, Globe, Rocket,
    Activity, Settings, Cpu, HardDrive, Target, Briefcase,
    Stethoscope, Factory, Landmark, Truck, MessageSquare
} from 'lucide-react';

// ─── Interactive Components for Topic 4 ──────────────────────────────────────

/**
 * Impact Map: Industry-specific applications
 */
function ImpactLab() {
    const [selectedSector, setSelectedSector] = useState(0);

    const sectors = [
        { 
            title: 'Healthcare', 
            icon: Stethoscope, 
            app: 'Diagnostic Assistance', 
            benefit: '99% accuracy in tumor detection.',
            math: 'Image Classification (CNNs)',
            desc: 'AI systems analyze MRI and CT scans to spot anomalies that might be invisible to the human eye, providing a vital second opinion for doctors.'
        },
        { 
            title: 'Finance', 
            icon: Landmark, 
            app: 'Fraud Detection', 
            benefit: 'Billions of dollars saved annually.',
            math: 'Anomaly Detection',
            desc: 'Every time you swipe your credit card, an intelligent system analyzes the location, amount, and frequency to ensure it is actually you.'
        },
        { 
            title: 'Logistics', 
            icon: Truck, 
            app: 'Route Optimization', 
            benefit: '15% reduction in carbon footprint.',
            math: 'TSP / Reinforcement Learning',
            desc: 'Delivery giants use RL to optimize thousands of routes in real-time, accounting for traffic, weather, and fuel efficiency.'
        },
        { 
            title: 'Industry 4.0', 
            icon: Factory, 
            app: 'Predictive Maintenance', 
            benefit: 'Zero unplanned downtime.',
            math: 'Time-Series Prediction',
            desc: 'Sensors in factory machines predict when a part is about to fail before it actually does, allowing for proactive repairs.'
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sectors.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <button
                            key={i}
                            onClick={() => setSelectedSector(i)}
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                                selectedSector === i 
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200'
                            }`}
                        >
                            <div className={`p-3 rounded-xl ${selectedSector === i ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                                <Icon size={20} />
                            </div>
                            <span className={`text-[10px] font-black uppercase ${selectedSector === i ? 'text-primary-600' : 'text-slate-500'}`}>{s.title}</span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedSector}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="space-y-2">
                            <h4 className="text-xl font-black text-slate-800 dark:text-white">{sectors[selectedSector].app}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                "{sectors[selectedSector].desc}"
                            </p>
                        </div>
                        <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-[10px] font-black uppercase whitespace-nowrap">
                            Impact: {sectors[selectedSector].benefit}
                        </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Binary size={14} className="text-primary-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase">Underlying Model</span>
                        </div>
                        <code className="text-xs font-mono text-primary-600 font-bold">{sectors[selectedSector].math}</code>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── Main Topic Component ────────────────────────────────────────────────────

export default function Topic4_ISApplications() {
    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
            <TopicProgressTracker topicId="unit4-topic4_isapplications" />
            {/* SECTION 1: STORYTELLING */}
            <SectionWrapper 
                id="story" 
                title="1. The Invisible Force" 
                subtitle="Intelligence in the Background"
                icon={<Globe className="text-blue-600" size={24} />}
                badge="Storytelling"
                badgeColor="bg-blue-100 text-blue-700"
                accentColor="border-blue-500"
            >
                <div className="space-y-6">
                    <div className="mt-2 mb-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm flex items-start gap-4 transform hover:scale-[1.02] transition-transform">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-2xl">
                            🎭
                        </div>
                        <div>
                            <h5 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                                Fun Fact / Comic Relief
                            </h5>
                            <p className="text-indigo-700 dark:text-indigo-300 font-medium italic leading-relaxed">
                                "They are in your phone, your car, and your fridge. Yes, your smart fridge is definitely judging your midnight snacking."
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Search size={120} />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                            🌐 A Day in the Life of AI
                        </h4>
                        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            <p>
                                You woke up this morning because your phone's **Intelligent Alarm** tracked your sleep cycle. You checked the weather, which was predicted by a **Deep Learning Model**. You drove to work using a route optimized by **Reinforcement Learning**.
                            </p>
                            <p>
                                Intelligent Systems are no longer futuristic concepts; they are the "invisible force" that keeps modern civilization running efficiently. They are solving problems that are too big for humans to track and too complex for simple code to solve.
                            </p>
                            <p>
                                From saving lives in hospitals to saving energy in power grids, these systems are taking the mathematical principles we've learned and applying them at a global scale.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoCard type="insight" title="The Automation Paradox">
                            As systems become more intelligent, they don't just replace humans; they amplify human capability, allowing doctors to be more accurate and engineers to be more creative.
                        </InfoCard>
                        <InfoCard type="tip" title="Data is the Fuel">
                            Every application you see relies on a massive influx of data to train its "Intelligence."
                        </InfoCard>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 2: MATHEMATICAL MODELLING */}
            <SectionWrapper 
                id="math" 
                title="2. The Cross-Domain Formula" 
                subtitle="Generalizing the Solution"
                icon={<Calculator className="text-primary-600" size={24} />}
                badge="Math Modelling"
                badgeColor="bg-primary-100 text-primary-700"
                accentColor="border-primary-500"
            >
                <div className="space-y-8">
                    <MathBlock 
                        formula="y = \arg\max_{a} Q(s, a; \theta)"
                        label="The Universal Decision Function"
                        explanation="How an agent chooses its next application-specific action."
                        interpretation="In Healthcare, 'a' might be a diagnosis. In Finance, 'a' might be 'Block Transaction'. In Robotics, 'a' might be 'Turn Left'. The math remains the same: pick the action that maximizes the learned value Q."
                        motivation="This unity of mathematics is why one algorithm can be applied across dozens of different industries."
                        terms={[
                            { term: '\theta', name: 'Domain Knowledge', meaning: 'The parameters learned from industry-specific data.', range: '\mathbb{R}^n', example: 'Weights trained on cancer biopsies.' }
                        ]}
                    />

                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <h5 className="font-bold text-primary-400 mb-2 flex items-center gap-2"><Binary size={16} /> Convergence of Domains</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            We are moving toward **Foundation Models**—single intelligent systems that can perform tasks in many different domains simultaneously.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="I S Applications Architecture"
                description="Modern deployments of Intelligent Systems."
                chart={`graph TD
    IS[Intelligent Systems] --> NLP[Conversational Agents]
    IS --> CV[Computer Vision Systems]
    IS --> RecSys[Recommender Systems]
    IS --> Control[Autonomous Control]`}
            />


            {/* SECTION 3: ACTIVITY BASED LEARNING */}
            <SectionWrapper 
                id="activity" 
                title="3. Activity: Domain Mapping" 
                subtitle="Solving Industry Problems"
                icon={<Users className="text-emerald-600" size={24} />}
                badge="Activity"
                badgeColor="bg-emerald-100 text-emerald-700"
                accentColor="border-emerald-500"
            >
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">L1</div>
                            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Match the Tech to the Task</h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                            Connect these tasks to their primary Intelligent System application:
                        </p>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                                <MessageSquare size={20} className="mx-auto mb-2 text-primary-500" />
                                <div className="text-[10px] font-bold">Customer Support</div>
                                <p className="text-[8px] text-slate-400 mt-1">NLP Chatbots</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                                <Shield size={20} className="mx-auto mb-2 text-indigo-500" />
                                <div className="text-[10px] font-bold">Bank Security</div>
                                <p className="text-[8px] text-slate-400 mt-1">Anomaly Detection</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                                <Target size={20} className="mx-auto mb-2 text-emerald-500" />
                                <div className="text-[10px] font-bold">Ad Targeting</div>
                                <p className="text-[8px] text-slate-400 mt-1">Recommendation Engines</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 4: PROJECT BASED LEARNING */}
            <SectionWrapper 
                id="project" 
                title="4. Project: The Smart Grid" 
                subtitle="Engineering Sustainability"
                icon={<Briefcase className="text-indigo-600" size={24} />}
                badge="PBL"
                badgeColor="bg-indigo-100 text-indigo-700"
                accentColor="border-indigo-500"
            >
                <div className="space-y-6">
                    <div className="card p-6 border-l-4 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10">
                        <h5 className="font-bold mb-2 flex items-center gap-2"><Target size={18} /> Zero-Waste Power</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Wind and Solar energy are unpredictable. Your project is to design an **Intelligent Dispatcher** that learns when to store energy in batteries and when to release it to the city grid. The goal is to minimize coal usage (Penalty) while ensuring no blackouts (Constraint).
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center">
                            <Binary size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className="text-[10px] font-black uppercase tracking-widest">Input</div>
                            <p className="text-[8px] mt-1">Weather Forecasts</p>
                        </div>
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center text-primary-500">
                            <Activity size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase tracking-widest">Action</div>
                            <p className="text-[8px] mt-1">Grid Switching</p>
                        </div>
                        <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 text-center text-emerald-600">
                            <TrendingUp size={24} className="mx-auto mb-2" />
                            <div className="text-[10px] font-black uppercase tracking-widest">Reward</div>
                            <p className="text-[8px] mt-1">Carbon Reduction</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* SECTION 5: MODEL 2 MARK QUESTIONS */}
            <SectionWrapper 
                id="questions" 
                title="5. Quick Check" 
                subtitle="Applied Knowledge"
                icon={<HelpCircle className="text-purple-600" size={24} />}
                badge="Questions"
                badgeColor="bg-purple-100 text-purple-700"
                accentColor="border-purple-500"
            >
                <div className="grid gap-4">
                    {[
                        { q: 'How is an Intelligent System used in modern healthcare?', a: 'They are primarily used in medical imaging (diagnosing diseases from scans), personalized medicine (tailoring drug dosages), and robot-assisted surgery.' },
                        { q: 'Why is "Predictive Maintenance" important for Industry 4.0?', a: 'It allows factories to fix machines before they break, preventing expensive production halts and extending the lifespan of industrial equipment.' },
                        { q: 'Give an example of an Intelligent System in cybersecurity.', a: 'An Intrusion Detection System (IDS) that uses anomaly detection to spot unusual patterns of network traffic that might indicate a hack or a virus.' }
                    ].map((item, i) => (
                        <QuizCard key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </SectionWrapper>

            {/* SECTION 6: LEARN BY DOING (VIRTUAL LAB) */}
            <SectionWrapper 
                id="lab" 
                title="6. Virtual Lab: Impact Map" 
                subtitle="Explore Industrial Intelligence"
                icon={<FlaskConical className="text-cyan-600" size={24} />}
                badge="Virtual Lab"
                badgeColor="bg-cyan-100 text-cyan-700"
                accentColor="border-cyan-500"
            >
                <div className="space-y-6">
                <VirtualLabShell
                    title="Smart System Showcase"
                    description="Interactive demos of IS applications"
                    objective="Interact with mini-demos of NLP, Computer Vision, and Recommender systems. Observe how each uses intelligent behaviour."
                    badge="Interactive Lab"
                    tips={['Each system uses a different form of learning',
                'Recommender systems are closest to RL — they optimize for user engagement']}
                >
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Select a sector to see the real-world impact of Intelligent Systems. Notice how different industries use the same mathematical models to solve completely different problems.
                    </p>
                    <ImpactLab />
                </VirtualLabShell>
            
                </div>
            </SectionWrapper>

            {/* FEEDBACK SECTION */}
            <div className="bg-primary-600 rounded-[2.5rem] p-10 text-center text-white space-y-6 shadow-2xl shadow-primary-500/20">
                <div className="max-w-xl mx-auto space-y-2">
                    <h3 className="text-3xl font-black italic">Applications: Mastered!</h3>
                    <p className="text-primary-100">
                        You've seen what IS can do. Now, let's look at the formal framework we use to design them: PEAS.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="px-10 py-4 bg-white text-primary-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        NEXT: PEAS FRAMEWORK
                    </button>
                </div>
            </div>
        </div>
    );
}
