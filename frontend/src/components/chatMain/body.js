import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

const Body = () => {
  const { messages } = useSelector((state) => state.messages);
  const { active } = useSelector((state) => state.channels);
  const censored = (text) => {
    filter.loadDictionary('en');
    const censoredByEn = filter.clean(text);
    filter.loadDictionary('ru');
    return filter.clean(censoredByEn);
  };

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages
        .filter(({ channelId }) => channelId === active)
        .map(({ body, id, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>: {censored(body)}
          </div>
        ))}
    </div>
  );
};

export default Body;
