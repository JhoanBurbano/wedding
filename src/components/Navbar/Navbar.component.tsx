import "./Navbar.component.scss";

import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";

const Navbar = () => {

  const items = [
    {
      label: "Invitacion",
      icon: "pi pi-fw pi-bookmark",
      items: [
        {
          label: "Multimedia",
          icon: "pi pi-fw pi-image",
          items: [
            {
              label: "Galeria de Fotos",
              icon: "pi pi-fw pi-bookmark",
              url: "/multimedia/gallery"
            },
            {
              label: "Video",
              icon: "pi pi-fw pi-video",
              url: "#video"
            },
          ],
        },
        {
          label: "Confirmar",
          icon: "pi pi-fw pi-check",
          url: '/confirm'
        },
      ],
    },
    {
      label: "Manage",
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Login",
          icon: "pi pi-fw pi-sign-in",
          url: '/login'
        },
        {
          label: "Logout",
          icon: "pi pi-fw pi-sign-out",
        },
      ],
    },
    {
      label: "Invitados",
      icon: "pi pi-fw pi-user",
      url: "/list"
    },
    {
      label: "Location",
      icon: "pi pi-fw pi-map",
      url: '/location'
    },
  ];

  const tabs = [
    {
      label: 'Video',
      icon: 'pi pi-fw pi-video',
      url:'#video'
    },
    {
      label: 'Lista',
      icon: 'pi pi-fw pi-list',
      url: '#list'
    },
    {
      label: 'Ubicacion',
      icon: 'pi pi-fw pi-map',
      url: '#location'
    },
    {
      label: 'Confirmar Invitacion',
      icon: 'pi pi-fw pi-check',
      url: '#confirm'
    }
  ]

  const start = (
    <Link to="/">
     <img src={`${process.env.REACT_APP_ASSETS}Logo.png`} height={50} alt="" />
    </Link>
  );
  return (
    <div className="app-navbar__container">
      <div className="card">
        <Menubar model={tabs} start={start} />
      </div>
    </div>
  );
}

export default Navbar;
