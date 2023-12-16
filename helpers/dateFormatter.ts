import {
  formatDistanceToNow,
  differenceInHours,
  differenceInDays,
  format,
} from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(fecha: Date): string {
  const now = new Date();
  const hoursDifference = differenceInHours(now, fecha);
  const daysDifference = differenceInDays(now, fecha);
  if (hoursDifference < 1) {
    return formatDistanceToNow(fecha, { addSuffix: true, locale: es });
  } else if (hoursDifference < 3) {
    return (
      "hace " + hoursDifference + " hora" + (hoursDifference > 1 ? "s" : "")
    );
  } else if (hoursDifference < 24) {
    const hour = fecha.getHours();
    if (hour < 12) {
      return "en la mañana";
    } else if (hour < 18) {
      return "en la tarde";
    } else {
      return "en la noche";
    }
  } else if (daysDifference <= 3) {
    return daysDifference + " día" + (daysDifference > 1 ? "s" : "") + " atrás";
  } else if (fecha instanceof Date && !isNaN(fecha.getTime())) {
    return format(fecha, "dd/MM/yyyy");
  } else {
    console.error("Fecha inválida:", fecha);
    return "";
  }
}
