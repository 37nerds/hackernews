import app from "@/base/app";
import env from "@/conf/env";
import log from "@/helps/log";

const main = async () => {
    (await app()).listen(env.PORT, () => {
        log.boot(`api is running... on port: ${env.PORT}`);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
