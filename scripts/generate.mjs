import fs from "fs";
import { Octokit } from "octokit";
import * as dotenv from "dotenv";
dotenv.config();

const auth = process.env.GITHUB_ACCESS_TOKEN;
const octokit = new Octokit({ auth: auth });

const docs_comment_begin = "<!-- begin docs -->";
const docs_comment_end = "<!-- end docs -->";

// Add altered_names here to turn repo names into nice names, f.e: HubspotCRM -> Hubspot CRM
const altered_names = {};

const all_repos = await octokit.paginate("GET /orgs/{org}/repos", {
  org: "bb-io",
  per_page: 100,
});

await all_repos
  .filter((x) => x.name != "docs")
  .forEach(async ({ name, default_branch, html_url }) => {
    try {
      const { data: raw_readme } = await octokit.rest.repos.getContent({
        mediaType: {
          format: "raw",
        },
        owner: "bb-io",
        repo: name,
        path: "README.md",
      });

      if (!raw_readme.includes(docs_comment_begin)) return;

      const docs_section = raw_readme.substring(
        raw_readme.indexOf(docs_comment_begin) + docs_comment_begin.length + 1,
        raw_readme.lastIndexOf(docs_comment_end)
      );

      if (!docs_section) return;

      if (name in altered_names) {
        name = altered_names[name];
      }

      console.log(name);

      const frontmatter = `---
  title: ${name}
  description: The ${name} Blackbird app
---
import { LinkCard } from "@astrojs/starlight/components";

<LinkCard title="View on Github" target="_blank" href="${html_url}" icon="github" />
`;

      const regex = /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))\)/g;
      const md_content =
        frontmatter +
        docs_section.replace(regex, (a, b) =>
          a.replace(b, `https://raw.githubusercontent.com/bb-io/${name}/${default_branch}/${b}`)
        );

      fs.writeFile(`./src/content/docs/apps/${name}.mdx`, md_content, function (err) {
        if (err) throw err;
      });
    } catch {}
  });
