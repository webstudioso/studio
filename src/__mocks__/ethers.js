

const ethers = jest.createMockFromModule('ethers');

ethers.utils = {
    formatBytes32String: jest.fn(),
    parseUnits: jest.fn()
};

module.exports = ethers;
