const createApplicant = (data) => dispatch => {
    dispatch({
        type: 'CREATE_NEW_APPLICANT',
        data
    })
}

const updateApplicant = (data) => dispatch => {
    dispatch({
        type: 'UPDATE_EXISTING_APPLICANT',
        data
    })
} 

export {
    createApplicant,
    updateApplicant
}
