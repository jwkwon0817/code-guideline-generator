#!/usr/bin/env node

import { installDependencies } from "./utils/install";
import Logger from "./utils/logger";
import { getDefaultConfiguration } from "./utils/metadata";
import { askIndentStyle, askIndentWidth, askQuoteStyles, askSemicolon, checkIfUsingGit, Wizard } from "./utils/wizard";

async function main() {
  await installDependencies();
  
  const result = await Wizard.pipeline(
    getDefaultConfiguration(), 
    [
      checkIfUsingGit,
      askIndentStyle,
      askIndentWidth,
      askQuoteStyles,
      askSemicolon,
    ]
  )

  await Wizard.generate(result);
}

main()
  .then(() => {
    Logger.success('Code Guideline successfully generated!');
  })