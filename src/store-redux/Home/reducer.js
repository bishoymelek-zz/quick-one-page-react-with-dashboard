// initial state
const initialState = {
    createApplicant: null,
    updateApplicant:null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_NEW_APPLICANT':
            return {
                ...state,
                createApplicant: action.data,
                updateApplicant: null
            }
        case 'UPDATE_EXISTING_APPLICANT':
            return {
                ...state,
                updateApplicant: action.data,
                createApplicant: null
            }            
        default:
            return initialState
    }
}