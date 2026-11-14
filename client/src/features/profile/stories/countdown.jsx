import { useEffect, useState } from "react";

const targetDate = new Date("2027-02-18T08:00:00");

function calculateTimeLeft() {
    const difference = targetDate - new Date();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

function CountdownItem({ value, label }) {
    return (
        <div className="flex flex-col items-center">
            <h2 className="font-serif text-[clamp(2rem,4vw,4rem)] font-bold text-[#E3A419]">
                {String(value).padStart(2, "0")}
            </h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E3A419]">
                {label}
            </p>
        </div>
    );
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="rounded-3xl border border-[#5b3a13] px-[clamp(1.5rem,4vw,5rem)] py-[clamp(2rem,3vw,3rem)]">
            <div className="flex flex-col items-center">
                <h3 className="text-center font-serif text-[clamp(1.25rem,2vw,2.5rem)] font-bold uppercase tracking-widest text-[#E3A419]">
                    Event Countdown
                </h3>
                <div className="mt-3 flex items-center gap-3">
                    <span className="h-px w-16 bg-linear-to-r from-transparent to-[#c97a18]" />

                    <span className="relative flex h-4 w-4 items-center justify-center">
                        <span className="absolute h-3 w-3 rotate-45 border border-[#c97a18]" />
                        <span className="absolute h-1.5 w-1.5 rounded-full bg-[#c97a18]" />
                    </span>

                    <span className="h-px w-16 bg-linear-to-l from-transparent to-[#c97a18]" />
                </div>

                <p className="mt-2 text-center text-[clamp(0.75rem,1vw,1.5rem)] text-white/80">
                    YUDISIUM GRADUATE 2027
                </p>

                <div className="mt-8 flex items-center justify-center gap-[clamp(0.5rem,2vw,5rem)]">
                    <CountdownItem value={timeLeft.days} label="Days" />
                    <span className="text-3xl text-[#E3A419]">✦</span>
                    <CountdownItem value={timeLeft.hours} label="Hours" />
                    <span className="text-3xl text-[#E3A419]">✦</span>
                    <CountdownItem value={timeLeft.minutes} label="Minutes" />
                    <span className="text-3xl text-[#E3A419]">✦</span>
                    <CountdownItem value={timeLeft.seconds} label="Seconds" />
                </div>
            </div>
        </section>
    );
}