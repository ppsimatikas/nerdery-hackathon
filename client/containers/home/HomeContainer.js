import { connect } from 'react-redux';
import Home from '../../components/home/Home';
import { justParked } from '../../redux/actions/dataCreator';
import { locationLoaded } from '../../redux/actions/locationCreator';

const mapStateToProps = (state) => ({
    data: state.data,
    location: state.location
});

export default connect(mapStateToProps, {
    locationLoaded,
    justParked
})(Home);
