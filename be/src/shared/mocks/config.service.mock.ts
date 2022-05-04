const getConfigServiceMock = () => ({
  get: (key: string) => process.env[key],
});

export default getConfigServiceMock;
