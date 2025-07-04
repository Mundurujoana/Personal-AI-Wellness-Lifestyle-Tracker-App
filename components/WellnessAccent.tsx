export default function WellnessAccent() {
  return (
    <svg
      className="mx-auto mb-4 w-14 h-14 text-pink-400 opacity-80"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Leaf shape */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C7 6 4 12 4 16a8 8 0 0016 0c0-4-3-10-8-14z"
      />
      {/* Water ripple */}
      <circle cx="12" cy="18" r="1.5" strokeOpacity="0.5" />
      <circle cx="12" cy="18" r="3" strokeOpacity="0.3" />
    </svg>
  );
}
