import {afterAll, beforeEach, describe, expect, it} from 'vitest';
import {migrateLegacyUserRoles, sequelize, User} from '../models/index.js';

describe('legacy user role migration', () => {
  beforeEach(async () => {
    await sequelize.drop();
    await sequelize.query('CREATE TABLE users (id INTEGER PRIMARY KEY, role TEXT)');
    await sequelize.query("INSERT INTO users (id, role) VALUES (1, 'admin'), (2, 'user')");
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('converts existing single roles into role arrays', async () => {
    await migrateLegacyUserRoles();

    const [users] = await sequelize.query('SELECT id, roles FROM users ORDER BY id');
    expect(users.map((user) => [user.id, JSON.parse(user.roles)])).toEqual([
      [1, ['admin']],
      [2, ['user']],
    ]);
  });

  it('stores users with multiple roles', async () => {
    await sequelize.sync({force: true});

    const user = await User.create({
      firstName: 'Alex',
      lastName: 'Rivera',
      email: 'alex@example.com',
      password: 'password123',
      roles: ['user', 'admin'],
    });
    const savedUser = await User.findByPk(user.id);

    expect(savedUser.roles).toEqual(['user', 'admin']);
  });
});
