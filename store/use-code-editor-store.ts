import { create } from "zustand";
import * as Monaco from "monaco-editor"; // Import from monaco-editor, not @monaco-editor/react
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";

interface CodeEditorState {
  language: string;
  fontSize: number;
  theme: string;
  isRunning: boolean;
  error: string | null;
  editor: Monaco.editor.IStandaloneCodeEditor | null; // Properly typed Monaco editor instance
  executionResult: unknown; // Adjust this type as per your execution result structure
  output: string;
  getCode: () => string;
  setEditor: (editor: Monaco.editor.IStandaloneCodeEditor) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  setLanguage: (language: string) => void;
  runCode: () => Promise<void>;
}

const getInitialState = (): Omit<
  CodeEditorState,
  | "getCode"
  | "setEditor"
  | "runCode"
  | "setTheme"
  | "setFontSize"
  | "setLanguage"
> => {
  // if we're on the server, return default values
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
      isRunning: false,
      error: null,
      editor: null,
      executionResult: null,
      output: "",
    };
  }

  // if we're on the client, return values from local storage
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || "16";

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,
    output: "",
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    getCode: () => {
      const editor = get().editor;
      return editor ? editor.getValue() || "" : ""; // Safe check for editor.getValue()
    },

    setEditor: (editor: Monaco.editor.IStandaloneCodeEditor) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) {
        editor.setValue(savedCode); // Set the saved code if exists
      }
      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);
      set({
        language,
        output: "",
        error: null,
      });
    },

    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        });

        const data = await response.json();

        console.log("data back from piston:", data);

        if (data.message) {
          set({
            error: data.message,
            executionResult: { code, output: "", error: data.message },
          });
          return;
        }

        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        const output = data.run.output;
        set({
          output: output.trim(),
          error: null,
          executionResult: {
            code,
            output: output.trim(),
            error: null,
          },
        });
      } catch (error) {
        console.log("Error running code:", error);
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () =>
  useCodeEditorStore.getState().executionResult;
