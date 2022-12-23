import { useOutletContext } from 'react-router-dom';
// import './Video.component.scss'

import React, { useEffect } from 'react'
import { Viewport } from '../../enums/viewport.enums';
import { Card } from 'primereact/card';
import PhotosViewer from '../Photos/Photos.component';

const Video = () => {

    const images = [
        {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0000.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 1"},
        {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0002.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 2"},
        {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0003.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 3"},
        {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0004.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 4"},
        {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0005.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 5"},
        {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0006.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 6"},
        {"itemImageSrc": "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0007.jpg","thumbnailImageSrc": "images/galleria/galleria1s.jpg","alt": "Description for Image 1","title": "Title 7"},
    ]

    const setViewport: React.Dispatch<React.SetStateAction<Viewport>> =
    useOutletContext();

    useEffect(() => {
        setViewport(Viewport.disable)
    }, [])
    
  return (
    <div className="app-gallery-video__container">
    <Card>
        <div className="app-gallery-video__container-content">
            <h1>El Video de Nuestra Boda</h1>
            <p>Una demostracion de nuestra historia con el paso de el tiempo</p>
        </div>
        <div className="app-gallery-video__container-content-video">
            <video controls poster='https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/poster-video.jpg'>
                <source src='https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/videos/video.mp4' type='video/mp4' />
            </video>
        </div>
    </Card>
</div>
  )
}

export default Video