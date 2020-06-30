import * as cdk from '@aws-cdk/core'

import * as api from '@aws-cdk/aws-apigatewayv2'
import * as lambda from '@aws-cdk/aws-lambda'
import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'

export class HelloStack extends cdk.Stack {
    constructor (scope: cdk.App, id: string, props: cdk.StackProps) {
        super(scope, id, props)

        const bucket = new s3.Bucket(this, 'Bucket')

        new s3deploy.BucketDeployment(this, 'BucketDeployment', {
          sources: [s3deploy.Source.asset('infra/static')],
          destinationBucket: bucket
        });

        const s3Lambda = new lambda.Function(this, 'S3Lambda', {
            runtime: lambda.Runtime.JAVA_11,
            memorySize: 3008, // 3008 is the max, lower values take an age to start! :)
            handler: 'lambda.Handler',
            code: lambda.Code.fromAsset('java/lambda/lambda_deploy.jar'),
            timeout: cdk.Duration.seconds(30),
            environment: {
              BUCKET_NAME: bucket.bucketName
            }
        })

        bucket.grantRead(s3Lambda)

        const httpApi = new api.HttpApi(this, 'HttpApi');

        httpApi.addRoutes({
          path: '/hello',
          methods: [ api.HttpMethod.GET ],
          integration: new api.LambdaProxyIntegration({
            handler: s3Lambda,
          })
        })

        new cdk.CfnOutput(this, "bucket", {
          value: bucket.bucketArn
        })

        new cdk.CfnOutput(this, "api", {
          value: httpApi.url!
        })
    }
}
