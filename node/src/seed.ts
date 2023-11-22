import { load_module_dynamically } from "@/helps/units";
import { faker } from "@faker-js/faker";
import { seeders } from "@/conf/mics";

import app from "@/base/app";
import log from "@/helps/log";

const main = async () => {
    await app();

    const first_argument = process.argv[2];

    const drop_before_seed = first_argument === "drop before seed";

    for (const domain of seeders) {
        await log.time(`seeding: ${domain}`, async () => {
            const m = await load_module_dynamically(`repos/${domain}`);
            if (m?.seeder) {
                await m?.seeder(faker, drop_before_seed);
            }
        });
    }

    process.exit(0);
};

main().then(() => {});
