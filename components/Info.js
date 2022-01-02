const Info = ({ title, description, iconUrl }) => (
  <div
    className="max-w-sm m-5 items-center flex flex-col space-y-3 bg-stone-200 shadow-xl p-5 rounded-xl"
    key={title}>
    <img src={iconUrl} width={50} height={50} alt={`icon ${title}`} />
    <h3 className="text-lg underline">{title}</h3>
    <div
      className="text-sm"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </div>
);

export default Info;
