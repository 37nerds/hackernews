import type { TTime } from "@/helpers/time";

import { Show, createEffect } from "solid-js";
import { A } from "@solidjs/router";
import { createAddNavLink } from "@/helpers/primitives";
import { createGetNewsesQuery } from "@/queries/newses";
import { add_days, add_months, add_years, subtract_days, subtract_months, subtract_years } from "@/helpers/time";
import { format_to_display_date, format_to_param_date, is_getter_then_now } from "@/helpers/time";

import Newses from "@/components/Newses";

const Lk = (p: { day: TTime; label: string; prefix?: string; suffix?: string }) => (
    <Show when={!is_getter_then_now(p.day)}>
        {p.prefix || ""}
        <A class="underline" href={`/front?day=${format_to_param_date(p.day)}`}>
            {p.label}
        </A>
        {p.suffix || ""}
    </Show>
);

const DateSelector = (p: { day: () => string }) => (
    <div class="flex flex-col gap-1 bg-primary-bg py-5">
        <div class="text-center">Stories from {format_to_display_date(p.day())}</div>
        <div class="text-center">
            <Lk day={subtract_days(p.day(), 1)} prefix="Go back a " label="day" />
            <Lk day={subtract_months(p.day(), 1)} prefix=" , " label="month" />
            <Lk day={subtract_years(p.day(), 1)} prefix=" , or " label="year" suffix=". " />
            <Lk day={add_days(p.day(), 1)} prefix="Go forward a " label="day" />
            <Lk day={add_months(p.day(), 1)} prefix=" , " label="month" />
            <Lk day={add_years(p.day(), 1)} prefix=" , or " label="year" suffix="." />
        </div>
    </div>
);

export default () => {
    const { newses, loading, page, day } = createGetNewsesQuery("day");

    createEffect(() => {
        createAddNavLink(day(), `/front`, true);
    });

    return (
        <main class="flex flex-col gap-3">
            <DateSelector day={day} />
            <Newses newses={newses()} page={page()} loading={loading()} more_page_prefix={`/front?day=${day()}&`} />
        </main>
    );
};
