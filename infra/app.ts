import { App } from '@aws-cdk/core'
import { HelloStack } from './stack'

const app = new App()

new HelloStack(app, 'HelloStack', {
  env: {
    region: 'eu-west-1'
  }
})

app.synth()
