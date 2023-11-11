import { getTmpl, render } from "@/helpers/units";

import email from "@/helpers/email";
import log from "@/helpers/log";

export default async (p: { token: string; email: string; username: string; expirationTime: string }) => {
    const loginAlertTemplate = getTmpl("forgot-password.email.ejs");

    const reset_link = `http://web.develop.sm/reset-password?token=${p.token}`;

    const html = render(loginAlertTemplate, {
        username: p.username,
        expiration_time: p.expirationTime,
        reset_link,
    });

    const result = await email.send(p.email, "Rest Password Link", html);
    log.info("forgot password send result: ", result);
};
