import { cosmiconfigSync } from 'cosmiconfig'
import { ProjectConfig } from '~/types'
import { projectConfigSchema } from './schemas'

let _config: ProjectConfig | null = null

export function getProjectConfig() {
  if (_config == null) {
    const rawConfig = cosmiconfigSync('kig').search()?.config ?? {}
    const validatedConfig = projectConfigSchema.validate(rawConfig, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    })

    _config = Object.freeze(validatedConfig.value) as ProjectConfig
  }

  return _config
}
