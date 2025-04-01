import mailIcon from "./assets/mail.svg";
import phoneIcon from "./assets/phone.svg";
import mediasIcon from "./assets/medias.png";
import messageIcon from "./assets/message.svg";

export const apiFields = {
  SOURCE: "source",
  EMITTER: "emitter",
  MESSAGE: "message",
};

export const sources = [
  {
    id: "MAIL",
    icon: mailIcon,
    label: "Mail",
    description:
      "Un document important, une information qui concerne plusieurs MDM et agents",
  },
  {
    id: "APPEL",
    icon: phoneIcon,
    label: "Transmettre un appel",
    description:
      "Vous avez reçu une information par appel téléphonique, faites passer le message aux agents",
  },
  {
    id: "MESSAGE",
    icon: messageIcon,
    label: "Message WhatsApp",
    description:
      "Une information, un document, vous a été transmis partager le à vos agents",
  },
  {
    id: "MEDIAS",
    icon: mediasIcon,
    label: "Médias",
    description:
      "Les médias ont publié des informations sur la crise faites les parvenir aux agents",
  },
];

export function getFormattedTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}h${minutes}`;
}

export function getIconFromSource(id) {
  return sources.find((source) => source.id === id).icon;
}
