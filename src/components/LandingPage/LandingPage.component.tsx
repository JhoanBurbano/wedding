/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import "./LandingPage.component.scss";

import { Accordion, AccordionTab } from "primereact/accordion";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableRowToggleParams,
} from "primereact/datatable";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { IFamilies, IInvites, IServices } from "../../interfaces";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { CSVLink } from "react-csv";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
// import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";
import { InputText } from "primereact/inputtext";
import Navbar from "../Navbar/Navbar.component";
import { capitalized } from "../../utils/capitalized";

const LandingPage: React.FC<IServices> = (props) => {
  return (
    <div className="app-landingpage__container">
      <Navbar />
      <Video />
      <Admin {...props} />
      <Location />
      <Confirm />
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

  function rowExpansionTemplate(data: IFamilies) {
    return data.integrants.length ? (
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
            <div
              style={{
                width: "6ch",
                display: "flex",
                justifyContent: "space-between",
                margin: "0 auto",
              }}
            >
              <Button
                className="p-button-danger p-button-sm"
                style={{ padding: "1px", width: "3ch", height: "3ch" }}
                icon="pi pi-delete-left"
                onClick={() => deleteMember(data._id as string, _id as string)}
              />
            </div>
          )}
          header="Acciones"
        ></Column>
      </DataTable>
    ) : null;
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
            header={
              families.length > 0 ? (
                () => <DownloadCSV {...props} />
              ) : (
                <h3>Familias</h3>
              )
            }
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
                <div
                  style={{
                    width: "6ch",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0 auto",
                  }}
                >
                  <Button
                    style={{ padding: "1px", width: "3ch", height: "3ch" }}
                    icon="pi pi-pencil"
                    className="p-button-sm"
                    onClick={() => openDialog(_id as string)}
                  />
                  <Button
                    className="p-button-danger p-button-sm"
                    style={{ padding: "1px", width: "3ch", height: "3ch" }}
                    icon="pi pi-delete-left"
                    onClick={() => deleteFamily(_id as string)}
                  />
                </div>
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

const DownloadCSV: React.FC<IServices> = ({
  getCSV,
  getFamilies,
  families,
}) => {
  const [content, setContent] = useState<Array<string[]>>([]);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(false);
  }, [getFamilies, families]);
  async function handleClick() {
    try {
      const parse = (await getCSV()) as string[][];
      setContent(parse);
      setReady(true);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  return (
    <div className="app-download__container">
      <h3>Familias</h3>
      {ready ? (
        <CSVLink data={content} filename={"dataMerge.csv"}>
          Download csv
        </CSVLink>
      ) : (
        <Button className="p-button-text" onClick={handleClick}>
          Generar lista
        </Button>
      )}
    </div>
  );
};

//Location

const Location = () => {
  return (
    <section className="app-location__container" id="location">
      <div className="app-location__container-letter">
        <h1 className="app-location__container-letter-title">MIRAVALLE</h1>
        <p className="app-location__container-letter-subtitle">
          Hotel Campestre
        </p>
        <br />
        <p className="app-location__container-letter-description">
          La recepcion será en el hotel miravalle que esta ubicado a la entrada
          del corregimiento{" "}
          <b className="app-location__container-content-description-header-bold">
            El Bordo, Cauca
          </b>
          en donde hay un salon de eventos y dos piscinas en las cuales se exige
          el uso de <b>traje de baño en licra</b> que se recomienda llevar.
          Tambien es de saber que la temperatura de la localidad es alta, por lo
          que se recomienda ropa fresca para su comodidad
        </p>
      </div>
      <div className="app-location__container-content">
        <div className="app-location__container-content-description">
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
              src="https://maps.google.com/maps?&amp;hl=es&amp;q=Miravalle, El Bordo&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
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
          changeItemOnIndicatorHover
          autoPlay
          transitionInterval={2000}
        />
      </div>
    </div>
  );
};

const Confirm = () => {
  const [code, setcode] = useState('')
  const navigation = useNavigate()

  function handleSetCode(event: React.ChangeEvent<HTMLInputElement>){
    setcode(event?.target?.value)
  }

  function searchCode(){
    navigation(code)
  }
  return (
    <section className="app-confirm__container" id="confirm">
      <Card className="app-confirm__container-content">
        <div className="app-confirm__container-content-body">
          <div className="app-confirm__container-content-body-rounded">
            <i className="pi pi-check" />
          </div>
          <h1>Porfavor confirma tu invitacion</h1>
          {/* <p className="app-confirm__container-content-body-status">
            El estado de tu invitacion es:{" "}
            <b className="app-confirm__container-content-body-status-bold">
              NO CONFIRMADO
            </b>
          </p> */}
          <p className="app-confirm__container-content-body-text">
            Para nosotros es muy importante contar con tu presencia, pero
            tambien somos concientes si estas en una situacion en la que no nos
            podras acopañar, porfavor confirmanos si podras estar con nosotros
            ese día
          </p>
          <h3>Ingresa tu codigo de invitacion</h3>
          <form className="app-confirm_container-content-body-form">
            <span>
              <InputText onChange={handleSetCode}/>
              <Button icon="pi pi-search" value="Buscar" name="Buscar" title="Buscar tu invitacion" onClick={searchCode}/>
            </span>
          </form>
          {/* <div className="app-confirm__container-content-body-buttons">
            <Button
              icon="pi pi-check"
              className="p-button-rounded p-button-success"
              aria-label="Filter"
            />
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-danger"
              aria-label="Filter"
            />
          </div> */}
          <p className="app-confirm__container-content-body-footer">
            * Recuerda que puedes cambiar tu confirmacion hasta el dia{" "}
            <b className="app-confirm__container-content-body-footer-bold">
              10 de Diciembre de 2022
            </b>
          </p>
        </div>
      </Card>
    </section>
  );
};
