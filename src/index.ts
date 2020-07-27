import * as R from "ramda";

export interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    filename: string;
  }>;
}

function convertToError(
  params: string[],
  matchReg: RegExp
): Array<{
  line: number;
  column: number;
  filename: string;
}> {
  const stackArr = [];
  for (const item of params) {
    const ret = item.match(matchReg);
    if (ret && ret.groups) {
      stackArr.push({
        line: parseInt(ret.groups.line, 10),
        column: parseInt(ret.groups.column, 10),
        filename: ret.groups.filename,
      });
    }
  }
  return stackArr;
}

export function parseError(err: Error): ErrorMessage {
  const { stack = "" } = err;
  const getError = /\w+:\s+(?<error>[\S\s]+)/i; //chrome 头部有消息 正则
  const stackRegex = /((?<info>\w+\@|at(\S+){0,1})){0,1}\s{0,1}(?<filename>\S+(\S+\.[a-zA-Z0-9]+)):(?<line>\d+):(?<column>\d+)/i;

  const stackErrors = R.compose(R.map(R.trim), R.split("\n"))(stack);
  const errorMessage = stackErrors[0].match(getError);

  const messages = R.isNil(errorMessage)
    ? {
        message: "",
        stack: convertToError(stackErrors, stackRegex),
      }
    : {
        message: errorMessage.groups!.error,
        stack: convertToError(stackErrors.slice(1), stackRegex),
      };

  return messages;
}
