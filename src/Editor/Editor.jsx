import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import Toolbar from './Toolbar';

const theme = {
  paragraph: 'mb-2',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  },
};

function onError(error) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">

        {/* Toolbar */}
        <div className="border-b border-slate-700">
          <Toolbar />
        </div>

        {/* Editor */}
        <div className="relative">

          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="
                  min-h-[400px]
                  w-full
                  resize-none
                  bg-slate-900
                  px-5
                  py-4
                  text-slate-100
                  outline-none
                  placeholder:text-slate-500
                  focus:outline-none
                "
              />
            }

            placeholder={
              <div
                className="
                  pointer-events-none
                  absolute
                  left-5
                  top-4
                  text-slate-500
                "
              >
                Start writing your post...
              </div>
            }

            ErrorBoundary={LexicalErrorBoundary}
          />

        </div>

      </div>

      <HistoryPlugin />

    </LexicalComposer>
  );
}