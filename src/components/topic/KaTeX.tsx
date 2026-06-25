import React from 'react';
import katex from 'katex';

interface KaTeXProps {
    math: string;
    className?: string;
}

function SafeRender({ math, displayMode, className }: KaTeXProps & { displayMode: boolean }) {
    try {
        const html = katex.renderToString(math, { displayMode, throwOnError: false });
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
