import { ArrowRight } from "lucide-react";

interface AgentCardProps {
  name: string;
  icon: string;
  description: string;
  prompt: string;
  onClick: () => void;
}

export default function AgentCard({
  name,
  icon,
  description,
  prompt,
  onClick,
}: AgentCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900
        p-4
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-cyan-500
        hover:shadow-lg
        hover:shadow-cyan-500/10
      "
    >
      {/* Icon */}

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-xl">
        {icon}
      </div>

      {/* Title */}

      <h2 className="mt-4 text-lg font-semibold text-white">
        {name}
      </h2>

      {/* Description */}

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {description}
      </p>

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between">

        <span className="text-sm text-cyan-400">
          Start Chat
        </span>

        <ArrowRight
          size={16}
          className="text-cyan-400"
        />

      </div>

    </div>
  );
}