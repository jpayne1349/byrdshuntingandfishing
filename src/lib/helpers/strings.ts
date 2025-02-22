export function toTitleString(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Convert camelCase to spaced
    .replace(/[-_]/g, " ") // Convert hyphens and underscores to spaces
    .replace(/\s+/g, " ") // Remove extra spaces
    .trim() // Trim leading/trailing spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
}

export class StringSet {
  private set: Set<string>;

  constructor() {
    this.set = new Set();
  }

  add(value: string): void {
    if (!this.set.has(value)) {
      this.set.add(value);
    }
  }

  remove(value: string): void {
    if (this.set.has(value)) {
      this.set.delete(value);
    }
  }

  has(value: string): boolean {
    return this.set.has(value);
  }

  getAll(): string[] {
    return Array.from(this.set);
  }

  concat(): string {
    return this.set.size > 0 ? Array.from(this.set).join("|") : "unspecified";
  }
}
