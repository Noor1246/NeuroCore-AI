export default function Sidebar() {
  const menuItems = [
    "Dashboard",
    "AI Chat",
    "Documents",
    "ML Studio",
    "Research Lab",
    "AI Agents",
    "Reports",
    "Settings",
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950 p-6 text-white">
      <h1 className="text-2xl font-bold text-blue-500">
        NeuroCore AI
      </h1>

      <nav className="mt-10">
        <ul className="space-y-5">
          {menuItems.map((item) => (
            <li
              key={item}
              className="cursor-pointer rounded-lg px-3 py-2 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}