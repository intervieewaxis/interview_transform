"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const array_1 = require("../array");
(0, vitest_1.describe)("findItemInLayout", () => {
    (0, vitest_1.it)("should find the correct location of an item", () => {
        const layout = [
            [["item1"], ["item2"]],
            [["item3"], ["item4"]],
        ];
        const item = "item3";
        const expectedLocation = { page: 1, column: 0, section: 0 };
        const location = (0, array_1.findItemInLayout)(item, layout);
        (0, vitest_1.expect)(location).toEqual(expectedLocation);
    });
    (0, vitest_1.it)("should return null if the item is not found", () => {
        const layout = [
            [["item1"], ["item2"]],
            [["item3"], ["item4"]],
        ];
        const item = "item5";
        const location = (0, array_1.findItemInLayout)(item, layout);
        (0, vitest_1.expect)(location).toBeNull();
    });
});
(0, vitest_1.describe)("removeItemInLayout", () => {
    (0, vitest_1.it)("should remove the item and return its location", () => {
        const layout = [
            [["item1"], ["item2"]],
            [["item3"], ["item4"]],
        ];
        const item = "item3";
        const expectedLocation = { page: 1, column: 0, section: 0 };
        const location = (0, array_1.removeItemInLayout)(item, layout);
        (0, vitest_1.expect)(location).toEqual(expectedLocation);
        (0, vitest_1.expect)(layout[1][0]).not.toContain(item);
    });
    (0, vitest_1.it)("should return null and not modify layout if the item is not found", () => {
        const layout = [
            [["item1"], ["item2"]],
            [["item3"], ["item4"]],
        ];
        const item = "item5";
        const location = (0, array_1.removeItemInLayout)(item, layout);
        (0, vitest_1.expect)(location).toBeNull();
        (0, vitest_1.expect)(layout).toEqual([
            [["item1"], ["item2"]],
            [["item3"], ["item4"]],
        ]);
    });
});
(0, vitest_1.describe)("moveItemInLayout", () => {
    (0, vitest_1.it)("should move an item from the current location to the target location", () => {
        const layout = [
            [["item1"], ["item2"]],
            [["item3"], ["item4"]],
        ];
        const current = { page: 0, column: 1, section: 0 };
        const target = { page: 1, column: 0, section: 1 };
        const expectedLayout = [
            [["item1"], []],
            [["item3", "item2"], ["item4"]],
        ];
        const newLayout = (0, array_1.moveItemInLayout)(current, target, layout);
        (0, vitest_1.expect)(newLayout).toEqual(expectedLayout);
    });
    (0, vitest_1.it)("should not mutate the original layout array", () => {
        const layout = [
            [["item1"], ["item2"]],
            [["item3"], ["item4"]],
        ];
        const layoutCopy = JSON.parse(JSON.stringify(layout));
        const current = { page: 0, column: 1, section: 0 };
        const target = { page: 1, column: 0, section: 1 };
        (0, array_1.moveItemInLayout)(current, target, layout);
        (0, vitest_1.expect)(layout).toEqual(layoutCopy);
    });
    (0, vitest_1.it)("should handle the case where the current and target locations are the same", () => {
        const layout = [
            [["item1"], ["item2"]],
            [["item3"], ["item4"]],
        ];
        const current = { page: 1, column: 0, section: 0 };
        const target = { page: 1, column: 0, section: 0 };
        const newLayout = (0, array_1.moveItemInLayout)(current, target, layout);
        (0, vitest_1.expect)(newLayout).toEqual(layout);
    });
    (0, vitest_1.it)("moves an item to the specified target location", () => {
        const layout = [
            [["A", "B"], ["C"]],
            [["D"], ["E", "F"]],
        ];
        const current = { page: 0, column: 0, section: 1 };
        const target = { page: 1, column: 1, section: 1 };
        const result = (0, array_1.moveItemInLayout)(current, target, layout);
        (0, vitest_1.expect)(result).toEqual([
            [["A"], ["C"]],
            [["D"], ["E", "B", "F"]],
        ]);
    });
    (0, vitest_1.it)("handles moving an item within the same column", () => {
        const layout = [[["A", "B"]], [["C", "D"]]];
        const current = { page: 0, column: 0, section: 0 };
        const target = { page: 0, column: 0, section: 1 };
        const result = (0, array_1.moveItemInLayout)(current, target, layout);
        (0, vitest_1.expect)(result).toEqual([[["B", "A"]], [["C", "D"]]]);
    });
    (0, vitest_1.it)("handles moving an item to the beginning of a column", () => {
        const layout = [[["A"], ["B", "C"]], [["D"]]];
        const current = { page: 1, column: 0, section: 0 };
        const target = { page: 0, column: 1, section: 0 };
        const result = (0, array_1.moveItemInLayout)(current, target, layout);
        (0, vitest_1.expect)(result).toEqual([[["A"], ["D", "B", "C"]], [[]]]);
    });
    (0, vitest_1.it)("handles moving an item to an empty column", () => {
        const layout = [[["A"], []], [["B"]]];
        const current = { page: 0, column: 0, section: 0 };
        const target = { page: 0, column: 1, section: 0 };
        const result = (0, array_1.moveItemInLayout)(current, target, layout);
        (0, vitest_1.expect)(result).toEqual([[[], ["A"]], [["B"]]]);
    });
    (0, vitest_1.it)("returns the same layout if the current location is invalid", () => {
        const layout = [[["A"], ["B"]]];
        const current = { page: 2, column: 0, section: 0 };
        const target = { page: 0, column: 1, section: 0 };
        const result = (0, array_1.moveItemInLayout)(current, target, layout);
        (0, vitest_1.expect)(result).toEqual(layout);
    });
    (0, vitest_1.it)("returns the same layout if the target location is invalid", () => {
        const layout = [[["A"], ["B"]]];
        const current = { page: 0, column: 0, section: 0 };
        const target = { page: 2, column: 0, section: 0 };
        const result = (0, array_1.moveItemInLayout)(current, target, layout);
        (0, vitest_1.expect)(result).toEqual(layout);
    });
});
