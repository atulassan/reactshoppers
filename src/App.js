import React, {Fragment} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes/routes';
import './resources/css/fonts/style.css';
import './resources/css/style.css';
import './resources/css/app.css';

function App(props) {
    return (
        <Fragment>
            <ToastContainer />
            <Routes {...props} />
        </Fragment>
    );
}

export default App;
