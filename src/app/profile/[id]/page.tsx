"use client";

// src/app/profile/pages.tsx
import React, { useEffect, useState } from 'react';
import BadgeList from '@/components/BadgeList'; // Adjust the import path based on your project structure
import { useParams } from 'next/navigation';
import { User } from '@/model/user';

// Dummy user for testing
const dummyUser = {
  id: 1,
  name: 'John Doe',
  badges: [
    { id: 1, name: 'Positive Badge', image: '/img/badges/positive-vote.png' },
    { id: 2, name: 'Negative Badge', image: '/img/badges/negative-vote.png' },
    { id: 3, name: 'Silver Badge', image: '/img/badges/silver-medal.png' },
  ],
  email: 'john.doe@example.com',
  password: '********',
};

// Uncomment the line below for actual API fetch
// import { getUserById, User } from '@/api/user';
// import { getBadgesByUserId, Badge } from '@/api/badge';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  // const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const fetchUserAndBadges = async () => {
      try {
        // Uncomment the line below for actual API fetch
        // const userData = await getUserById(Number(id));
        // const userBadges = await getBadgesByUserId(Number(id));

        // Replace with actual user and badge data for API fetch
        setUser(dummyUser);
        // setBadges(dummyUser.badges);
      } catch (error) {
        console.error('Error fetching user and badges:', error);
      }
    };

    if (id) {
      fetchUserAndBadges();
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <BadgeList badges={dummyUser.badges} />
      {/* Display other user information as needed */}
    </div>
  );
};

export default ProfilePage;
