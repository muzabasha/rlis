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
        
        // 1. Add Import
        if (!content.includes('import QuizCard')) {
            content = content.replace(/^(import React.*?;\n)/, "$1import QuizCard from '../../components/topic/QuizCard';\n");
            if (!content.includes('import QuizCard')) {
                content = `import QuizCard from '../../components/topic/QuizCard';\n` + content;
            }
        }
        
        // 2. Replace static div block with <QuizCard />
        // We look for the div with key={i} and Q: {item.q} and {item.a}
        // Because formatting might have newlines, we use [\s\S]*?
        const quizRegex = /<div key=\{i\} className="p-4 bg-white[\s\S]*?Q:\s*\{item\.q\}[\s\S]*?\{item\.a\}[\s\S]*?<\/div>\s*<\/div>/g;
        
        if (quizRegex.test(content)) {
            content = content.replace(quizRegex, `<QuizCard key={i} question={item.q} answer={item.a} />`);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Upgraded quiz in ${file}`);
        } else {
            console.log(`No matching quiz block found in ${file}`);
        }
    });
});
console.log("Done upgrading quizzes!");
