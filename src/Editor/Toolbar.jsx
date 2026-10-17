import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';

export default function Toolbar() {

    const [editor] = useLexicalComposerContext();

    function formatText(format) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    }

    return (
        <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-900 p-2">

            <button
                type="button"
                onClick={() => formatText('bold')}
                className="rounded px-3 py-1 font-bold text-slate-200 hover:bg-slate-800"
            >
                B
            </button>

            <button
                type="button"
                onClick={() => formatText('italic')}
                className="rounded px-3 py-1 italic text-slate-200 hover:bg-slate-800"
            >
                I
            </button>

            <button
                type="button"
                onClick={() => formatText('underline')}
                className="rounded px-3 py-1 underline text-slate-200 hover:bg-slate-800"
            >
                U
            </button>

        </div>
    );
}