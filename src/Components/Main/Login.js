import React, { Component } from 'react';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false, 
            fields:{}, 
            errors:{}, 
        }
    }

    render() {
        
        return (
            <React.Fragment> 
                <div className="site-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-6">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h6 className="txt-upper mb-3">Login</h6>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>Email <span className="redStar">*</span></label>
                                            <input title="Email" type="text" name="email" className="form-control" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label>Password <span className="redStar">*</span></label>  
                                            <input title="password" type="text" name="password" className="form-control" />
                                        </div>
                                        <div className="col-lg-12">
                                            <br/>
                                            <p><button type="submit" name="submit" className="buy-now btn btn-sm btn-primary" value="Login">Login</button></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-4 col-md-6 ">
                                <h6 className="txt-upper mb-3">Anmelden oder Benutzerkonto erstellen</h6>
                                <p>Wenn du ein Benutzerkonto einrichtest, profitierst du von folgenden Vorteilen:</p>
                                <ul className="list">
                                    <li>
                                        <i className="fa fa-check" aria-hidden="true"></i> <span>Zoocial Community</span>
                                    </li>
                                    <li>
                                        <i className="fa fa-check" aria-hidden="true"></i> <span>Schneller Bestellvorgang</span>
                                    </li>
                                    <li>
                                        <i className="fa fa-check" aria-hidden="true"></i> <span>Du hast einfachen Zugriff auf deine letzten Bestellungen</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;