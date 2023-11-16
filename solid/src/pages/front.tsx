import type { TTime } from "@/helpers/time";

import { add_days, add_months, add_years, previous_days, previous_months, previous_years } from "@/helpers/time";
import { format_to_display_date, format_to_param_date, is_getter_then_now } from "@/helpers/time";
import { createGetNewsesQuery } from "@/queries/newses";
import { A } from "@solidjs/router";
import { Show } from "solid-js";

import Newses from "@/components/Newses";

const Lk = (p: { date: TTime; label: string; prefix?: string; suffix?: string }) => (
    <Show when={!is_getter_then_now(p.date)}>
        {p.prefix || ""}
        <A class="underline" href={`/front?date=${format_to_param_date(p.date)}`}>
            {p.label}
        </A>
        {p.suffix || ""}
    </Show>
);

export default () => {
    const { newses, loading, page, date } = createGetNewsesQuery({ filter: "date" });
    return (
        <main>
            <div class="mb-[14px] ml-9 mt-[6px]">
                Stories from {format_to_display_date(date())}
                <div class="mt-[9px]">
                    <Lk date={previous_days(date(), 1)} prefix="Go back a " label="day" />
                    <Lk date={previous_months(date(), 1)} prefix=" , " label="month" />
                    <Lk date={previous_years(date(), 1)} prefix=" , or " label="year" suffix=". " />
                    <Lk date={add_days(date(), 1)} prefix="Go forward a " label="day" />
                    <Lk date={add_months(date(), 1)} prefix=" , " label="month" />
                    <Lk date={add_years(date(), 1)} prefix=" , or " label="year" suffix="." />
                </div>
            </div>
            <Newses newses={newses()} page={page()} loading={loading()} />
        </main>
    );
};
