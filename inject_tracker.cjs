const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src', 'modules');
const units = ['unit1', 'unit2', 'unit3', 'unit4'];

units.forEach(unit => {
    const unitDir = path.join(modulesDir, unit);
    if (!fs.existsSync(unitDir)) return;
    const files = fs.readdirSync(unitDir).filter(f => f.endsWith('.tsx'));

    files.forEach(file => {
        const filePath = path.join(unitDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Skip if already has the tracker
        if (content.includes('TopicProgressTracker')) {
            console.log(`Skipped ${file} (already has tracker)`);
            return;
        }

        // 2. Add import after the first import line
        content = content.replace(
            /^(import React.*?;\n)/,
            `$1import TopicProgressTracker from '../../components/topic/TopicProgressTracker';\n`
        );
        if (!content.includes('TopicProgressTracker')) {
            content = `import TopicProgressTracker from '../../components/topic/TopicProgressTracker';\n` + content;
        }

        // 3. Derive topicId from filename e.g. "unit1-topic1-earlyroots"
        const topicId = `${unit}-${file.replace('.tsx', '').toLowerCase()}`;

        // 4. Inject tracker as first child inside the outermost <div className="max-w-4xl...">
        content = content.replace(
            /(<div className="max-w-4xl[^"]*"[^>]*>)\s*\n/,
            `$1\n            <TopicProgressTracker topicId="${topicId}" />\n`
        );

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Injected tracker into ${file}`);
    });
});

console.log('Done injecting TopicProgressTracker!');
