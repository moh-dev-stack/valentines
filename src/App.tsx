import { useState } from "react";
import FloatingHearts from "./components/FloatingHearts";
import SweetMessage from "./components/SweetMessage";
import InteractiveOverlay from "./components/InteractiveOverlay";

function getRecipientName(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("name") ?? "Ghenna";
}

function App() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const recipientName = getRecipientName();

  return (
    <div className="relative min-h-dvh min-h-screen bg-gradient-to-b from-pink-100 to-rose-200">
      <FloatingHearts />
      <InteractiveOverlay />
      <div className="pointer-events-none relative z-10 flex min-h-dvh min-h-screen items-center justify-center px-4 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
        <div className="pointer-events-auto w-full max-w-md">
          <SweetMessage
            recipientName={recipientName}
            noCount={noCount}
            onNoClick={() => setNoCount((c) => c + 1)}
            onYesClick={() => setAccepted(true)}
            accepted={accepted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
