// src/components/ProgressRing.tsx
import React from "react";

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number; // 0 to 100
  color: string;
  label: string;
  value: number | string;
  unit?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  radius,
  stroke,
  progress,
  color,
  label,
  value,
  unit,
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center m-4">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb" // Tailwind gray-200
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-out" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="1.25rem"
          fontWeight="bold"
          fill={color}
          className="select-none"
        >
          {value}
          {unit || ""}
        </text>
      </svg>
      <span className="mt-2 font-semibold text-pink-600">{label}</span>
    </div>
  );
};

export default ProgressRing;
