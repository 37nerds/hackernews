import nodemailer from "nodemailer";
import env from "@/conf/env";

const default_from_email = "notify@37nerds.com";

const host = env.SMTP_HOST;
const port = env.SMTP_PORT;
const secure = false;
const user = env.SMTP_USERNAME;
const pass = env.SMTP_PASSWORD;

const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

const email = {
    send: (to: string, subject: string, html: string, from: string = default_from_email): Promise<string> => {
        return new Promise((resolve, reject) => {
            transporter.sendMail({ from, to, subject, html }, (error, info) => {
                if (error) reject(error);
                else resolve(info.response);
            });
        });
    },
};

export default email;
