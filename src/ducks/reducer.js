const initialState = {
  cart: [],
  item1: 0,
  item2: '',
  item3: '',
  displayItem1: false,
  displayItem2: false,
  displayItem3: false,
  showWarning: true
}

const UPDATE_CART = 'UPDATE_CART';
const CLEAR_CART = 'CLEAR_CART'
const UPDATE_ITEM1_QUANTITY = 'UPDATE_ITEM1_QUANTITY'
const UPDATE_ITEM2_QUANTITY = 'UPDATE_ITEM2_QUANTITY'
const UPDATE_ITEM3_QUANTITY = 'UPDATE_ITEM3_QUANTITY'
const DISPLAY_ITEM1 = 'DISPLAY_ITEM1'
const DISPLAY_ITEM2 = 'DISPLAY_ITEM2'
const DISPLAY_ITEM3 = 'DISPLAY_ITEM3'
const HIDE_WARNING = 'HIDE_WARNING'


export function addToCart(item) {
  // console.log("THIS HIT", item)
  return {
    type: UPDATE_CART,
    payload: item
  }
}


export function clearReduxCart() {
  return {
    type: CLEAR_CART,
    payload: null
  }
}


export function updateItem1Quantity(value) {
  console.log("REDUCER HIT", value)
  return {
    type: UPDATE_ITEM1_QUANTITY,
    payload: value
  }
}

export function updateItem2Quantity(value) {
  console.log("REDUCER HIT", value)
  return {
    type: UPDATE_ITEM2_QUANTITY,
    payload: value
  }
}

export function updateItem3Quantity(value) {
  console.log("REDUCER HIT", value)
  return {
    type: UPDATE_ITEM3_QUANTITY,
    payload: value
  }
}

export function showItemInCart(item, tf) {
  if (item === 1) {
    return {
      type: DISPLAY_ITEM1,
      payload: tf
    }
  }
  if (item === 2) {
    return {
      type: DISPLAY_ITEM2,
      payload: tf
    }
  }
  if (item === 3) {
    return {
      type: DISPLAY_ITEM3,
      payload: tf
    }
  }
}

export function hideWarning() {
  console.log("THIS WAS CLICKED")
  return {
    type: HIDE_WARNING,
    payload: false
  }
}



export default function reducer(state = initialState, action) {
  console.log("action", action.type)
  console.log("paylod", action.payload)
  switch (action.type) {

    case UPDATE_CART:
      return Object.assign({}, state, { cart: action.payload })
    case CLEAR_CART:
      return Object.assign({}, state, { cart: action.payload, item1: null, item2: null, item3: null })


    case UPDATE_ITEM1_QUANTITY:
      return Object.assign({}, state, { item1: action.payload })
    case UPDATE_ITEM2_QUANTITY:
      return Object.assign({}, state, { item2: action.payload })
    case UPDATE_ITEM3_QUANTITY:
      return Object.assign({}, state, { item3: action.payload })


    case DISPLAY_ITEM1:
      return Object.assign({}, state, { displayItem1: action.payload })
    case DISPLAY_ITEM2:
      return Object.assign({}, state, { displayItem2: action.payload })
    case DISPLAY_ITEM3:
      return Object.assign({}, state, { displayItem3: action.payload })
    case HIDE_WARNING:
      return Object.assign({}, state, { showWarning: action.payload })

    default: return state;
  }

}










