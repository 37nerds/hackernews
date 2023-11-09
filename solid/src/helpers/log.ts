import toast from "solid-toast";

const error = (message: string) => {
    console.error(message);
};

error.toast = (message: string) => {
    toast(`⚠️  ${message}`, {
        position: "top-center",
        style: {
            "background-color": "#f97272",
            color: "#480000",
        },
    });
};

const log = {
    error,
};

export default log;
