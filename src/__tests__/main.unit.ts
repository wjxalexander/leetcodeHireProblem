import { parseError } from "../index";

const case1 = {
    name: "chrome",
    message: "error",
    stack: `TypeError: Error raised
        at bar http://192.168.31.8:8000/c.js:2:9
        at <anonymous>:1:11`,
};
const case2 = {
    name: "chrome",
    message: "error",
    stack: `TypeError: Error raised
        at <anonymous>:1:11`,
};

const case3 = {
    name: "chrome",
    message: "error",
    stack: `at <anonymous>:1:11`,
};

const case4 = {
    name: "chrome",
    message: "error",
    stack: `
        at bar http://192.168.31.8:8000/c.js:2:9
        at <anonymous>:1:11
    `,
};

const chromeTest = {
    name: "chrome",
    message: "error",
    stack: `TypeError: Error raised
        at bar http://192.168.31.8:8000/c.js:2:9
        at foo http://192.168.31.8:8000/b.js:4:15
        at calc http://192.168.31.8:8000/a.js:4:3
        at <anonymous>:1:11
        at http://192.168.31.8:8000/a.js:22:3
        `,
};

const FireFoxTest = {
    name: "fireFox",
    message: "error",
    stack: `bar@http://192.168.31.8:8000/c.js:2:9
      foo@http://192.168.31.8:8000/b.js:4:15
      calc@http://192.168.31.8:8000/a.js:4:3
      <anonymous>:1:11
      http://192.168.31.8:8000/a.js:22:3
      `,
};

describe("simpleTest", () => {
    it("simpleTest", () => {
        expect(parseError(case1)).toEqual({
            message: "Error raised",
            stack: [
                {
                    line: 2,
                    column: 9,
                    filename: "http://192.168.31.8:8000/c.js",
                },
            ],
        });
    });
});

describe("simpleTest2", () => {
    it("simpleTest2", () => {
        expect(parseError(case2)).toEqual({
            message: "Error raised",
            stack: [],
        });
    });
});

describe("simpleTest3", () => {
    it("simpleTest3", () => {
        expect(parseError(case3)).toEqual({
            message: "",
            stack: [],
        });
    });
});

describe("simpleTest4", () => {
    it("simpleTest4", () => {
        expect(parseError(case4)).toEqual({
            message: "",
            stack: [{
                line: 2,
                column: 9,
                filename: "http://192.168.31.8:8000/c.js",
            }],
        });
    });
});

describe("chromeTest", () => {
    it("chromeTest", () => {
        expect(parseError(chromeTest)).toEqual({
            message: "Error raised",
            stack: [{
                line: 2,
                column: 9,
                filename: "http://192.168.31.8:8000/c.js",
            },
            {
                line: 4,
                column: 15,
                filename: "http://192.168.31.8:8000/b.js",
            },
            {
                line: 4,
                column: 3,
                filename: "http://192.168.31.8:8000/a.js",
            },
            {
                line: 22,
                column: 3,
                filename: "http://192.168.31.8:8000/a.js",
            },
            ],
        });
    });
});
describe("FireFoxTestFalse", () => {
    it("FireFoxTestFalse", () => {
        expect(parseError(FireFoxTest)).not.toEqual({
            message: "Error raised",
            stack: [{
                line: 2,
                column: 9,
                filename: "http://192.168.31.8:8000/c.js",
            },
            {
                line: 4,
                column: 15,
                filename: "http://192.168.31.8:8000/b.js",
            },
            {
                line: 4,
                column: 3,
                filename: "http://192.168.31.8:8000/a.js",
            },
            {
                line: 22,
                column: 3,
                filename: "http://192.168.31.8:8000/a.js",
            },
            ],
        });
    });
});
describe("FireFoxTest", () => {
    it("FireFoxTest", () => {
        expect(parseError(FireFoxTest)).toEqual({
            message: "",
            stack: [{
                line: 2,
                column: 9,
                filename: "http://192.168.31.8:8000/c.js",
            },
            {
                line: 4,
                column: 15,
                filename: "http://192.168.31.8:8000/b.js",
            },
            {
                line: 4,
                column: 3,
                filename: "http://192.168.31.8:8000/a.js",
            },
            {
                line: 22,
                column: 3,
                filename: "http://192.168.31.8:8000/a.js",
            },
            ],
        });
    });
});
