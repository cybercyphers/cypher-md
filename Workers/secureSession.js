import { parentPort, workerData } from "node:worker_threads";
import fs, { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
var __dirname = dirname(fileURLToPath(import.meta.url));

async function clear_trash() {
    try {
        //removing heavy space wasting directories.

        const spaceDirs = [".npm", ".cache", ".ca-cache", "/cyphers/core"];

        for (const r of spaceDirs) {
            if (fs.existsSync(path.resolve(`/home/container/${r}`))) {
                fs.rm(
                    path.resolve(`/home/container/${r}`),
                    { recursive: true },
                    (err) => {
                        if (err)
                            console.log(
                                `\x1b[1;5;31mI encountered an error while unlinking, ${r}. \x1b[0m`,
                            );

                        console.log(
                            `\x1b[32mRemoved rubbish : ${r?.replace(
                                "/cyphers/",
                                "",
                            )} from disk.\x1b[0m`,
                        );
                    },
                );
            }
        }
    } catch (e) {
        console.error(e);
    }
}
setInterval(() => {
    clear_trash();
}, 1000 * 60 * 2);
