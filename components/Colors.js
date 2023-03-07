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
    <h1 className="text-4xl underline lg:mt-20">
      Będzie nam miło, jeśli zechcecie dopasować kolory Waszych ubrań do kolorów
      w tej palecie.
    </h1>
    <div className="flex flex-row flex-wrap gap-10 p-10 justify-center">
      {colorsArr.map((c) => (
        <div
          key={c}
          className="w-1/4 h-fit rounded-2xl aspect-square border-slate-700 border-2"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  </>
);

export default Colors;
