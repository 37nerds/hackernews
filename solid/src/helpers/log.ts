import toast from "solid-toast";

const error = (...m: any[]) => {
    console.error(m);
};

error.toast = (message: string) => {
    toast(`⚠️  ${message}`, {
        position: "top-right",
        style: {
            "background-color": "#f97272",
            color: "#480000",
        },
    });
};

const show = (...m: any[]) => {
    console.log(...m);
};

show.toast = (message: string) => {
    toast(`${message}`, {
        position: "top-right",
        style: {
            "background-color": "white",
            color: "green",
        },
    });
};

const debug = (...m: any[]) => {
    console.log("[debug]: ", ...m);
};

const log = {
    error,
    show,
    debug,
};

export default log;
