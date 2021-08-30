import Dashboard from "views/Dashboard.js";
import AutorTable from "views/AutorTable.js";
import AutorDetail from "views/AutorDetail.js";
import BooksTable from "views/BooksTable";
import BookDetail from "views/BookDetail";
import GenderTable from "views/GenderTable";
import GenderDetail from "views/GenderDetail";
import PublishingCompanyTable from "views/PublishingCompanyTable";
import PublishingCompanyDetail from "views/PublishingCompanyDetail";

// Icons
import { FiUsers } from "react-icons/fi";
import { BsPieChartFill, BsBook, BsBuilding } from "react-icons/bs";
import { IoMdTransgender } from "react-icons/io";




const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Livraria Unileya",
    icon: <BsPieChartFill />,
    component: Dashboard,
    layout: "/admin",
  },
  
  // Rota para Livros
  {
    path: "/tabela-livros",
    name: "Tabela de Livros",
    icon: <BsBook />,
    component: BooksTable,
    layout: "/admin",
  },
  {
    path: "/livros/:id",
    name: "Detalhes do Livro",
    component: BookDetail,
    redirect: true,
    layout: "/admin",
  },
  // Rota para Livros

  // Rota para Autores
  {
    path: "/tabela-autores",
    name: "Tabela de Autores",
    icon: <FiUsers />,
    component: AutorTable,
    layout: "/admin",
  },
  {
    path: "/autores/:id",
    name: "Detalhes do Autor",
    component: AutorDetail,
    redirect: true,
    layout: "/admin",
  },
  // Rota para Autores

  // Rota para Generos
  {
    path: "/tabela-generos",
    name: "Tabela de Generos",
    icon: <IoMdTransgender />,
    component: GenderTable,
    layout: "/admin",
  },
  {
    path: "/generos/:id",
    name: "Detalhes do Genero",
    component: GenderDetail,
    redirect: true,
    layout: "/admin",
  },
  // Rota para Generos

  // Rota para Editoras
  {
    path: "/tabela-editoras",
    name: "Tabela de Editoras",
    icon: <BsBuilding />,
    component: PublishingCompanyTable,
    layout: "/admin",
  },
  {
    path: "/editoras/:id",
    name: "Detalhes do Editoras",
    component: PublishingCompanyDetail,
    redirect: true,
    layout: "/admin",
  },
   // Rota para Editoras

];

export default dashboardRoutes;
