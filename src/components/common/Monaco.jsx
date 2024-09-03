import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';

const MonacoEditor = ({ code, language, onChange }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: code,
        language: language,
        theme: 'vs-dark',
      });

      editorRef.current.onDidChangeModelContent(() => {
        const value = editorRef.current.getValue();
        onChange(value);
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, [containerRef]);

  const formatCode = () => {
    const formatted = prettier.format(editorRef.current.getValue(), {
      parser: 'babel',
      plugins: [parserBabel],
    });
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button onClick={formatCode}>Format Code</button>
      <div ref={containerRef} style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default MonacoEditor;
