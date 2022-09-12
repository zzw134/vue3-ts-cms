import { App } from 'vue'
import registerProperties from './register-properties'

export default function registerAll(app: App) {
  app.use(registerProperties)
}
