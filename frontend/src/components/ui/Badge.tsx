import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'navy' | 'steel' | 'alert' | 'danger' | 'primary' | 'success' | 'warning';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'green',
  className = '',
  icon,
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {icon}
      {children}
    </span>
  );
};
