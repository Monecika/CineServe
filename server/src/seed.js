import {
  Hall,
  Movie,
  Reservation,
  sequelize,
  User,
} from './models/index.js';

if (process.env.NODE_ENV === 'production') {
  throw new Error('Refusing to seed the production database');
}

try {
  console.log('Starting database seed...');

  await sequelize.authenticate();
  console.log('Database connection established.');

  await sequelize.sync({ force: true });
  console.log('Database synchronized.');

  // HALLS
  await Hall.bulkCreate([
    { name: 'Hall 1', rows: 10, seatsPerRow: 12 },
    { name: 'Hall 2', rows: 12, seatsPerRow: 14 },
    { name: 'Hall 3', rows: 15, seatsPerRow: 16 },
    { name: 'Hall 4', rows: 18, seatsPerRow: 18 },
    { name: 'Hall 5', rows: 20, seatsPerRow: 20 },
  ]);

  console.log(`Seeded ${await Hall.count()} halls.`);

  // MOVIES
  await Movie.bulkCreate([
    {
      slug: 'interstellar',
      title: 'Interstellar',
      description:
        'A team of explorers travels through a wormhole in space in search of a new home for humanity.',
      duration: 169,
      genres: ['Sci-Fi', 'Adventure', 'Drama'],
      ageRating: '12',
      language: 'English',
      poster:
        'https://images.hdqwalls.com/download/interstellar-movie-wide-2560x1080.jpg',
      startsAt: '2026-12-01T18:30:00',
      hallId: 1,
    },
    {
      slug: 'inception',
      title: 'Inception',
      description:
        'A skilled thief who steals secrets through dreams is given a chance to erase his past by planting an idea.',
      duration: 148,
      genres: ['Sci-Fi', 'Action', 'Thriller'],
      ageRating: '12',
      language: 'English',
      poster:
        'https://i.pinimg.com/1200x/d0/5b/7f/d05b7f61afdeb88f0af9536a6ebbac56.jpg',
      startsAt: '2026-12-02T20:00:00',
      hallId: 2,
    },
    {
      slug: 'the-dark-knight',
      title: 'The Dark Knight',
      description:
        'Batman faces a criminal mastermind who plunges Gotham City into chaos.',
      duration: 152,
      genres: ['Action', 'Crime', 'Drama'],
      ageRating: '12',
      language: 'English',
      poster:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx0hE2oVgYKDId0IDDs0MJNYvLgmPxi3XhntuHvzWWGnY8JErcej5KTXOY&s=10',
      startsAt: '2026-12-03T19:00:00',
      hallId: 3,
    },
    {
      slug: 'the-matrix',
      title: 'The Matrix',
      description:
        'A computer hacker discovers that reality is a simulated world and joins a rebellion against its creators.',
      duration: 136,
      genres: ['Sci-Fi', 'Action'],
      ageRating: '16',
      language: 'English',
      poster:
        'https://images.hdqwalls.com/download/the-matrix-typography-wide-1366x768.jpg',
      startsAt: '2026-12-04T21:00:00',
      hallId: 1,
    },
    {
      slug: 'spirited-away',
      title: 'Spirited Away',
      description:
        'A young girl enters a mysterious spirit world and must find a way to rescue her parents.',
      duration: 125,
      genres: ['Animation', 'Fantasy', 'Adventure'],
      ageRating: '6',
      language: 'Japanese',
      poster:
        'https://c4.wallpaperflare.com/wallpaper/837/14/455/studio-ghibli-spirited-away-anime-girls-anime-wallpaper-preview.jpg',
      startsAt: '2026-12-05T14:00:00',
      hallId: 4,
    },
    {
      slug: 'parasite',
      title: 'Parasite',
      description:
        'A struggling family gradually becomes entangled with a wealthy household in an unexpected and dangerous way.',
      duration: 132,
      genres: ['Drama', 'Thriller'],
      ageRating: '16',
      language: 'Korean',
      poster:
        'https://deadline.com/wp-content/uploads/2019/12/parasite-1.jpg',
      startsAt: '2026-12-06T19:30:00',
      hallId: 5,
    },
    {
      slug: 'avengers-endgame',
      title: 'Avengers: Endgame',
      description:
        'The remaining Avengers attempt to reverse the devastating events caused by Thanos.',
      duration: 181,
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      ageRating: '12',
      language: 'English',
      poster:
        'https://images.hdqwalls.com/wallpapers/poster-avengers-endgame-ni.jpg',
      startsAt: '2026-12-07T18:00:00',
      hallId: 2,
    },
    {
      slug: 'dune-part-two',
      title: 'Dune: Part Two',
      description:
        'Paul Atreides joins Chani and the Fremen while seeking revenge against those who destroyed his family.',
      duration: 166,
      genres: ['Sci-Fi', 'Adventure', 'Drama'],
      ageRating: '12',
      language: 'English',
      poster:
        'https://s3.amazonaws.com/view-conference-www/assets/article/2024/05/04/dune-part-2-landscape-1_feature.jpg',
      startsAt: '2026-12-08T21:30:00',
      hallId: 3,
    },
    {
      slug: 'the-lord-of-the-rings-fellowship',
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      description:
        'A young hobbit begins a dangerous journey to destroy a powerful ring before its creator can reclaim it.',
      duration: 178,
      genres: ['Fantasy', 'Adventure', 'Drama'],
      ageRating: '12',
      language: 'English',
      poster:
        'https://www.intofilm.org/intofilm-production/scaledcropped/1096x548https%3A/s3-eu-west-1.amazonaws.com/images.cdn.filmclub.org/film__3930-the-lord-of-the-rings-the-fellowship-of-the-ring--hi_res-a207bd11.jpg/film__3930-the-lord-of-the-rings-the-fellowship-of-the-ring--hi_res-a207bd11.jpg',
      startsAt: '2026-12-09T17:00:00',
      hallId: 4,
    },
    {
      slug: 'mad-max-fury-road',
      title: 'Mad Max: Fury Road',
      description:
        'In a post-apocalyptic wasteland, Max joins Furiosa and a group of rebels fleeing a tyrannical warlord.',
      duration: 120,
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      ageRating: '16',
      language: 'English',
      poster: 'https://i.redd.it/vb4q1p5wjp271.jpg',
      startsAt: '2026-12-10T20:30:00',
      hallId: 5,
    },
  ]);

  console.log(`Seeded ${await Movie.count()} movies.`);

  // USERS
  await User.bulkCreate(
    [
      {
        firstName: 'Alex',
        lastName: 'Rivera',
        email: 'alex.rivera@example.com',
        password: 'password123',
        roles: ['user'],
      },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@cinereserve.com',
        password: 'password123',
        roles: ['admin'],
      },
      {
        firstName: 'mona',
        lastName: 'mona',
        email: 'mona@cinereserve.com',
        password: 'password123',
        roles: ['admin', 'user'],
      },
    ],
    { individualHooks: true }
  );

  console.log(`Seeded ${await User.count()} users.`);

  // RESERVATIONS
  await Reservation.bulkCreate([
    { userId: 1, movieSlug: 'spirited-away', seats: ['D8', 'D9'], status: 'upcoming' },
    { userId: 1, movieSlug: 'parasite', seats: ['E4', 'E5', 'E6'], status: 'upcoming' },
    { userId: 1, movieSlug: 'avengers-endgame', seats: ['A1', 'A2'], status: 'upcoming' },
    { userId: 1, movieSlug: 'dune-part-two', seats: ['F10', 'F11'], status: 'upcoming' },
    { userId: 1, movieSlug: 'the-lord-of-the-rings-fellowship', seats: ['C5', 'C6', 'C7', 'C8'], status: 'upcoming' },
    { userId: 1, movieSlug: 'interstellar', seats: ['B1', 'B2'], status: 'upcoming' },
    { userId: 1, movieSlug: 'inception', seats: ['B5', 'B6', 'B7'], status: 'upcoming' },
    { userId: 1, movieSlug: 'the-dark-knight', seats: ['C3', 'C4'], status: 'upcoming' },
    { userId: 1, movieSlug: 'the-matrix', seats: ['G3', 'G4'], status: 'upcoming' },
    { userId: 1, movieSlug: 'mad-max-fury-road', seats: ['H7', 'H8'], status: 'upcoming' },

    { userId: 2, movieSlug: 'spirited-away', seats: ['D1', 'D2'], status: 'upcoming' },
    { userId: 2, movieSlug: 'mad-max-fury-road', seats: ['E7', 'E8', 'E9'], status: 'upcoming' },
    { userId: 2, movieSlug: 'interstellar', seats: ['A5', 'A6'], status: 'upcoming' },
    { userId: 2, movieSlug: 'parasite', seats: ['E4', 'E5', 'E6'], status: 'upcoming' },
    { userId: 2, movieSlug: 'dune-part-two', seats: ['F1', 'F2'], status: 'upcoming' },
  ]);

  console.log(`Seeded ${await Reservation.count()} reservations.`);

  // FINAL VERIFICATION
  console.log('\n--- DATABASE SEED SUMMARY ---');
  console.log('Halls:', await Hall.count());
  console.log('Movies:', await Movie.count());
  console.log('Users:', await User.count());
  console.log('Reservations:', await Reservation.count());

  const movies = await Movie.findAll({
    attributes: ['slug', 'title', 'startsAt', 'hallId'],
    order: [['startsAt', 'ASC']],
    raw: true,
  });

  console.table(movies);
} catch (error) {
  console.error('\nDATABASE SEED FAILED:');
  console.error(error);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
