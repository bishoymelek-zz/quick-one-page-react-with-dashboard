import { connect } from 'react-redux';
import component from './Auth.component';

// Redux actions
// import { sampleAction } from '../../../store-redux/Sample/actions';

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  // sampleAction: (data) => dispatch(sampleAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
