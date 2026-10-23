import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

const theme = {
    paragraph: 'mb-4',
    heading: {
        h1: 'mb-4 text-3xl font-bold',
        h2: 'mb-3 text-2xl font-semibold',
        h3: 'mb-2 text-xl font-semibold',
    },
    text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'rounded bg-slate-800 px-1 font-mono text-indigo-300',
    },
    list: {
        ul: 'ml-6 list-disc',
        ol: 'ml-6 list-decimal',
        listitem: 'mb-1',
    },
    link: 'text-indigo-400 underline',
};

function onError(error) {
    console.error('Lexical viewer error:', error);
}

export default function View({ content }) {
    const initialConfig = {
        namespace: 'LexicalViewer',
        theme,
        onError,
        editable: false,
        editorState: content ? JSON.stringify(content) : null,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={
                    <ContentEditable
                        className="min-h-0 cursor-default whitespace-pre-wrap break-words text-base leading-8 text-slate-300 outline-none"
                        aria-label="Blog content"
                    />
                }
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
            />
        </LexicalComposer>
    );
}
