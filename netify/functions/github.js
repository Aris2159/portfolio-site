exports.handler = async function (event) {

    const { GITHUB_TOKEN, OWNER, REPO } = process.env;

    const params = event.queryStringParameters || {};
    const path = params.path || "";
    const isFile = params.type === "file";

    if (!GITHUB_TOKEN || !OWNER || !REPO) {
        return { statusCode: 500, body: "Missing server configuration" };
    }

    if (path.split("/").includes("..")) {
        return { statusCode: 400, body: "Bad path" };
    }

    const encodedPath = path.split("/").map(encodeURIComponent).join("/");
    const ghUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodedPath}`;

    const gh = await fetch(ghUrl, {
        headers: {
            "Authorization": `Bearer ${GITHUB_TOKEN}`,
            "Accept": isFile
                ? "application/vnd.github.raw+json"
                : "application/vnd.github+json",
            "User-Agent": "course-proxy",
            "X-GitHub-Api-Version": "2022-11-28"
        }
    });

    const contentType = gh.headers.get("Content-Type") || "application/octet-stream";
    const buffer = Buffer.from(await gh.arrayBuffer());

    return {
        statusCode: gh.status,
        headers: { "Content-Type": contentType },
        body: buffer.toString("base64"),
        isBase64Encoded: true
    };
};