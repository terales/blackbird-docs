import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';

import { locales } from '../i18n.config.mjs';

const targetLocales = Object.keys(locales).filter(locale => locale !== 'root');
const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const docsDir = path.join(repoRoot, 'src', 'content', 'docs');
const excludeDirs = targetLocales.map(locale => path.join(repoRoot, 'src', 'content', 'docs', locale));
const extensions = ['.md', '.mdx'];

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});


const sourceFiles = await findFiles(docsDir, extensions, excludeDirs);
const untranslatedFiles = getUntranslatedFiles(sourceFiles, targetLocales, docsDir);
const batchRequestIds = [];
const batchRequests = [];

for (const locale of targetLocales) {
  for (const relativePath of untranslatedFiles[locale]) {
    const sourceFilePath = path.join(docsDir, relativePath);
    const fileContent = await fs.promises.readFile(sourceFilePath, 'utf8');

    batchRequestIds.push({
      locale: locale,
      relativePath: relativePath
    });

    batchRequests.push({
      custom_id: (batchRequestIds.length - 1).toString(),
      params: {
        model: process.env.ANTHROPIC_TRANSLATION_MODEL,
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: getPrompt(locale, fileContent)
          }
        ],
      }
    });
  }
}

if (batchRequests.length === 0) {
  console.log('No files to translate');
  process.exit(0);
}

try {
  // Send the batch request
  // const batchResponse = await anthropic.beta.messages.batches.create({
  //   requests: batchRequests
  // });
  const batchResponse = { id: 'msgbatch_012Z3oj9ijiAeZt2k1g53wf1' };

  console.log(`Batch ID: ${batchResponse.id}`);
  console.log(`Request count: ${batchRequests.length}`);

  await processBatchResults(batchResponse.id, batchRequestIds);
} catch (error) {
  console.error(`Error in translation process:`, error);
}


async function processBatchResults(batchId, batchRequestIds) {
  try {
    let batchStatus;
    do {
      batchStatus = await anthropic.messages.batches.retrieve(batchId);
      if (batchStatus.processing_status !== 'ended') {
        console.log(`Batch ${batchId} is not completed yet, waiting for 30 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
    } while (batchStatus.processing_status !== 'ended');

    // Get all responses
    const responses = await anthropic.messages.batches.results(batchId);

    // Process and save translations
    for await (const response of responses) {
      console.log(response);
      const requestId = batchRequestIds[response.custom_id];
      const locale = requestId.locale;
      const relativePath = requestId.relativePath;
      const translatedContent = response.result.message.content[0].text;

      // Create directory and save file
      const translatedFilePath = path.join(docsDir, locale, relativePath);
      const translatedFileDir = path.dirname(translatedFilePath);

      if (!fs.existsSync(translatedFileDir)) {
        fs.mkdirSync(translatedFileDir, { recursive: true });
      }

      fs.writeFileSync(translatedFilePath, translatedContent);
    }
  } catch (error) {
    console.error(`Error processing batch results:`, error);
  }
}

async function findFiles(dir, extensions, excludeDirs = []) {
  let results = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (excludeDirs.some(excludeDir => fullPath.includes(excludeDir))) {
        continue;
      }

      const subResults = await findFiles(fullPath, extensions, excludeDirs);
      results = results.concat(subResults);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

function getUntranslatedFiles(sourceFiles, targetLocales, docsDir) {
  const untranslatedFiles = {};
  for (const locale of targetLocales) {
    untranslatedFiles[locale] = [];

    for (const sourceFile of sourceFiles) {
      const relativePath = path.relative(docsDir, sourceFile);
      const translatedFilePath = path.join(docsDir, locale, relativePath);

      if (!fs.existsSync(translatedFilePath)) {
        untranslatedFiles[locale].push(relativePath);
      }
    }
  }
  return untranslatedFiles;
}

function getPrompt(locale, fileContent) {
  return `
    Translate an attached file to ${locale}.
    Keep the frontmatter layout, all tags, links and images as is -- translate only text content and text values in frontmatter.

    Context: this file is part of a technical documentation website for a Blackbird.io company.
    Select the most appropriate translation using best practices for ${locale} audience.

    Reply with the content of the translated file only, omit any additional comments, notes or observations.

    Do not translate:
    - Blackbird.io
    - names and categories of actions and  (e.g. third-level header like "### Spaces" category or "**Get spaces**" action)
    - names of events (e.g. "On task created")
    - labels of UI elements (e.g. "_Add Connection_" button)
    - names of third-party products
    - words and phrases wrapped in backticks (e.g. \`team\`)

    Always translate second-level headers (e.g. "## Missing features" or "## Feedback"), except "Actions" and "Events".

    <fileToTranslate>
    ${fileContent}
    </fileToTranslate>
  `;
}
