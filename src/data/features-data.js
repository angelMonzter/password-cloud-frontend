import {
  PresentationChartBarIcon,
  LockClosedIcon,
  TagIcon
} from "@heroicons/react/24/solid";

export const featuresData = [
  {
    color: "gray",
    title: "Password Cloud",
    icon: LockClosedIcon,
    description:
      "Gestor de contraseñas para usuarios finales. Puedes guardar tus cuentas y mantenerlas en un solo lugar.",
  },
  {
    color: "gray",
    title: "Sistema de tickets",
    icon: TagIcon,
    description:
      "Sistema de tickets para empresas por licencia, centraliza todos tus poblemas dividiendo departamentos y problemas.",
  },
  {
    color: "gray",
    title: "ERP y CRM",
    icon: PresentationChartBarIcon,
    description:
      "Concentra todos datos de tu empresa para automatizar y agilizar los procesos",
  },
];

export default featuresData;
