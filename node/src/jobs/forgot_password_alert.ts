import { get_tmpl, render } from "@/helpers/units";
import { rest_password_page_url } from "@/config/mics";

import email from "@/helpers/email";
import log from "@/helpers/log";

export default async (p: { token: string; email: string; username: string; expiration_time: string }) => {
    const reset_link = `${rest_password_page_url}?token=${p.token}&username=${p.username}`;
    const html = render(get_tmpl("forgot-password.email.ejs"), {
        username: p.username,
        expiration_time: p.expiration_time,
        reset_link,
    });
    const result = await email.send(p.email, "Rest Password Link", html);
    log.info("forgot password send result: ", result);
};
