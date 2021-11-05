import { USERS } from './users';

export const POSTS = [
    {
        imageUrl: 'https://i.ibb.co/182bP1y/4k.png',
        user: USERS[0].username,
        likes: 7870,
        caption: 'Train Ride to Hogwarts',
        profile_picture: USERS[0].avatar,
        comments: [
            {
                user: 'theqazman',
                comment: 'This is the best post ever!',
            },
            {
                user: 'amaanath.dev',
                comment:
                "Once I wake up, I'll finally be ready to code this up!"
            }
        ]
    },
    {
        imageUrl: 'https://i.ibb.co/182bP1y/4k.png',
        user: USERS[1].username,
        likes: 7870,
        caption: 'Train Ride to Hogwarts',
        profile_picture: USERS[1].avatar,
        comments: [
            {
                user: 'theqazman',
                comment: 'This is the best post ever!',
            },
            {
                user: 'amaanath.dev',
                comment:
                "Once I wake up, I'll finally be ready to code this up!"
            }
        ]
    },
    {
        imageUrl: 'https://i.ibb.co/182bP1y/4k.png',
        user: USERS[2].username,
        likes: 7870,
        caption: 'Train Ride to Hogwarts',
        profile_picture: USERS[2].avatar,
        comments: [
            {
                user: 'theqazman',
                comment: 'This is the best post ever!',
            },
            {
                user: 'amaanath.dev',
                comment:
                "Once I wake up, I'll finally be ready to code this up!"
            }
        ]
    }
]