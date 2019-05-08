import clientsApi from '../../api/clientsApi';

const startLoading = () => dispatch => {
    dispatch({
        type: 'LOADING/START',
    });
}

const stopLoading = () => dispatch => {
    dispatch({
        type: 'LOADING/STOP',
    });
}

const addError = (err) => dispatch => {
    dispatch({
        type: 'ERRORS/ADD_ONE',
        error: err
    });
}


const getListOfApps = (isDailyList=true,pageNum = 1) => async  dispatch => {
    try {
        const resToGetList = await clientsApi.getAllApps(isDailyList, pageNum);
        const resBodyToGetList = await resToGetList.json();
        if (resToGetList.status === 200 && resBodyToGetList.data) {
            if (pageNum !== 1) {
                const dailyVsWeeklyType = isDailyList ? 'APPLICATIONS/GET_ALL/DAILY/UPDATE_LIST_WITH_MORE_ENTRIES':'APPLICATIONS/GET_ALL/WEEKLY/UPDATE_LIST_WITH_MORE_ENTRIES'
                dispatch({
                    type: dailyVsWeeklyType,
                    dataFetched: resBodyToGetList.data,
                    currentPageNum: resBodyToGetList.pages.current,
                    totalPagesNum: resBodyToGetList.pages.total
                });
            } else {
                const dailyVsWeeklyType = isDailyList ? 'APPLICATIONS/GET_ALL/DAILY/UPDATE_LIST_WITH_INITIAL_ENTRIES':'APPLICATIONS/GET_ALL/WEEKLY/UPDATE_LIST_WITH_INITIAL_ENTRIES'
                dispatch({
                    type: dailyVsWeeklyType,
                    dataFetched: resBodyToGetList.data,
                    currentPageNum: resBodyToGetList.pages.current,
                    totalPagesNum: resBodyToGetList.pages.total
                });
            }
            dispatch({
                type: 'LOADING/STOP',
            });
        } else {
            dispatch({
                type: 'ERRORS/ADD_ONE',
                error: resBodyToGetList.message,
            });
        }
    } catch (error) {
        dispatch({
            type: 'ERRORS/ADD_ONE',
            error: error,
        });
    }
}


export {
    startLoading,
    stopLoading,
    addError,
    getListOfApps
}