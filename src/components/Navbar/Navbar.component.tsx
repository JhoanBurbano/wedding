import "./Navbar.component.scss";
import { Menubar } from "primereact/menubar";
import { Link } from "react-router-dom";

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

  const start = (
    <Link to="/">
      <h2>Landinpage</h2>
    </Link>
  );
  return (
    <div className="app-navbar__container">
      <div className="card">
        <Menubar model={items} start={start} />
      </div>
    </div>
  );
}

export default Navbar;
