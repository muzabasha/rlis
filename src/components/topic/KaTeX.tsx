import React from 'react';
import katex from 'katex';

// Patch all katex.renderToString calls (including Mermaid's) to suppress harmless newLineInDisplayMode
const _origRenderToString = katex.renderToString;
(katex as any).renderToString = function (expression: string, options?: any) {
    if (!options || !options.strict) {
        options = { ...options, strict: (code: string) => code === 'newLineInDisplayMode' ? 'ignore' : 'warn' };
    }
    return _origRenderToString(expression, options);
};

interface KaTeXProps {
    math: string;
    className?: string;
}

function SafeRender({ math, displayMode, className }: KaTeXProps & { displayMode: boolean }) {
    try {
        const html = katex.renderToString(math, { displayMode, throwOnError: false, strict: (code: string) => code === 'newLineInDisplayMode' ? 'ignore' : 'warn' });
        const Tag = displayMode ? 'div' : 'span';
        return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
        const Tag = displayMode ? 'div' : 'span';
        return <Tag className={`text-red-500 ${displayMode ? 'text-sm' : 'text-xs'}`}>{math}</Tag>;
    }
}

export function InlineMath({ math, className }: KaTeXProps) {
    return <SafeRender math={math} displayMode={false} className={className} />;
}

export function BlockMath({ math, className }: KaTeXProps) {
    return <SafeRender math={math} displayMode={true} className={className} />;
}
