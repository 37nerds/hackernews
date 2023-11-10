import toast from "solid-toast";

const error = (message: string) => {
    console.error(message);
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

const message = (message: string) => {
    console.log(message);
};

message.toast = (message: string) => {
    toast(`${message}`, {
        position: "top-right",
        style: {
            "background-color": "white",
            color: "green",
        },
    });
};

const log = {
    error,
    message,
};

export default log;
