// initial state
const initialState = {
    loading: false,
    listOfDailyEntriesLoaded: [],
    listOfWeeklyEntriesLoaded: [],
    gettingAppsInfo: {
        currentPageNum: null,
        totalPagesNum: null
    },
    errors: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'ERRORS/ADD_ONE':
            return {
                ...state,
                errors: [
                    ...state.errors,
                    action.error
                ]
            }
        case 'LOADING/START':
            return {
                ...state,
                loading: true
            }
        case 'LOADING/STOP':
            return {
                ...state,
                loading: false
            }
        case 'APPLICATIONS/GET_ALL/DAILY/UPDATE_LIST_WITH_MORE_ENTRIES':
            return {
                ...state,
                listOfDailyEntriesLoaded: state.listOfDailyEntriesLoaded.concat(action.dataFetched),
                gettingAppsInfo: {
                    ...state.gettingAppsInfo,
                    currentPageNum: action.currentPageNum,
                    totalPagesNum: action.totalPagesNum
                }
            }
        case 'APPLICATIONS/GET_ALL/DAILY/UPDATE_LIST_WITH_INITIAL_ENTRIES':
            return {
                ...state,
                listOfDailyEntriesLoaded: action.dataFetched,
                gettingAppsInfo: {
                    ...state.gettingAppsInfo,
                    currentPageNum: action.currentPageNum,
                    totalPagesNum: action.totalPagesNum
                }
            }
        case 'APPLICATIONS/GET_ALL/WEEKLY/UPDATE_LIST_WITH_MORE_ENTRIES':
            return {
                ...state,
                listOfWeeklyEntriesLoaded: state.listOfWeeklyEntriesLoaded.concat(action.dataFetched),
                gettingAppsInfo: {
                    ...state.gettingAppsInfo,
                    currentPageNum: action.currentPageNum,
                    totalPagesNum: action.totalPagesNum
                }
            }
        case 'APPLICATIONS/GET_ALL/WEEKLY/UPDATE_LIST_WITH_INITIAL_ENTRIES':
            return {
                ...state,
                listOfWeeklyEntriesLoaded: action.dataFetched,
                gettingAppsInfo: {
                    ...state.gettingAppsInfo,
                    currentPageNum: action.currentPageNum,
                    totalPagesNum: action.totalPagesNum
                }
            }

        default:
            return initialState
    }
}