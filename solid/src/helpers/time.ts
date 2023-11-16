import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const display_from_now = (time: string) => {
    return dayjs(time).fromNow();
};

export const format_to_param_date = (time: number) => {
    return dayjs(time).format("YYYY-MM-DD");
};
