export type PreceptGroup = 'three-refuges' | 'three-pure-precepts' | 'ten-grave-precepts'

export interface PreceptDefinition {
  number: number
  group: PreceptGroup
  vow: string
  shortName: string
  description: string
  defaultPrompts: string[]
}

export interface PreceptGroupDefinition {
  id: PreceptGroup
  name: string
  description: string
  precepts: PreceptDefinition[]
}
