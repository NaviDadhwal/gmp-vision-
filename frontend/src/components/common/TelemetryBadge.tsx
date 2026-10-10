import React from 'react';

interface TelemetryBadgeProps {
  label: string;
  variant?: 'green' | 'blue' | 'amber';
  pulse?: boolean;
}

export const TelemetryBadge: React.FC<TelemetryBadgeProps> = ({
  label,
  variant = 'green',
  pulse = false,
}) => {
  const variantStyles = {
    green: 'bg-[#F3F9EE] text-[#4E8A1C] border-[rgba(121,184,46,0.3)]',
    blue: 'bg-[#F4F7FC] text-[#1F56A8] border-[rgba(31,86,168,0.25)]',
    amber: 'bg-[#FFFBEB] text-[#D97706] border-[rgba(217,119,6,0.25)]',
  };

  const dotStyles = {
    green: 'bg-[#79B82E]',
    blue: 'bg-[#1F56A8]',
    amber: 'bg-[#F59E0B]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold tracking-wider uppercase rounded border ${variantStyles[variant]}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotStyles[variant]}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotStyles[variant]}`} />
      </span>
      {label}
    </span>
  );
};
