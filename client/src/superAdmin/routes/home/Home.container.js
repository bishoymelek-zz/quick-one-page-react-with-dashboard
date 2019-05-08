import { connect } from 'react-redux';
import component from './Home.component';

// Redux actions
import { getListOfApps, startLoading, stopLoading, addError } from '../../../store-redux/Home/actions';

const mapStateToProps = state => ({
  loading: state.sAdminHomeReducer.loading,
  listOfDailyApps: state.sAdminHomeReducer.listOfDailyEntriesLoaded,
  listOfWeeklyApps: state.sAdminHomeReducer.listOfWeeklyEntriesLoaded,
  appsListCurrentPage: state.sAdminHomeReducer.gettingAppsInfo.currentPageNum,
  appsListTotalPagesNum: state.sAdminHomeReducer.gettingAppsInfo.totalPagesNum
});
const mapDispatchToProps = dispatch => ({
  getListOfApps: (dailyList,pageNum) => dispatch(getListOfApps(dailyList,pageNum)),
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading()),
  addError: () => dispatch(addError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
