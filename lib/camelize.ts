export const camelize = (text: string): string => {
  const splittedText = text.split(" ");
  let camelize = "";
  for (let i = 0; i < splittedText.length; i++) {
    if (i === 0) {
      camelize += splittedText[i];
      continue;
    }
    const capitalizeWord =
      splittedText[i].charAt(0).toUpperCase() + splittedText[i].slice(1);

    camelize += capitalizeWord;
  }

  return camelize;
};
