import { useTimer } from "react-timer-hook";

const expiryTimestamp = +new Date("2022-02-26T00:00:00.000Z");

const Timeout = () => {
    const {
        seconds,
        minutes,
        hours,
        days,
      } = useTimer({ expiryTimestamp });

      const h1Class = "text-6xl w-40"
      const h2Class = "text-4xl"

    return <div className="flex flex-row justify-between">
        <h1 className={h1Class}>{days}&nbsp;<span className={h2Class}>d.</span></h1>
        <h1 className={h1Class}>{hours}&nbsp;<span className={h2Class}>h.</span></h1>
        <h1 className={h1Class}>{minutes}&nbsp;<span className={h2Class}>m.</span></h1>
        <h1 className={h1Class}>{seconds}&nbsp;<span className={h2Class}>s.</span></h1>
    </div>
}

export default Timeout