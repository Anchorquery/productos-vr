import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '@google/model-viewer';

import "./solomodel.css"



const SoloModelo = () => {
    const [image, setImage] = useState({
        title: "",
        url: "",
        url2:"", //url ios
        medidas: "",
        slug: ""
    });
    const params = useParams();

    useEffect(() => {
        (async () => {
            const slug = params.slug;
            if (!slug) {
                console.error('Slug inválido:', params.slug);
                return;
            }
            const res = await axios.get(`https://test.ddvelop.com/api/images/${slug}`);
            setImage(res.data);
        })();
    }, [params.slug]);

    const startAR = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // La cámara está activa, puedes hacer algo con el flujo de video si lo deseas
            console.log("Cámara activada");
        } catch (error) {
            // Espera a que se cargue el DOM antes de buscar el elemento
            document.addEventListener("DOMContentLoaded", () => {
                const errorMessageElement = document.getElementById("error-message");
                if (errorMessageElement) {
                    errorMessageElement.textContent = "Error al acceder a la cámara.";
                }
            });
            console.error("Error al acceder a la cámara:", error);
        }
    };

    function cerrarCartel() {
        // Oculta el cartel
        document.querySelector('.popup').style.display = 'none';
    }

    const shouldDisableZoom = true

    const attributes = { 
        'disable-zoom': shouldDisableZoom ? true : false
       };


    return (
        <div className="uno row">
            <div className="col-md-5 offset-md-3">
                <div className="cartita card bg-light">
                    <div class="popup">
                        <p>Debes estar entre 1.5 metro a 2 metros de distancia para visualizar en el tamaño aproximado </p>
                        <button onClick={cerrarCartel}>Entendido</button>
                    </div>

                    <model-viewer
                        src={image.url}
                        ios-src={image.url2}//ios
                        alt={image.title}
                        style={{ width: '100%', height: '400px' }}
                        auto-rotate
                        camera-controls
                        ar
                        ar-modes="scene-viewer webxr quick-look"
                        tone-mapping="commerce"
                        shadow-intensity="1"
                        camera-orbit="0deg 45deg 2m"
                        max-field-of-view="45deg"
                        min-field-of-view="45deg"
                        {...attributes}
                    ></model-viewer>
                    {/* <h1 className="diga1">{image.title}</h1>
                    <h5 className="diga1">Medidas: {image.medidas}</h5> */}

                    <button className="btn1 btn-primary" onClick={startAR}>Ver en tu espacio</button>
                </div>
            </div>
        </div>
    );
};

export default SoloModelo;