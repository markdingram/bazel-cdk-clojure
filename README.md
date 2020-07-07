Bazel CDK Clojure
=================

![CI](https://github.com/markdingram/bazel-cdk-clojure/workflows/CI/badge.svg)

If you ever (?!) wanted to create an AWS Clojure Lambda with the CDK then this is the place to come! 

Requires Bazelisk / Yarn / OpenJDK 11, possibly other things. Tested on Mac OSX & Linux.

Various commands are setup in the package.json:

- build:  `bazel build //...`
- repl: `bazel run :repl`
- test: `bazel test //...`
- cdk:bootstrap: `bazel run :cdk -- bootstrap`
- cdk:deploy: `bazel run :cdk -- deploy LambdaStack`


Notes
=====

- Build the Lambda JAR and revel in its AOT'ed innards:
    
    ````
    $ bazel build //java/lambda:lambda_deploy.jar
    $ unzip -l dist/bin/java/lambda/lambda_deploy.jar | grep " lambda/" 
        0  01-01-2010 00:00   lambda/
     2149  01-01-2010 00:00   lambda/Handler.class
     1780  01-01-2010 00:00   lambda/handler$G__133handleRequest.class
     ...
    ````


- Bootstrap then Deploy the stack to AWS (assumes AWS admin credentials on the environment)

    ````
    $ yarn cdk:bootstrap && yarn cdk:deploy
    HelloStack: deploying...
    
    ✅  HelloStack (no changes)
    
    Outputs:
    HelloStack.bucket = arn:aws:s3:::hellostack-bucket83908e77-1ihbe4gxlcd98
    HelloStack.api = https://nmp5xxxxxx.execute-api.eu-west-1.amazonaws.com/
  
    $ curl https://nmp5xxxxxx.execute-api.eu-west-1.amazonaws.com/hello
    {"Message": "Hello World from Bazel / CDK / Clojure!"
    ````
  
- try changing the static response in [hello.json](infra/static/hello.json) or change the lambda handling code in [core.clj](java/lambda/core.clj) 

- either way rerunning `yarn cdk:deploy` is the only step necessary to build and deploy any updates.

- Remember to run `bazel run cdk -- destroy HelloStack` to tear down any AWS resources when finished.
