const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const graderNodeModules =
  "C:\\Users\\Asus\\AppData\\Roaming\\delcom-grading-desktop-2026\\labs\\web-grading\\node_modules";

const puppeteer = require(
  path.join(graderNodeModules, "puppeteer-core")
);

const chromeLauncher = require(
  path.join(graderNodeModules, "chrome-launcher")
);

const axePath = path.join(
  graderNodeModules,
  "axe-core",
  "axe.min.js"
);

const axeSource = fs.readFileSync(axePath, "utf8");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log("Menjalankan Vite...");

  const vite = spawn(
    "bun",
    ["run", "dev", "--", "--host", "127.0.0.1"],
    {
      cwd: process.cwd(),
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  vite.stdout.on("data", (data) => {
    const text = data.toString();
    if (text.includes("Local:")) {
      console.log(text.trim());
    }
  });

  vite.stderr.on("data", () => {});

  await wait(5000);

  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`,
  });

  const pages = [
    "/auth/login",
    "/auth/register",
  ];

  try {
    for (const route of pages) {
      const page = await browser.newPage();

      const url = `http://127.0.0.1:5173${route}`;

      console.log("\n========================================");
      console.log("MEMERIKSA:", route);
      console.log("========================================");

      try {
        await page.goto(url, {
          waitUntil: "networkidle2",
          timeout: 30000,
        });

        await page.addScriptTag({
          content: axeSource,
        });

        const result = await page.evaluate(async () => {
          return await axe.run(document, {
            resultTypes: [
              "violations",
              "passes",
              "incomplete",
            ],
          });
        });

        console.log("\nAxe violations:", result.violations.length);
        console.log("Axe passes:", result.passes.length);
        console.log("Axe incomplete:", result.incomplete.length);

        if (result.violations.length > 0) {
          console.log("\n========== VIOLATIONS ==========");

          for (const violation of result.violations) {
            console.log("\nID:", violation.id);
            console.log("Impact:", violation.impact);
            console.log("Help:", violation.help);
            console.log("Description:", violation.description);
            console.log("Help URL:", violation.helpUrl);

            for (const node of violation.nodes) {
              console.log("\n  Target:", JSON.stringify(node.target));
              console.log("  HTML:", node.html);
              console.log(
                "  Failure:",
                node.failureSummary || "-"
              );
            }
          }
        }
      } catch (error) {
        console.log("Gagal memeriksa", route);
        console.log(error.message);
      }

      await page.close();
    }
  } finally {
    await browser.close();
    await chrome.kill();
    vite.kill();
  }

  console.log("\n========================================");
  console.log("PEMERIKSAAN SELESAI");
  console.log("========================================");
}

main().catch((error) => {
  console.error("\nERROR:");
  console.error(error);
  process.exit(1);
});
