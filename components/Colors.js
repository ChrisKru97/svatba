const colorsArr = [
  '#547033',
  '#A4AC86',
  '#EDB95A',
  '#EEDBAA',
  '#C39363',
  '#936639',
];

const Colors = () => (
  <>
    <div className="flex justify-center px-5 mt-5 mb-10">
      <div className="text-2xl lg:text-4xl lg:w-[50vw] text-center p-5 bg-verse rounded-xl shadow-lg text-white">
        Będzie nam miło, jeśli zechcecie dopasować kolory Waszych ubrań do
        kolorów w tej palecie.
      </div>
    </div>
    <div className="flex flex-row h-[25vh] lg:h-[50vh] w-[95vw] lg:w-[50vw] mx-auto">
      {colorsArr.map((c) => (
        <div key={c} className="flex-grow" style={{ backgroundColor: c }} />
      ))}
    </div>
  </>
);

export default Colors;
