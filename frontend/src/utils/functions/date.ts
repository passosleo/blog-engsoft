import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function formatDate(date: Date = new Date()) {
  return format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
}
