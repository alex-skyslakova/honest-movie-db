import {Badge, Review} from ".prisma/client";


const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) {
        return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
};
const removeBadgesFromUser = async (userId: string) => {
    try {
        // Fetch the current badges for the user
        const currentBadgesResponse = await fetch(`/api/badge?userId=${userId}`);
        const currentBadges = await currentBadgesResponse.json();

        if (currentBadges.length === 0 || !currentBadges[0].badges) {
            console.log(`User ${userId} has no badges to remove.`);
            return;  // No badges to remove, exit the function
        }

        const badgeIds = currentBadges[0].badges.map((badge: Badge) => badge.id);

        for (const badgeId of badgeIds) {
            if (badgeId != undefined) {
                const response = await fetch(`/api/badge?removeUserId=true&userId=${userId}&badgeId=${badgeId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    console.log(`Removed ${badgeIds.length} badge(s) from user ${userId}.`);
                } else {
                    console.error('Error removing badges from user:', response.statusText);
                }
            }
        }

    } catch (error) {
        console.error('Error removing badges from user:', error);
    }
};

const addBadgeToUser = async (userId: string, badgeId: number) => {
    try {
        // Remove existing badges before adding the new one
        await removeBadgesFromUser(userId);
        if (badgeId != undefined) {
            const response = await fetch(`/api/badge?addUserId=true&userId=${userId}&badgeId=${badgeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(`Badge added for user ${userId}: ${badgeId}`);
            } else {
                console.error('Error adding badge to user:', response.statusText);
            }
        }

    } catch (error) {
        console.error('Error adding badge to user:', error);
    }
};
const updateBadges = async (userId: string) => {
    try {
        // Fetch reviews by userId

        const reviewsResponse = await fetch(`/api/review?userId=${userId}&page=1&pageSize=10`);
        const reviews = await reviewsResponse.json();

        const averageRating = calculateAverageRating(reviews);
        const badges: number[] = [];

        if (averageRating > 80) {
            badges.push(5);
        }

        if (averageRating < 20) {
            badges.push(4);
        }

        if (reviews.length > 5) {
            badges.push(1);
        }

        if (reviews.length > 20) {
            badges.push(2);
        }

        if (reviews.length > 50) {
            badges.push(3);
        }

        for (const badge of badges) {
            await addBadgeToUser(userId, badge);
        }
    } catch (error) {
        console.error('Error updating badges:', error);
    }
};

export { updateBadges };