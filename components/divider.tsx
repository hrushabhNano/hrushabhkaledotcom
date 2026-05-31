import React from "react";

export default function Divider() {
  return (
    <div className="relative my-10 flex items-center select-none">
      {/* Horizontal Scaffold Line and Markers */}
      <div className="blueprint-divider-line">
        <span className="blueprint-marker-left" />
        <span className="blueprint-marker-right" />
      </div>

      {/* Existing three colored dots masked with page background */}
      <div className="bg-background relative z-10 flex gap-2 pr-4">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400 opacity-60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 opacity-60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400 opacity-60" />
      </div>
    </div>
  );
}
