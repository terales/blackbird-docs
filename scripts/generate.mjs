import fs from "fs";
import { Octokit } from "octokit";
import * as dotenv from "dotenv";
dotenv.config();

const auth = process.env.GITHUB_ACCESS_TOKEN;
const octokit = new Octokit({ auth: auth });

const docs_coment_begin = "<!-- begin docs -->";
const docs_comment_end = "<!-- end docs -->";

const all_repos = await octokit.paginate("GET /orgs/{org}/repos", {
  org: "bb-io",
  per_page: 100,
});

await all_repos
  .filter((x) => x.name == "Zendesk")
  .forEach(async ({ name }) => {
    try {
      const { data: raw_readme } = await octokit.rest.repos.getContent({
        mediaType: {
          format: "raw",
        },
        owner: "bb-io",
        repo: name,
        path: "README.md",
      });

      const docs_section = raw_readme.substring(
        raw_readme.indexOf(docs_coment_begin) + docs_coment_begin.length + 1,
        raw_readme.lastIndexOf(docs_comment_end)
      );

      if (!docs_section) return;

      const frontmatter = `---
  title: ${name.replace(/([A-Z])/g, " $1").trim()}
  description: The ${name} Blackbird app
---
`;

      const regex = /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))\)/g;
      const md_content =
        frontmatter +
        docs_section.replace(regex, (a, b) =>
          a.replace(b, `https://raw.githubusercontent.com/bb-io/${name}/main/${b}`)
        );

      fs.writeFile(`./src/content/docs/apps/${name}.md`, md_content, function (err) {
        if (err) throw err;
      });
    } catch {}
  });
