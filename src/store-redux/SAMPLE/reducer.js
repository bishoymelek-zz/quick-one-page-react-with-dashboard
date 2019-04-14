/*
    Simple Reducer
*/

// initial state
const initialState = {
    result: "Initial state!"
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            return {
                result: action.payload
            }
        default:
            return initialState
    }
}