import { useState, useEffect } from "react";
import "./PanicRoom.css";
import { getFormattedTime, getIconFromSource } from "../utils";
import notificationIcon from "../assets/notification.svg";
import config from "../../config";
import pocketbase from "../services/pocketbase";
import MessageHistory from "../MessageHistory/MessageHistory";
import Dialog from "@mui/material/Dialog";

const getLastCreatedMessage = async () => {
  return await pocketbase
    .collection("messages")
    .getFirstListItem(null, { sort: "-created" });
};

function PanicRoom() {
  const [showHistory, setShowHistory] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    // Show last received message if the page updates or a new device is connected
    const loadLastMessageOnStartup = async () => {
      const lastMessage = await getLastCreatedMessage();
      setNewMessage(lastMessage);
    };
    loadLastMessageOnStartup();

    // Subscribe to new messages
    pocketbase.collection(config.COLLECTION).subscribe("*", (message) => {
      if (message.action === "create") {
        setOpenNotification(false);
        setNewMessage(message.record);
      }
    });
    return () => {
      pocketbase.collection(config.COLLECTION).unsubscribe("*");
    };
  }, []);

  return (
    <>
      {newMessage !== null && (
        <div className="history-container">
          <button
            className="history-button"
            onClick={() => setShowHistory(true)}
          >
            Voir historique
          </button>

          <Dialog open={showHistory} onClose={() => setShowHistory(false)}>
            <MessageHistory shouldUpdate={true} />
          </Dialog>
        </div>
      )}

      <div className="panic-room">
        {openNotification === false &&
          (newMessage !== null ? (
            <div className="base-container border-container">
              <div className="notification-time">
                {getFormattedTime(newMessage.created)}
              </div>

              <div className="emitter-container">
                <img src={notificationIcon} className="notification-icon" />
                {newMessage.emitter}
              </div>

              <button
                className="notification-button"
                onClick={() => setOpenNotification(true)}
              >
                Ouvrir
              </button>
            </div>
          ) : (
            <div className="base-container no-messages">
              Pas de messages, pour le moment
            </div>
          ))}

        {openNotification && newMessage && (
          <div className="base-container">
            <div className="emitter-container">
              <img
                src={getIconFromSource(newMessage?.source)}
                alt="bugou"
                className="notification-icon"
              />
              {newMessage.emitter}
            </div>

            <hr className="divider" />

            <div className="border-container message-container">
              <div className="message-text">{newMessage.message}</div>
              <div className="message-time">
                {getFormattedTime(newMessage.created)}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PanicRoom;
