// src/components/BadgeList.tsx
import { Badge } from '@/model/badge';
import React from 'react';

type BadgeListProps = {
  badges: Badge[];
};

const BadgeList: React.FC<BadgeListProps> = ({ badges }) => {
  return (
    <div>
      <h2>Badges</h2>
      <div style={{ display: 'flex' }}>
        {badges.map((badge) => (
          <div key={badge.id} style={{ margin: '0 10px' }}>
            <img src={badge.image} alt={badge.name} width="50" height="50" />
            <p>{badge.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeList;
