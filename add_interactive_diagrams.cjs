const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src', 'modules');
const units = ['unit1', 'unit2', 'unit3', 'unit4'];

const diagrams = {
    unit1: `
graph LR
    E[Environment] -->|State S_t, Reward R_t| A(Agent)
    A -->|Action A_t| E
    classDef env fill:#e2e8f0,stroke:#64748b,stroke-width:2px;
    classDef agent fill:#c7d2fe,stroke:#4f46e5,stroke-width:2px;
    class E env;
    class A agent;
`,
    unit2: `
stateDiagram-v2
    direction LR
    State1 --> State2 : Action A (Prob P1)
    State1 --> State3 : Action A (Prob P2)
    State2 --> [*] : Terminal (Reward R)
`,
    unit3: `
graph TD
    S[State S] --> |Policy| A[Action A]
    A --> |Execute| E[Environment]
    E --> |Next State S'| S_prime[State S']
    E --> |Reward R| R[Reward R]
    S_prime --> TD[TD Target = R + gamma * max Q]
    R --> TD
    TD --> U[Update Q-value: Q = Q + alpha * Error]
`,
    unit4: `
graph TD
    Sen[Sensors] --> P[Percepts]
    P --> AF{Agent Program}
    AF --> Ac[Actions]
    Ac --> Act[Actuators]
    Act --> Env((Environment))
    Env --> Sen
`
};

units.forEach(unit => {
    const unitDir = path.join(modulesDir, unit);
    if (!fs.existsSync(unitDir)) return;
    const files = fs.readdirSync(unitDir).filter(f => f.endsWith('.tsx'));
    
    files.forEach(file => {
        const filePath = path.join(unitDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Check if InteractiveDiagram is already imported
        if (!content.includes('InteractiveDiagram')) {
            // Find the last import and add it after
            content = content.replace(/(import .* from '.*';\n)(?!import)/, `$1import InteractiveDiagram from '../../components/topic/InteractiveDiagram';\n`);
        }
        
        // 2. Identify the unit and grab the diagram
        let chart = diagrams[unit] || diagrams.unit1;
        // make it slightly unique by injecting topic name if possible
        const topicName = file.replace('.tsx', '').replace(/Topic\d+_/, '');
        
        // For unit 2, let's customize state diagram
        if (unit === 'unit2') {
            chart = `
stateDiagram-v2
    direction LR
    ${topicName}_Start --> State2 : Transition
    State2 --> Terminal : Reward
`;
        }

        const diagramBlock = `
            {/* INTERACTIVE DIAGRAM */}
            <InteractiveDiagram 
                title="${topicName} Architecture"
                description="Technical flow diagram illustrating the core mechanisms of ${topicName}."
                chart={\`${chart}\`}
            />
`;
        
        // 3. Inject after the mathematical modelling section
        // We look for:
        //             </SectionWrapper>
        //
        //             {/* SECTION 3: ACTIVITY BASED LEARNING */}
        // OR something similar that indicates end of Math section.
        // Let's use a regex that finds the end of the math section.
        const mathEndRegex = /(id="math"[\s\S]*?<\/SectionWrapper>)/;
        
        if (mathEndRegex.test(content)) {
            if (!content.includes('INTERACTIVE DIAGRAM')) {
                content = content.replace(mathEndRegex, (match) => {
                    return match + '\n' + diagramBlock;
                });
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Injected diagram into ${file}`);
            } else {
                console.log(`Skipped ${file} (already has diagram)`);
            }
        } else {
            console.log(`Could not find math section in ${file}`);
        }
    });
});

console.log("Done adding interactive diagrams!");
