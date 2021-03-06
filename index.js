'use strict';
/* global $*/
const STORE = {
  items: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  displayUnchecked: false,
  searchTerm: ''
};


function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}

function renderShoppingList() {
  // render the shopping list in the DOM
  const { items, displayUnchecked, searchTerm } = STORE;
  let shoppingListItemsString;

  if (displayUnchecked) {
    const unchecked = items.filter(item => !(item.checked));
    shoppingListItemsString = generateShoppingItemsString(unchecked);

  } else if (searchTerm){
    const searched = items.filter(item => item.name.includes(searchTerm));
    shoppingListItemsString = generateShoppingItemsString(searched);

  } else {
    shoppingListItemsString = generateShoppingItemsString(items);
  }
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  const { items } = STORE;
  items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  const { items } = STORE;
  items[itemIndex].checked = !items[itemIndex].checked;
}

function deleteItemFromList(itemIndex) {
  const { items } = STORE;
  items.splice(itemIndex, 1);
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', function (event) {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', function (event) {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItemFromList(itemIndex);
    renderShoppingList();
  });
}


function handleUnCheckedToggleDisplay() {
  $('.js-check-box').on('change', function () {
    STORE.displayUnchecked = !STORE.displayUnchecked;
    renderShoppingList(); 
  });
}

function setSearchTerm (word) {
  return STORE.searchTerm = word;
}

function handleUserSearch () {
  $('.js-search-input').on('keyup', function () {
    setSearchTerm($(this).val());
    renderShoppingList();
  });
}

function editItemName() {
  // this function will be responsible for editing the title of an item in the user's 
  // shopping list. 
  // its going to listen for a click on an edit button 
    // when clicked an input field will become active or displayed with a submit button
    // upon submit we will grab the value of the input and update the name of the item in
    // our STORE array
  // render new shopping list w/ updated name
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleUnCheckedToggleDisplay();
  handleUserSearch();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);