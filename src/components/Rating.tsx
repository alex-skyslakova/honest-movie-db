import React from "react";

export const Rating = ({percentage}:{percentage: number}) => {
    return (
        <svg width={100} height={100}>
            <g transform={`rotate(-90 ${"100 100"})`}>
                <Circle colour="lightgrey" percentage={100}/>
                <Circle colour={percentage > 70 ? 'green' : percentage > 30 ? 'orange' : 'red'} percentage={percentage} />
            </g>
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={"1.2em"} className="fill-black dark:fill-white">
                {percentage.toFixed(0)}
            </text>
        </svg>
    )
}

const Circle = ({ colour, percentage }: {colour: string, percentage: number}) => {
    const r = 40;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    return (
        <circle
            r={r}
            cx={150}
            cy={50}
            fill="transparent"
            stroke={percentage != 0 ? colour : ""} // remove colour as 0% sets full circumference
            strokeWidth={"1rem"}
            strokeDasharray={circ}
            strokeDashoffset={percentage ? strokePct : 0}
            strokeLinecap="round"
        ></circle>
    );
};
