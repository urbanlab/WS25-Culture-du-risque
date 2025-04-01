import { useState } from "react";
import "./ControlRoom.css";
import pocketbase from "../services/pocketbase";
import MessageHistory from "../MessageHistory/MessageHistory";
import config from "../../config";
import { sources, apiFields } from "../utils.js";
import { useForm } from "react-hook-form";

function SourceCard({ source, onClick, selected }) {
  return (
    <div
      className={`card-container ${selected ? "card-container-selected" : ""}`}
      onClick={onClick}
    >
      <img src={source.icon} sizes="48px" className="card-icon" />
      <div className="card-label">{source.label}</div>
      <div className="card-description">{source.description}</div>
    </div>
  );
}

function ControlRoom() {
  const [selectedSource, setSelectedSource] = useState(null);
  const [shouldUpdateHistory, setShouldUpdateHistory] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const sendMessage = async (data) => {
    if (!selectedSource) {
      console.error("No source selected");
      return;
    }
    // Merge the selected source into the form data.
    const forms = { ...data, source: selectedSource.id };
    try {
      await pocketbase.collection(config.COLLECTION).create(forms);
      reset();
      setSelectedSource(null);
      setShouldUpdateHistory(true);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const onSourceCardClick = (source) => {
    setSelectedSource(source);
  };

  return (
    <div className="control-room">
      <div className="message-history-panel">
        <MessageHistory shouldUpdate={shouldUpdateHistory} />
      </div>

      <div className="forms-container">
        <span className="forms-instruction">
          Sélectionner la source de votre message
        </span>

        <div className="forms-sources">
          {sources.map((source) => {
            return (
              <SourceCard
                source={source}
                key={source.id}
                selected={selectedSource?.id === source.id}
                onClick={() => onSourceCardClick(source)}
              />
            );
          })}
        </div>

        <form onSubmit={handleSubmit(sendMessage)} className="forms-inputs">
          <input
            type="text"
            id="forms-emitter"
            placeholder="Émetteur du message"
            {...register(apiFields.EMITTER, { required: true })}
          />

          <textarea
            type="text"
            id="forms-message"
            placeholder="Taper le message..."
            className="forms-message"
            {...register(apiFields.MESSAGE, { required: true })}
          />

          <button className="forms-button" type="submit">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default ControlRoom;
