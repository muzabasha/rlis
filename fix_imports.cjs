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
        
        if (content.includes('<InteractiveDiagram') && !content.includes('import InteractiveDiagram from')) {
            // Prepend the import to the 3rd line or so (after react imports)
            // A safer way is to just put it right after the first line (which is usually import React...)
            content = content.replace(/^(import React.*?;\n)/, "$1import InteractiveDiagram from '../../components/topic/InteractiveDiagram';\n");
            
            // If for some reason that didn't work (e.g. no import React), just prepend to file
            if (!content.includes('import InteractiveDiagram from')) {
                content = `import InteractiveDiagram from '../../components/topic/InteractiveDiagram';\n` + content;
            }
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed import in ${file}`);
        }
    });
});
