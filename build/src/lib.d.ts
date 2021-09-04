/// <reference types="node" />
import * as readline from 'readline';
declare class StandardInputBuffer {
    readlines: readline.Interface | undefined;
    inputBuffer: string[];
    inputResolver?: (answer: string) => void;
    delayedConstructor(): void;
    input(guide: string): Promise<string>;
    close(): void;
}
export declare function input(guide: string): Promise<string>;
export declare function getInputObject(): StandardInputBuffer;
export declare function inputPath(guide: string): Promise<string>;
export declare function inputSkip(count: number): void;
export declare function pathResolve(path_: string): string;
export declare function checkNotInGitWorking(): void;
export declare function getTestWorkFolderFullPath(): string;
export declare function pp(message: any): string[];
export declare const debugOut: string[];
export declare function cc(targetCount?: number, label?: string): {
    isTarget: boolean;
    debugOut: string[];
};
export {};
