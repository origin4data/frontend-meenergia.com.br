export type Project = {
  id: number;
  num: string;
  title: string;
  city: string;
  state: string;
  segment: string;
  kwp: string;
  geracao: string;
  modulos: string;
  economia: string;
  image: string;
  lat: number;
  lng: number;
};

export const PROJECTS: Project[] = [
  { id: 1,  num: "01", title: "Alcides Guisolfi",          city: "São Mateus",          state: "ES", segment: "Residencial", kwp: "59,84",  geracao: "7.230",  modulos: "146",   economia: "5.277",  image: "/Portfolio/img/Projetos/alcidesguisolfi.jpg",      lat: -18.7160, lng: -39.8587 },
  { id: 2,  num: "02", title: "Escola Master",             city: "São Mateus",          state: "ES", segment: "Comercial",   kwp: "139,00", geracao: "17.000", modulos: "403",   economia: "13.770", image: "/Portfolio/img/Projetos/escolamaster.jpg",         lat: -18.7100, lng: -39.8650 },
  { id: 3,  num: "03", title: "Proteinorte",               city: "Linhares",            state: "ES", segment: "Industrial",  kwp: "399,84", geracao: "47.980", modulos: "784",   economia: "35.000", image: "/Portfolio/img/Projetos/proteinorte.jpg",          lat: -19.3919, lng: -40.0719 },
  { id: 4,  num: "04", title: "Renato César Pimenta Maia", city: "Nova Venécia",        state: "ES", segment: "Residencial", kwp: "41,31",  geracao: "4.900",  modulos: "81",    economia: "3.577",  image: "/Portfolio/img/Projetos/renatocesar.jpg",          lat: -18.7106, lng: -40.4014 },
  { id: 5,  num: "05", title: "Hotel Ibis Styles",         city: "São Mateus",          state: "ES", segment: "Hotelaria",   kwp: "140,80", geracao: "17.230", modulos: "408",   economia: "13.959", image: "/Portfolio/img/Projetos/hotelibis.jpg",            lat: -18.7240, lng: -39.8540 },
  { id: 6,  num: "06", title: "Brasigran",                 city: "Serra",               state: "ES", segment: "Industrial",  kwp: "466,56", geracao: "55.987", modulos: "1.296", economia: "31.700", image: "/Portfolio/img/Projetos/brasigran.jpg",            lat: -20.1289, lng: -40.3074 },
  { id: 7,  num: "07", title: "Vila Cizinho",              city: "Conceição da Barra",  state: "ES", segment: "Residencial", kwp: "10,20",  geracao: "1.258",  modulos: "20",    economia: "1.045",  image: "/Portfolio/img/Projetos/vilacizino.jpg",           lat: -18.5856, lng: -39.7339 },
  { id: 8,  num: "08", title: "Posto Flecha",              city: "Itamaraju",           state: "BA", segment: "Comercial",   kwp: "140,14", geracao: "16.625", modulos: "308",   economia: "13.466", image: "/Portfolio/img/Projetos/postoflecha.jpg",          lat: -17.0387, lng: -39.5295 },
  { id: 9,  num: "09", title: "Rally Pneus",               city: "Linhares",            state: "ES", segment: "Comercial",   kwp: "105,60", geracao: "12.618", modulos: "207",   economia: "10.220", image: "/Portfolio/img/Projetos/rallypenus.jpg",           lat: -19.4000, lng: -40.0650 },
  { id: 10, num: "10", title: "Frigorífico Montanha",      city: "Montanha",            state: "ES", segment: "Industrial",  kwp: "141,90", geracao: "17.000", modulos: "258",   economia: "13.700", image: "/Portfolio/img/Projetos/frigorificomontanha.jpg",  lat: -18.1283, lng: -40.3697 },
];
