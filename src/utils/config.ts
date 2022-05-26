import type { Config } from '@prisma/client';
import type { DiceResolverKeyNum } from './dice';

export type DiceConfig = {
	//Legacy object
	base: DiceConfigCell;

	characteristic: DiceConfigCell;
	skill: DiceConfigCell;
	attribute: DiceConfigCell;
};

export type DiceConfigCell = {
	value: DiceResolverKeyNum;
	branched: boolean;
};

export type PortraitConfig = {
	attributes: number[];
	side_attribute: number;
};

export type PortraitFontConfig = {
	name: string;
	data: string;
}

export type Environment = 'idle' | 'combat';

export type ContainerConfig = { originalName: string; name: string }[];

let successTypeEnabledDirty: boolean = true;
let successTypeEnabled: Config | null = null;

export function setSuccessTypeConfigDirty() {
	successTypeEnabledDirty = true;
}

export async function isSuccessTypeEnabled() {
	if (successTypeEnabledDirty) {
		successTypeEnabledDirty = false;
		successTypeEnabled = await prisma.config.findUnique({
			where: { name: 'enable_success_types' },
		});
	}
	return successTypeEnabled?.value === 'true';
}
