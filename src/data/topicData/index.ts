import { unit1TopicData } from './unit1';
import { unit2TopicData } from './unit2';
import { unit3TopicData } from './unit3';
import { unit4TopicData } from './unit4';

export { unit1TopicData, unit2TopicData, unit3TopicData, unit4TopicData };

export interface TopicData {
    prerequisites: string[];
    mcqs: {
        id: string;
        question: string;
        options: { id: string; text: string; }[];
        correctAnswer: string;
        justification: string;
        wrongJustifications: { [optionId: string]: string; };
    }[];
    recap: string[];
    skillMapping: { skill: string; level: string }[];
}

export function getTopicData(unitId: string, topicFileName: string): TopicData | undefined {
    const map: Record<string, Record<string, TopicData>> = {
        unit1: unit1TopicData,
        unit2: unit2TopicData,
        unit3: unit3TopicData,
        unit4: unit4TopicData,
    };
    return map[unitId]?.[topicFileName];
}
