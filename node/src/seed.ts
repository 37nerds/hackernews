import { load_module_dynamically } from "@/helpers/units";
import { faker } from "@faker-js/faker";

import domains from "@/configs/domains";
import app from "@/base/app";
import log from "@/helpers/log";

const main = async () => {
    await app();

    const first_argument = process.argv[2];

    const drop_before_seed = first_argument === "drop before seed";

    for (const domain of domains) {
        await log.time(`seeding: ${domain}`, async () => {
            const m = await load_module_dynamically(`domains/${domain}/seeder`);
            await m.default(faker, drop_before_seed);
        });
    }

    process.exit(0);
};

main().then(() => {});
