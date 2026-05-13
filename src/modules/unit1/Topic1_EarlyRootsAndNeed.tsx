import React from 'react';
import StorySection from './sections/StorySection_T1';
import MathSection from './sections/MathSection_T1';
import ActivitySection from './sections/ActivitySection_T1';
import ProjectSection from './sections/ProjectSection_T1';
import QuestionsSection from './sections/QuestionsSection_T1';
import VirtualLabSection from './sections/VirtualLabSection_T1';
import InsightsSection from './sections/InsightsSection_T1';

export default function Topic1_EarlyRootsAndNeed() {
    return (
        <div className="space-y-6">
            <StorySection />
            <MathSection />
            <ActivitySection />
            <ProjectSection />
            <QuestionsSection />
            <VirtualLabSection />
            <InsightsSection />
        </div>
    );
}
