'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        'backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/20 dark:border-gray-700/20 shadow-xl p-6',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
