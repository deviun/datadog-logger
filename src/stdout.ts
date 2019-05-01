const MSG_SEPARATOR = ' ';

const formattingOutput = (msg: any, arrFormat = true): string[] => {
  if (msg instanceof Error || msg instanceof Date) {
    return [msg.toString() + MSG_SEPARATOR];
  } else if (msg instanceof Array) {
    if (!arrFormat) {
      return msg;
    }

    return msg.map((any) => {
      const [res] = formattingOutput(any, false);
      return res;
    });
  } else if (typeof msg === 'object') {
    return [JSON.stringify(msg) + MSG_SEPARATOR];
  } else {
    return [msg + MSG_SEPARATOR];
  }
};  

export const stdout = (...args: any) => {
  args.forEach((arg: any) => 
    formattingOutput(arg)
      .forEach(out => process.stdout.write(out)),
  );
  process.stdout.write('\n');
};
