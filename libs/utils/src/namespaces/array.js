"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveItemInLayout = exports.removeItemInLayout = exports.findItemInLayout = void 0;
// Function to find a specific item in a layout
const findItemInLayout = (item, layout) => {
    for (const [page, element] of layout.entries()) {
        for (const [column, element_] of element.entries()) {
            for (const [section, element__] of element_.entries()) {
                if (element__ === item) {
                    return { page, column, section };
                }
            }
        }
    }
    return null;
};
exports.findItemInLayout = findItemInLayout;
// Function to remove a specific item in a layout
const removeItemInLayout = (item, layout) => {
    const locator = (0, exports.findItemInLayout)(item, layout);
    if (locator) {
        layout[locator.page][locator.column].splice(locator.section, 1);
    }
    return locator;
};
exports.removeItemInLayout = removeItemInLayout;
// Function to move an item within a layout
const moveItemInLayout = (current, target, layout) => {
    try {
        // Create a deep copy of the layout to avoid mutating the original array
        const newLayout = JSON.parse(JSON.stringify(layout));
        // Get the item from the current location
        const item = newLayout[current.page][current.column][current.section];
        // Remove the item from the current location
        newLayout[current.page][current.column].splice(current.section, 1);
        // Insert the item at the target location
        newLayout[target.page][target.column].splice(target.section, 0, item);
        return newLayout;
    }
    catch (_a) {
        return layout;
    }
};
exports.moveItemInLayout = moveItemInLayout;
