import dayjs from "dayjs";

export const timeAgoHumanized = (timestamp: number) => {
    const diff = timestamp - Date.now();
    return dayjs.duration(diff, "milliseconds").humanize(true);
};
