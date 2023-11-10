import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const displayFromNow = (time: string) => {
    return dayjs(time).fromNow();
};
