import { createContext, useContext, useState } from "react";
import Message from "../components/Message";

const MessageContext = createContext(null);

export default function MessageProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [nextId, setNextId] = useState(0);

  function showMessage(type, message, time = 3000) {
    const id = nextId + 1;
    setNextId(id);

    setNotifications((prev) => [...prev, { id, type, message, time }]);
  }

  function removeMessage(id) {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}

      {notifications.map((notification, index) => (
        <Message
          key={notification.id}
          type={notification.type}
          message={notification.message}
          time={notification.time}
          index={index}
          onRemove={() => removeMessage(notification.id)}
        />
      ))}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
