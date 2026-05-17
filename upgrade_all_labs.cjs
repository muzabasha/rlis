const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'src', 'modules');
const units = ['unit1', 'unit2', 'unit3', 'unit4'];

// Dynamic pedagogical metadata generator based on concepts
function generatePedagogicalMetadata(filename) {
    const cleanName = filename
        .replace(/^Topic\d+_/, '')
        .replace(/\.tsx$/, '')
        .replace(/([A-Z])/g, ' $1')
        .trim();

    return {
        challenges: [
            { id: "concept_explore", quest: `${cleanName} Discovery`, target: `Interact with the visualizer and observe transition steps`, isCompleted: false },
            { id: "worksheet_complete", quest: `${cleanName} Workbook`, target: `Submit answers to all guided worksheet reflection questions`, isCompleted: false }
        ],
        notebook: [
            {
                task: `Perform 5 separate step cycles on the ${cleanName} simulator.`,
                question: `Based on your experiment, how does this concept influence long-term state-action values under stochastic conditions?`,
                hint: `Consider factors like the discount factor (gamma), immediate rewards, and next-state expectations.`
            },
            {
                task: `Change the parameters to their minimum and maximum settings and compare results.`,
                question: `What primary edge-case did you observe when parameters were set to extreme boundary values?`,
                hint: `For example, consider what happens when exploration is completely shut off, or when rewards are purely negative.`
            }
        ],
        logs: [
            `🤖 [System] Initializing ${cleanName} Experiential Simulator...`,
            `📡 [Telemetry] Connecting data streams... Connected.`,
            `💡 [Pedagogy] Concept: "${cleanName}" model has been loaded and initialized. Ready for student interaction.`
        ]
    };
}

let upgradedCount = 0;

units.forEach(unit => {
    const dirPath = path.join(unitsDir, unit);
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx'));

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        // Check if the file imports VirtualLabShell and isn't already upgraded
        if (content.includes('VirtualLabShell') && !content.includes('challenges={challenges}')) {
            // Check if this is one of our manually upgraded files
            if (file === 'Topic9_ExplorationExploitation.tsx' || file === 'Topic11_GamblerDungeon.tsx') {
                console.log(`Skipping manually upgraded flagship lab: ${file}`);
                return;
            }

            console.log(`Upgrading virtual lab in: ${file}`);

            // Replace standard import with named type exports
            content = content.replace(
                /import\s+VirtualLabShell\s+from\s+['"]\.\.\/\.\.\/components\/topic\/VirtualLabShell['"];/g,
                "import VirtualLabShell, { LabChallenge, NotebookEntry } from '../../components/topic/VirtualLabShell';"
            );

            // Generate metadata
            const meta = generatePedagogicalMetadata(file);

            const challengesStr = JSON.stringify(meta.challenges, null, 4);
            const notebookStr = JSON.stringify(meta.notebook, null, 4);
            const logsStr = JSON.stringify(meta.logs, null, 4);

            const injection = `
// ─── Experiential Learning Pre-seeds for Topic Virtual Lab ──────────────────
const challenges: LabChallenge[] = ${challengesStr};
const notebook: NotebookEntry[] = ${notebookStr};
const logs: string[] = ${logsStr};

`;

            // Locate a safe injection boundary (divider or first code statement)
            let insertIndex = content.indexOf('// ─── Interactive');
            if (insertIndex === -1) {
                insertIndex = content.indexOf('// ─── Main Topic');
            }
            if (insertIndex === -1) {
                insertIndex = content.indexOf('function ');
            }

            if (insertIndex !== -1) {
                content = content.slice(0, insertIndex) + injection + content.slice(insertIndex);
            } else {
                console.warn(`Could not find a code separator in ${file}. Skipping.`);
                return;
            }

            // Update `<VirtualLabShell` instances to bind the props
            content = content.replace(
                /<VirtualLabShell([\s\S]*?)>/,
                (match, p1) => {
                    if (p1.includes('challenges=')) return match;
                    return `<VirtualLabShell${p1} challenges={challenges} notebook={notebook} logs={logs}>`;
                }
            );

            fs.writeFileSync(filePath, content, 'utf-8');
            upgradedCount++;
        }
    });
});

console.log(`\n🎉 Successfully upgraded ${upgradedCount} virtual labs!`);
