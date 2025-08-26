import React from "react";

interface RatingCircleProps {
  rating: number;
}

function RatingCircle({ rating }: RatingCircleProps) {
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (rating / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg className="rotate-[-90deg]" width={size} height={size}>
        <circle
          stroke="#2d2d2d"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#facc15"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </svg>

      <span className="absolute text-lg font-bold text-yellow-400">
        {rating}%
      </span>
    </div>
  );
}

export { RatingCircle };
