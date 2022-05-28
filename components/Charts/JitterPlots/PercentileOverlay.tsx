const PercentileOverlay = () => {
  return (
    <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full">
      <div className="h-full w-0 md:w-1/3" />
      <div className="relative grid h-full w-full grid-cols-12 md:w-2/3">
        <div className="absolute top-0 left-0 col-span-4 flex w-full items-center justify-center text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-mt-0.5 h-3 w-3 rotate-180"
            fill="#13293d"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className={
                index === 0
                  ? "border-opacity-50 border-r border-gray-300"
                  : index === 5
                  ? "border-r border-l border-r-accent bg-gray-200 bg-opacity-20 border-gray-300"
                  : index === 6
                  ? "border-r border-l border-l-accent bg-gray-200 bg-opacity-20 border-gray-300"
                  : index === 11
                  ? "border-opacity-50 border-l border-l-gray-300"
                  : ""
              }
            />
          ))}
      </div>
    </div>
  );
};

export default PercentileOverlay;
