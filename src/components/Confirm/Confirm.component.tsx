import { Button } from "primereact/button";
import "./Confirm.component.scss";
import { Card } from "primereact/card";
import React from "react";

const Confirm = () => {
  return (
    <div className="app-confirm__container">
      <Card className="app-confirm__container-content">
        <div className="app-confirm__container-content-body">
          <div className="app-confirm__container-content-body-rounded">
            <i className="pi pi-check" />
          </div>
          <h1>Porfavor confirma tu invitacion</h1>
            <p className="app-confirm__container-content-body-status">El estado de tu invitacion es: <b className="app-confirm__container-content-body-status-bold">NO CONFIRMADO</b></p>
          <p className="app-confirm__container-content-body-text">Para nosotros es muy importante contar con tu presencia, pero tambien somos concientes si estas en una situacion en la que no nos podras acopañar, porfavor confirmanos si podras estar con nosotros ese día</p>
          <h3>¿Vas a poder estar?</h3>
          <div className="app-confirm__container-content-body-buttons">
            <Button icon="pi pi-check" className="p-button-rounded p-button-success" aria-label="Filter" />
            <Button icon="pi pi-times" className="p-button-rounded p-button-danger" aria-label="Filter" />
          </div>
          <p className="app-confirm__container-content-body-footer">* Recuerda que puedes cambiar tu confirmacion hasta el dia <b className="app-confirm__container-content-body-footer-bold">10 de Diciembre de 2022</b></p>
        </div>
      </Card>
    </div>
  );
};

export default Confirm;
