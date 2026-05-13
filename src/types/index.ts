export interface CourseOutcome {
    id: string;
    code: string;
    description: string;
}

export interface Topic {
    id: string;
    title: string;
    unitId: string;
    order: number;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    prerequisites: string[];
    coMapping: string[];
    completed?: boolean;
}

export interface Unit {
    id: string;
    title: string;
    order: number;
    topics: Topic[];
    color: string;
    icon: string;
}

export interface Section {
    id: string;
    title: string;
    type: 'story' | 'math' | 'activity' | 'project' | 'questions' | 'lab' | 'insights';
    icon: string;
    color: string;
}

export interface ActivityLevel {
    level: 1 | 2 | 3 | 4;
    title: string;
    role: string;
    duration: string;
    objectives: string[];
    instructions: string[];
    materials: string[];
    expectedOutput: string;
    rubric: RubricItem[];
}

export interface RubricItem {
    criterion: string;
    excellent: string;
    good: string;
    needs_improvement: string;
}

export interface ProjectData {
    title: string;
    scope: string;
    objectives: string[];
    methodology: string[];
    timeline: TimelineItem[];
    team: TeamRole[];
    budget: BudgetItem[];
    risks: RiskItem[];
    deliverables: string[];
    trlLevel: number;
}

export interface TimelineItem {
    phase: string;
    start: number;
    duration: number;
    milestone: string;
}

export interface TeamRole {
    role: string;
    responsibilities: string[];
    count: number;
}

export interface BudgetItem {
    category: string;
    amount: number;
    description: string;
}

export interface RiskItem {
    risk: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
}

export interface Question {
    id: string;
    type: 'conceptual' | 'numerical' | 'application' | 'problem-solving';
    question: string;
    answer: string;
    keyPoints: string[];
    commonMistakes: string[];
    tips: string;
    marks: number;
}

export interface SimulationState {
    running: boolean;
    speed: number;
    step: number;
    params: Record<string, number>;
    data: SimulationDataPoint[];
}

export interface SimulationDataPoint {
    step: number;
    reward: number;
    value: number;
    epsilon?: number;
    [key: string]: number | undefined;
}

export interface ProgressData {
    topicId: string;
    completed: boolean;
    score?: number;
    timeSpent?: number;
    lastVisited?: Date;
}

export interface AppState {
    darkMode: boolean;
    projectorMode: boolean;
    sidebarOpen: boolean;
    currentUnit: string;
    currentTopic: string;
    progress: Record<string, ProgressData>;
    fontSize: 'normal' | 'large' | 'xlarge';
}
