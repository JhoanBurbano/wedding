import './Confirm.component.scss'

import { IFamilies, IServices } from "../../interfaces";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";

const Confirm: React.FC<IServices> = ({
  getFamily,
  confirmInvitation,
  family,
}) => {
  const { code } = useParams();

  useEffect(() => {
    async function getstatus() {
      try {
        await getFamily(code as string)
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
    getstatus();
  }, []);

  async function handleConfirm(value: boolean) {
    await confirmInvitation(code as string, value);
    await getFamily(code as string);
  }
  return (
    family ?
    <section className="app-confirm__container" id="confirm">
      <Card className="app-confirm__container-content">
        <div className="app-confirm__container-content-body">
          <div className="app-confirm__container-content-body-rounded">
            <i className="pi pi-check" />
          </div>
          <h3>{family.family.toUpperCase()}</h3>
          <h1>Porfavor confirma tu invitacion</h1>
          <p className={"app-confirm__container-content-body-status"+(family.confirm ? '-true' : '-false')}>
            El estado de tu invitacion es:{" "}
            <b className={"app-confirm__container-content-body-status"+(family.confirm ? '-true' : '-false')+"-bold"}>
              {family && family.confirm ? "CONFIRMADO" : "NO CONFIRMADO"}
            </b>
          </p>
          <p className="app-confirm__container-content-body-text">
            Para nosotros es muy importante contar con tu presencia, pero
            tambien somos concientes si estas en una situacion en la que no nos
            podras acopañar, porfavor confirmanos si podras estar con nosotros
            ese día
          </p>
          <h3>¿Vas a poder estar?</h3>
          <div className="app-confirm__container-content-body-buttons">
            <Button
              onClick={() => {handleConfirm(true)}}
              icon="pi pi-check"
              className="p-button-rounded p-button-success"
              aria-label="Filter"
            />
            <Button
              onClick={() => {handleConfirm(false)}}
              icon="pi pi-times"
              className="p-button-rounded p-button-danger"
              aria-label="Filter"
            />
          </div>
          <p className="app-confirm__container-content-body-footer">
            * Recuerda que puedes cambiar tu confirmacion hasta el dia{" "}
            <b className="app-confirm__container-content-body-footer-bold">
              10 de Enero de 2023
            </b>
          </p>
        <Link to="/" className='app-confirm__container-content-link p-button p-button-success'>Ver el sitio web</Link>
        </div>
      </Card>
    </section>
    :
    <p>loading</p>
  );
};

export default Confirm;
