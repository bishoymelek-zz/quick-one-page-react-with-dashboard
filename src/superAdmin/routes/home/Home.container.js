import { connect } from 'react-redux';
import component from './Home.component';

// Redux actions
import { createApplicant, updateApplicant } from '../../../store-redux/Home/actions';

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  createApplicant: (data) => dispatch(createApplicant(data)),
  updateApplicant: (data) => dispatch(updateApplicant(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
