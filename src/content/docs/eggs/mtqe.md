---
title: MTQE
description: An Egg with the potential to create an MTQE Bird
sidebar:
  label: MTQE
  order: 7
  hidden: true
---

### Eggs: Starting Points for Your Birds

In Blackbird, Eggs are the seeds or blueprints for your workflows. They represent the initial ideas that have the potential to become fully-fledged Birds.

In this Egg-guide, let's explore some options to perform MTQE actions. [Find **Downloadable Eggs** at the end!](https://docs.blackbird.io/eggs/mtqe/#download-an-egg)

## Quality Estimation on XLIFF files

Many apps in Blackbird support Machine Translation Quality Estimation (MTQE) on XLIFF files, even if the underlying external application only supports text or string-based evaluations. This is part of how Blackbird augments app functionality to fit real-world localization needs.  
When an XLIFF file is processed through MTQE, all segments are individually assessed, and an average score is provided as the output of the step. In addition, the XLIFF file is updated to include quality scores per segment, making the results traceable and actionable.
You can also define logic to change each segment’s target state based on its quality score and a predefined threshold, for example, setting segments to "needs-review" or "final" automatically. (See our [guide on setting XLIFF segment states based on MTQE scores](https://docs.blackbird.io/guides/xliff/#quality-estimate-apps-taus-modernmt-openai-anthropic--modelfront) for details.) In some TMS apps, segment states influence how the file is imported, for instance, importing low-quality segments as unconfirmed, locked, or excluded from import.

### Examples

1. **Routing files based on overall score (ModelFront)**
A source file is downloaded from Google Drive, machine translated using DeepL, then passed through ModelFront for quality estimation. The updated XLIFF includes segment-level scores and an overall average. A downstream decision step routes the file for review if the quality is low.
![ModelFront example](~/assets/docs/eggs/modelfront_predict_xliff_with_okapi.png)
2. **Signing off high quality segments (TAUS)**
XTM exports an XLIFF file after initial MT. MTQE is performed using TAUS, and low-quality segments are passed to an LLM for light post-editing. Segment states are updated based on the final scores, and the file is reimported into XTM—with segments automatically signed off or left open based on quality thresholds.
![TAUS example](~/assets/docs/eggs/modelfront_predict_xliff_with_okapi.png)
3. **Autopublishing content based on score (ModernMT)**
An article is published in a CMS. The content is pulled into Blackbird, translated using an MT engine, and then assessed via MTQE using ModernMT. If the overall score meets a defined threshold, the translated content is automatically published in the CMS. If not, the XLIFF is sent to a TMS for further review.
![ModernMT example](~/assets/docs/eggs/modelfront_predict_xliff_with_okapi.png)

### Suggested apps & actions

- [TAUS](https://docs.blackbird.io/apps/taus/) - Estimate XLIFF
- [ModernMT](https://docs.blackbird.io/apps/modernmt/) - Estimate XLIFF quality
- [ModelFront](https://docs.blackbird.io/apps/modelfront/) - Predict XLIFF
- [Widn](https://docs.blackbird.io/apps/widn/) - Estimate XLIFF translation quality
- [OpenAI](https://docs.blackbird.io/apps/openai/) - Get quality scores for XLIFF
- [Anthropic](https://docs.blackbird.io/apps/anthropic/) - Get quality scores for XLIFF
- [Mistral AI](https://docs.blackbird.io/apps/mistral-ai/) - Get quality scores for XLIFF

## MTQE on text

## Download an Egg

Download JSON workflows to import into your Nest, make any desired adjustments, and **fly**.

- <a href="https://docs.blackbird.io/downloads/modelfront_predict_xliff_with_okapi.json" download>ModelFront example</a>
- <a href="https://docs.blackbird.io/downloads/xtm_taus_openai.json" download>TAUS example</a>
- <a href="https://docs.blackbird.io/downloads/zendesk_deepl_modernmt.json" download>ModernMT example</a>
- <a href="https://docs.blackbird.io/downloads/Phrase_to_Anthropic.json" download>BLEU score calculation</a>

### Importing Eggs

To import an Egg into your Nest:

1. Navigate to the Bird Editor section.
2. Click on Import on the top right.
3. Select the Egg (JSON) file to import and click `Import`.
4. Identify the newly created Bird and click on it to edit it.
5. Add Connection details and any other needed input/output parameters or desired steps. Look for red warning signs next to the step name signaling missing details in said step.
6. Click on the three dots next to the Bird's name and update the apps if there are updates available.
7. Click Save/Publish.

![Importing Eggs](~/assets/docs/eggs/ImportEggs.gif)

