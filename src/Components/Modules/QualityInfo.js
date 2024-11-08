import React from 'react';
import Slide from 'react-reveal/Slide';

const QualityInfo = () => {
    return (
        <div className="site-section site-section-sm site-blocks-1">
            <div className="container">
                <div className="row">
                    <Slide top>
                        <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="">
                            <div className="icon mr-4 align-self-start">
                                <span className="icon-truck"></span>
                            </div>
                            <div className="text">
                                <h2 className="text-uppercase">Free Shipping</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam.
                                    Integer accumsan
                                tincidunt fringilla.</p>
                            </div>
                        </div>
                    </Slide>
                    <Slide bottom>
                        <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="icon mr-4 align-self-start">
                                <span className="icon-refresh2"></span>
                            </div>
                            <div className="text">
                                <h2 className="text-uppercase">Free Returns</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam.
                                    Integer accumsan
                                tincidunt fringilla.</p>
                            </div>
                        </div>
                    </Slide>
                    <Slide top>
                        <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="icon mr-4 align-self-start">
                                <span className="icon-help"></span>
                            </div>
                            <div className="text">
                                <h2 className="text-uppercase">Customer Support</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam.
                                    Integer accumsan
                                tincidunt fringilla.</p>
                            </div>
                        </div>
                    </Slide>
                </div>
            </div>
        </div>
    )
}

export default QualityInfo;