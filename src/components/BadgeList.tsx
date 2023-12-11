'use client'

// src/components/BadgeList.tsx
import { Badge } from '@/model/badge';
import React, { useState } from 'react';

type BadgeListProps = {
  badges: Badge[];
};

const BadgeList: React.FC<BadgeListProps> = ({ badges }) => {
  const [hoveredBadge, setHoveredBadge] = useState<Badge | null>(null);

  const handleBadgeHover = (badge: Badge) => {
    setHoveredBadge(badge);
  };

  const handleBadgeLeave = () => {
    setHoveredBadge(null);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-8 text-center mt-8">Badges</h2>
      <div className="flex flex-wrap justify-center border bg-stone-200 dark:bg-stone-600 rounded shadow-md p-4">
        {badges && badges.length > 0 ? badges.map((badge) => (
          <div
            key={badge.id}
            className="relative m-0.5 md:m-2.5 lg:m-5 position-relative"
            onMouseEnter={() => handleBadgeHover(badge)}
            onMouseLeave={handleBadgeLeave}
          >
            <img src={badge.image} alt={badge.name} className="w-12 h-12" />
            {hoveredBadge && hoveredBadge.id === badge.id && (
              <div
                className="opacity-70 dark:bg-stone-800 absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-200 p-2 rounded text-xs"
                style={{ whiteSpace: 'nowrap' }}
              >
                {badge.name}
              </div>
            )}
          </div>
        )) :
            <p>There&apos;s nothing here yet</p>
        }
      </div>
    </div>
  );
};

export default BadgeList;
