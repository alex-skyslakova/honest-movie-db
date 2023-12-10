"use client";

// src/app/profile/pages.tsx
import React, { useEffect, useState } from 'react';
import BadgeList from '@/components/BadgeList';
import { useParams } from 'next/navigation';
import { User } from '@/model/user';
import {UserNameField} from "@/components/UserNameField";

// Dummy user for testing
const dummyUser = {
  id: 1,
  name: 'John Doe',
  badges: [
    { id: 1, name: 'This user\'s average rating is higher than 80%', image: '/img/badges/positive-vote.png' },
    { id: 2, name: 'This user\'s average rating is lower than 20%', image: '/img/badges/negative-vote.png' },
    { id: 3, name: 'This user has reviewed over 20 movies!', image: '/img/badges/silver-medal.png' },
  ],
  email: 'john.doe@example.com',
  password: '********',
};

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserAndBadges = async () => {
      try {
        setUser(dummyUser);
      } catch (error) {
        console.error('Error fetching user and badges:', error);
      }
    };

    if (id) {
      fetchUserAndBadges();
    }
  }, [id]);

  const handleSaveClick = async (editedName: string) => {
    // Save the edited name and exit editing mode
    setUser((prevUser) => ({ ...prevUser, name: editedName }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-4/5 w-4/5 dark:bg-neutral-800 m-auto">
      {/* Left Side */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="max-w-md rounded-lg p-4 flex flex-col items-center">
          <UserNameField userName={user.name} saveFunc={handleSaveClick}/>
          <p className="text-sm mb-4">{user.email}</p>
          <BadgeList badges={dummyUser.badges}/>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center w-2/4">
        <div className="p-4 rounded-lg">
          <img
              src="/img/profile/placeholder-profile.png"
              alt="Profile"
              className="w-3/4 h-3/4 align-middle object-cover rounded border dark:bg-neutral-600 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
