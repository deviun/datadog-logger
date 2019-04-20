export const stdout = (...args: any) => {
  process.stdout.write(JSON.stringify(args));
  process.stdout.write('\n');
};
