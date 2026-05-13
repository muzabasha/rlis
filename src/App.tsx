import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DependencyGraphPage from './pages/DependencyGraphPage';
import SearchPage from './pages/SearchPage';

function PageLoader() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                <p className="text-slate-500 dark:text-slate-400 font-medium">Loading...</p>
            </div>
        </div>
    );
}

function NotFoundPage() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <div className="text-8xl mb-4">🤖</div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">404 — Page Not Found</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">The agent couldn't find this state in its Q-table.</p>
                <a href="/" className="btn-primary inline-flex">Go Home</a>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <AppProvider>
            <Layout>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/topic/:topicId" element={<TopicPage />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/dependency-graph" element={<DependencyGraphPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </Layout>
        </AppProvider>
    );
}
