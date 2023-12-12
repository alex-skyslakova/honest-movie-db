'use client'

// src/components/BadgeList.tsx
import React, { useState } from 'react';
import { Badge } from "@/model/badge";

type BadgeListProps = {
    badges: Badge[];
};

const badgeDescriptions: { [key: number]: string } = {
    1: "Awarded for publishing 5 reviews.",
    2: "Awarded for publishing 20 reviews.",
    3: "Awarded for publishing 100 reviews.",
    4: "Awarded for having below 20% average ratings...",
    5: "Awarded for having over 80% average ratings!",
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
                                    style={{ whiteSpace: 'nowrap', maxWidth: '150px' }}
                                >
                                    {badgeDescriptions[badge.id]}
                                </div>
                            )}
                        </div>
                    )) :
                    <p>This profile has no badges</p>
                }
            </div>
        </div>
    );
};

export default BadgeList;
