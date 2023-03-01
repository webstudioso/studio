import { parseAssetList, getBase64, uploadFiles, uploadFile, formatFileArrayBase64 } from "../index";
import mockAxios from "jest-mock-axios";

const obj = { hello: "world "}
const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });

describe("parseAssetList", () => {

	it("Return empty array if empty input", async () => {
        expect(parseAssetList()).toStrictEqual([]);
        expect(parseAssetList(null)).toStrictEqual([]);
        expect(parseAssetList(undefined)).toStrictEqual([]);
	});

    it("Return empty array if empty array input", async () => {
        const list = parseAssetList({ data:[] });
        expect(list).toStrictEqual([]);
	});

    it("Return list of urls from list of objects with path", async () => {
        const list = parseAssetList({ data:[{ path: 'ipfs://hello'}, { path: 'ipfs://world'}] });
        expect(list).toStrictEqual(['ipfs://hello', 'ipfs://world']);
	});
});

describe("getBase64", () => {

	it("Invokes FileReader", async () => {
        const fileReaderSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(() => null);
        getBase64(blob);
        expect(fileReaderSpy).toHaveBeenCalled();
	});
});

describe("uploadFiles", () => {

	it("Invokes axios call and process returned values", async () => {
        const apiResponse = {
            data: [
                { path: "ipfs://hello"},
                { path: "ipfs://world" },
            ]
        };
        mockAxios.post.mockResolvedValueOnce(apiResponse);
        const payload = [
            { path: 'hello.json', content: blob },
            { path: 'world.json', content: blob }
        ];
        const upload = await uploadFiles(payload);
        expect(mockAxios.post).toHaveBeenCalledWith(
            'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
            payload,
            {"headers": {"Content-Type": "application/json", "X-API-KEY": undefined, "accept": "application/json"}}
        );
        expect(upload).toEqual(["ipfs://hello", "ipfs://world"]);
	});
});

describe("uploadFile", () => {

    beforeEach(() => {
        jest.resetModules();
        jest.setTimeout(60000);
        window.editor = {
            AssetManager: {
                add: jest.fn()
            }
        }
    });

	it("Triggers loading events on start, finish and error for files in event", async () => {
        const evt = {
            target: {
                files: []
            }
        }
        const eventStart = new CustomEvent('assetUploadStart');
        const eventEnd = new CustomEvent('assetUploadEnd');
        const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
        mockAxios.post.mockResolvedValueOnce({ data: [{path:'test'}] });
        await uploadFile(evt);
        expect(dispatchEventSpy).toHaveBeenCalledWith(eventStart);
        expect(dispatchEventSpy).toHaveBeenCalledWith(eventEnd);
        expect(window.editor.AssetManager.add).toHaveBeenCalled();
	});

    it("Triggers loading events on start, finish and error for files in dataTransfer", async () => {
        const evt = {
            dataTransfer: {
                files: []
            }
        }
        const eventStart = new CustomEvent('assetUploadStart');
        const eventEnd = new CustomEvent('assetUploadEnd');
        const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
        mockAxios.post.mockResolvedValueOnce({ data: [{path:'test'}] });
        await uploadFile(evt);
        expect(dispatchEventSpy).toHaveBeenCalledWith(eventStart);
        expect(dispatchEventSpy).toHaveBeenCalledWith(eventEnd);
        expect(window.editor.AssetManager.add).toHaveBeenCalled();
	});

    it("Triggers error event on empty input", async () => {
        const eventError = new CustomEvent('assetUploadError');
        const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
        await uploadFile();
        expect(dispatchEventSpy).toHaveBeenCalledWith(eventError);
	});
});

describe("formatFileArrayBase64", () => {

	it("Returns list of name and base64 content", async () => {
        const fileList = [{ name: 'a.jpeg' }, { name: 'b.jpeg' }]
        const fileContentList = ['aaa', 'bbb']
        const list = formatFileArrayBase64(fileList, fileContentList);
        expect(list).toEqual([
            { path:'a.jpeg', content: 'aaa'},
            { path:'b.jpeg', content: 'bbb'}
        ])
	});
});
