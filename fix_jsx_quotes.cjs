// Fix wrap_labs.cjs output: the script may have embedded raw double quotes inside JSX string attributes
// This script scans all TSX files and escapes any occurrence of=" ... "text" ... " pattern
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src', 'modules');
const units = ['unit1', 'unit2', 'unit3', 'unit4'];

let fixedCount = 0;

units.forEach(unit => {
    const unitDir = path.join(modulesDir, unit);
    if (!fs.existsSync(unitDir)) return;
    const files = fs.readdirSync(unitDir).filter(f => f.endsWith('.tsx'));

    files.forEach(file => {
        const filePath = path.join(unitDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const original = content;

        // Fix pattern: objective="...(inner double quotes)..."
        // Replace inner double quotes with single quotes in objective/description/title attrs
        content = content.replace(
            /(objective|description|title)="([^"]*)"([^"]*)"([^"]*?)"/g,
            (match, attr, p1, p2, p3) => {
                // Replace all inner double quotes with single quotes
                const fixed = `${attr}="${p1}'${p2}'${p3}"`;
                return fixed;
            }
        );

        // Also fix multiline objective with embedded quotes using a more aggressive approach
        // target: objective="...WORD "quoted" WORD..."
        content = content.replace(
            /objective="([^"]*)"([^"]*)"([^"<>]*?)"/g,
            (match, p1, p2, p3) => `objective="${p1}'${p2}'${p3}"`
        );

        // Fix tips array that was badly indented: ['tip1',\n                'tip2'] -> clean
        content = content.replace(
            /tips=\{\['([^']+)',\s*\n\s*'([^']+)'\]\}/g,
            (match, t1, t2) => `tips={[\n                        '${t1}',\n                        '${t2}'\n                    ]}`
        );

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            fixedCount++;
            console.log(`Fixed ${file}`);
        }
    });
});

console.log(`Fixed ${fixedCount} files.`);
