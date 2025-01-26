import type { Id } from "@/convex/_generated/dataModel";
import { Monaco } from "@monaco-editor/react";

export type Theme = {
  id: string;
  label: string;
  color: string;
}

export type Language = {
  id: string;
  label: string;
  logoPath: string;
  monacoLanguage: string;
  defaultCode: string;
  pistonRuntime: LanguageRuntime;
}

export type LanguageRuntime = {
  language: string;
  version: string;
}

export type ExecuteCodeResponse = {
  compile?: {
    output: string;
  };
  run?: {
    output: string;
    stderr: string;
  };
}

export type ExecutionResult = {
  code: string;
  output: string;
  error: string | null;
};

export type CodeEditorState = {
  language: string;
  output: string;
  isRunning: boolean;
  error: string | null;
  theme: string;
  fontSize: number;
  editor: Monaco | null;
  executionResult: ExecutionResult | null;

  setEditor: (editor: Monaco) => void;
  getCode: () => string;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  runCode: () => Promise<void>;
};

export type Snippet = {
  _id: Id<"snippets">;
  _creationTime: number;
  userId: string;
  language: string;
  code: string;
  title: string;
  userName: string;
};
