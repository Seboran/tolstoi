import type { InjectionKey } from 'vue'

export const disableButtons = Symbol() as InjectionKey<MaybeRef<boolean>>
