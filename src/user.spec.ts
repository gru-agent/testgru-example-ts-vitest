import { describe, it, expect, beforeEach } from 'vitest';
import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a new user with auto-incremented ID', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');

      expect(user).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should increment IDs sequentially', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');
      const user3 = userManager.addUser('Bob', 'bob@example.com');

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
      expect(user3.id).toBe(3);
    });

    it('should store users in internal array', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      const storedUsers = userManager.getAllUsers();

      expect(storedUsers).toHaveLength(1);
      expect(storedUsers[0]).toEqual(user);
    });
  });

  describe('findUserById', () => {
    it('should find existing user by ID', () => {
      const addedUser = userManager.addUser('John Doe', 'john@example.com');
      const foundUser = userManager.findUserById(addedUser.id);

      expect(foundUser).toEqual(addedUser);
    });

    it('should return undefined for non-existent ID', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });

    it('should find correct user when multiple users exist', () => {
      userManager.addUser('John', 'john@example.com');
      const targetUser = userManager.addUser('Jane', 'jane@example.com');
      userManager.addUser('Bob', 'bob@example.com');

      const foundUser = userManager.findUserById(targetUser.id);
      expect(foundUser).toEqual(targetUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user and return true', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.getAllUsers()).toHaveLength(0);
    });

    it('should return false when deleting non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should only delete the specified user', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');
      const user3 = userManager.addUser('Bob', 'bob@example.com');

      userManager.deleteUser(user2.id);

      const remainingUsers = userManager.getAllUsers();
      expect(remainingUsers).toHaveLength(2);
      expect(remainingUsers).toEqual([user1, user3]);
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      const users = userManager.getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return array of all users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      const users = userManager.getAllUsers();
      expect(users).toEqual([user1, user2]);
    });
  });
});
