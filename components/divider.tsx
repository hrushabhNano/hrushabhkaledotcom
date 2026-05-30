import React from "react";

export default function Divider() {
  return (
    <div className="my-10 flex gap-2 select-none">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400 opacity-60" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 opacity-60" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-400 opacity-60" />
    </div>
  );
}
