import * as data from './data.json'; // Replace with the path to your JSON file
import {prisma} from "@/api/db/client";


async function main() {
    // Seed Badges
    for (const badge of data.badges) {
        await prisma.badge.create({
            data: badge,
        });
    }

    // Seed Genres
    for (const genre of data.genres) {
        const genreRecord = await prisma.genre.create({
            data: genre,
        });
    }

    // Seed Movies and their genres
    for (const movie of data.movies) {
        const movieRecord = await prisma.movie.create({
            data: {
                id: movie.id,
                title: movie.title,
                description: movie.description,
                image: movie.image,
                rating: movie.rating,
            },
        });

        for (const genre of movie.genre) {
            await prisma.movie.update({
                where: { id: movieRecord.id },
                data: {
                    genres: {
                        connect: { id: genre.id },
                    },
                },
            });
        }
    }

    console.log('Database seeded!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
