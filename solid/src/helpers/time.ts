import d, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

d.extend(relativeTime);

export type TTime = number | string | Dayjs;

export const display_from_now = (time: string): string => d(time).fromNow();
export const format_to_param_date = (time: TTime): string => d(time).format("YYYY-MM-DD");
export const format_to_display_date = (time: TTime): string => d(time).format("MMMM D, YYYY");
export const add_days = (time: TTime, days: number = 1): TTime => d(time).add(days, "day");
export const add_months = (time: TTime, months: number = 1): TTime => d(time).add(months, "month");
export const add_years = (time: TTime, days: number = 1): TTime => d(time).add(days, "year");
export const subtract_days = (time: TTime, days: number = 1): TTime => d(time).subtract(days, "day");
export const subtract_months = (time: TTime, months: number = 1): TTime => d(time).subtract(months, "month");
export const subtract_years = (time: TTime, days: number = 1): TTime => d(time).subtract(days, "year");
export const is_getter_then_now = (time: TTime): boolean => d(time).isAfter(d());
