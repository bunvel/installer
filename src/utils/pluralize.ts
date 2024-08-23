export function pluralize(name: string): string {
  const lastChar = name[name.length - 1];
  const secondLastChar = name[name.length - 2];

  if (lastChar === "y" && !["a", "e", "i", "o", "u"].includes(secondLastChar)) {
    // For words ending with a consonant followed by 'y', replace 'y' with 'ies'
    return name.slice(0, -1) + "ies";
  } else if (
    lastChar === "s" ||
    lastChar === "x" ||
    lastChar === "z" ||
    (lastChar === "h" && (secondLastChar === "s" || secondLastChar === "c"))
  ) {
    // For words ending with 's', 'x', 'z', 'sh', 'ch', add 'es'
    return name + "es";
  } else {
    // For most other cases, add 's'
    return name + "s";
  }
}
