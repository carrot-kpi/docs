import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const timeAgoHumanized = (timestamp: number) => {
    const diff = timestamp - Date.now();
    return dayjs.duration(diff, "milliseconds").humanize(true);
};
