// @ts-nocheck
export default function StepLarge({ number, title }) {
  return (
    <div className="step flex items-baseline py-4 md:items-center">
      <div className="flex h-8 w-8 items-start justify-center rounded-full border border-gray-200 font-extrabold text-green-500 md:items-center dark:border-gray-900">
        {number}
      </div>
      <h1
        className="ml-3 text-lg font-bold tracking-tight md:text-6xl dark:text-white"
        style={{ marginBottom: "0px" }}
      >
        {title}
      </h1>
    </div>
  );
}
