"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor = ({ value, onChange }: Props) => {
  const { theme } = useTheme();

  return (
    <Editor
      height="600px"
      defaultLanguage="markdown"
      value={value}
      onChange={(value) => onChange(value || "")}
      theme={theme === "dark" ? "vs-dark" : "light"}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
};
