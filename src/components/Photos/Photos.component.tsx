import { Galleria } from "primereact/galleria";

const PhotosViewer: React.FC<{images:Record<string, string>[]}> = ({images}) => {
  
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
          <div className="app-photos__container">
              <div className="app-photos__container-content">
                  <Galleria value={images as any[]} responsiveOptions={responsiveOptions} circular style={{ maxWidth: '800px' }}
                      item={itemTemplate} showThumbnails={false} showIndicators changeItemOnIndicatorHover autoPlay transitionInterval={2000}/>
              </div>
          </div>
      );
  }
  

export default PhotosViewer