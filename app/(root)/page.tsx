import Header from "../(root)/_components/header";
import EditorPanel from "./_components/editor-panel";
import OutputPanel from "./_components/output-panel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1880px] mx-auto p-4">
        <Header />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-4">
        <EditorPanel />
        <OutputPanel />
        
      </div>
    </div>
  );
}
