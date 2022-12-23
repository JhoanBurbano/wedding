import React, { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Viewport } from "../../enums/viewport.enums";
import "./Location.component.scss";
import { Card } from "primereact/card";
import { Galleria } from 'primereact/galleria';

const Location = () => {
  const setViewport: React.Dispatch<React.SetStateAction<Viewport>> =
    useOutletContext();

  useEffect(() => {
    // setViewport(Viewport.disable);
  }, []);
  return (
    <div className="app-location__container">
      <Card>
        <div className="app-location__container-content">
          <div className="app-location__container-content-header">
          <h1 className="app-location__container-content-header-title">MIRAVALLE</h1>
          <p className="app-location__container-content-header-subtitle">Hotel Campestre</p>
          <br />
          <p className="app-location__container-content-header-text">
            La recepcion será en el hotel miravalle que esta ubicado a la entrada del corregimiento <b className="app-location__container-content-header-bold">El Bordo, Cauca</b> en donde hay un salon de eventos y dos piscinas en las cuales se exige el uso de <b>traje de baño en licra</b> que se recomienda llevar.
            <br />
            Tambien es de saber que la temperatura de la localidad es alta, por lo que se recomienda ropa fresca para su comodidad
          </p>
          </div>
          <div className="app-location__container-content-gallery">
            <h2>Galeria de fotos</h2>
            <br />
            <GalleriaResponsiveDemo/>
          </div>
          <div className="mapouter">
            <h2>Ubicacion</h2>
            <br />
            <div className="gmap_canvas">
              <iframe
                className="gmap_iframe"
                width="100%"
                scrolling="no"
                src="https://maps.google.com/maps?width=675&amp;height=400&amp;hl=en&amp;q=Miravalle, El Bordo&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Location;



const GalleriaResponsiveDemo = () => {

  const images = [
    {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0000.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 1"},
    {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0002.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 2"},
    {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0003.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 3"},
    {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0004.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 4"},
    {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0005.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 5"},
    {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0006.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 6"},
    {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0007.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 7"},
]

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item:any) => {
        return <img src={item.itemImageSrc} onError={(e:any) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%', display: 'block' }} />
    }

    return (
        <div className="app-gallery__container">
            <div className="app-gallery__container-content">
                <Galleria value={images} responsiveOptions={responsiveOptions} circular style={{ maxWidth: '800px' }}
                    item={itemTemplate} showThumbnails={false} showIndicators changeItemOnIndicatorHover autoPlay transitionInterval={2000}/>
            </div>
        </div>
    );
}
