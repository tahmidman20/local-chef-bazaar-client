import React from 'react';
import { motion } from 'framer-motion';

const Shimmer = () => (
  <motion.div
    initial={{ x: '-100%' }}
    animate={{ x: '100%' }}
    transition={{
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear',
    }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
  />
);

const SkeletonBase = ({ className }) => (
  <div className={`relative overflow-hidden bg-gray-200 rounded-lg ${className}`}>
    <Shimmer />
  </div>
);

export const FoodCardSkeleton = () => (
  <div className="card-premium space-y-4">
    <SkeletonBase className="aspect-video w-full rounded-2xl" />
    <div className="space-y-2">
      <SkeletonBase className="h-6 w-3/4" />
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-1/2" />
    </div>
    <div className="flex justify-between items-center pt-2">
      <SkeletonBase className="h-8 w-20" />
      <SkeletonBase className="h-10 w-28 rounded-full" />
    </div>
  </div>
);

export const ChefCardSkeleton = () => (
  <div className="card-premium text-center flex flex-col items-center">
    <SkeletonBase className="w-32 h-32 rounded-full mb-4" />
    <SkeletonBase className="h-6 w-32 mb-2" />
    <SkeletonBase className="h-4 w-24 mb-4" />
    <div className="flex gap-2 w-full justify-center">
      <SkeletonBase className="h-8 w-8 rounded-full" />
      <SkeletonBase className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

export const ReviewCardSkeleton = () => (
  <div className="card-premium p-6">
    <div className="flex items-center gap-4 mb-4">
      <SkeletonBase className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <SkeletonBase className="h-4 w-24" />
        <SkeletonBase className="h-3 w-16" />
      </div>
    </div>
    <div className="space-y-2">
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-2/3" />
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-8 p-6">
    <div className="flex flex-col md:flex-row items-center gap-8">
      <SkeletonBase className="w-40 h-40 rounded-2xl" />
      <div className="flex-1 space-y-4 w-full">
        <SkeletonBase className="h-10 w-1/2" />
        <SkeletonBase className="h-6 w-1/3" />
        <div className="flex gap-4">
          <SkeletonBase className="h-12 w-32" />
          <SkeletonBase className="h-12 w-32" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkeletonBase className="h-32 rounded-2xl" />
      <SkeletonBase className="h-32 rounded-2xl" />
      <SkeletonBase className="h-32 rounded-2xl" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="w-full overflow-hidden rounded-2xl bg-white shadow-lg border border-border-base">
    <div className="bg-secondary p-4 flex gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <SkeletonBase key={i} className="h-6 flex-1" />
      ))}
    </div>
    <div className="p-4 space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {[1, 2, 3, 4, 5].map((j) => (
            <SkeletonBase key={j} className="h-12 flex-1 rounded-xl" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="section-spacing container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-8">
      <SkeletonBase className="h-20 w-full" />
      <SkeletonBase className="h-20 w-3/4" />
      <SkeletonBase className="h-6 w-full" />
      <SkeletonBase className="h-6 w-5/6" />
      <div className="flex gap-4 pt-4">
        <SkeletonBase className="h-14 w-44 rounded-full" />
        <SkeletonBase className="h-14 w-44 rounded-full" />
      </div>
    </div>
    <div className="relative">
      <SkeletonBase className="aspect-square w-full rounded-[3rem]" />
      <div className="absolute -bottom-10 -left-10 hidden md:block">
        <SkeletonBase className="w-64 h-24 rounded-2xl shadow-2xl" />
      </div>
    </div>
  </div>
);
