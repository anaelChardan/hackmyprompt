import type { Command } from 'commander';
import type { UnifiedConfig } from '../../types';
import type { RedteamCliGenerateOptions } from '../types';
export declare function doGenerateRedteam(options: Partial<RedteamCliGenerateOptions>): Promise<Partial<UnifiedConfig> | null>;
export declare function redteamGenerateCommand(program: Command, command: 'redteam' | 'generate', defaultConfig: Partial<UnifiedConfig>, defaultConfigPath: string | undefined): void;
//# sourceMappingURL=generate.d.ts.map