export const mockRepositoryProvider = jest.fn(() => ({
  update: jest.fn(() => Promise.resolve()),
  save: jest.fn(() => Promise.resolve()),
  create: jest.fn(() => Promise.resolve()),
  find: jest.fn(() => Promise.resolve()),
  findOne: jest.fn(() => Promise.resolve()),
}));
