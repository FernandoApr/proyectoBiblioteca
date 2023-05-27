import React from 'react'
import img1 from '../img/1.png';
import img2 from '../img/2-1.png';

const Inicio = () => {
    return (
        <div>
            <div id="carouselExampleAutoplaying" className="carousel slide mt-2" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                        <img src={img2} className="d-block w-100" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="gdlr-core-pbf-wrapper  mt-2">
                <div className="gdlr-core-pbf-background-wrap" style={{ backgroundColor: '#dcdcdc' }}>
                    <div className="gdlr-core-pbf-wrapper-content gdlr-core-js ">
                        <div className="gdlr-core-pbf-wrapper-container clearfix gdlr-core-container">
                            <div className="gdlr-core-pbf-column gdlr-core-column-60 gdlr-core-column-first">
                                <div className="gdlr-core-pbf-column-content-margin gdlr-core-js ">
                                    <div className="gdlr-core-pbf-column-content clearfix gdlr-core-js ">
                                        <div className="gdlr-core-pbf-element">
                                            <div
                                                className="gdlr-core-text-box-item gdlr-core-item-pdlr gdlr-core-item-pdb gdlr-core-left-align gdlr-core-no-p-space">
                                                <div className="gdlr-core-text-box-item-content" style={{ textTransform: 'none', color: '#000000' }}>
                                                    <h2
                                                        style={{ textAlign: 'center' }}
                                                    ><span

                                                    ><strong>Horarios de
                                                        atención al usuario</strong></span></h2>
                                                    <p
                                                        style={{ textAlign: 'center', fontSize: '18px' }}
                                                    >LUNES A VIERNES 7:00 a.m a 8:00 p.m
                                                    </p>
                                                    <p
                                                        style={{ textAlign: 'center', fontSize: '18px' }}
                                                    >SABADOS: 8:00 a.m a 5:00 p.m</p>
                                                    <p>&nbsp;</p>
                                                    <p
                                                        style={{ textAlign: 'center' }}
                                                    ><strong>¡Ubicados en el Bloque 2, Biblioteca Abierta
                                                        piso 1 y Sala de lectura piso 2!</strong></p>
                                                    <p>&nbsp;</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inicio