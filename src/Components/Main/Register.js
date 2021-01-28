import React, { Component } from 'react';

class Register extends Component {

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
                                            <h6 className="txt-upper mb-3">Persönliche Informationen</h6>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>First Name <span className="redStar">*</span></label>
                                            <input title="Vorname" type="text" name="firstName" className="form-control" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label>Last Name <span className="redStar">*</span></label>
                                            <input title="Nachname" type="text" name="lastName" className="form-control" />
                                        </div>
                                        <div className="col-lg-12">
                                            <label>Company</label>
                                            <input title="Firma" type="text" name="company" className="form-control" />
                                        </div>
                                        <div className="col-lg-12">
                                            <label>Address 1</label>
                                            <input title="Adresse" type="text" name="address1" className="form-control" />
                                        </div>
                                        <div className="col-lg-12">
                                            <label>Address 2</label>
                                            <input title="Adresszusatz" type="text" name="address2" className="form-control" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label>PostCode <span className="redStar">*</span></label>
                                            <input title="Vorname" type="text" name="postcode" className="form-control" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label>City <span className="redStar">*</span></label>
                                            <input title="Vorname" type="text" name="city" className="form-control" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label>State <span className="redStar">*</span></label>
                                            <input title="state" type="text" name="state" className="form-control" />
                                        </div>
                                        <div className="col-lg-6">
                                            <label>Country <span className="redStar">*</span></label>
                                            <input title="Country" type="text" name="country" className="form-control" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-4 col-md-6 ">
                                <h6 className="txt-upper mb-3">VORTEILE EINER REGISTRIERUNG</h6>
                                <ul className="list">
                                    <li>Schneller Bestellvorgang</li>
                                    <li>Sie haben einfachen Zugriff auf Ihre letzten Bestellungen</li>
                                    <li>Sie können Ihre letzten Bestellungen mit einem Klick wiederholen</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Register;