import React, { lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, CheckCircle2, Clock, Target,
    BookOpen, Brain, GitBranch, Zap, Cpu, Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { allTopics, getTopicById, getUnitById } from '../data/courseData';

// Lazy load topic modules
const topicComponents: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
    // Unit 1
    u1t1: lazy(() => import('../modules/unit1/Topic1_EarlyRoots')),
    u1t2: lazy(() => import('../modules/unit1/Topic2_NeedForRL')),
    u1t3: lazy(() => import('../modules/unit1/Topic3_RLvsSLvsUL')),
    u1t4: lazy(() => import('../modules/unit1/Topic4_ElementsOfRL')),
    u1t5: lazy(() => import('../modules/unit1/Topic5_EnvironmentTypes')),
    u1t6: lazy(() => import('../modules/unit1/Topic6_WorkingOfRL')),
    u1t7: lazy(() => import('../modules/unit1/Topic7_ApproachesToRL')),
    u1t8: lazy(() => import('../modules/unit1/Topic8_TypesOfRL')),
    u1t9: lazy(() => import('../modules/unit1/Topic9_ExplorationExploitation')),
    u1t10: lazy(() => import('../modules/unit1/Topic10_AdvantagesOfRL')),
    u1t11: lazy(() => import('../modules/unit1/Topic11_ApplicationsOfRL')),
    u1t12: lazy(() => import('../modules/unit1/Topic12_ChallengesWithRL')),
    u1t13: lazy(() => import('../modules/unit1/Topic13_RLvsDLvsML')),

    // Unit 2
    u2t1: lazy(() => import('../modules/unit2/Topic1_MDPComponents')),
    u2t2: lazy(() => import('../modules/unit2/Topic2_FormalMDPDefinition')),
    u2t3: lazy(() => import('../modules/unit2/Topic3_MarkovPropertyChain')),
    u2t4: lazy(() => import('../modules/unit2/Topic4_MarkovChainAnalysis')),
    u2t5: lazy(() => import('../modules/unit2/Topic5_MarkovModel')),
    u2t6: lazy(() => import('../modules/unit2/Topic6_MarkovMatrix')),
    u2t7: lazy(() => import('../modules/unit2/Topic7_MarkovMatricesInML')),
    u2t8: lazy(() => import('../modules/unit2/Topic8_RewardAndReturns')),
    u2t9: lazy(() => import('../modules/unit2/Topic9_MarkovRewardProcess')),
    u2t10: lazy(() => import('../modules/unit2/Topic10_StateValueFunction')),
    u2t11: lazy(() => import('../modules/unit2/Topic11_ActionValueFunction')),
    u2t12: lazy(() => import('../modules/unit2/Topic12_OptimalPolicy')),
    u2t13: lazy(() => import('../modules/unit2/Topic13_MDPExamples')),

    // Unit 3
    u3t1: lazy(() => import('../modules/unit3/Topic1_PolicyInMDP')),
    u3t2: lazy(() => import('../modules/unit3/Topic2_QLearningIntro')),
    u3t3: lazy(() => import('../modules/unit3/Topic3_DeterministicStochasticPolicy')),
    u3t4: lazy(() => import('../modules/unit3/Topic4_BellmanEquationValue')),
    u3t5: lazy(() => import('../modules/unit3/Topic5_RecyclingRobotCase')),
    u3t6: lazy(() => import('../modules/unit3/Topic6_OptimalPolicyValue')),
    u3t7: lazy(() => import('../modules/unit3/Topic7_BackupDiagram')),
    u3t8: lazy(() => import('../modules/unit3/Topic8_QLearningOverview')),
    u3t9: lazy(() => import('../modules/unit3/Topic9_QLearningTerms')),
    u3t10: lazy(() => import('../modules/unit3/Topic10_WorkingOfQLearning')),
    u3t11: lazy(() => import('../modules/unit3/Topic11_GamblerDungeon')),
    u3t12: lazy(() => import('../modules/unit3/Topic12_QLearningApplications')),
    u3t13: lazy(() => import('../modules/unit3/Topic13_QLearningCaseStudies')),

    // Unit 4
    u4t1: lazy(() => import('../modules/unit4/Topic1_ISEvolution')),
    u4t2: lazy(() => import('../modules/unit4/Topic2_IntelligentBehavior')),
    u4t3: lazy(() => import('../modules/unit4/Topic3_TraditionalVsIS')),
    u4t4: lazy(() => import('../modules/unit4/Topic4_ISApplications')),
    u4t5: lazy(() => import('../modules/unit4/Topic5_PEASFramework')),
    u4t6: lazy(() => import('../modules/unit4/Topic6_AgentTypesReflex')),
    u4t7: lazy(() => import('../modules/unit4/Topic7_EnvironmentTypes')),
    u4t8: lazy(() => import('../modules/unit4/Topic8_AgentTypesDetailed')),
    u4t9: lazy(() => import('../modules/unit4/Topic9_EnvironmentsDetailed')),
    u4t10: lazy(() => import('../modules/unit4/Topic10_MCIntro')),
    u4t11: lazy(() => import('../modules/unit4/Topic11_MCBackupDiagrams')),
    u4t12: lazy(() => import('../modules/unit4/Topic12_MCAlgorithms')),
    u4t13: lazy(() => import('../modules/unit4/Topic13_MCPrediction')),
    u4t14: lazy(() => import('../modules/unit4/Topic14_MCControl')),
    u4t15: lazy(() => import('../modules/unit4/Topic15_EpsilonGreedy')),
};

const difficultyConfig = {
    beginner: { label: 'Beginner', color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
    intermediate: { label: 'Intermediate', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
    advanced: { label: 'Advanced', color: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' },
};

const unitIconMap: Record<string, React.ReactNode> = {
    unit1: <Brain size={16} />,
    unit2: <GitBranch size={16} />,
    unit3: <Zap size={16} />,
    unit4: <Cpu size={16} />,
};

function TopicSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {[1, 2, 3].map(i => (
                <div key={i} className="card p-6">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3 mb-4" />
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function ComingSoon({ topicTitle }: { topicTitle: string }) {
    return (
        <div className="card p-12 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                Content Coming Soon
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                <strong>{topicTitle}</strong> content is being prepared with full storytelling, math modelling,
                activities, projects, virtual lab, and question bank.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-semibold">
                <BookOpen size={14} /> Start with Topic 1 to begin your journey
            </div>
        </div>
    );
}

const unitAmbientColors: Record<string, { orb1: string; orb2: string }> = {
    unit1: { orb1: 'bg-blue-500/20 dark:bg-blue-600/15', orb2: 'bg-indigo-500/20 dark:bg-indigo-600/15' },
    unit2: { orb1: 'bg-violet-500/20 dark:bg-violet-600/15', orb2: 'bg-purple-500/20 dark:bg-purple-600/15' },
    unit3: { orb1: 'bg-emerald-500/20 dark:bg-emerald-600/15', orb2: 'bg-teal-500/20 dark:bg-teal-600/15' },
    unit4: { orb1: 'bg-amber-500/20 dark:bg-amber-600/15', orb2: 'bg-orange-500/20 dark:bg-orange-600/15' },
};

export default function TopicPage() {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const { markTopicComplete, getProgress } = useApp();

    const topic = getTopicById(topicId ?? '');
    const unit = topic ? getUnitById(topic.unitId) : null;
    const progress = topic ? getProgress(topic.id) : undefined;

    const topicIndex = allTopics.findIndex(t => t.id === topicId);
    const prevTopic = topicIndex > 0 ? allTopics[topicIndex - 1] : null;
    const nextTopic = topicIndex < allTopics.length - 1 ? allTopics[topicIndex + 1] : null;

    React.useEffect(() => {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            // Wait slightly for lazy loaded content to mount
            const timer = setTimeout(() => {
                const el = document.getElementById(hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [topicId]);

    if (!topic || !unit) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="card p-12 text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Topic Not Found</h2>
                    <button onClick={() => navigate('/')} className="btn-primary mt-4">Go Home</button>
                </div>
            </div>
        );
    }

    const TopicComponent = topicComponents[topicId ?? ''];
    const diffConfig = difficultyConfig[topic.difficulty];
    const ambientColor = unitAmbientColors[unit.id] || { orb1: 'bg-blue-500/20', orb2: 'bg-indigo-500/20' };

    return (
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-6 min-h-screen overflow-hidden">
            {/* Ambient Breathing Background Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className={`ambient-orb w-[500px] h-[500px] -top-48 -left-48 ${ambientColor.orb1}`} />
                <div className={`ambient-orb w-[450px] h-[450px] top-[35%] -right-48 ${ambientColor.orb2}`} />
                <div className={`ambient-orb w-[400px] h-[400px] -bottom-48 left-[15%] ${ambientColor.orb1}`} />
            </div>

            <div className="relative z-10 space-y-6">
            {/* Topic Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6 mb-6 border-l-4 border-primary-500"
            >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <button onClick={() => navigate('/')} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        Home
                    </button>
                    <ChevronRight size={14} />
                    <span className="flex items-center gap-1">
                        {unitIconMap[unit.id]}
                        Unit {unit.order}
                    </span>
                    <ChevronRight size={14} />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Topic {topic.order}</span>
                </div>

                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Unit {unit.order} · Topic {topic.order}
                            </span>
                            <span className={`section-tag text-xs ${diffConfig.color}`}>
                                {diffConfig.label}
                            </span>
                            {progress?.completed && (
                                <span className="section-tag text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                                    <CheckCircle2 size={12} /> Completed
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                            {topic.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1"><Clock size={14} /> {topic.duration}</span>
                            <span className="flex items-center gap-1"><Target size={14} /> {topic.coMapping.join(', ')}</span>
                        </div>
                    </div>

                    {/* Mark Complete Button */}
                    {!progress?.completed && (
                        <button
                            onClick={() => markTopicComplete(topic.id)}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl transition-all text-sm"
                        >
                            <CheckCircle2 size={16} /> Mark Complete
                        </button>
                    )}
                </div>

                {/* Prerequisites */}
                {topic.prerequisites.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Prerequisites</div>
                        <div className="flex gap-2 flex-wrap">
                            {topic.prerequisites.map(prereqId => {
                                const prereq = getTopicById(prereqId);
                                const prereqDone = getProgress(prereqId)?.completed;
                                return prereq ? (
                                    <button
                                        key={prereqId}
                                        onClick={() => navigate(`/topic/${prereqId}`)}
                                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${prereqDone
                                                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                            }`}
                                    >
                                        {prereqDone ? <CheckCircle2 size={11} /> : <div className="w-2 h-2 rounded-full bg-slate-400" />}
                                        {prereq.title}
                                    </button>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Topic Content */}
            <Suspense fallback={<TopicSkeleton />}>
                {TopicComponent ? (
                    <TopicComponent />
                ) : (
                    <ComingSoon topicTitle={topic.title} />
                )}
            </Suspense>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div>
                    {prevTopic && (
                        <button
                            onClick={() => navigate(`/topic/${prevTopic.id}`)}
                            className="flex items-center gap-2 btn-secondary"
                        >
                            <ChevronLeft size={18} />
                            <div className="text-left">
                                <div className="text-xs text-slate-400">Previous</div>
                                <div className="text-sm font-semibold truncate max-w-[180px]">{prevTopic.title}</div>
                            </div>
                        </button>
                    )}
                </div>

                <div>
                    {nextTopic && (
                        <button
                            onClick={() => navigate(`/topic/${nextTopic.id}`)}
                            className="flex items-center gap-2 btn-primary"
                        >
                            <div className="text-right">
                                <div className="text-xs text-primary-200">Next</div>
                                <div className="text-sm font-semibold truncate max-w-[180px]">{nextTopic.title}</div>
                            </div>
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
}
