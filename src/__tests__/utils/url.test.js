import { getUrl } from "utils/url";

// Cleanup
const OLD_ENV = process.env;

beforeEach(() => {
	jest.resetModules();
	process.env = { ...OLD_ENV };
});

afterAll(() => {
	process.env = OLD_ENV;
});

describe("getUrl", () => {
	it("Should return right user URL with only subdomain", () => {
		process.env.REACT_APP_HOST_ENV = "test";
		const subdomain = "demo";
		const expectedUrl = `https://demo.test.webstudio.so`;
		expect(getUrl(subdomain)).toBe(expectedUrl);
	});

	it("Should return right user URL with subdomain and template id", () => {
		process.env.REACT_APP_HOST_ENV = "test";
		const subdomain = "demo";
		const tid = "mytemplate-123";
		const expectedUrl = `https://demo.test.webstudio.so/mytemplate-123`;
		expect(getUrl(subdomain, tid)).toBe(expectedUrl);
	});

	it("Should return right user URL with subdomain in production", () => {
		process.env.REACT_APP_HOST_ENV = "production";
		const subdomain = "demo";
		const expectedUrl = `https://demo.webstudio.so`;
		expect(getUrl(subdomain)).toBe(expectedUrl);
	});

	it("Should return right user URL with subdomain and template id", () => {
		process.env.REACT_APP_HOST_ENV = "production";
		const subdomain = "demo";
		const tid = "mytemplate-123";
		const expectedUrl = `https://demo.webstudio.so/mytemplate-123`;
		expect(getUrl(subdomain, tid)).toBe(expectedUrl);
	});
});
