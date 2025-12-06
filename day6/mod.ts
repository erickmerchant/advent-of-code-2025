export async function part1(input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day6.txt");

  const lines = input.trim().split("\n").map((ln: string) =>
    ln.trim().split(/\s+/g)
  );
  const operators = lines.pop();
  const numberLines = lines.map((ln: Array<string>) =>
    ln.map((cell: string) => +cell)
  );
  const totals = numberLines.shift();

  if (!operators || !totals) return 0;

  for (const line of numberLines) {
    for (let i = 0; i < line.length; i++) {
      if (operators[i] === "*") {
        totals[i] *= line[i];
      }
      if (operators[i] === "+") {
        totals[i] += line[i];
      }
    }
  }

  return totals.reduce((acc: number, current: number) => acc + current, 0);
}

export async function part2(input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day6.txt");

  const lines = input.split("\n").filter((ln: string) => ln.trim().length).map((
    ln: string,
  ) => ln.split(""));

  const operators = lines.pop();
  const numberLines = lines.map((ln: Array<string>) =>
    ln.map((cell: string) => +cell)
  );
  const numbers = numberLines.shift();

  if (!numbers || !operators) return 0;

  for (const numberLine of numberLines) {
    for (let i = 0; i < numberLine.length; i++) {
      if (!numberLine[i]) continue;

      numbers[i] ??= 0;

      numbers[i] = (numbers[i] * 10) + numberLine[i];
    }
  }

  const totals: Array<number> = [0];
  let operator: string | null = null;

  for (let i = 0; i < numbers.length; i++) {
    const o = operators[i];

    if (o != null && o !== " ") {
      operator = o;

      totals.unshift(numbers[i]);
    } else if (operator != null) {
      if (operator === "*") {
        totals[0] *= numbers[i] !== 0 ? numbers[i] : 1;
      }

      if (operator === "+") {
        totals[0] += numbers[i];
      }
    }
  }

  return totals.reduce((acc: number, current: number) => acc + current, 0);
}
