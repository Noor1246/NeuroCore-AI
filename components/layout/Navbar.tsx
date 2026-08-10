export default function Navbar() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">
      <h2 className="text-xl font-semibold text-white">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700">
          Notifications
        </button>

        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
          N
        </div>
      </div>
    </header>
  );
}