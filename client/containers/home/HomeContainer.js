import { connect } from 'react-redux';
import Home from '../../components/home/Home';
import { loadData } from '../../redux/actions/dataCreator';

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { loadData })(Home);
