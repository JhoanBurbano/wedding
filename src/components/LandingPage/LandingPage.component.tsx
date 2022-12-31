/* eslint-disable jsx-a11y/iframe-has-title */
import { Card } from "primereact/card";
import Navbar from "../Navbar/Navbar.component";
import "./LandingPage.component.scss";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableRowToggleParams,
} from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import React, { FormEvent, useRef, useState } from "react";
import { IServices, IInvites, IFamilies } from "../../interfaces";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { capitalized } from "../../utils/capitalized";
import { downloadBase64File } from "../../utils/downloadFile";
import { Galleria } from "primereact/galleria";

const LandingPage: React.FC<IServices> = (props) => {
  // useEffect(() => {
  //   window.addEventListener('scroll', ()=>{
  //     window.scroll(0,100 || (window.scrollY + window.screen.height))
  //   })

  //   return () => {
  //     window.removeEventListener('scroll', ()=>{})
  //   }
  // }, [window.scrollY])

  return (
    <div className="app-landingpage__container">
      <Navbar />
      <Video />
      <Admin {...props} />
      <Location />
    </div>
  );
};

export default LandingPage;

const Video: React.FC<{}> = () => {
  const ref = useRef<HTMLVideoElement>(null);
  function onPlay() {
    if (ref.current?.paused) {
      return ref.current?.play();
    }
    return ref.current?.pause();
  }

  function onFullScreen() {
    ref.current?.requestFullscreen();
  }

  return (
    <section className="app-video__container" id="video">
      <video
        ref={ref}
        className="app-video__container-video"
        poster="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/poster-video.jpg"
      >
        <source
          src="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/videos/video.mp4"
          type="video/mp4"
        />
      </video>
      <div className="app-video__container-controls" onClick={onPlay}>
        <div className="app-video__container-controls-toolbar">
          <Button
            onClick={onPlay}
            icon="pi pi-play"
            className="p-button-rounded p-button-warning p-button-text"
            aria-label="Play"
          />
          <Button
            onClick={onFullScreen}
            icon="pi pi-external-link"
            className="p-button-rounded p-button-warning p-button-text"
            aria-label="Fullscreen"
          />
        </div>
      </div>
    </section>
  );
};

const Admin: React.FC<IServices> = (props) => {
  const { getFamily, deleteFamily, families, deleteMember } = props;

  const [openD, setOpenD] = useState(false);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>();

  async function openDialog(id: string) {
    try {
      await getFamily(id);
      setOpenD(true);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  function onHide() {
    setOpenD(false);
  }

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => onHide()}
          autoFocus
          className="p-button-text"
        />
      </div>
    );
  };

  const collapseAll = () => {
    setExpandedRows(undefined);
  };

  const expandAll = () => {
    let _expandedRows: Record<string, any> = {};
    families.forEach((p) => (_expandedRows[`${p._id as string}`] = true));

    setExpandedRows(_expandedRows);
  };

  function rowExpansionTemplate(data: IFamilies) {
    return (
      data.integrants.length && (
        <DataTable
          className=""
          value={data.integrants}
          responsiveLayout="stack"
          size="small"
        >
          <Column
            header={() => <p>Integrantes</p>}
            body={(invite: IInvites) => {
              return (
                <p
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {invite.name}
                </p>
              );
            }}
          ></Column>
          <Column
            body={(invite: IInvites) => {
              return (
                <p
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {invite.lastname}
                </p>
              );
            }}
          ></Column>
          <Column
            body={({ _id }: IInvites) => (
              <>
                <Button
                  className="p-button-danger"
                  style={{ transform: "scale(.5)" }}
                  icon="pi pi-delete-left"
                  onClick={() =>
                    deleteMember(data._id as string, _id as string)
                  }
                />
              </>
            )}
            header="Acciones"
          ></Column>
        </DataTable>
      )
    );
  }

  const allowExpansion = (rowData: IFamilies) => {
    return rowData.integrants.length > 0;
  };

  return (
    <section className="app-admin__container" id="list">
      {/* <Dialog
        header="Header"
        visible={openD}
        style={{ width: "550px" }}
        footer={renderFooter()}
        onHide={() => onHide()}
      >
        <Edit services={{ ...props }} onHide={onHide} />
      </Dialog> */}
      <h2 className="app-admin__container-subtitle">LISTA DE INVITADOS</h2>
      <div className="app-admin__container-content">
        <div className="app-admin__container-content-form p-card p-component">
          <CreateForm {...props} />
          <AddMember {...props} />
          {families.length ? <h4>Hay {families.length} familias</h4> : null}
        </div>
        <Card className="app-admin__container-content-card">
          <DataTable
            className="app-admin__container-content-card-datatable"
            value={families}
            expandedRows={expandedRows}
            onRowToggle={(e: DataTableRowToggleParams) =>
              setExpandedRows(e.data as DataTableExpandedRows)
            }
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="_id"
            header={() => <DownloadCSV {...props} />}
            size="small"
          >
            <Column expander={allowExpansion} style={{ width: "3em" }} />
            <Column
              header="Nombre"
              body={(family: IFamilies) => {
                return (
                  <p
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {family.family}
                  </p>
                );
              }}
            />

            <Column field="total" />
            <Column
              field="confirm"
              header="Confirmado"
              body={({ confirm }: IFamilies) => {
                return confirm ? (
                  <i style={{ color: "green" }} className="pi pi-check"></i>
                ) : (
                  <i style={{ color: "red" }} className="pi pi-times"></i>
                );
              }}
            ></Column>
            <Column
              body={({ _id }: IInvites) => (
                <>
                  <Button
                    style={{ transform: "scale(.5)" }}
                    icon="pi pi-pencil"
                    onClick={() => openDialog(_id as string)}
                  />
                  <Button
                    className="p-button-danger"
                    style={{ transform: "scale(.5)" }}
                    icon="pi pi-delete-left"
                    onClick={() => deleteFamily(_id as string)}
                  />
                </>
              )}
              header="Acciones"
            ></Column>
          </DataTable>
        </Card>
      </div>
    </section>
  );
};

const CreateForm: React.FC<IServices> = ({ createFamily }) => {
  const [data, setData] = useState({
    family: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(
      "event.target.name, event.target.value :>> ",
      event.target.name,
      event.target.value,
      data
    );
    setData((state) => {
      return {
        ...state,
        [event.target?.name]: event.target?.value,
      };
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createFamily({ ...data });
    setData({ family: "" });
  }
  return (
    <Accordion>
      <AccordionTab header="Crear Familia">
        <form className="app-createform__container" onSubmit={onSubmit}>
          <div className="app-createform__container-field">
            <span className="p-float-label p-input-icon-right">
              <InputText
                name="family"
                onChange={handleChange}
                className="w-100"
                value={data.family}
              />
              <label>Nombre</label>
            </span>
          </div>
          <Button
            disabled={!data.family.length}
            className="app-createform__container-button"
          >
            Crear
          </Button>
        </form>
      </AccordionTab>
    </Accordion>
  );
};

const AddMember: React.FC<IServices> = ({ addMemeber, families }) => {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    family: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setData((state) => {
      return {
        ...state,
        [event.target?.name]: event.target?.value,
      };
    });
  }

  function changeFamily(event: DropdownChangeParams) {
    setData((d) => ({ ...d, family: event.value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await addMemeber({ ...data });
    setData({
      name: "",
      lastname: "",
      family: "",
    });
  }

  const options = families.map((f) => ({
    label: capitalized(f.family),
    value: f._id,
  }));
  return (
    <Accordion>
      <AccordionTab header="Añadir Miembros">
        <form className="app-createform__container" onSubmit={onSubmit}>
          <div className="app-createform__container-field">
            <span className="p-float-label p-input-icon-right">
              <Dropdown
                onChange={changeFamily}
                options={options}
                value={data.family}
                style={{
                  width: "318px",
                }}
              />
              <label>Familia*</label>
            </span>
          </div>
          <div className="app-createform__container-field">
            <span className="p-float-label p-input-icon-right">
              <InputText
                name="name"
                value={data.name}
                onChange={handleChange}
                style={{
                  width: "318px",
                }}
              />
              <label>Nombre*</label>
            </span>
          </div>
          <div className="app-createform__container-field">
            <span className="p-float-label p-input-icon-right">
              <InputText
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
                style={{
                  width: "318px",
                }}
              />
              <label>Apellido*</label>
            </span>
          </div>
          <Button
            className="app-createform__container-button"
            disabled={
              !(
                !!data.name.length &&
                !!data.lastname.length &&
                !!data.family.length
              )
            }
          >
            Añadir
          </Button>
        </form>
      </AccordionTab>
    </Accordion>
  );
};

const DownloadCSV: React.FC<IServices> = ({ getCSV }) => {
  async function handleClick() {
    try {
      const base64 = await getCSV();
      downloadBase64File(base64 as string);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
  return (
    <div className="app-download__container">
      <p>Familias</p>
      <Button onClick={handleClick} className="p-button-text">
        Download csv
      </Button>
    </div>
  );
};

//Location

const Location = () => {
  return (
    <section className="app-location__container" id="location">
        <div className="app-location__container-letter">
        <h1 className="app-location__container-content-title">
            MIRAVALLE
          </h1>
          <p className="app-location__container-content-subtitle">
            Hotel Campestre
          </p>
          <br />
        </div>
      <div className="app-location__container-content">
      <div className="app-location__container-content-description">
        <div className="app-location__container-content-description-header">
          <p className="app-location__container-content-description-header-text">
            La recepcion será en el hotel miravalle que esta ubicado a la
            entrada del corregimiento{" "}
            <b className="app-location__container-content-description-header-bold">
              El Bordo, Cauca
            </b>{" "}
            en donde hay un salon de eventos y dos piscinas en las cuales se
            exige el uso de <b>traje de baño en licra</b> que se recomienda
            llevar.
            <br />
            Tambien es de saber que la temperatura de la localidad es alta, por
            lo que se recomienda ropa fresca para su comodidad
          </p>
        </div>
        <div className="app-location__container-content-description-gallery">
          <h2>Galeria de fotos</h2>
          <br />
          <GalleriaResponsiveDemo />
        </div>
      </div>
      <div className="app-location__container-content-map">
        <h2>Ubicacion</h2>
        <br />
        <div className="app-location__container-content-map-canvas">
          <iframe
            className="app-location__container-content-map-canvas-iframe"
            width="100%"
            src="https://maps.google.com/maps?width=675&amp;height=400&amp;hl=en&amp;q=Miravalle, El Bordo&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          />
        </div>
      </div>
      </div>
    </section>
  );
};

const GalleriaResponsiveDemo = () => {
  const images = [
    {
      itemImageSrc:
        "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0000.jpg",
      thumbnailImageSrc: "images/galleria/galleria1s.jpg",
      alt: "Description for Image 1",
      title: "Title 1",
    },
    {
      itemImageSrc:
        "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0002.jpg",
      thumbnailImageSrc: "images/galleria/galleria1s.jpg",
      alt: "Description for Image 1",
      title: "Title 2",
    },
    {
      itemImageSrc:
        "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0003.jpg",
      thumbnailImageSrc: "images/galleria/galleria1s.jpg",
      alt: "Description for Image 1",
      title: "Title 3",
    },
    {
      itemImageSrc:
        "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0004.jpg",
      thumbnailImageSrc: "images/galleria/galleria1s.jpg",
      alt: "Description for Image 1",
      title: "Title 4",
    },
    {
      itemImageSrc:
        "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0005.jpg",
      thumbnailImageSrc: "images/galleria/galleria1s.jpg",
      alt: "Description for Image 1",
      title: "Title 5",
    },
    {
      itemImageSrc:
        "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0006.jpg",
      thumbnailImageSrc: "images/galleria/galleria1s.jpg",
      alt: "Description for Image 1",
      title: "Title 6",
    },
    {
      itemImageSrc:
        "https://burbanostudio-assets.s3.us-east-2.amazonaws.com/marriage/images/miravalle_0007.jpg",
      thumbnailImageSrc: "images/galleria/galleria1s.jpg",
      alt: "Description for Image 1",
      title: "Title 7",
    },
  ];

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "960px",
      numVisible: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item: any) => {
    return (
      <img
        src={item.itemImageSrc}
        onError={(e: any) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  return (
    <div className="app-gallery__container">
      <div className="app-gallery__container-content">
        <Galleria
          value={images}
          responsiveOptions={responsiveOptions}
          circular
          style={{ maxWidth: "800px" }}
          item={itemTemplate}
          showThumbnails={false}
          showIndicators
          changeItemOnIndicatorHover
          autoPlay
          transitionInterval={2000}
        />
      </div>
    </div>
  );
};
