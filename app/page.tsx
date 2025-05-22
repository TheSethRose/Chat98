import ChatApp from "./components/ChatApp"; // Import the ChatApp component

export default function Home() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }} // Apply background image
    >
      <main className="w-full max-w-2xl">
        <ChatApp />
      </main>
    </div>
  );
}
