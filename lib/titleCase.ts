export const titleCase = (camelCaseText: string): string => {
  const text = camelCaseText.replace(/([A-Z])/g, " $1");
  const splittedText = text.split(" ");
  let fText = "";
  for (let i = 0; i < splittedText.length; i++) {
    if (i === 0) {
      fText +=
        splittedText[i].charAt(0).toUpperCase() +
        splittedText[i].slice(1) +
        " ";
    } else {
      fText +=
        splittedText[i].charAt(0).toLowerCase() +
        splittedText[i].slice(1) +
        " ";
    }
  }
  return fText;
};
