import { useEffect, useState } from "react";
import pocketbase from "../services/pocketbase";
import config from "../../config";
import "./MessageHistory.css";
import historyIcon from "./../assets/historique.svg";
import { getFormattedTime, getIconFromSource } from "../utils";

function MessageHistory(shouldUpdate) {
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    const getAllMessages = async () => {
      const messages = await pocketbase
        .collection(config.COLLECTION)
        .getFullList({
          sort: "-created",
        });
      setMessageHistory(messages);
    };
    getAllMessages();
  }, [shouldUpdate]);

  return (
    <div className="message-history">
      <div className="title-container">
        <img src={historyIcon} className="title-icon" />
        Historique des envois
      </div>

      <ul className="history-list">
        {messageHistory.length > 0 &&
          messageHistory?.map((message) => (
            <li className="history-item" key={message.id}>
              <img
                src={getIconFromSource(message.source)}
                className="message-icon"
              />
              <div className="message-emitter">{message.emitter}</div>
              <div>{getFormattedTime(message.created)}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default MessageHistory;
