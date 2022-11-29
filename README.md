# Development

### Link to Deployed Website
https://sexylemur666.github.io/react-development/

### Goal and Value of the Application

This is an shopping website for Lemur's Bakery! The app is made for helping my customers easily find and shop for baked goods they love.

### Usability Principles Considered

- **Structures and organizations**: the webpage is organized into two  vertical sections: menu on the left, cart and sort/filter options on the right. Within each section contents are grouped using different font sizes and margins.
- **Learnability**: buttons for adding and removing an item from the cart are color-coded, and so is the Clear cart button. 
- **Fault tolerance**: The hit areas for add and remove buttons are extended to each cover a half of the menu item card, improving fault tolerance.
- **Visibility of system status**: each menu item card displays the currently bought quantity by the user, which can be easier for the users to locate.

### Organization of Components

- The main container is a `row` flexbox with `menu` and `side` divs that are `space-between`.

- The `menu` itself is a `row` flexbox of menu `item` cards with `justify-content: flex-start`.
- Each `item` card is a `column` flexbox with the item image and text info `space-between`.
- The `side` div contains three `side-group` divs: `cart`, `sort`, and `filter` vertically laid out.

### How Data is Passed Down Through Components

- The `sortby-radio` and `filter-checkbox` components receive user-specified sorting and filtering options and update the states `sortByOption` and `filterStatus`.
- `sortByOption` and `filterStatus` are used to filter and sort `bakeryData` into `displayItems`.

- `displayItems` get passed to component `BakeryItem` along with state `count` (of items in the shopping cart) to generate a menu flexbox.

### How the User Triggers State Changes

The user can trigger state changes in the following two ways:

1. Clicking the remove or add button changes the state `count`.
2. Updating the `sortby-radio` (or the `filter-checkbox`) changes the state `sortByOption` (or `filterStates`), which in turn changes the state `displayItems`.
